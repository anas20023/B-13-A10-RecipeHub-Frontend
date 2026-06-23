
import Link from "next/link";
import { AlertTriangle, Home, LayoutDashboard } from "lucide-react";

const ErrorPage = async ({ searchParams }) => {
    const params = await searchParams;
    const { title = "Something Went Wrong", message = "An unexpected error occurred while processing your request.", dashboardRoute = "/dashboard" } = params

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
            <div className="w-full max-w-xl rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-xl shadow-orange-100/40 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/10">
                    <AlertTriangle size={40} />
                </div>

                <h1 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-50">
                    {title}
                </h1>

                <p className="mt-4 text-slate-600 dark:text-slate-400">
                    {message}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href={dashboardRoute}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;