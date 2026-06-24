import { Button } from "@heroui/react";
import { Check, Crown } from "lucide-react";

export default function PricingSection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 xl:px-8">
                <div className="text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                        Pricing Plans
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-slate-50">
                        Choose Your Recipe Journey
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                        Start for free or unlock unlimited recipe sharing and
                        premium creator benefits.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">

                    {/* FREE PLAN */}
                    <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg shadow-orange-100/40 transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            Free Plan
                        </h3>

                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Perfect for casual food lovers getting started.
                        </p>

                        <div className="mt-8">
                            <span className="text-5xl font-extrabold text-slate-900 dark:text-slate-50">
                                $0
                            </span>
                        </div>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Upload up to 2 recipes",
                                "Browse all public recipes",
                                "Save favorite recipes",
                                "Community access",
                                "Basic profile customization",
                            ].map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                                >
                                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                        <Check size={12} />
                                    </div>

                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <form
                            action="/register"
                            method="GET"
                            className="mt-10"
                        >
                            <input
                                type="hidden"
                                name="callbackUrl"
                                value="/dashboard"
                            />

                            <button
                                type="submit"
                                className="flex h-12 w-full items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 font-semibold text-orange-700 transition-all duration-300 hover:bg-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                            >
                                Continue Free
                            </button>
                        </form>
                    </div>

                    {/* PRO PLAN */}
                    <div className="relative rounded-3xl border border-orange-300 bg-linear-to-b from-orange-50 to-white p-8 shadow-lg shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1 dark:border-orange-500/30 dark:from-orange-500/5 dark:to-slate-900">

                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                                <Crown size={16} />
                                Most Popular
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                Pro Yearly
                            </h3>

                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                For serious creators who want unlimited sharing.
                            </p>

                            <div className="mt-8 flex items-end gap-1">
                                <span className="text-5xl font-extrabold text-slate-900 dark:text-slate-50">
                                    $99.99
                                </span>

                                <span className="pb-2 text-slate-500 dark:text-slate-400">
                                    /year
                                </span>
                            </div>

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Unlimited recipe uploads",
                                    "Premium creator badge",
                                    "Priority recipe visibility",
                                    "Advanced profile customization",
                                    "Unlimited favorites collection",
                                    "Early access to new features",
                                    "Premium community support",
                                ].map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                                    >
                                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                            <Check size={12} />
                                        </div>

                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>


                            <form action="/api/checkout_sessions" method="POST" className="mt-8">
                                <input
                                    type="hidden"
                                    name="productType"
                                    value="subscription"
                                />
                                <input
                                    type="hidden"
                                    name="productPrice"
                                    value="99.99"
                                />
                                <input
                                    type="hidden"
                                    name="productTitle"
                                    value="Pro Subscription"
                                />
                                <Button className={'w-full bg-orange-500 p-6'} type="submit">
                                    Go Premium
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}