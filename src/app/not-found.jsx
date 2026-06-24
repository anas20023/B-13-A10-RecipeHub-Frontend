import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/10">
                    <SearchX size={48} />
                </div>

                <h1 className="mt-6 text-6xl font-black text-slate-900 dark:text-slate-50">
                    404
                </h1>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Page Not Found
                </h2>

                <p className="mt-4 text-slate-600 dark:text-slate-400">
                    The page you&apos;re looking for doesn&apos;t exist or may have been
                    moved.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                    <Home size={18} />
                    Back Home
                </Link>
            </div>
        </div>
    );
}