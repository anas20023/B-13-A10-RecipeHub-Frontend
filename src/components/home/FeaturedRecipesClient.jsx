'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3, Heart, Star } from 'lucide-react'

export default function FeaturedRecipesClient({ recipes }) {
    return (
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
                <article
                    key={recipe._id}
                    className="
            group
            overflow-hidden
            rounded-3xl

            border border-orange-100
            bg-white

            dark:border-slate-800
            dark:bg-zinc-900/80

            backdrop-blur-sm

            shadow-lg
            shadow-orange-100/50

            dark:shadow-black/30

            transition-all
            duration-500

            hover:-translate-y-2
            hover:shadow-2xl
            hover:shadow-orange-500/10
            "
                >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute left-4 top-4">
                            <span
                                className="
                        rounded-full
                        bg-orange-500
                        px-3 py-1
                        text-xs font-semibold
                        text-white

                        shadow-lg
                        shadow-orange-500/30
                        "
                            >
                                Featured
                            </span>
                        </div>

                        <div
                            className="
                    absolute bottom-4 left-4
                    flex items-center gap-2

                    rounded-full

                    bg-white/90
                    text-slate-700

                    dark:bg-zinc-900/90
                    dark:text-slate-300

                    px-3 py-1
                    backdrop-blur
                    "
                        >
                            <Clock3 size={14} />
                            <span className="text-xs font-medium">
                                {recipe.preparationTime}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span
                                className="
                        rounded-full
                        bg-orange-100
                        text-orange-700

                        dark:bg-orange-500/10
                        dark:text-orange-400

                        px-3 py-1
                        text-xs font-medium
                        "
                            >
                                {recipe.category}
                            </span>

                            <span
                                className="
                        rounded-full
                        bg-amber-100
                        text-amber-700

                        dark:bg-amber-500/10
                        dark:text-amber-400

                        px-3 py-1
                        text-xs font-medium
                        "
                            >
                                {recipe.difficultyLevel}
                            </span>
                        </div>

                        <h3
                            className="
                    line-clamp-2
                    text-xl
                    font-bold

                    text-slate-900
                    dark:text-slate-50

                    transition-colors
                    group-hover:text-orange-600
                    dark:group-hover:text-orange-400
                    "
                        >
                            {recipe.recipeName}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            By {recipe.authorName}
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Star
                                        size={16}
                                        fill="currentColor"
                                    />
                                    <span className="text-sm font-semibold">
                                        4.9
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                    <Heart size={16} />
                                    <span className="text-sm">
                                        {recipe.likesCount}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/recipes/${recipe._id}`}
                                className="
                        inline-flex items-center gap-2

                        font-semibold

                        text-orange-600
                        dark:text-orange-400

                        transition-all

                        hover:gap-3
                        "
                            >
                                View
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}