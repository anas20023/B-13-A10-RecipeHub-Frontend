'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Input, Label } from '@heroui/react'
import { authClient } from '@/app/lib/auth-client'

export default function RegisterForm({ callbackUrl }) {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const redirectTo = callbackUrl || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error: signUpError } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
            callbackURL: "/login",
        })

        setLoading(false)

        if (signUpError) {
            setError(
                signUpError.message ||
                'Registration failed. Please try again.'
            )
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
                    <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <Label htmlFor="register-name">
                        Full Name
                    </Label>
                    <Input
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="rounded border-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="register-email">
                        Email
                    </Label>
                    <Input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="rounded border-2"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="register-email">
                        Photo URL(optional)
                    </Label>
                    <Input
                        id="photo_url"
                        type="text"
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://imagebb.co/..."
                        className="rounded border-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="register-password">
                        Password
                    </Label>
                    <Input
                        id="register-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="rounded border-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 text-sm shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                    {loading
                        ? 'Creating account...'
                        : 'Create Account'}
                </button>

                <div className="relative flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />

                    <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                        or continue with
                    </span>

                    <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2.5 w-full rounded border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold py-2.5 text-sm transition-all duration-200"
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>

                    Continue With Google
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Already have an account?{' '}
                <Link
                    href={`/login${callbackUrl
                            ? `?callbackUrl=${encodeURIComponent(
                                callbackUrl
                            )}`
                            : ''
                        }`}
                    className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </div>
    )
}
