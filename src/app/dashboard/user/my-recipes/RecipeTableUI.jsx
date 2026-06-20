'use client'
import { Table, Chip, Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { BookOpenText, Plus, Pencil, Trash2 } from "lucide-react";
const RecipeTableUI = ({ serialized }) => {
    return (
        <>
            {/* Header row */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {serialized.length} recipe{serialized.length !== 1 ? "s" : ""} published
                    </p>
                </div>
                <Link
                    href="/dashboard/user/add-recipe"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4" /> Add Recipe
                </Link>
            </div>

            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40">
                        <BookOpenText className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No recipes yet</h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        You have not published any recipes. Share your culinary creations with the community!
                    </p>
                    <Link
                        href="/dashboard/user/add-recipe"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="h-4 w-4" /> Create Your First Recipe
                    </Link>
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-800/50">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content
                                aria-label="My Recipes"
                                className="min-w-250"
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader>Recipe</Table.Column>
                                    <Table.Column>Category</Table.Column>
                                    <Table.Column>Difficulty</Table.Column>
                                    <Table.Column>Prep Time</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                    <Table.Column>Created</Table.Column>
                                    <Table.Column>Actions</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {serialized.map((recipe) => (
                                        <Table.Row key={recipe._id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                                        {recipe.recipeImage ? (
                                                            <Image
                                                                src={recipe.recipeImage}
                                                                alt={recipe.recipeName}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center">
                                                                <BookOpenText className="h-5 w-5 text-slate-400" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-slate-900 dark:text-slate-400">
                                                            {recipe.recipeName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    className="bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                                                >
                                                    {recipe.category}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip size="sm" variant="flat">
                                                    {recipe.difficultyLevel}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {recipe.preparationTime} min
                                            </Table.Cell>

                                            <Table.Cell>
                                                {recipe.price > 0 ? `$${recipe.price}` : "Free"}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {new Date(recipe.createdAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/dashboard/user/edit-recipe/${recipe._id}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                                        aria-label="Edit recipe"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="danger"
                                                        aria-label="Delete recipe"
                                                        title="Delete"
                                                        className="rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </div>
            )}
        </>
    )
}

export default RecipeTableUI
