'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowRight } from 'lucide-react'

export default function PopularRecipesClient({ recipes }) {
    return (
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe, index) => (
                <article
                    key={recipe._id}
                    className="
                    group
                    overflow-hidden
                    rounded-3xl

                    border border-orange-100
                    bg-white

                    dark:border-zinc-800
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
                    <div className="relative h-60 overflow-hidden">
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute left-4 top-4">
                            <div
                                className="
                                flex h-9 w-9 items-center justify-center
                                rounded-full

                                bg-white/90
                                text-orange-600

                                backdrop-blur
                                font-bold
                                "
                            >
                                #{index + 1}
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
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
                            <div
                                className="
                                flex items-center gap-2

                                rounded-full

                                bg-orange-50
                                px-4 py-2

                                dark:bg-orange-500/10
                                "
                            >
                                <Heart
                                    size={16}
                                    className="fill-orange-500 text-orange-500"
                                />

                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                    {recipe.likesCount}
                                </span>

                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    likes
                                </span>
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