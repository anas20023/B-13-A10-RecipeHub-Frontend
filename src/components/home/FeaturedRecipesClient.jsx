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
                    className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/60"
                >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="absolute left-4 top-4">
                            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                                Featured
                            </span>
                        </div>

                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 backdrop-blur">
                            <Clock3 size={14} />
                            <span className="text-xs font-medium">
                                {recipe.preparationTime}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                {recipe.category}
                            </span>

                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                {recipe.difficultyLevel}
                            </span>
                        </div>

                        <h3 className="line-clamp-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-orange-600">
                            {recipe.recipeName}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-500">
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

                                <div className="flex items-center gap-1 text-zinc-500">
                                    <Heart size={16} />
                                    <span className="text-sm">
                                        {recipe.likesCount}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/recipes/${recipe._id}`}
                                className="inline-flex items-center gap-2 font-semibold text-orange-600 transition-all hover:gap-3"
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