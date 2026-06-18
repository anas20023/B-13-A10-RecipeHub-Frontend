/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar, Button } from '@heroui/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { Sun, Moon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import NavLink from './NavLink'
import { authClient } from '@/app/lib/auth-client'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user
    const desktopDropdownRef = useRef(null)
    const mobileDropdownRef = useRef(null)

    const [mounted, setMounted] = useState(false)
    const { theme, toggleTheme } = useTheme()

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/recipes', label: 'Browse Recipes' },
        { href: '/dashboard', label: 'Dashboard' },
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [isAvatarOpen, setIsAvatarOpen] = useState(false)
    const [isMobileAvatarOpen, setIsMobileAvatarOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleClickOutside = (event) => {
            if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
                setIsAvatarOpen(false)
            }
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
                setIsMobileAvatarOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push('/login'),
            },
        })
    }

    return (
        <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-orange-100/50 dark:border-zinc-800/80 shadow-sm transition-all duration-300">
            <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight shrink-0 transition-transform duration-200 hover:scale-[1.02]">
                    <Image
                        src="/RecipeHub Logo.png"
                        width={38}
                        height={38}
                        alt="RecipeHub logo"
                        className="object-contain"
                    />
                    <span className="text-orange-600 dark:text-orange-500">Recipe</span>
                    <span className="text-stone-800 dark:text-zinc-100">Hub</span>
                </Link>

                {/* Desktop nav – center */}
                <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
                    <ul className="flex items-center gap-8 text-sm font-medium">
                        {navItems.map((link) => (
                            <li key={link.href}>
                                <NavLink link={link.href}>{link.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop right: theme + auth */}
                <div className="hidden md:flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl border border-stone-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 hover:bg-orange-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-zinc-300 transition-all duration-300 hover:rotate-12 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4.5 h-4.5 text-amber-500 transition-transform duration-300" />
                            ) : (
                                <Moon className="w-4.5 h-4.5 text-stone-700 transition-transform duration-300" />
                            )}
                        </button>
                    )}

                    <div ref={desktopDropdownRef} className="relative">
                        {user ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsAvatarOpen((o) => !o)}
                                    className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
                                    aria-haspopup="menu"
                                    aria-expanded={isAvatarOpen}
                                >
                                    <Avatar className="ring-2 ring-orange-500/20 dark:ring-orange-500/40">
                                        <Avatar.Image loading="eager" alt={user.name} src={user.image} />
                                        <Avatar.Fallback className="bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-bold">
                                            {user.name.toLocaleUpperCase().slice(0, 2)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </button>

                                {isAvatarOpen && (
                                    <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-orange-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xl shadow-orange-500/5 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="mb-3 px-1">
                                            <p className="text-xs text-stone-400 dark:text-zinc-500">Signed in as</p>
                                            <p className="text-sm font-bold truncate text-stone-800 dark:text-zinc-100">{user.name}</p>
                                        </div>
                                        <Button
                                            color="danger"
                                            variant="solid"
                                            size="sm"
                                            onPress={() => { onLogout(); setIsAvatarOpen(false) }}
                                            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl cursor-pointer transition-colors duration-200"
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        radius="xl"
                                        className="font-bold text-stone-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-zinc-900"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register" >
                                    <Button
                                        variant="solid"
                                        radius="xl"
                                        className="font-bold bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/15 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex items-center gap-3 md:hidden">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl border border-stone-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 hover:bg-orange-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-zinc-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-500" />
                            ) : (
                                <Moon className="w-4 h-4 text-stone-700" />
                            )}
                        </button>
                    )}

                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        onPress={() => { setIsOpen((o) => !o); setIsMobileAvatarOpen(false) }}
                        aria-label="Toggle menu"
                        className="text-orange-600 dark:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-zinc-900"
                    >
                        {isOpen ? <FaX className="text-sm" /> : <FaBars />}
                    </Button>
                </div>
            </header>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t border-orange-100/50 dark:border-zinc-850/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
                    isOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
            >
                <div className="px-6 pb-6 pt-4 max-w-7xl mx-auto">
                    <ul className="flex flex-col gap-1.5">
                        {navItems.map((link) => (
                            <li key={link.href}>
                                <NavLink
                                    link={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-2.5 px-3 rounded-xl hover:bg-orange-50/70 dark:hover:bg-zinc-900/70 text-base"
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile auth */}
                    <div ref={mobileDropdownRef} className="mt-4 border-t border-orange-100/40 dark:border-zinc-800/80 pt-4">
                        {user ? (
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsMobileAvatarOpen((o) => !o)}
                                    className="flex items-center gap-3 text-sm font-semibold text-stone-800 dark:text-zinc-100 cursor-pointer"
                                    aria-haspopup="menu"
                                    aria-expanded={isMobileAvatarOpen}
                                >
                                    <Avatar className="ring-2 ring-orange-500/20 dark:ring-orange-500/40">
                                        <Avatar.Image loading="eager" alt={user.name} src={user.image} />
                                        <Avatar.Fallback className="bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-bold w-8 h-8 text-xs">
                                            {user.name.toLocaleUpperCase().slice(0, 2)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <span>{user.name}</span>
                                </button>

                                {isMobileAvatarOpen && (
                                    <div className="rounded-2xl border border-orange-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-lg shadow-orange-500/5">
                                        <Button
                                            color="danger"
                                            variant="solid"
                                            size="sm"
                                            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl cursor-pointer"
                                            onPress={() => { onLogout(); setIsOpen(false); setIsMobileAvatarOpen(false) }}
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                <Link href="/login">
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant="outline"
                                        radius="xl"
                                        className="w-full font-semibold border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-zinc-900"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant="primary"
                                        radius="xl"
                                        className="w-full font-semibold bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}