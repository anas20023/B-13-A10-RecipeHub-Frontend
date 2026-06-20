"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";
import { getDb } from "./db";
import { ObjectId } from "mongodb";

// Helper to get session user
async function getSessionUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user || null;
}

// User Action: Add/Create Recipe
export async function createRecipeAction(recipeData) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Unauthorized. Please log in." };
        }

        const db = await getDb();
        const priceVal = parseFloat(recipeData.price);

        const newRecipe = {
            recipeName: recipeData.recipeName,
            recipeImage: recipeData.recipeImage || "/default-recipe.jpg",
            preparationTime: parseInt(recipeData.preparationTime) || 30,
            category: recipeData.category || "Main Course",
            difficultyLevel: recipeData.difficultyLevel || "Medium",
            cuisineType: recipeData.cuisineType || "International",
            price: Number.isNaN(priceVal) ? 0 : priceVal,
            ingredients: recipeData.ingredients || [],
            instructions: recipeData.instructions || [],
            authorName: user.name,
            authorEmail: user.email,
            likesCount: 0,
            purchasedBy: [],
            favoritedBy: [],
            isFeatured: false,
            reports: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("recipes").insertOne(newRecipe);

        // Update user uploaded count
        await db.collection("user").updateOne(
            { email: user.email },
            { $inc: { uploaded: 1 } }
        );

        revalidatePath("/dashboard/user/my-recipes");
        revalidatePath("/recipes");
        return { success: true, recipeId: result.insertedId.toString() };
    } catch (err) {
        console.error("Error creating recipe:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Delete Recipe
export async function deleteRecipeAction(recipeId) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Unauthorized." };
        }

        const db = await getDb();
        const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(recipeId) });

        if (!recipe) {
            return { success: false, error: "Recipe not found." };
        }

        // Only author or admin can delete
        if (recipe.authorEmail !== user.email && user.role !== "admin") {
            return { success: false, error: "You are not authorized to delete this recipe." };
        }

        await db.collection("recipes").deleteOne({ _id: new ObjectId(recipeId) });

        // Decrement author's uploaded count
        await db.collection("user").updateOne(
            { email: recipe.authorEmail },
            { $inc: { uploaded: -1 } }
        );

        revalidatePath("/dashboard/user/my-recipes");
        revalidatePath("/recipes");
        revalidatePath("/dashboard/admin/recipes");
        return { success: true };
    } catch (err) {
        console.error("Error deleting recipe:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Toggle Favorite
export async function toggleFavoriteAction(recipeId) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Please log in to favorite recipes." };
        }

        const db = await getDb();
        const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(recipeId) });

        if (!recipe) {
            return { success: false, error: "Recipe not found." };
        }

        const favoritedBy = recipe.favoritedBy || [];
        let isFavoritedNow = false;

        if (favoritedBy.includes(user.email)) {
            // Remove
            await db.collection("recipes").updateOne(
                { _id: new ObjectId(recipeId) },
                { $pull: { favoritedBy: user.email } }
            );
        } else {
            // Add
            await db.collection("recipes").updateOne(
                { _id: new ObjectId(recipeId) },
                { $addToSet: { favoritedBy: user.email } }
            );
            isFavoritedNow = true;
        }

        revalidatePath(`/recipes/${recipeId}`);
        revalidatePath("/dashboard/user/favorites");
        return { success: true, isFavorited: isFavoritedNow };
    } catch (err) {
        console.error("Error favoriting recipe:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Purchase Recipe
export async function purchaseRecipeAction(recipeId) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Please log in to purchase this recipe." };
        }

        const db = await getDb();
        const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(recipeId) });

        if (!recipe) {
            return { success: false, error: "Recipe not found." };
        }

        // Check if already purchased
        const purchasedBy = recipe.purchasedBy || [];
        if (purchasedBy.includes(user.email)) {
            return { success: false, error: "You have already purchased this recipe." };
        }

        // Add to recipe's purchasedBy list
        await db.collection("recipes").updateOne(
            { _id: new ObjectId(recipeId) },
            { $addToSet: { purchasedBy: user.email } }
        );

        // Record transaction in purchases
        const transaction = {
            buyerEmail: user.email,
            buyerName: user.name,
            recipeId: new ObjectId(recipeId),
            recipeName: recipe.recipeName,
            recipeImage: recipe.recipeImage,
            price: recipe.price || 0,
            authorName: recipe.authorName,
            authorEmail: recipe.authorEmail,
            purchasedAt: new Date(),
        };
        await db.collection("purchases").insertOne(transaction);

        revalidatePath(`/recipes/${recipeId}`);
        revalidatePath("/dashboard/user/purchased-recipes");
        revalidatePath("/dashboard/admin/transactions");
        return { success: true };
    } catch (err) {
        console.error("Error purchasing recipe:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Report Recipe
export async function reportRecipeAction(recipeId, reason) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Please log in to report a recipe." };
        }

        const db = await getDb();
        const reportObj = {
            reporterEmail: user.email,
            reporterName: user.name,
            reason: reason || "Inaccurate recipe",
            createdAt: new Date(),
        };

        await db.collection("recipes").updateOne(
            { _id: new ObjectId(recipeId) },
            { $push: { reports: reportObj } }
        );

        revalidatePath(`/recipes/${recipeId}`);
        revalidatePath("/dashboard/admin/reports");
        return { success: true };
    } catch (err) {
        console.error("Error reporting recipe:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Update Profile Info (name and image URL)
export async function updateProfileAction(profileData) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Unauthorized." };
        }

        const db = await getDb();
        
        const updateFields = {
            name: profileData.name || user.name,
            image: profileData.image || user.image,
            updatedAt: new Date(),
        };

        await db.collection("user").updateOne(
            { email: user.email },
            { $set: updateFields }
        );

        revalidatePath("/dashboard/user/profile");
        revalidatePath("/dashboard/admin/profile");
        return { success: true };
    } catch (err) {
        console.error("Error updating profile:", err);
        return { success: false, error: err.message };
    }
}

