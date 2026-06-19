const steps = [
    {
        number: '01',
        title: 'Create Account',
        description:
            'Sign up and become part of the RecipeHub community.',
    },
    {
        number: '02',
        title: 'Share Recipes',
        description:
            'Upload your favorite recipes with ingredients and instructions.',
    },
    {
        number: '03',
        title: 'Gain Impressions',
        description:
            'Get likes and recognition from food lovers worldwide.',
    },
]

export default function HowItWorks() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <span className="inline-flex rounded-full bg-orange-100 dark:bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                        Simple Process
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-slate-50">
                        How RecipeHub Works
                    </h2>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative rounded-3xl border border-orange-100 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/80"
                        >
                            <span className="text-6xl font-black text-orange-500/15">
                                {step.number}
                            </span>

                            <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-50">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-slate-600 dark:text-slate-400">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}