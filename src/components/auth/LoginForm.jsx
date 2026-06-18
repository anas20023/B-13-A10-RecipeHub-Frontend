'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/app/lib/auth-client'
import { Input, Button } from '@heroui/react'
// using inline colored Google SVG

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
                    <Input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        fullWidth
                        className="rounded border-2"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-password" className="text-sm font-medium text-stone-700 dark:text-zinc-300">
                        Password
                    </label>
                    <Input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        fullWidth
                        className="rounded border-2"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 text-sm shadow-md shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                    {loading ? 'Signing in…' : 'Sign In'}
                </Button>

                <div className="relative flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-800" />
                    <span className="text-xs text-stone-400 dark:text-zinc-500 shrink-0">or continue with</span>
                    <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-800" />
                </div>

                <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2.5 w-full rounded border-2 border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-100 font-semibold py-2.5 text-sm transition-all duration-200"
                >
                    <svg className="w-4 h-4" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37-4.6-54.8H272v103.8h146.9c-6.3 34.2-25.4 63.2-54.3 82.6v68.6h87.7c51.4-47.3 81.2-117.3 81.2-200.2z"/>
                        <path fill="#34A853" d="M272 544.3c73.6 0 135.4-24.4 180.6-66.2l-87.7-68.6c-24.4 16.4-55.6 26-92.9 26-71 0-131.2-47.9-152.7-112.2H29.6v70.4C74.6 486.6 167.2 544.3 272 544.3z"/>
                        <path fill="#FBBC05" d="M119.3 322.3c-10.8-32.5-10.8-67.9 0-100.4V151.5H29.6c-38.7 75.6-38.7 165.8 0 241.4l89.7-70.6z"/>
                        <path fill="#EA4335" d="M272 107.7c39.9 0 75.9 13.7 104.2 40.7l78.1-78.1C403.2 24.6 335.6 0 272 0 167.2 0 74.6 57.7 29.6 151.5l89.7 70.4C140.8 155.6 201 107.7 272 107.7z"/>
                    </svg>
                    <span className="ml-1">Continue With Google</span>
                </Button>
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
