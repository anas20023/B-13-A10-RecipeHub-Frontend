import SidebarShell from "./SidebarShell";

export default function DashboardShell({
    user,
    navItems,
    title = "Dashboard",
    description = "",
    logoSrc,
    brandName,
    children,
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_1fr]">
                <SidebarShell
                    user={user}
                    navItems={navItems}
                    logoSrc={logoSrc}
                    brandName={brandName}
                />

                <main className="min-w-0 p-4 sm:p-6 lg:p-8">
                    <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                {title}
                            </h1>
                            {description ? (
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {description}
                                </p>
                            ) : null}
                        </div>

                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            Signed in as{" "}
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                {user?.name}
                            </span>
                        </div>
                    </header>

                    {children}
                </main>
            </div>
        </div>
    );
}