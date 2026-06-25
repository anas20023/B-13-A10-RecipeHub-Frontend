import { Suspense } from 'react'
import RecipesView from './RecipesView.jsx'
import SectionLoading from '@/components/ui/SectionLoading'

function firstValue(value) {
    if (Array.isArray(value)) {
        return value[0]
    }

    return value ?? ''
}

async function getRecipes(searchParams) {
    const params = new URLSearchParams()

    const page = firstValue(searchParams?.page) || '1'
    const search = firstValue(searchParams?.search).trim()
    const category = firstValue(searchParams?.category).trim()

    params.set('page', page)

    params.set('limit', '9')

    if (search) {
        params.set('recipeName', search)
    }

    if (category) {
        params.set('category', category)
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes?${params}`,
        {
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch recipes')
    }

    const data = await res.json()

    return data
}

async function RecipesPageContent({
    searchParams,
}) {
    const resolvedSearchParams =
        await searchParams

    const result =
        await getRecipes(resolvedSearchParams)

    const recipes =
        result?.data ||
        result?.recipes ||
        []

    const pagination =
        result?.pagination || {
            page: Number(
                firstValue(
                    resolvedSearchParams?.page
                ) || 1
            ),
            total: recipes.length,
            totalPages: 1,
        }

    return <RecipesView
        recipes={recipes}
        pagination={pagination}
        searchParams={resolvedSearchParams}
    />
}

export default function RecipesPage({
    searchParams,
}) {
    return (
        <Suspense
            fallback={
                <SectionLoading
                    label="Loading recipes..."
                    className="min-h-[320px]"
                />
            }
        >
            <RecipesPageContent searchParams={searchParams} />
        </Suspense>
    )
}
