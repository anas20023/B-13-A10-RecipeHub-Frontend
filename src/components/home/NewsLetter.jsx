import { Mail, ArrowRight } from 'lucide-react'

export default function NewsletterCTA() {
    return (
        <section className="relative overflow-hidden py-24">
            {/* Background */}
            <div
                className="
                absolute inset-0 -z-10

                bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

                dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
                "
            />

            {/* Decorative Blobs */}
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div
                    className="
                    relative overflow-hidden

                    rounded-[2rem]

                    border border-orange-100
                    bg-white

                    dark:border-zinc-800
                    dark:bg-zinc-900/80

                    p-8 md:p-12

                    shadow-xl
                    shadow-orange-100/40

                    dark:shadow-black/30
                    backdrop-blur-sm
                    "
                >
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        {/* Left */}
                        <div>
                            <div
                                className="
                                inline-flex items-center gap-2

                                rounded-full

                                bg-orange-100
                                px-4 py-2

                                text-sm font-semibold
                                text-orange-700

                                dark:bg-orange-500/10
                                dark:text-orange-400
                                "
                            >
                                <Mail size={16} />
                                Weekly Food Inspiration
                            </div>

                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                                Never Miss A
                                <span className="block bg-linear-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
                                    Delicious Recipe
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">
                                Get handpicked recipes, cooking tips,
                                seasonal dishes, and community favorites
                                delivered straight to your inbox.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-4 text-sm">
                                <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-3 py-1 text-slate-600 dark:text-slate-400">
                                    ✓ Weekly Recipes
                                </span>

                                <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-3 py-1 text-slate-600 dark:text-slate-400">
                                    ✓ Cooking Tips
                                </span>

                                <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-3 py-1 text-slate-600 dark:text-slate-400">
                                    ✓ Community Picks
                                </span>
                            </div>
                        </div>

                        {/* Right */}
                        <div>
                            <div
                                className="
                                rounded-3xl

                                border border-orange-100
                                bg-orange-50/50

                                dark:border-zinc-800
                                dark:bg-zinc-950/60

                                p-6
                                "
                            >
                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="
                                        w-full

                                        rounded-xl

                                        border border-slate-200
                                        bg-white

                                        dark:border-zinc-700
                                        dark:bg-zinc-900

                                        px-4 py-3

                                        text-slate-900
                                        dark:text-slate-100

                                        outline-none

                                        focus:border-orange-500
                                        focus:ring-2
                                        focus:ring-orange-500/20
                                        "
                                    />

                                    <button
                                        type="submit"
                                        className="
                                        flex w-full items-center justify-center gap-2

                                        rounded-xl

                                        bg-linear-to-r
                                        from-orange-500
                                        to-amber-600

                                        px-6 py-3

                                        font-semibold
                                        text-white

                                        shadow-lg
                                        shadow-orange-500/20

                                        transition-all
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:shadow-xl
                                        "
                                    >
                                        Subscribe Now
                                        <ArrowRight size={18} />
                                    </button>
                                </form>

                                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}