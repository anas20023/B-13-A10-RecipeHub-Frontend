/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@/context/ThemeContext";
import { Avatar } from "@heroui/react";
import { Crown, Moon, Sun } from "lucide-react";

function getInitials(name = "") {
    return name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function ProfileSummary({
    user,
    compact = false,
    className = "",
}) {
    if (!user) return null;
    const { theme, toggleTheme } = useTheme()
    return (
        <div
            className={` rounded  bg-white shadow-sm dark:border dark:bg-slate-900/80 ${className}`}
        >
            <div className={compact ? "p-4" : "p-5"}>
                <div className="flex items-center gap-3">
                    <Avatar size={compact ? "md" : "lg"} variant="soft">
                        <Avatar.Image src={user.image || ""} alt={user.name || "User"} />
                        <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0 flex flex-col">
                        <div>
                            <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-400">
                                {user.name}
                            </h3>
                            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                                {user.email}
                            </p>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold capitalize text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300">
                                {user.isPremium && (
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 shadow-sm ring-1 ring-amber-400/40">
                                        <Crown className="h-3 w-3 text-white" />
                                    </span>
                                )}
                                <span>{user.role || "user"}</span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="block rounded-full bg-white/50 p-2.5 text-stone-700 transition-all duration-300 hover:rotate-24 hover:border hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4.5 h-4.5 text-amber-500 transition-transform duration-300" />
                                ) : (
                                    <Moon className="w-4.5 h-4.5 text-stone-700 transition-transform duration-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}