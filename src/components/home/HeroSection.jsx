'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { Separator } from '@heroui/react'

export default function HeroSection() {
    return (<section className="relative overflow-hidden">
        {/* Background */} <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]" />

        <div className="mx-auto max-w-7xl px-6 py-10 xl:px-8 lg:py-18">
            <div className="grid items-center gap-14 lg:grid-cols-2">
                {/* Content */}
                <div>
                    <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-700">
                        Over 10,000+ Recipes
                    </div>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
                        Discover, Share &
                        <span className="block bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                            Cook Amazing Recipes
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
                        Join our vibrant community of food lovers.
                        Find inspiration for your next meal,
                        share your secret family recipes,
                        and elevate your culinary skills.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Explore Recipes
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/premium"
                            className="inline-flex items-center justify-center rounded-xl border border-orange-200 bg-white px-8 py-4 font-semibold text-zinc-700 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50"
                        >
                            Become Premium
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex flex-wrap gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900">
                                10K+
                            </h3>
                            <p className="text-sm text-zinc-500">
                                Recipes
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900">
                                25K+
                            </h3>
                            <p className="text-sm text-zinc-500">
                                Members
                            </p>
                        </div>
                        <Separator orientation="vertical" />

                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900">
                                4.9
                            </h3>
                            <p className="text-sm text-zinc-500">
                                Rating

                            </p>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative">
                    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white p-3 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
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
                    <div className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-amber-500 font-bold text-white">
                                    JD
                                </div>

                                <div>
                                    <h4 className="font-semibold text-zinc-900">
                                        Chef&apos;s Special Pasta
                                    </h4>
                                    <p className="text-sm text-zinc-500">
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
                    <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-orange-200/40 blur-3xl" />
                    <div className="absolute -right-8 bottom-16 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
                </div>
            </div>
        </div>
    </section>
    )

}
