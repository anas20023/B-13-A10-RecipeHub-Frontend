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

  return <RecipeDetailsClient recipe={recipe} />
}