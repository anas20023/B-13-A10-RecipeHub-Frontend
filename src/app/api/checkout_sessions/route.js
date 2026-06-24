import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";
import { auth } from "@/app/lib/auth";
import { getDb } from "@/app/lib/db";
import { ObjectId } from "mongodb";

function redirectWithError(origin, title, message, dashboardRoute) {
    const params = new URLSearchParams({
        title,
        message,
        dashboardRoute,
    });

    return NextResponse.redirect(
        new URL(`/subscription-error?${params.toString()}`, origin),
        302
    );
}

export async function POST(req) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const userSession = await auth.api.getSession({
            headers: headersList,
        });

        if (!userSession) {
            return NextResponse.redirect(
                new URL("/login", origin),
                302
            );
        }

        const formData = await req.formData();

        const productType = formData.get("productType");
        const productId = formData.get("productId");

        if (!productType || !productId) {
            return NextResponse.json(
                {
                    error: "Missing product information",
                },
                {
                    status: 400,
                }
            );
        }

        const db = await getDb();

        // =========================
        // Recipe Purchase
        // =========================
        if (productType === "recipe") {

            const recipe = await db.collection("recipes").findOne({
                _id: new ObjectId(productId),
            });

            if (!recipe) {
                return redirectWithError(
                    origin,
                    "Recipe Not Found",
                    "The requested recipe could not be found.",
                    "/recipes"
                );
            }

            // Prevent author from purchasing own recipe
            if (recipe.authorId === userSession.user.id) {
                return redirectWithError(
                    origin,
                    "Cannot Purchase Own Recipe",
                    "You are the author of this recipe.",
                    "/dashboard/my-recipes"
                );
            }

            // Check existing purchase
            const existingPurchase = await db
                .collection("recipePurchases")
                .findOne({
                    recipeId: recipe._id.toString(),
                    buyerId: userSession.user.id,
                    paymentStatus: "paid",
                });

            if (existingPurchase) {
                return redirectWithError(
                    origin,
                    "Recipe Already Purchased",
                    "You have already purchased this recipe.",
                    "/dashboard/my-recipes"
                );
            }

            const transactionId = crypto.randomUUID();

            const session = await stripe.checkout.sessions.create({
                customer_email: userSession.user.email,

                mode: "payment",

                line_items: [
                    {
                        price_data: {
                            currency: "usd",

                            product_data: {
                                name: recipe.recipeName,
                                images: recipe.recipeImage
                                    ? [recipe.recipeImage]
                                    : [],
                                description: `${recipe.category} • ${recipe.difficultyLevel}`,
                            },

                            unit_amount:
                                Math.round(
                                    Number(recipe.price) * 100
                                ),
                        },
                        quantity: 1,
                    },
                ],

                metadata: {
                    transactionId,
                    paymentType: "recipe",
                    recipeId: recipe._id.toString(),
                    recipeName: recipe.recipeName,
                    buyerId: userSession.user.id,
                    authorId: recipe.authorId,
                },

                success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                // cancel_url: `${origin}/recipes/${recipe._id}`,
            });

            return NextResponse.redirect(session.url, 303);
        }

        // =========================
        // Subscription Purchase
        // =========================
        if (productType === "subscription") {
            if (userSession.user.isPremium) {
                return redirectWithError(
                    origin,
                    "Already a Pro Subscriber",
                    "You already have an active Pro subscription. No further action is required.",
                    "/dashboard"
                );
            }

            const transactionId = crypto.randomUUID();

            const session = await stripe.checkout.sessions.create({
                customer_email: userSession.user.email,

                line_items: [
                    {
                        price: process.env.STRIPE_PREMIUM_PRICE_ID,
                        quantity: 1,
                    },
                ],

                mode: "subscription",

                metadata: {
                    transactionId,
                    paymentType: "subscription",
                    userId: userSession.user.id,
                },

                success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                // cancel_url: `${origin}/pricing`,
            });

            return NextResponse.redirect(session.url, 303);
        }

        return NextResponse.json(
            {
                error: "Invalid product type",
            },
            {
                status: 400,
            }
        );
    } catch (error) {
        console.error("Checkout Error:", error);

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: error.statusCode || 500,
            }
        );
    }
}
