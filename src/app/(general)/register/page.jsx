import RegisterForm from '@/components/auth/RegisterForm'

export const metadata = {
    title: 'Create Account – RecipeHub',
    description: 'Join RecipeHub to share your recipes and discover culinary inspiration from the community.',
}

export default async function RegisterPage({ searchParams }) {
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
                    <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-500 tracking-tight">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        Join the RecipeHub community today
                    </p>
                </div>

                <RegisterForm callbackUrl={safeCallbackUrl} />
            </div>
        </main>
    )
}
