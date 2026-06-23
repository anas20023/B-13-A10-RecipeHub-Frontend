"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-500/10">
                    <AlertTriangle size={48} />
                </div>

                <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Something Went Wrong
                </h1>

                <p className="mt-4 text-slate-600 dark:text-slate-400">
                    {error?.message ||
                        "An unexpected error occurred while processing your request."}
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                    <RefreshCcw size={18} />
                    Try Again
                </button>
            </div>
        </div>
    );
}