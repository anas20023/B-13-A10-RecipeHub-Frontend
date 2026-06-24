import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe';
import { auth } from '@/app/lib/auth';
import { randomUUID } from 'crypto';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        // const reqHeaders = await headers();
        const userSession = await auth.api.getSession({
            headers: headersList
        })
        const formData = await request.formData();
        // console.log(formData)
        const productType = formData.get("productType")
        const productPrice = formData.get("productPrice")
        const productTitle = formData.get("productTitle")
        const recipeId = formData.get("recipeId")
        const authorName = formData.get("authorName")
        const user = userSession?.user;
        // console.log(authorName)
        if (!user) {
            const params = new URLSearchParams({
                title: "You must login First",
                message: "Your need to login frist to purchase the pro plan.Go to Login Page",
                dashboardRoute: "/login"
            })
            return NextResponse.redirect(`${origin}/subscription-error?${params.toString()}`, 303)
        }
        if (user.isPremium && productType !== 'payment') {
            const params = new URLSearchParams({
                title: "Already Subscribed",
                message: "Your are already a Pro Subscriber.Explore your dashboard.",
                dashboardRoute: "/dashboard"
            })
            return NextResponse.redirect(`${origin}/subscription-error?${params.toString()}`, 303)
        }

        // console.log(userSession)
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: productType === 'subscription' ? process.env.PREMIUM_PRICE_ID : process.env.PRODUCT_PRICE_ID,
                    quantity: 1,
                },
            ],
            customer_email: userSession?.user.email,
            mode: `${productType}`,
            metadata: {
                userId: userSession?.user.id,
                title: productTitle,
                authorName: authorName,
                amount: productPrice,
                recipeId: recipeId || '',
                transactionId: randomUUID(),
                paymentType: productType,
            },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}