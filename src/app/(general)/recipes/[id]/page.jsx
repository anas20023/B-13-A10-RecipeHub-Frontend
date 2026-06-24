import { notFound } from 'next/navigation'
import RecipeDetailsClient from './RecipeDetailsClient'

async function getRecipe(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!baseUrl) return null

    const res = await fetch(`${baseUrl}/api/recipes/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data?.recipe || data?.data || data
  } catch {
    return null
  }
}

export default async function RecipeDetails({ params }) {
  const { id } = await params
  const recipe = await getRecipe(id)

  if (!recipe) notFound()

  return <>
    <div
      className="
        fixed inset-0 -z-10 min-h-screen
        bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fffaf5_50%,#fff7ed_100%)]

        dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_45%,#18181b_100%)]
        "
    />
    <RecipeDetailsClient recipe={recipe} />
  </>
}