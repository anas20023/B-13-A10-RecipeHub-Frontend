"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";
import { getDb } from "./db";
import { ObjectId } from "mongodb";

function extractBearerToken(requestHeaders) {
  const authorization = requestHeaders.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.substring(7).trim();
}

export async function getSessionUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user || null;
}

export async function findUserDocument(db, user) {
    let dbUser = await db.collection("user").findOne({
        email: user.email,
    });

    if (dbUser) return dbUser;

    dbUser = await db.collection("user").findOne({
        id: user.id,
    });

    if (dbUser) return dbUser;

    if (ObjectId.isValid(user.id)) {
        dbUser = await db.collection("user").findOne({
            _id: new ObjectId(user.id),
        });

        if (dbUser) return dbUser;
    }

    return null;
}

export async function getVerifiedUser(
    authToken,
    db,
    requiredRole = "user"
) {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    const sessionUser = session?.user;

    if (!sessionUser) {
        return {
            user: null,
            error: "Unauthorized.",
        };
    }

    const token = authToken || extractBearerToken(requestHeaders);

    if (!token) {
        return {
            user: null,
            error: "Verification token required.",
        };
    }

    try {
        const verification = await auth.api.verifyJWT({
            body: {
                token,
            },
        });

        const payload = verification?.payload;

        if (!payload?.sub) {
            return {
                user: null,
                error: "Invalid verification token.",
            };
        }

        if (payload.sub !== sessionUser.id) {
            return {
                user: null,
                error: "Token user mismatch.",
            };
        }

        const freshUser = await findUserDocument(db, sessionUser);

        if (!freshUser) {
            return {
                user: null,
                error: "User not found.",
            };
        }

        if (freshUser.isBlocked) {
            return {
                user: null,
                error: "Your account has been blocked.",
            };
        }

        if (freshUser.role !== requiredRole) {
            return {
                user: null,
                error: `${requiredRole} permission required.`,
            };
        }

        return {
            user: freshUser,
            error: null,
        };
    } catch (error) {
        console.error("Verification Error:", error);

        return {
            user: null,
            error: "Invalid verification token.",
        };
    }
}

export async function getVerifiedAdminUser(
    authToken,
    db
) {
    return getVerifiedUser(authToken, db, "admin");
}

export async function getVerifiedNormalUser(
    authToken,
    db
) {
    return getVerifiedUser(authToken, db, "user");
}
// User Action
export async function deleteRecipeAction(recipeId, authToken) {
    try {
        const user = await getSessionUser();
        if (!user || !getVerifiedNormalUser(user.token,"user")) {
            return { success: false, error: "Unauthorized." };
        }

        const db = await getDb();
        const recipe = await db
            .collection("recipes")
            .findOne({ _id: new ObjectId(recipeId) });

        if (!recipe) {
            return { success: false, error: "Recipe not found." };
        }

        // Only author or admin can delete
        if (recipe.authorEmail !== user.email) {
            const { user: adminUser, error } = await getVerifiedAdminUser(authToken, db);
            if (!adminUser) {
                return {
                    success: false,
                    error: error || "You are not authorized to delete this recipe.",
                };
            }
        }

        await db.collection("recipes").deleteOne({ _id: new ObjectId(recipeId) });

        // Decrement author's uploaded count
        await db
            .collection("user")
            .updateOne({ email: recipe.authorEmail }, { $inc: { uploaded: -1 } });

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
        const recipe = await db
            .collection("recipes")
            .findOne({ _id: new ObjectId(recipeId) });

        if (!recipe) {
            return { success: false, error: "Recipe not found." };
        }

        const favoritedBy = recipe.favoritedBy || [];
        let isFavoritedNow = false;

        if (favoritedBy.includes(user.email)) {
            // Remove
            await db
                .collection("recipes")
                .updateOne({ _id: new ObjectId(recipeId) }, { $pull: { favoritedBy: user.email } });
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
        const recipe = await db
            .collection("recipes")
            .findOne({ _id: new ObjectId(recipeId) });

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

        await db.collection("user").updateOne({ email: user.email }, { $set: updateFields });

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
export async function dismissReportsAction(recipeId, authToken) {
    try {
        const db = await getDb();
        const { user } = await getVerifiedAdminUser(authToken, db);
        if (!user) {
            return { success: false, error: "Admin permission required." };
        }

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
export async function toggleFeaturedAction(recipeId, isFeatured, authToken) {
    try {
        const db = await getDb();
        const { user } = await getVerifiedAdminUser(authToken, db);
        if (!user) {
            return { success: false, error: "Admin permission required." };
        }

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
export async function updateUserBlockStatusAction(userId, isBlocked, authToken) {
    try {
        const db = await getDb();
        const { user } = await getVerifiedAdminUser(authToken, db);
        if (!user) {
            return { success: false, error: "Admin permission required." };
        }

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

        await db.collection("user").updateOne(query, {
            $set: { isBlocked: !!isBlocked, updatedAt: new Date() },
        });

        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err) {
        console.error("Error changing block status:", err);
        return { success: false, error: err.message };
    }
}

// Admin Action: Change User Role
export async function updateUserRoleAction(userId, role, authToken) {
    try {
        const db = await getDb();
        const { user } = await getVerifiedAdminUser(authToken, db);
        if (!user) {
            return { success: false, error: "Admin permission required." };
        }

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

        await db.collection("user").updateOne(query, {
            $set: { role: role, updatedAt: new Date() },
        });

        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err) {
        console.error("Error changing user role:", err);
        return { success: false, error: err.message };
    }
}
