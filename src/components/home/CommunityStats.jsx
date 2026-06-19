import {
    Users,
    ChefHat,
    Heart,
    BookOpen,
} from 'lucide-react'

const stats = [
    {
        icon: Users,
        value: '25K+',
        label: 'Community Members',
    },
    {
        icon: ChefHat,
        value: '10K+',
        label: 'Recipes Shared',
    },
    {
        icon: Heart,
        value: '250K+',
        label: 'Recipe Likes',
    },
    {
        icon: BookOpen,
        value: '150+',
        label: 'Food Categories',
    },
]

export default function CommunityStats() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="rounded-[2rem] border border-orange-100 bg-white p-10 shadow-xl shadow-orange-100/40 dark:border-zinc-800 dark:bg-zinc-900/80">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon

                            return (
                                <div
                                    key={stat.label}
                                    className="text-center"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                        <Icon size={28} />
                                    </div>

                                    <h3 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-slate-50">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                                        {stat.label}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}