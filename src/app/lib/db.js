import { MongoClient } from "mongodb";

if (!process.env.MONGO) {
    throw new Error("Please add your MONGO URI to the environment variables");
}

const uri = process.env.MONGO;
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the connection
    // across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, avoid using global variables.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDb() {
    const connectedClient = await clientPromise;
    return connectedClient.db("RecipeHub");
}
