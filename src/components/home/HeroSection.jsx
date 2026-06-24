'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { Button, Separator } from '@heroui/react'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div
                className="
                absolute inset-0 -z-10
                bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

                dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
                "
            />

            <div className="mx-auto max-w-7xl px-6 py-10 lg:py-18 xl:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Content */}
                    <div>
                        <div
                            className="
                            inline-flex items-center rounded-full
                            bg-orange-100 px-4 py-1.5
                            text-xs font-semibold uppercase tracking-wide
                            text-orange-700

                            dark:bg-orange-500/10
                            dark:text-orange-400
                            dark:ring-1
                            dark:ring-orange-500/20
                            "
                        >
                            Over 10,000+ Recipes
                        </div>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-800 dark:text-slate-50 md:text-5xl lg:text-6xl">
                            Discover, Share &
                            <span className="block bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-500 dark:to-amber-400">
                                Cook Amazing Recipes
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                            Join our vibrant community of food lovers.
                            Find inspiration for your next meal,
                            share your secret family recipes,
                            and elevate your culinary skills.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/recipes"
                                className="
                                inline-flex items-center justify-center gap-2
                                rounded-xl
                                bg-linear-to-r from-orange-600 to-amber-500
                                px-8 py-4
                                font-semibold text-white
                                shadow-lg shadow-orange-500/20
                                transition-all duration-300
                                hover:-translate-y-1 hover:shadow-xl
                                "
                            >
                                Explore Recipes
                                <ArrowRight size={18} />
                            </Link>

                            <form action="/api/checkout_sessions" method="POST">
                                <input
                                    type="hidden"
                                    name="productType"
                                    value="subscription"
                                />

                                <input
                                    type="hidden"
                                    name="productId"
                                    value="premium-plan"
                                />

                                <button 
                                    className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-slate-800 dark:text-slate-400 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 shadow-lg shadow-slate-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 dark:hover:border-zinc-700"
                                    type="submit">
                                    Go Premium
                                </button>
                            </form>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex flex-wrap items-center gap-8">
                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    10K+
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                    Recipes
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="h-10 bg-zinc-200 dark:bg-zinc-800"
                            />

                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    25K+
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                    Members
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="h-10 bg-zinc-200 dark:bg-zinc-800"
                            />

                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    4.9
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                    Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div
                            className="
                            overflow-hidden rounded-3xl
                            border border-white/60
                            bg-white
                            p-3

                            dark:border-zinc-800
                            dark:bg-zinc-900/80

                            shadow-[0_30px_60px_rgba(0,0,0,0.12)]
                            dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                            "
                        >
                            <div className="relative aspect-square overflow-hidden rounded-2xl">
                                <Image
                                    src="/hero-food.jpg"
                                    alt="Delicious Pasta"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Recipe Card */}
                        <div
                            className="
                            absolute bottom-6 left-1/2
                            w-[90%] -translate-x-1/2

                            rounded-2xl
                            border border-white/80
                            bg-white/95

                            dark:border-zinc-800
                            dark:bg-zinc-900/90

                            p-4 shadow-xl backdrop-blur
                            "
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-amber-500 font-bold text-white">
                                        JD
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                            Chef&apos;s Special Pasta
                                        </h4>

                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            by Jamie Doe
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 font-semibold text-orange-500">
                                    <Star
                                        size={16}
                                        fill="currentColor"
                                    />
                                    4.9
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/15" />

                        <div className="absolute -right-8 bottom-16 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/15" />
                    </div>
                </div>
            </div>
        </section>
    )
}

