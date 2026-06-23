import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import { Card } from "@heroui/react";
import {
    BookOpenText,
    Heart,
    ShoppingBag,
    TrendingUp,
    ArrowRight,
    Clock,
    Star,
    ChefHat,
    Flame,
    StarCheck,
    Crown,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import Link from "next/link";

function StatCard({ title, value, isPremium = true, icon: Icon, hint, gradient }) {
    const isMyRecipesNonPremium = title === "My Recipes" && !isPremium;
    const recipesLeft = Math.max(0,Number(2-value))
    return (
        <div className="rounded relative overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="absolute inset-0 opacity-5">
                <div className={`absolute -right-4 -top-4 h-24 w-24 rounded ${gradient}`} />
            </div>
            <div className="relative p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                        <h3 className="mt-1.5 text-3xl font-extrabold tracking-tight">{value}</h3>
                        {isMyRecipesNonPremium ? (
                            <div className="mt-2 space-y-1.5">
                                <p className="text-xs font-bold text-red-600 dark:text-red-400">⚠️ You left {recipesLeft} recipes to upload.</p>
                                <form action="/api/checkout_sessions" method="POST">
                                    <button type="submit" className="text-xs cursor-pointer font-medium text-orange-600 hover:underline dark:text-orange-400">
                                        Purchase Subscription →
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
                        )}
                    </div>
                    <div className={`rounded-2xl ${gradient} p-3 text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ text, time, icon: Icon, iconBg }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">{text}</p>
                <p className="mt-0.5 text-xs text-slate-400">{time}</p>
            </div>
        </div>
    );
}

export default async function UserDashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/login");
    // console.log(user)
    const db = await getDb();

    const [myRecipesCount, favoritedCount, likesCount, purchasedCount] = await Promise.all([
        db.collection("recipes").countDocuments({ authorEmail: user.email }),
        db.collection("recipes").countDocuments({ favouritedBy: user.id }),
        db.collection("recipes").aggregate([
            { $match: { authorId: user.id } },
            {
                $project: {
                    likesCount: {
                        $cond: [{ $isArray: "$likesCount" }, { $size: "$likesCount" }, 0],
                    },
                },
            },
            { $group: { _id: null, total: { $sum: "$likesCount" } } },
        ]).toArray().then((result) => result[0]?.total ?? 0),
        db.collection("payments").countDocuments({ userEmail: user.email }),
    ]);

    const recentRecipes = await db
        .collection("recipes")
        .find({ authorEmail: user.email })
        .sort({ createdAt: -1 })
        .limit(3)
        .toArray();

    const recentPurchases = await db
        .collection("payments")
        .find({ userEmail: user.email })
        .sort({ purchasedAt: -1 })
        .limit(2)
        .toArray();

    const activity = [
        ...recentRecipes.map((r) => ({
            text: `Published "${r.recipeName}"`,
            time: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recently",
            icon: ChefHat,
            iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
        })),
        ...recentPurchases.map((p) => ({
            text:  p.paymentType=='subscription'? `Subscribed Pro Plan` :`Purchased "${p.recipeName}"`,
            time: p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "Recently",
            icon: p.paymentType=='subscription'? Crown:ShoppingBag,
            iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
        })),
    ].slice(0, 5);

    const bannerGradient = user.isPremium
        ? "mb-6 rounded-2xl bg-linear-to-r from-orange-500 to-amber-600 p-6 text-white shadow-lg shadow-orange-500/20"
        : "mb-6 rounded-2xl bg-linear-to-r from-slate-300 to-slate-100 p-6 text-slate-900 shadow-md shadow-slate-300/30";

    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="Overview"
            description="Track your recipes, favorites, purchases, and profile from one place."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            {/* Welcome banner */}
            <div className={bannerGradient}>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold">Welcome back, {user.name?.split(" ")[0]}! 👋</h2>
                        <p className="mt-1 text-sm text-slate-100">
                            {user.isPremium
                                ? "You are a premium member. Enjoy unlimited recipes!"
                                : "Upgrade to premium to access exclusive recipes."}
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="rounded-xl bg-white p-3 backdrop-blur-sm">
                            <Flame className="h-8 w-8 text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="My Recipes"
                    value={myRecipesCount}
                    isPremium={user.isPremium}
                    icon={BookOpenText}
                    hint="Recipes you have published"
                    gradient="bg-orange-500"
                />
                <StatCard
                    title="Favorites"
                    value={favoritedCount}
                    icon={StarCheck}
                    hint="Recipes you saved"
                    gradient="bg-rose-500"
                />
                <StatCard
                    title="Impressions"
                    value={likesCount}
                    icon={Heart}
                    hint="Impressions you gain"
                    gradient="bg-red-500"
                />
                <StatCard
                    title="Purchased"
                    value={purchasedCount}
                    icon={ShoppingBag}
                    hint="Premium recipes bought"
                    gradient="bg-blue-500"
                />
            </section>

            {/* Activity + Quick Actions */}
            <section className="mt-6 grid gap-6 xl:grid-cols-3">
                {/* Recent Activity */}
                <Card className="xl:col-span-2 border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-base font-semibold">Recent Activity</h2>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    Your latest actions on RecipeHub.
                                </p>
                            </div>
                            <Link
                                href="/dashboard/user/my-recipes"
                                className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
                            >
                                View all <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                        <div className="mt-4 space-y-2.5">
                            {activity.length > 0 ? (
                                activity.map((item, i) => (
                                    <ActivityItem key={i} {...item} />
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center dark:border-slate-800">
                                    <TrendingUp className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700" />
                                    <p className="mt-2 text-sm text-slate-500">No activity yet. Start by adding a recipe!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="p-5">
                        <h2 className="text-base font-semibold">Quick Actions</h2>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Jump to common tasks.
                        </p>
                        <div className="mt-4 flex flex-col gap-2.5">
                            {[
                                { href: "/dashboard/user/add-recipe", label: "Add New Recipe", icon: BookOpenText, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400" },
                                { href: "/dashboard/user/favorites", label: "View Favorites", icon: Heart, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400" },
                                { href: "/dashboard/user/purchased-recipes", label: "My Purchases", icon: ShoppingBag, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400" },
                                { href: "/dashboard/user/profile", label: "Update Profile", icon: Star, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-sm dark:border-gray-800 dark:bg-slate-900 dark:hover:border-slate-700"
                                >
                                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}>
                                        <item.icon className="h-4 w-4" />
                                    </span>
                                    {item.label}
                                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </Card>
            </section>
        </DashboardShell>
    );
}