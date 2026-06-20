import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO);
const db = client.db("RecipeHub");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false,
                defaultValue: "user"
            },
            isBlocked: {
                type: "boolean",
                input: false,
                defaultValue: false
            },
            isPremium: {
                type: "boolean",
                input: false,
                defaultValue: false
            },
            uploaded: {
                type: "number",
                input: false,
                defaultValue: 0
            },
            createdAt: {
                type: "date",
                input: false
            },
            updatedAt: {
                type: "date",
                input: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 128, // Set maximum length
        password: {
            validator: {
                // Enforce custom rule: minimum 6 characters with uppercase, lowercase, number, and special character
                rule: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                message: "Password must be at least 6 characters and include one uppercase letter, one lowercase letter, one number, and one special character.",
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge:  60 // Cache duration in seconds (5 minutes)
        }
    },
    plugins: [
        jwt(),
    ]
});