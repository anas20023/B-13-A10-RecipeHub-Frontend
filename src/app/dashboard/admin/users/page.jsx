import { auth } from "@/app/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { adminNavItems } from "@/components/dashboard/nav-items";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserTableUI from "./UserTableUI";

const PAGE_SIZE = 10;

export default async function UserManagePage({ searchParams }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        redirect("/login");
    }
    const params = await searchParams;
    const page = Number(params?.page || 1);
    const offset = (page - 1) * PAGE_SIZE;

    const result = await auth.api.listUsers({
        query: {
            limit: PAGE_SIZE,
            offset,
            sortBy: "createdAt",
            sortDirection: "desc",
        },
        headers: await headers(),
    });

    return (
        <DashboardShell
            user={user}
            navItems={adminNavItems}
            title="Manage Users"
            description="Manage your users, moderate the platform"
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            <UserTableUI
                users={result.users}
                total={result.total}
                page={page}
                pageSize={PAGE_SIZE}
            />
        </DashboardShell>
    );
}