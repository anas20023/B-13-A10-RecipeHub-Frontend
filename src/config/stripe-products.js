// config/stripe-products.js

export const STRIPE_PRODUCTS = {
    subscription: {
        mode: "subscription",
        priceId: "price_1Tl8X8PXwpLkz17LsuQt25rl",
        amount: 99.99,
    },

    recipe: {
        mode: "payment",
        priceId: "price_1Tlgy1PXwpLkz17LjO2w2Q0v",
        amount: 4.99,
    }
};