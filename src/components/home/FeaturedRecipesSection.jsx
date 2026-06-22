import Link from 'next/link'
import FeaturedRecipesClient from './FeaturedRecipesClient'
import { Button } from '@heroui/react'

async function getFeaturedRecipes() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes?isFeatured=true&limit=6`
        )
        // console.log(res)
        if (!res.ok) {
            throw new Error('Failed to fetch recipes')
        }

        const data = await res.json()
        // console.log(data)
        return data?.data || data?.recipes || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export default async function FeaturedRecipesSection() {
    const recipes = await getFeaturedRecipes()

    return (
        <section className="relative overflow-hidden py-24 transition-colors duration-300">
            {/* Background */}
            <div
                className="
        absolute inset-0 -z-10

        bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

        dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
        "
            />

            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <div
                        className="
                inline-flex items-center rounded-full
                bg-orange-100
                px-4 py-1.5
                text-xs font-semibold uppercase tracking-wider
                text-orange-700

                dark:bg-orange-500/10
                dark:text-orange-400
                dark:ring-1
                dark:ring-orange-500/20
                "
                    >
                        Featured Collection
                    </div>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                        Handpicked
                        <span className="block bg-linear-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
                            Featured Recipes
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Discover the most loved recipes selected by our
                        community and culinary experts.
                    </p>
                </div>

                <FeaturedRecipesClient recipes={recipes} />

                <div className="mt-10 flex justify-center">
                    <Link href="/recipes">
                        <Button
                            className="
                    min-w-52

                    bg-linear-to-r
                    from-orange-500
                    to-amber-600

                    dark:from-orange-500
                    dark:to-amber-400

                    text-white
                    font-semibold

                    shadow-lg
                    shadow-orange-500/20

                    dark:shadow-orange-500/15

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-xl

                    rounded-xl
                    px-8
                    py-6
                    "
                        >
                            Browse All Recipes
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}