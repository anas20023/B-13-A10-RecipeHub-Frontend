'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/app/lib/auth-client'

export default function LoginForm({ callbackUrl }) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const redirectTo = callbackUrl || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error: signInError } = await authClient.signIn.email({
            email,
            password,
        })

        setLoading(false)

        if (signInError) {
            setError(signInError.message || 'Invalid email or password.')
            return
        }

        router.replace(redirectTo)
    }

    const handleGoogleSignIn = async () => {
        setError('')
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: redirectTo,
        })
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-email" className="text-sm font-medium text-stone-700 dark:text-zinc-300">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-password" className="text-sm font-medium text-stone-700 dark:text-zinc-300">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 text-sm shadow-md shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>

                <div className="relative flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-800" />
                    <span className="text-xs text-stone-400 dark:text-zinc-500 shrink-0">or continue with</span>
                    <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-800" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2.5 w-full rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-zinc-200 font-semibold py-2.5 text-sm transition-all duration-200 cursor-pointer"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500 dark:text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link
                    href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                    className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>
    )
}
