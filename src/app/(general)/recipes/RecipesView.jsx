/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input, Label, ListBox, Pagination, Select } from '@heroui/react'
import { ArrowRight, Clock3, Heart, Search, Star } from 'lucide-react'
import { IoMdPricetag } from 'react-icons/io'

const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Main Course',
    'Snacks',
    'Drinks'
]

export default function RecipesClient({ recipes = [], pagination = {} }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentCategory = searchParams.get('category') || 'All'
    const currentSearch = searchParams.get('search') || ''

    const [searchValue, setSearchValue] = useState(currentSearch)

    useEffect(() => {
        // Keep local input in sync with URL state
        setSearchValue(currentSearch)
    }, [currentSearch])

    const buildHref = (updates = {}, { resetPage = false } = {}) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '' || value === 'All') {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })

        if (resetPage) params.set('page', '1')

        const query = params.toString()
        return query ? `${pathname}?${query}` : pathname
    }

    const updateQuery = (updates = {}, options = {}) => {
        router.push(buildHref(updates, options))
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        updateQuery({ search: searchValue.trim() }, { resetPage: true })
    }

    const handleCategoryChange = (value) => {
        const nextCategory = Array.isArray(value) ? value[0] : value
        updateQuery({ category: nextCategory || 'All' }, { resetPage: true })
    }

    const changePage = (page) => {
        updateQuery({ page: String(page) })
    }

    const totalPages = Math.max(Number(pagination.totalPages) || 1, 1)
    const currentPage = Math.min(Math.max(Number(pagination.page) || 1, 1), totalPages)

    function PaginationControlled({ page, totalPages, onChange, totalItems = 0, itemsPerPage = 10 }) {
        const [internalPage, setInternalPage] = useState(page)

        // keep internal in sync
        useEffect(() => setInternalPage(page), [page])

        const getPageNumbers = () => {
            const pages = []

            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                if (internalPage > 3) pages.push('ellipsis')
                const start = Math.max(2, internalPage - 1)
                const end = Math.min(totalPages - 1, internalPage + 1)
                for (let i = start; i <= end; i++) pages.push(i)
                if (internalPage < totalPages - 2) pages.push('ellipsis')
                pages.push(totalPages)
            }

            return pages
        }

        const startItem = (internalPage - 1) * itemsPerPage + 1
        const endItem = Math.min(internalPage * itemsPerPage, totalItems)

        const setPage = (p) => {
            setInternalPage(p)
            onChange && onChange(p)
        }

        return (
            <Pagination>
                <Pagination.Summary>
                    Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous isDisabled={internalPage === 1} onPress={() => setPage(internalPage - 1)}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Pagination.Item>

                    {getPageNumbers().map((p, i) =>
                        p === 'ellipsis' ? (
                            <Pagination.Item key={`ellipsis-${i}`}>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        ) : (
                            <Pagination.Item key={p}>
                                <Pagination.Link isActive={p === internalPage} onPress={() => setPage(p)}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ),
                    )}

                    <Pagination.Item>
                        <Pagination.Next isDisabled={internalPage === totalPages} onPress={() => setPage(internalPage + 1)}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        )
    }

    return (
        <>
            <div
                className="
        fixed inset-0 -z-10 min-h-screen
        bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

        dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
        "
            />
            <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Filters */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
                    <form onSubmit={handleSearchSubmit} className="grid gap-4 lg:grid-cols-[1fr_260px_auto]">
                        <Input
                            fullWidth
                            variant="secondary"
                            name="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search recipes..."
                            className="w-full rounded bg-white shadow dark:border-zinc-800 dark:bg-zinc-900"
                        />

                        <Select
                            fullWidth
                            variant="secondary"
                            placeholder="All categories"
                            value={currentCategory === 'All' ? null : currentCategory}
                            onChange={handleCategoryChange}
                            className="w-full"
                        >
                            <Label className="sr-only">Category</Label>

                            <Select.Trigger className="rounded bg-white shadow dark:border-zinc-800 dark:bg-zinc-900">
                                <Select.Value className="text-slate-900 dark:text-slate-100" />
                                <Select.Indicator className="text-slate-500 dark:text-slate-400" />
                            </Select.Trigger>

                            <Select.Popover className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                                <ListBox>
                                    {categories.map((category) => (
                                        <ListBox.Item
                                            key={category}
                                            id={category}
                                            textValue={category}
                                            className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:bg-zinc-100 dark:text-slate-200 dark:hover:bg-zinc-900"
                                        >
                                            {category}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Button
                            type="submit"
                            className="inline-flex w-full items-center justify-center gap-2 rounded bg-orange-500 px-5 font-semibold text-white shadow-none transition-colors hover:bg-slate-800 dark:bg-orange-600 dark:text-slate-950 dark:hover:bg-zinc-200 lg:w-auto lg:min-w-32"
                        >
                            <Search size={18} />
                            Search
                        </Button>
                    </form>
                </div>

                {/* Results header */}
                <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Recipes</h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {Number(pagination.total) || 0} results found
                    </span>
                </div>

                {/* Grid */}
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {recipes.map((recipe) => (
                        <article
                            key={recipe._id}
                            className="
                                    group
                                    overflow-hidden
                                    rounded
                        
                                    border border-orange-100
                                    bg-white
                        
                                    dark:border-slate-800
                                    dark:bg-zinc-900/80
                        
                                    backdrop-blur-sm
                        
                                    shadow-lg
                                    shadow-orange-100/50
                        
                                    dark:shadow-black/30
                        
                                    transition-all
                                    duration-500
                        
                                    hover:-translate-y-2
                                    hover:shadow-2xl
                                    hover:shadow-orange-500/10
                                    "
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={recipe.recipeImage}
                                    alt={recipe.recipeName}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                                {recipe.isFeatured &&
                                    <div className="absolute left-4 top-4">
                                        <span
                                            className="
                                                rounded-full
                                                bg-orange-500
                                                px-3 py-1
                                                text-xs font-semibold
                                                text-white
                        
                                                shadow-lg
                                                shadow-orange-500/30
                                                "
                                        >
                                            Featured
                                        </span>
                                    </div>

                                }
                                <div
                                    className="
                                            absolute bottom-4 left-4
                                            flex items-center gap-2
                        
                                            rounded-full
                        
                                            bg-green-300
                                            text-slate-900
                        
                                            dark:bg-green-900/90
                                            dark:text-slate-100
                        
                                            px-3 py-1
                                            backdrop-blur
                                            "
                                >
                                    <Clock3 size={14} />
                                    <span className="text-xs font-medium">
                                        {recipe.preparationTime} mins
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span
                                        className="
                                                rounded-full
                                                bg-orange-100
                                                text-orange-700
                        
                                                dark:bg-orange-500/10
                                                dark:text-orange-400
                        
                                                px-3 py-1
                                                text-xs font-medium
                                                "
                                    >
                                        {recipe.category}
                                    </span>

                                    <span
                                        className="
                                                rounded-full
                                                bg-amber-100
                                                text-amber-700
                        
                                                dark:bg-amber-500/10
                                                dark:text-amber-400
                        
                                                px-3 py-1
                                                text-xs font-medium
                                                "
                                    >
                                        {recipe.difficultyLevel}
                                    </span>
                                </div>

                                <h3
                                    className="
                                            line-clamp-2
                                            text-xl
                                            font-bold
                        
                                            text-slate-900
                                            dark:text-slate-50
                        
                                            transition-colors
                                            group-hover:text-orange-600
                                            dark:group-hover:text-orange-400
                                            "
                                >
                                    {recipe.recipeName}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    By {recipe.authorName}
                                </p>

                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <Star
                                                size={16}
                                                fill="currentColor"
                                            />
                                            <span className="text-sm font-semibold">
                                                4.9
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                            <Heart size={16} />
                                            <span className="text-sm">
                                                {recipe.likesCount.length}
                                            </span>
                                        </div>
                                        <div className="flex items-center font-bold gap-1 text-slate-500 dark:text-slate-400">
                                            <IoMdPricetag size={16} />
                                            <span className="text-sm">
                                                {recipe.price} USD
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        className="
                                                inline-flex items-center gap-2
                        
                                                font-semibold
                        
                                                text-orange-600
                                                dark:text-orange-400
                        
                                                transition-all
                        
                                                hover:gap-3
                                                "
                                    >
                                        View
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {recipes.length === 0 && (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            No Recipes Found
                        </h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Try changing your search or category.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center">
                        <PaginationControlled
                            page={currentPage}
                            totalPages={totalPages}
                            onChange={changePage}
                            totalItems={Number(pagination.total) || 0}
                            itemsPerPage={Number(pagination.limit) || 10}
                        />
                    </div>
                )}
            </div>
        </>
    )
}