import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import RecipeTableUI from "./RecipeTableUI";

export default async function MyRecipesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/login");

    const db = await getDb();
    const recipes = await db
        .collection("recipes")
        .find({ authorEmail: user.email })
        .sort({ createdAt: -1 })
        .toArray();

    const serialized = recipes.map((r) => ({
        ...r,
        _id: r._id.toString(),
        createdAt: r.createdAt ? r.createdAt.toISOString() : null,
        updatedAt: r.updatedAt ? r.updatedAt.toISOString() : null,
    }));

    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="My Recipes"
            description="Manage all the recipes you have published."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            <RecipeTableUI serialized={serialized} />
        </DashboardShell>
    );
}
