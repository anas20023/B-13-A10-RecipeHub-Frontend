import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import { Card } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import { Heart, Clock, Star, ArrowRight } from "lucide-react";
import FavoriteToggle from "./FavoriteToggle";

export default async function FavoritesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/login");

    const db = await getDb();
    const recipes = await db
        .collection("recipes")
        // favoritedBy is an array of user IDs (strings)
        // match recipes where the current user's id is present in the array
        .find({ favouritedBy: user.id })
        .sort({ updatedAt: -1 })
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
            title="Favorites"
            description="Recipes you have saved and loved."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40">
                        <Heart className="h-8 w-8 text-rose-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No favorites yet</h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        Browse recipes and tap the heart icon to save your favorites here.
                    </p>
                    <Link
                        href="/recipes"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5"
                    >
                        Discover Recipes <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                        {serialized.length} favorite{serialized.length !== 1 ? "s" : ""}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {serialized.map((recipe) => (
                            <Card
                                key={recipe._id}
                                className="group overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {recipe.recipeImage ? (
                                        <Image
                                            src={recipe.recipeImage}
                                            alt={recipe.recipeName}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Heart className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-2 left-2 flex gap-1.5">
                                        <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {recipe.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="line-clamp-1 font-semibold text-slate-900 dark:text-slate-50">
                                        {recipe.recipeName}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                        By {recipe.authorName}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {recipe.preparationTime} min
                                        </span>
                                        <span className="flex items-center gap-1 text-orange-500">
                                            <Star className="h-3.5 w-3.5 fill-current" />
                                            {recipe.likesCount.length || 0} likes
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Link
                                            href={`/recipes/${recipe._id}`}
                                            className="flex flex-1 items-center justify-center gap-1 rounded border border-slate-400 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-900"
                                        >
                                            View <ArrowRight className="h-3 w-3" />
                                        </Link>
                                        {/* <FavoriteToggle recipeId={recipe._id} /> */}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </DashboardShell>
    );
}
