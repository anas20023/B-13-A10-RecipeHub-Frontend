import DashboardShell from "@/components/dashboard/DashboardShell";
import { adminNavItems } from "@/components/dashboard/nav-items";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import ReportDetailsUI from "./ReportDetailsUI";

const PAGE_SIZE = 10;
export default async function ReportsManagePage({ searchParams }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    // console.log(reports)
    const user = session?.user;
    const params = await searchParams;
    const page = params.page || 1;
    const limit = 10;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });
    const reportsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/report?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store"
        }
    );

    const reportsData = await reportsRes.json();


    if (!user) {
        redirect("/login");
    }
    return (
        <DashboardShell
            user={user}
            navItems={adminNavItems}
            title="Manage Reports"
            description="Manage your recipe reports, moderate the platform and keep the quality."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            <ReportDetailsUI
                users={reportsData.reports}
                total={reportsData.reports.length}
                page={page}
                pageSize={PAGE_SIZE}
            />
        </DashboardShell>
    );
}