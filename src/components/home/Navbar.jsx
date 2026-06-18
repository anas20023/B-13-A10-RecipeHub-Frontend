'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Moon } from "lucide-react";
import { Button } from "@heroui/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/", active: true },
        { label: "Browse Recipes", href: "#browse", active: false },
        { label: "Dashboard", href: "#dashboard", active: false },
    ];

    return (
        <header className="border border-[#f3d8c8] bg-[linear-gradient(180deg,#fffaf7_0%,#fff7f2_100%)] px-4 sm:px-6 lg:px-8">
            <nav className="mx-auto flex h-17.5 w-full max-w-7xl items-center justify-between rounded ">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/RecipeHub%20Logo.png" alt="RecipeHub logo" width={36} height={36} />
                    <span className="text-[22px] font-semibold tracking-tight text-[#c45f10]">
                        RecipeHub
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-10 lg:flex">
                    <div className="flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`relative text-[16px] transition-colors duration-200 ${item.active
                                    ? "font-medium text-[#d46d14] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#d46d14]"
                                    : "text-[#4f4a46] hover:text-[#d46d14]"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="hidden items-center gap-4 lg:flex">
                    <Button variant="ghost">
                        <Moon className="h-5 w-5" />
                    </Button>

                    <Link
                        href="#login"
                        className="text-[16px] font-medium text-[#5c514a] transition hover:text-[#d46d14]"
                    >
                        Login
                    </Link>

                    <Link
                        href="#register"
                        className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#b65a0a] px-5 text-[16px] font-medium text-white shadow-sm transition hover:bg-[#a84f05]"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2f2f2f] transition hover:bg-black/5 lg:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`mx-auto mt-2 w-full overflow-hidden rounded-xl border border-[#f3d8c8] bg-[linear-gradient(180deg,#fffaf7_0%,#fff7f2_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 lg:hidden ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col gap-2 px-4 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`rounded-lg px-3 py-2 text-[15px] transition ${item.active
                                ? "bg-[#fff1e6] font-medium text-[#d46d14]"
                                : "text-[#4f4a46] hover:bg-black/5 hover:text-[#d46d14]"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-2 flex items-center gap-3 border-t border-[#f3d8c8] pt-4">
                        <Button variant="ghost">
                            <Moon className="h-5 w-5" />
                        </Button>
                        <Link
                            href="#login"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-lg border border-[#e9c7b1] px-4 py-2 text-center text-[15px] font-medium text-[#5c514a] transition hover:bg-white"
                        >
                            Login
                        </Link>

                        <Link
                            href="#register"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-lg bg-[#b65a0a] px-4 py-2 text-center text-[15px] font-medium text-white transition hover:bg-[#a84f05]"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;