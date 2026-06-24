"use client";

import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { adminNavItems } from "@/components/dashboard/nav-items";
import { authClient } from "@/app/lib/auth-client";

export default function UserManagePage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;


    return (
        <DashboardShell
            user={user}
            navItems={adminNavItems}
            title="Manage Recipes"
            description="Manage your recipes, moderate the platform"
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >

        </DashboardShell>
    );
}