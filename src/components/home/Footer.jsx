import { Button } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaLocationArrow,
    FaPhoneAlt,
} from 'react-icons/fa'
import { SiMinutemailer } from 'react-icons/si'

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
]

const socialLinks = [
    {
        name: 'Facebook',
        href: 'https://facebook.com',
        icon: FaFacebook,
    },
    {
        name: 'Github',
        href: 'https://github.com',
        icon: FaGithub,
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: FaLinkedin,
    },
]

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-orange-100 dark:border-zinc-800">
            {/* Background */}
            <div
                className="
                absolute inset-0 -z-10

                bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.06),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

                dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
                "
            />

            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-12 gap-12">
                    {/* Brand */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <Image
                                src="/RecipeHub Logo.png"
                                alt="RecipeHub"
                                width={50}
                                height={50}
                                className="object-contain"
                            />

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    RecipeHub
                                </h3>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Share • Discover • Cook
                                </p>
                            </div>
                        </Link>

                        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            Discover delicious recipes, share your culinary
                            creations, and connect with food lovers around
                            the world.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                            Quick Links
                        </h4>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                            Contact
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <SiMinutemailer
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    support@recipehub.com
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaPhoneAlt
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    +880 1234 567890
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaLocationArrow
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                        <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                            Follow Us
                        </h4>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon

                                return (
                                    <Button
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:text-orange-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-orange-400"
                                    >
                                        <Icon size={18} className="text-current" />
                                    </Button>
                                )
                            })}
                        </div>

                        {/* <div
                            className="
                            mt-6

                            rounded-2xl

                            border border-orange-100
                            bg-linear-to-br
                            from-orange-50
                            to-amber-50

                            dark:border-zinc-800
                            dark:from-zinc-900
                            dark:to-zinc-950

                            p-4
                            "
                        >
                            <div className="flex items-center gap-2">
                                <ChefHat
                                    size={18}
                                    className="text-orange-500"
                                />

                                <span className="font-semibold text-slate-900 dark:text-slate-50">
                                    Join Our Community
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Share recipes and inspire thousands
                                of food lovers.
                            </p>
                        </div> */}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-slate-200 pt-6 dark:border-zinc-800">
                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                            © {new Date().getFullYear()} RecipeHub.
                            All rights reserved.
                        </p>

                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/privacy-policy"
                                className="text-slate-500 transition-colors hover:text-orange-600 dark:hover:text-orange-400"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="text-slate-500 transition-colors hover:text-orange-600 dark:hover:text-orange-400"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}