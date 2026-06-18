'use client'

import { ChefHat } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaGithub, FaLinkedin, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa'
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
        <footer className="relative mt-20 border-t border-orange-100 bg-white">
            {/* Top Gradient Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500 to-transparent" />

            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
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
                                <h3 className="text-xl font-bold text-zinc-900">
                                    RecipeHub
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    Share • Discover • Cook
                                </p>
                            </div>
                        </Link>

                        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                            Discover delicious recipes,
                            share your culinary creations,
                            and connect with food lovers
                            around the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-zinc-900">
                            Quick Links
                        </h4>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-zinc-600 transition-colors hover:text-orange-600"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-zinc-900">
                            Contact
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <SiMinutemailer 
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-zinc-600">
                                    support@recipehub.com
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaPhoneAlt 
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-zinc-600">
                                    +880 1234 567890
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaLocationArrow 
                                    size={18}
                                    className="mt-0.5 text-orange-500"
                                />
                                <span className="text-sm text-zinc-600">
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-zinc-900">
                            Follow Us
                        </h4>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon

                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="mt-6 rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-amber-50 p-4">
                            <div className="flex items-center gap-2">
                                <ChefHat
                                    size={18}
                                    className="text-orange-600"
                                />
                                <span className="font-semibold text-zinc-900">
                                    Join Our Community
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-zinc-600">
                                Share recipes and inspire
                                thousands of food lovers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-zinc-200 pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
                        <p className="text-sm text-zinc-500">
                            © {new Date().getFullYear()} RecipeHub.
                            All rights reserved.
                        </p>

                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/privacy-policy"
                                className="text-zinc-500 hover:text-orange-600"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="text-zinc-500 hover:text-orange-600"
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