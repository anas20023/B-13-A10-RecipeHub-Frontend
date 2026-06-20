"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@heroui/react";
import ProfileSummary from "./ProfileSummary";
import {
    LayoutDashboard,
    NotebookText,
    CirclePlus,
    ShoppingBag,
    Heart,
    UserRound,
    ShieldCheck,
    Users,
    Settings,
} from "lucide-react";

const iconMap = {
    LayoutDashboard,
    NotebookText,
    CirclePlus,
    ShoppingBag,
    Heart,
    UserRound,
    ShieldCheck,
    Users,
    Settings,
};

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SidebarShell({
    user,
    navItems = [],
    logoSrc = "/logo.png",
    brandName = "Recipe Hub",
    brandHref = "/",
}) {
    const pathname = usePathname();

    return (
        <aside className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex h-full flex-col p-4 sm:p-5">
                <Link href={brandHref} className="flex items-center gap-3">
                    <Image
                        src={logoSrc}
                        alt={brandName}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-xl object-contain"
                        priority
                    />
                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-slate-900 dark:text-slate-400">
                            {brandName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Dashboard
                        </p>
                    </div>
                </Link>

                <div className="mt-4">
                    <ProfileSummary user={user} compact />
                </div>

                <Separator className="my-5 bg-slate-200/80 dark:bg-slate-800" />

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = iconMap[item.icon] || LayoutDashboard;
                        const active =
                            pathname === item.href ||
                            (item.href !== "/dashboard/user" && item.href !== "/dashboard/admin" && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    active
                                        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-5 text-xs text-slate-500 dark:text-slate-400">
                    {user?.isPremium ? "Premium account" : "Free account"}
                </div>
            </div>
        </aside>
    );
}