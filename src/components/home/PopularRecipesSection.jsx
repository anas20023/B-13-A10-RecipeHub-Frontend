import Link from 'next/link'
import { Button } from '@heroui/react'
import PopularRecipesClient from './PopularRecipesClient.jsx'

async function getPopularRecipes() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes?sort=likesCount&order=dsc&limit=6`
        )

        if (!res.ok) {
            throw new Error('Failed to fetch recipes')
        }

        const data = await res.json()

        return data?.data || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export default async function PopularRecipesSection() {
    const recipes = await getPopularRecipes()

    return (
        <section className="relative overflow-hidden py-24">
            {/* Background */}
            <div className="
                absolute inset-0 -z-10

                bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fafafa_50%,#f8fafc_100%)]

                dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
                "
            />

            <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute right-0 bottom-12 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <div
                        className="
                        inline-flex items-center rounded-full

                        bg-orange-100
                        text-orange-700

                        dark:bg-orange-500/10
                        dark:text-orange-400
                        dark:ring-1
                        dark:ring-orange-500/20

                        px-4 py-1.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        "
                    >
                        Community Favorites
                    </div>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                        Most Loved
                        <span className="block bg-linear-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
                            Popular Recipes
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Explore the recipes our community can&apos;t stop
                        cooking, sharing, and loving.
                    </p>
                </div>

                <PopularRecipesClient recipes={recipes} />

                <div className="mt-12 flex justify-center">
                    <Link href="/recipes">
                        <Button
                            className="
                            min-w-56

                            rounded-xl

                            bg-linear-to-r
                            from-orange-500
                            to-amber-600

                            dark:from-orange-500
                            dark:to-amber-400

                            px-8
                            py-6

                            font-semibold
                            text-white

                            shadow-lg
                            shadow-orange-500/20

                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:shadow-xl
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