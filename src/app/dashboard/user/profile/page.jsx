import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import { UserRound, Crown, BookOpenText, Heart, ShoppingBag, StarCheck } from "lucide-react";
import Image from "next/image";
import ProfileEditForm from "./ProfileEditForm";

export default async function UserProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/login");

    const db = await getDb();
    const [myRecipesCount, favouritedBy, likesCount, purchasedCount] = await Promise.all([
        db.collection("recipes").countDocuments({ authorEmail: user.email }),
        db.collection("recipes").countDocuments({ favouritedBy: user.id }),
        db.collection("recipes").countDocuments({ likesCount: user.id }),
        db.collection("payments").countDocuments({ userEmail: user.email }),
    ]);


    const serializedUser = {
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        role: user.role || "user",
        isPremium: user.isPremium || false,
    };

    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="Profile"
            description="Manage your personal information and account settings."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Profile overview card */}
                <div className="overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    {/* Top gradient banner */}
                    <div className="h-24 bg-linear-to-r from-orange-500 to-amber-600" />
                    <div className="relative px-6 pb-6 pt-0">
                        {/* Avatar */}
                        <div className="relative -mt-12 flex items-end justify-between">
                            <div className="relative">
                                {user.image ? (
                                    <Image
                                        height={500}
                                        width={500}
                                        src={user.image}
                                        alt={user.name}
                                        className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-md dark:border-slate-900"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-orange-100 shadow-md dark:border-slate-900 dark:bg-orange-950/40">
                                        <UserRound className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                                    </div>
                                )}
                                {serializedUser.isPremium && (
                                    <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 shadow-md">
                                        <Crown className="h-3.5 w-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                            <span className={`mb-1 rounded-full px-3 py-1 text-xs font-semibold ${serializedUser.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400" : "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"}`}>
                                {serializedUser.role}
                            </span>
                        </div>

                        {/* Name / email */}
                        <div className="mt-3">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                {user.name}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                            {serializedUser.isPremium && (
                                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                                    <Crown className="h-3 w-3" /> Premium Member
                                </span>
                            )}
                        </div>

                        {/* Stats row */}
                        <div className="mt-4 grid grid-cols-4 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                            {[
                                { label: "Recipes", value: myRecipesCount, icon: BookOpenText, color: "text-orange-500" },
                                { label: "Favorites", value: likesCount, icon: StarCheck, color: "text-rose-500" },
                                { label: "Impressions", value: favouritedBy, icon: Heart, color: "text-rose-500" },
                                { label: "Purchased", value: purchasedCount, icon: ShoppingBag, color: "text-blue-500" },
                            ].map(({ label, value, icon: Icon, color }) => (
                                <div key={label} className="flex flex-col items-center gap-1 rounded bg-slate-50 py-3 dark:bg-slate-900">
                                    <Icon className={`h-5 w-5 ${color}`} />
                                    <span className="text-lg font-bold">{value}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Edit form card */}
                <ProfileEditForm
                    key={`${serializedUser.email}-${serializedUser.name}-${serializedUser.image}`}
                    user={serializedUser}
                />
            </div>
        </DashboardShell>
    );
}
