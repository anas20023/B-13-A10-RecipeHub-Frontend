/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@/context/ThemeContext";
import { Avatar, Button } from "@heroui/react";
import { Crown, Moon, Sun, UserCog, UserRound } from "lucide-react";

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
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Avatar size={compact ? "md" : "lg"} variant="soft">
                    <Avatar.Image src={user.image || ""} alt={user.name || "User"} />
                    <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                </Avatar>

                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold leading-tight text-slate-900 dark:text-slate-400">
                        {user.name}
                    </h3>

                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="flex w-full items-center justify-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium capitalize text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300">
                {user.isPremium && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 shadow-sm ring-1 ring-amber-400/40">
                        <Crown className="h-3 w-3 text-white" />
                    </span>
                )}

                <span className="flex flex-row justify-between items-center gap-2">
                   {user.role==="admin" ? <UserCog size={18} />:<UserRound size={18} />} {user.isPremium && "Premium"}  {user.role || "User"}
                </span>
            </div>

            <Button
                onClick={toggleTheme}
                variant="outline"
                className="h-10 w-full rounded-xl text-sm font-medium"
            >
                {theme === "dark" ? (
                    <>
                        <Sun className="h-4 w-4 text-amber-500" />
                        Light Mode
                    </>
                ) : (
                    <>
                        <Moon className="h-4 w-4 text-stone-700" />
                        Dark Mode
                    </>
                )}
            </Button>
        </div>
    );
}