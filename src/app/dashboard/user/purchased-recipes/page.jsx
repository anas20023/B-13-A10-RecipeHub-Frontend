import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/app/lib/db";
import { Card, Chip, Table } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import {
    ShoppingBag,
    Crown,
    DollarSign,
    ArrowRight,
    CalendarDays,
} from "lucide-react";

export default async function PurchasedRecipesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) redirect("/login");

    const db = await getDb();

    const purchases = await db
        .collection("payments")
        .find({
            userEmail: user.email,
        })
        .sort({ createdAt: -1 })
        .toArray();

    const serialized = purchases.map((p) => ({
        ...p,
        _id: p._id.toString(),
        recipeId: p.recipeId?.toString(),
        purchasedAt: p.purchasedAt || p.paidAt
            ? (p.purchasedAt || p.paidAt).toISOString()
            : null,
        paymentType: p.paymentType || "product",
        price: p.amount ?? p.price ?? 0,
        isSubscription:
            p.paymentType === "subscription" || !p.recipeId,
    }));

    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="My Purchases"
            description="Recipes and subscriptions you have purchased."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
                        <ShoppingBag className="h-8 w-8 text-blue-500" />
                    </div>

                    <h3 className="text-lg font-semibold">
                        No purchases yet
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        Purchase premium recipes or subscribe to unlock
                        exclusive content.
                    </p>

                    <Link
                        href="/recipes"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5"
                    >
                        Browse Recipes
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (

                <>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {serialized.length} purchase
                            {serialized.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content className="min-w-225">
                                <Table.Header>
                                    <Table.Column isRowHeader>TYPE</Table.Column>
                                    <Table.Column>TITLE</Table.Column>
                                    <Table.Column>AMOUNT</Table.Column>
                                    <Table.Column>DATE</Table.Column>
                                    <Table.Column>STATUS</Table.Column>
                                    <Table.Column>ACTION</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {serialized.map((purchase) => (
                                        <Table.Row key={purchase._id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    {purchase.isSubscription ? (
                                                        <>
                                                            <Crown className="h-4 w-4 text-amber-500" />
                                                            <span>Subscription</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingBag className="h-4 w-4 text-blue-500" />
                                                            <span>Recipe</span>
                                                        </>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-slate-400">
                                                        {purchase.isSubscription
                                                            ? "Premium Subscription"
                                                            : purchase.recipeName || "Product"}
                                                    </p>

                                                    {!purchase.isSubscription && (
                                                        <p className="text-xs text-slate-500">
                                                            {purchase.authorName || "Email"}
                                                        </p>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                ${Number(
                                                    purchase.price || 0
                                                ).toFixed(2)}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {purchase.purchasedAt
                                                    ? new Date(
                                                        purchase.purchasedAt
                                                    ).toLocaleDateString()
                                                    : "—"}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip color="warning" className="bg-orange-500 text-white">
                                                    {purchase.isSubscription
                                                        ? "Active"
                                                        : "Owned"}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {purchase.isSubscription ? (
                                                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                                        <Crown className="h-4 w-4" />
                                                        Premium Access
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={`/recipes/${purchase.recipeId}`}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                    >
                                                        View
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                )}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </>

            )}
        </DashboardShell>
    );
}

