import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import { Card } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import { ShoppingBag, Clock, DollarSign, ArrowRight, CalendarDays } from "lucide-react";

export default async function PurchasedRecipesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/login");

    const db = await getDb();
    const purchases = await db
        .collection("payments")
        .find({ userEmail: user.email })
        .sort({ purchasedAt: -1 })
        .toArray();

    const serialized = purchases.map((p) => ({
        ...p,
        _id: p._id.toString(),
        recipeId: p.recipeId?.toString(),
        purchasedAt: p.purchasedAt ? p.purchasedAt.toISOString() : null,
    }));
    console.log(purchases)
    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="My Purchased Recipes"
            description="Recipes you have unlocked and own permanently."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
                        <ShoppingBag className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No purchases yet</h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        Browse premium recipes by top chefs and unlock them permanently.
                    </p>
                    <Link
                        href="/recipes"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5"
                    >
                        Browse Recipes <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                        {serialized.length} recipe{serialized.length !== 1 ? "s" : ""} purchased
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {serialized.map((purchase) => (
                            <Card
                                key={purchase._id}
                                className="group overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {purchase.recipeImage ? (
                                        <Image
                                            src={purchase.recipeImage}
                                            alt={purchase.recipeName}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <ShoppingBag className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-2 right-2">
                                        <span className="rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
                                            Owned
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="line-clamp-1 font-semibold text-slate-900 dark:text-slate-50">
                                        {purchase.recipeName}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                        By {purchase.authorName}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="h-3.5 w-3.5" />
                                            Paid ${purchase.price}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {purchase.purchasedAt
                                                ? new Date(purchase.purchasedAt).toLocaleDateString()
                                                : "—"}
                                        </span>
                                    </div>
                                    {purchase.recipeId && (
                                        <Link
                                            href={`/recipes/${purchase.recipeId}`}
                                            className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                                        >
                                            View Recipe <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </DashboardShell>
    );
}
