import { Avatar, Card } from "@heroui/react";

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

    return (
        <Card
            className={`border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
        >
            <div className={compact ? "p-4" : "p-5"}>
                <div className="flex items-center gap-3">
                    <Avatar size={compact ? "md" : "lg"} variant="soft">
                        <Avatar.Image src={user.image || ""} alt={user.name || "User"} />
                        <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                            {user.name}
                        </h3>
                        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                        </p>

                        <div className="mt-2 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300">
                            {user.role || "user"}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}