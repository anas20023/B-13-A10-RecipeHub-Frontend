import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
    title: 'Sign In – RecipeHub',
    description: 'Sign in to your RecipeHub account to share, save and discover recipes.',
}

export default async function LoginPage({ searchParams }) {
    const { callbackUrl } = await searchParams
    // Validate: only accept relative paths to prevent open-redirect attacks
    const safeCallbackUrl =
        typeof callbackUrl === 'string' && callbackUrl.startsWith('/')
            ? callbackUrl
            : null

    return (
        <main className="flex flex-1 items-center justify-center px-4 py-16">
            <div className="w-full max-w-md rounded-2xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-orange-500/5 p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-extrabold text-stone-900 dark:text-zinc-50 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="mt-1.5 text-sm text-stone-500 dark:text-zinc-400">
                        Sign in to continue to RecipeHub
                    </p>
                </div>

                <LoginForm callbackUrl={safeCallbackUrl} />
            </div>
        </main>
    )
}
