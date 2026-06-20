/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator, Button } from "@heroui/react";
import ProfileSummary from "./ProfileSummary";
import {
    Home,
    LayoutDashboard,
    NotebookText,
    CirclePlus,
    ShoppingBag,
    Heart,
    UserRound,
    ShieldCheck,
    Users,
    Settings,
    Menu,
    X,
} from "lucide-react";

const iconMap = {
    Home,
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
    const [isOpen, setIsOpen] = useState(false);

    const SidebarContent = () => (
        <>
            <div className="flex items-center justify-between">
                <Link
                    href={brandHref}
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src={logoSrc}
                        alt={brandName}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-xl object-contain"
                        priority
                    />

                    <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-400">
                            {brandName}
                        </p>

                        <p className="text-xs text-slate-500">
                            Dashboard
                        </p>
                    </div>
                </Link>

                {/* Mobile Close Button */}
                <Button
                    isIconOnly
                    variant="light"
                    className="lg:hidden"
                    onPress={() => setIsOpen(false)}
                >
                    <X size={20} />
                </Button>
            </div>

            <div className="mt-4">
                <ProfileSummary user={user} compact />
            </div>

            <Separator className="my-5 bg-slate-200 dark:bg-slate-800" />

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon =
                        iconMap[item.icon] || Home;
                    if (!user?.isPremium && user?.uploaded >= 2 && item.href === "/dashboard/user/add-recipe") {
                        return null;
                    }

                    const active =
                        pathname === item.href
                    // (item.href !== "/dashboard/user" &&
                    //     item.href !== "/dashboard/admin" &&
                    //     pathname.startsWith(item.href));


                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                                active
                                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900"
                            )}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-5 text-xs text-slate-500 dark:text-slate-400">
                {user?.isPremium
                    ? "Premium account"
                    : "Free account"}
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
                <Link
                    href={brandHref}
                    className="flex items-center gap-2"
                >
                    <Image
                        src={logoSrc}
                        alt={brandName}
                        width={36}
                        height={36}
                        className="rounded-lg"
                    />

                    <span className="font-semibold">
                        {brandName}
                    </span>
                </Link>

                <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setIsOpen(true)}
                >
                    <Menu size={22} />
                </Button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:translate-x-0",
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                )}
            >
                <SidebarContent />
            </aside>
        </>
    );
}