// User Action: Simulation for Buying Premium
export async function buyPremiumAction() {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { success: false, error: "Unauthorized." };
        }

        const db = await getDb();

        await db.collection("user").updateOne(
            { email: user.email },
            { $set: { isPremium: true, updatedAt: new Date() } }
        );

        // Record a transaction for analytics
        const transaction = {
            buyerEmail: user.email,
            buyerName: user.name,
            recipeName: "Premium Membership Upgrade",
            price: 19.99, // Simulated premium price
            purchasedAt: new Date(),
        };
        await db.collection("purchases").insertOne(transaction);

        revalidatePath("/dashboard/user/profile");
        revalidatePath("/dashboard/admin/transactions");
        return { success: true };
    } catch (err) {
        console.error("Error purchasing premium:", err);
        return { success: false, error: err.message };
    }
}

// Admin Action: Dismiss Reports
export async function dismissReportsAction(recipeId) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== "admin") {
            return { success: false, error: "Admin permission required." };
        }

        const db = await getDb();

        await db.collection("recipes").updateOne(
            { _id: new ObjectId(recipeId) },
            { $set: { reports: [], updatedAt: new Date() } }
        );

        revalidatePath("/dashboard/admin/reports");
        return { success: true };
    } catch (err) {
        console.error("Error dismissing reports:", err);
        return { success: false, error: err.message };
    }
}

// Admin Action: Toggle Featured Recipe
export async function toggleFeaturedAction(recipeId, isFeatured) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== "admin") {
            return { success: false, error: "Admin permission required." };
        }

        const db = await getDb();

        await db.collection("recipes").updateOne(
            { _id: new ObjectId(recipeId) },
            { $set: { isFeatured: !!isFeatured, updatedAt: new Date() } }
        );

        revalidatePath("/dashboard/admin/recipes");
        revalidatePath("/recipes");
        return { success: true };
    } catch (err) {
        console.error("Error toggling featured status:", err);
        return { success: false, error: err.message };
    }
}

// Admin Action: Toggle Block Status
export async function updateUserBlockStatusAction(userId, isBlocked) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== "admin") {
            return { success: false, error: "Admin permission required." };
        }

        const db = await getDb();

        // ID in better-auth adapter can be a string or ObjectId depending on the store
        let query = { id: userId };
        let doc = await db.collection("user").findOne(query);
        if (!doc) {
            query = { _id: new ObjectId(userId) };
            doc = await db.collection("user").findOne(query);
        }
        if (!doc) {
            // Also check standard string ID
            query = { _id: userId };
            doc = await db.collection("user").findOne(query);
        }

        if (!doc) {
            return { success: false, error: "User not found." };
        }

        await db.collection("user").updateOne(
            query,
            { $set: { isBlocked: !!isBlocked, updatedAt: new Date() } }
        );

        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err) {
        console.error("Error changing block status:", err);
        return { success: false, error: err.message };
    }
}

// Admin Action: Change User Role
export async function updateUserRoleAction(userId, role) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== "admin") {
            return { success: false, error: "Admin permission required." };
        }

        const db = await getDb();

        // Try querying by string ID, ID field, or ObjectId
        let query = { id: userId };
        let doc = await db.collection("user").findOne(query);
        if (!doc) {
            query = { _id: new ObjectId(userId) };
            doc = await db.collection("user").findOne(query);
        }
        if (!doc) {
            query = { _id: userId };
            doc = await db.collection("user").findOne(query);
        }

        if (!doc) {
            return { success: false, error: "User not found." };
        }

        await db.collection("user").updateOne(
            query,
            { $set: { role: role, updatedAt: new Date() } }
        );

        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err) {
        console.error("Error changing user role:", err);
        return { success: false, error: err.message };
    }
}
