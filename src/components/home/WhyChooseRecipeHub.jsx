import {
    ChefHat,
    Users,
    HeartHandshake,
    Trophy,
} from 'lucide-react'

const features = [
    {
        icon: ChefHat,
        title: 'Share Your Recipes',
        description:
            'Publish your favorite recipes and inspire food lovers around the world.',
    },
    {
        icon: Users,
        title: 'Join The Community',
        description:
            'Connect with passionate home cooks, chefs, and food enthusiasts.',
    },
    {
        icon: HeartHandshake,
        title: 'Save Favorites',
        description:
            'Keep all your beloved recipes organized in one place.',
    },
    {
        icon: Trophy,
        title: 'Get Recognition',
        description:
            'Earn likes and become one of the top recipe creators.',
    },
]

export default function WhyChooseRecipeHub() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <span className="inline-flex rounded-full bg-orange-100 dark:bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                        Why Choose Us
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-slate-50">
                        Everything Food Lovers Need
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                        Built for home cooks, food bloggers and professional chefs.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon

                        return (
                            <div
                                key={feature.title}
                                className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg shadow-orange-100/40 dark:border-zinc-800 dark:bg-zinc-900/80"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                    <Icon size={26} />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-50">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-slate-600 dark:text-slate-400">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}