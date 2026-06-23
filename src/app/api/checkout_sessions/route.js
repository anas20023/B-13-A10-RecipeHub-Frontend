import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe';
import { auth } from '@/app/lib/auth';

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const userSession = await auth.api.getSession({
            headers: await headers()
        })
        // console.log(userSession?.user.email)
        if (!userSession) {
            return NextResponse.redirect(new URL('/login', origin), 302)
        }
        if (userSession?.user?.isPremium) {
            const errorParams = new URLSearchParams({
                title: "Already a Pro Subscriber",
                message: "You already have an active Pro subscription. No further action is required.",
                dashboardRoute: "/dashboard",
            });

            return NextResponse.redirect(
                new URL(`/subscription-error?${errorParams.toString()}`, origin),
                302
            );
        }
        const transactionId = crypto.randomUUID();
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({

            customer_email: userSession?.user.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1Tl8X8PXwpLkz17LsuQt25rl',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            metadata: {
                title: "Recipe Product",
                transactionId,
                userId: userSession?.user.id,
                amount: 99.99,
                recipeId: '',
                paymentType: 'subscription'
            },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}