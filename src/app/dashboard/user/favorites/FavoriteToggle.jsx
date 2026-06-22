"use client";

import { useState, useTransition } from "react";
import { CircleX, Delete, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function FavoriteToggle({ recipeId }) {
    const [isPending, startTransition] = useTransition();
    const router=useRouter()
    const handleRemove = () => {
        startTransition(async () => {
            if (!recipeId) return;
            try {
                const { data } = await authClient.token();
                const bearerToken = data?.token
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/favourite/${recipeId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${bearerToken}`
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result?.message || "Failed to delete recipe");
                }
                router.refresh()
                toast.success(result?.message || "Favourite Recipe Deleted successfully")
            } catch (error) {
                toast.error(error?.message || "Failed to delete recipe");
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
            <CircleX  className="h-4 w-4" />
        </button>
    );
}
