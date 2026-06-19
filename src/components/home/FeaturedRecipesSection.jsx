import Link from 'next/link'
import FeaturedRecipesClient from './FeaturedRecipesClient'
import { Button } from '@heroui/react'

async function getFeaturedRecipes() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes?isFeatured=true&limit=6`
        )

        if (!res.ok) {
            throw new Error('Failed to fetch recipes')
        }

        const data = await res.json()
        return data?.data || data?.recipes || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export default async function FeaturedRecipesSection() {
    const recipes = await getFeaturedRecipes()

    return (
        <section className="relative overflow-hidden py-24">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]" />

            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
                        Featured Collection
                    </div>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl">
                        Handpicked
                        <span className="block bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                            Featured Recipes
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600">
                        Discover the most loved recipes selected by our
                        community and culinary experts.
                    </p>
                </div>

                <FeaturedRecipesClient recipes={recipes} />
                <div className="flex justify-center mt-6">
                    <Link href={'/recipes'}>
                        <Button className="w-48 rounded bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5">
                            Browse All Recipes
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}