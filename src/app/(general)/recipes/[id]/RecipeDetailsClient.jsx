'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Button,
    Chip,
    Modal,
    Radio,
    RadioGroup,
} from '@heroui/react'
import {
    ArrowLeft,
    Heart,
    Flag,
    ShoppingCart,
    Star,
    Clock3,
    Sparkles,
} from 'lucide-react'
import { IoMdPricetag } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { authClient } from '@/app/lib/auth-client'

function formatDaysAgo(dateValue) {
    if (!dateValue) return 'Unknown'
    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return 'Unknown'

    const diffMs = Date.now() - date.getTime()
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day ago'
    return `${diffDays} days ago`
}
// const { data } = await authClient.token();
export default function RecipeDetailsClient({ recipe }) {
    console.log(recipe)
    const [reportReason, setReportReason] = useState('Inaccurate recipe')
    const { data: session } = authClient.useSession()
    // console.log(session)
    const ingredients = recipe.ingredients || []
    const instructions = recipe.instructions || []
    const router = useRouter()
    const updatedText = useMemo(
        () => formatDaysAgo(recipe.updatedAt),
        [recipe.updatedAt]
    )

    const handleLike = async () => {
        if (!session?.user?.id) {
            toast.error("Please log in to love recipes");
            return;
        }
        const { data } = await authClient.token();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/like/${recipe._id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${data?.token}`
                    },
                }
            );
            // console.log(response)
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || "Failed to Like the Recipe ");
            }
            router.refresh()
            toast.success(result?.message || "Recipe Loved !")

        } catch (error) {
            toast.error(error.message || "Failed to Like the Favourite !")
        }
    }

    const handleFavorite = async () => {
        if (!session?.user?.id) {
            toast.error("Please log in to add favorite recipes");
            return;
        }

        const { data } = await authClient.token();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/favourite/${recipe._id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${data?.token}`
                    },
                }
            );
            // console.log(response)
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || "Failed to Recipe added to Favourite successfully ");
            }
            router.refresh()
            toast.success(result?.message || "Recipe added to Favourite successfully !")

        } catch (error) {
            toast.error(error.message || "Failed to Add to Favourite !")
        }
    }

    const isFavorited = recipe.favouritedBy?.includes(session?.user?.id)
    const isLiked = recipe.likesCount?.includes(session?.user?.id)

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

            {/* ── Top nav row ── */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <Link href="/recipes">
                    <Button
                        variant="flat"
                        className="rounded-lg border border-zinc-200 bg-zinc-100 text-slate-700 shadow-none
                                   hover:bg-zinc-200
                                   dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800"
                    >
                        <ArrowLeft size={16} />  Back
                    </Button>
                </Link>

                {recipe.isFeatured && (
                    <Chip
                        variant="flat"
                        className="rounded-lg bg-amber-100 text-amber-700
                                   dark:bg-amber-500/10 dark:text-amber-400"
                    >
                        <Sparkles size={14} /> Featured
                    </Chip>
                )}
            </div>

            {/* ── Main card ── */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm
                            dark:border-zinc-800 dark:bg-zinc-950">
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* ── Hero image ── */}
                    <div className="relative min-h-72 sm:min-h-96 md:min-h-full">
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            fill
                            priority
                            className="object-cover"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Category / cuisine badges */}
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            <span className="rounded bg-orange-600 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                {recipe.category}
                            </span>
                            <span className="rounded bg-orange-500 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                {recipe.cuisineType}
                            </span>
                        </div>

                        {/* Prep time badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg
                                        bg-white/90 px-3 py-2 text-slate-700 backdrop-blur-sm
                                        dark:bg-zinc-900/90 dark:text-slate-200">
                            <Clock3 size={14} />
                            <span className="text-xs font-medium">{recipe.preparationTime} min</span>
                        </div>
                    </div>

                    {/* ── Detail panel ── */}
                    <div className="flex flex-col gap-6 p-5 sm:p-7 lg:p-9">

                        {/* Meta badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded bg-orange-600 px-3 py-1 text-xs font-medium text-white
                                            dark:bg-zinc-800 dark:text-slate-300">
                                {recipe.difficultyLevel}
                            </span>
                            <span className="rounded bg-orange-500 px-3 py-1 text-xs font-medium text-white
                                            dark:bg-zinc-800 dark:text-slate-300">
                                {updatedText}
                            </span>
                        </div>

                        {/* Title & author */}
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900
                                           dark:text-slate-50 sm:text-3xl xl:text-4xl">
                                {recipe.recipeName}
                            </h1>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                By {recipe.authorName}
                            </p>
                        </div>

                        {/* ── Ingredients & Instructions ── */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">

                            {/* Ingredients */}
                            <section className="rounded border border-slate-100 bg-zinc-50 p-4 shadow-sm
                                                dark:border-slate-800 dark:bg-zinc-900">
                                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                    Ingredients
                                </h2>
                                <div className="my-3 h-px bg-zinc-200 dark:bg-zinc-700" />

                                <ul className="space-y-2">
                                    {ingredients.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 rounded-lg bg-white px-3 py-2
                                                       text-sm text-slate-700
                                                       dark:bg-zinc-800 dark:text-slate-300"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
                                                             rounded bg-zinc-200 text-xs font-semibold text-slate-600
                                                             dark:bg-zinc-700 dark:text-slate-400">
                                                {index + 1}
                                            </span>
                                            <span className="leading-5">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Instructions */}
                            <section className="rounded border border-zinc-200 bg-zinc-50 p-4 shadow-sm
                                                dark:border-slate-800 dark:bg-zinc-900">
                                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                    Instructions
                                </h2>
                                <div className="my-3 h-px bg-zinc-200 dark:bg-zinc-700" />

                                <ol className="space-y-3">
                                    {instructions.map((step, index) => (
                                        <li
                                            key={index}
                                            className="rounded-lg border border-zinc-200 bg-white p-3
                                                       dark:border-zinc-700 dark:bg-zinc-800"
                                        >
                                            <div className="mb-1.5 flex items-center gap-2">
                                                <span className="flex h-6 w-6 items-center justify-center rounded
                                                                 bg-orange-100 text-xs font-bold text-orange-600
                                                                 dark:bg-orange-500/15 dark:text-orange-400">
                                                    {index + 1}
                                                </span>
                                                <span className="text-xs font-semibold uppercase tracking-wide
                                                                 text-slate-500 dark:text-slate-400">
                                                    Step {index + 1}
                                                </span>
                                            </div>
                                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                {step}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </div>

                        {/* ── Action buttons ── */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onPress={handleLike}
                                isDisabled={isLiked}
                                className={`rounded-lg px-5 shadow-none transition-colors ${isLiked
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                                <span className="ml-1.5">{recipe.likesCount.length}</span>
                            </Button>

                            <Button
                                onPress={handleFavorite}
                                isDisabled={isFavorited}
                                className={`rounded-lg px-5 shadow-none transition-colors ${isFavorited
                                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                                    : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                <Star size={16} fill={isFavorited ? 'currentColor' : 'none'} />
                                <span className="ml-1.5">Favorite</span>
                            </Button>

                            <form action="/api/checkout_sessions" method="POST">
                                <input
                                    type="hidden"
                                    name="productType"
                                    value="recipe"
                                />

                                <input
                                    type="hidden"
                                    name="productId"
                                    value={recipe._id}
                                />

                            <Button
                                className="rounded bg-slate-900 px-5 text-white shadow-none
                                           hover:bg-slate-800
                                           dark:bg-zinc-100 dark:text-slate-950 dark:hover:bg-zinc-200"
                            >
                                <div className="flex items-center font-bold gap-1 text-slate-100 dark:text-slate-800">
                                    <IoMdPricetag size={16} />
                                    <span className="text-sm">
                                        {recipe.price} USD
                                    </span>
                                </div>
                            </Button>

                            <Modal>
                                <Button
                                    variant="flat"
                                    className="rounded-lg bg-zinc-100 px-5 text-slate-700 shadow-none
                                               hover:bg-zinc-200
                                               dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700"
                                >
                                    <Flag size={16} />
                                    <span className="ml-1.5">Report</span>
                                </Button>

                                <Modal.Backdrop>
                                    <Modal.Container placement="center">
                                        <Modal.Dialog className="w-[calc(100vw-2rem)] max-w-md rounded-xl border
                                                                  border-zinc-200 bg-white
                                                                  dark:border-zinc-800 dark:bg-zinc-950">
                                            <Modal.CloseTrigger />

                                            <Modal.Header className="border-b border-zinc-200 dark:border-zinc-800">
                                                <Modal.Icon className="bg-zinc-100 text-slate-700
                                                                       dark:bg-zinc-800 dark:text-slate-200">
                                                    <Flag className="size-5" />
                                                </Modal.Icon>
                                                <Modal.Heading className="text-slate-900 dark:text-slate-50">
                                                    Report recipe
                                                </Modal.Heading>
                                            </Modal.Header>

                                            <Modal.Body className="space-y-4 text-slate-600 dark:text-slate-400">
                                                <p className="text-sm">
                                                    Choose the reason that best describes the issue with this recipe.
                                                </p>

                                                <RadioGroup
                                                    value={reportReason}
                                                    onValueChange={setReportReason}
                                                    className="gap-2.5"
                                                >
                                                    <Radio value="Inaccurate recipe">Inaccurate recipe</Radio>
                                                    <Radio value="Broken or unsafe steps">Broken or unsafe steps</Radio>
                                                    <Radio value="Wrong ingredients">Wrong ingredients</Radio>
                                                    <Radio value="Spam or duplicate">Spam or duplicate</Radio>
                                                </RadioGroup>
                                            </Modal.Body>

                                            <Modal.Footer className="border-t border-zinc-200 dark:border-zinc-800">
                                                <Button
                                                    slot="close"
                                                    variant="flat"
                                                    className="rounded-lg bg-zinc-100 text-slate-700 shadow-none
                                                               hover:bg-zinc-200
                                                               dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700"
                                                >
                                                    Cancel
                                                </Button>

                                                <Button
                                                    slot="close"
                                                    className="rounded-lg bg-rose-500 text-white shadow-none hover:bg-rose-600"
                                                    onPress={() => {
                                                        console.log('Report reason:', reportReason)
                                                    }}
                                                >
                                                    Send Report
                                                </Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}