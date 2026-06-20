import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import { Card } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import { BookOpenText, Clock, DollarSign, Plus, ArrowRight } from "lucide-react";
import MyRecipesActions from "./MyRecipesActions";

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
            {/* Header row */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {serialized.length} recipe{serialized.length !== 1 ? "s" : ""} published
                    </p>
                </div>
                <Link
                    href="/dashboard/user/add-recipe"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4" /> Add Recipe
                </Link>
            </div>

            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40">
                        <BookOpenText className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No recipes yet</h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        You have not published any recipes. Share your culinary creations with the community!
                    </p>
                    <Link
                        href="/dashboard/user/add-recipe"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="h-4 w-4" /> Create Your First Recipe
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {serialized.map((recipe) => (
                        <Card
                            key={recipe._id}
                            className="group overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                        >
                            {/* Image */}
                            <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {recipe.recipeImage ? (
                                    <Image
                                        src={recipe.recipeImage}
                                        alt={recipe.recipeName}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <BookOpenText className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-2 left-2 flex gap-1.5">
                                    <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                        {recipe.category}
                                    </span>
                                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                                        {recipe.difficultyLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="line-clamp-1 font-semibold text-slate-900 dark:text-slate-50">
                                    {recipe.recipeName}
                                </h3>
                                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {recipe.preparationTime} min
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="h-3.5 w-3.5" />
                                        {recipe.price > 0 ? `$${recipe.price}` : "Free"}
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                                    >
                                        View <ArrowRight className="h-3 w-3" />
                                    </Link>
                                    <MyRecipesActions recipeId={recipe._id} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardShell>
    );
}
