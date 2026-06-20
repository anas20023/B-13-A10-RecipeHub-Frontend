"use client";

import { useState, useTransition } from "react";
import { toggleFavoriteAction } from "@/app/lib/actions";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function FavoriteToggle({ recipeId }) {
    const [isPending, startTransition] = useTransition();

    const handleRemove = () => {
        startTransition(async () => {
            const result = await toggleFavoriteAction(recipeId);
            if (result.success) {
                toast.success("Removed from favorites.");
            } else {
                toast.error(result.error || "Failed to update.");
            }
        });
    };

    return (
        <button
            onClick={handleRemove}
            disabled={isPending}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 transition-colors hover:bg-rose-100 disabled:opacity-50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/60"
            title="Remove from favorites"
        >
            <Heart className="h-4 w-4 fill-current" />
        </button>
    );
}
