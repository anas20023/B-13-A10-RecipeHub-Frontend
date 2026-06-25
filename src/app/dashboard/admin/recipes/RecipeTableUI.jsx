'use client'

import { useState } from "react";
import {
    Table,
    Chip,
    Button,
    Modal,
    Input,
    Label,
    TextField,
    TextArea,
    Spinner,
    Switch,
} from "@heroui/react";
import Image from "next/image";
import { BookOpenText, Pencil, Trash2 } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Check, Xmark } from "@gravity-ui/icons";

function Field({ label, children }) {
    return (
        <TextField fullWidth>
            <Label>{label}</Label>
            {children}
        </TextField>
    );
}

const RecipeTableUI = ({ serialized }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [featuringId, setFeaturingId] = useState(null);
    const [formData, setFormData] = useState({});
    const router = useRouter();

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setFormData({
            recipeName: recipe.recipeName ?? "",
            recipeImage: recipe.recipeImage ?? "",
            preparationTime: recipe.preparationTime ?? "",
            category: recipe.category ?? "",
            difficultyLevel: recipe.difficultyLevel ?? "",
            cuisineType: recipe.cuisineType ?? "",
            price: recipe.price ?? "",
            ingredients: Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join("\n")
                : "",
            instructions: Array.isArray(recipe.instructions)
                ? recipe.instructions.join("\n")
                : "",
            status: recipe.status ?? "",
        });
        setIsOpen(true);
    };

    const patchRecipe = async (id, payload) => {
        const { data } = await authClient.token();
        const bearerToken = data?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();
        if (!response.ok) throw new Error(result?.message || "Failed to update recipe");
        return result;
    };

    const handleUpdate = async () => {
        if (!selectedRecipe?._id) return;
        try {
            setIsUpdating(true);
            const payload = {
                recipeName: formData.recipeName,
                recipeImage: formData.recipeImage,
                preparationTime:
                    formData.preparationTime === "" ? undefined : Number(formData.preparationTime),
                category: formData.category,
                difficultyLevel: formData.difficultyLevel,
                cuisineType: formData.cuisineType,
                price: formData.price === "" ? undefined : Number(formData.price),
                status: formData.status,
                ingredients: formData.ingredients
                    ? formData.ingredients.split("\n").map((s) => s.trim()).filter(Boolean)
                    : undefined,
                instructions: formData.instructions
                    ? formData.instructions.split("\n").map((s) => s.trim()).filter(Boolean)
                    : undefined,
            };

            const result = await patchRecipe(selectedRecipe._id, payload);
            router.refresh();
            toast.success(result?.message || "Recipe updated successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error(error?.message || "Failed to update recipe");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleToggleFeatured = async (recipe) => {
        try {
            setFeaturingId(recipe._id);
            const result = await patchRecipe(recipe._id, { isFeatured: !recipe.isFeatured });
            router.refresh();
            toast.success(result?.message || `Recipe ${!recipe.isFeatured ? "featured" : "unfeatured"} successfully`);
        } catch (error) {
            toast.error(error?.message || "Failed to update featured status");
        } finally {
            setFeaturingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            setDeletingId(id);
            const { data } = await authClient.token();
            const bearerToken = data?.token;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${bearerToken}` },
                }
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result?.message || "Failed to delete recipe");

            router.refresh();
            toast.success(result?.message || "Recipe deleted successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error(error?.message || "Failed to delete recipe");
        } finally {
            setDeletingId(null);
        }
    };

    const set = (key) => (e) =>
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));

    return (
        <>
            <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {serialized.length} recipe{serialized.length !== 1 ? "s" : ""} published
                </p>
            </div>

            {serialized.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40">
                        <BookOpenText className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No recipes yet</h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        Announce within your community to publish recipes
                    </p>
                </div>
            ) : (
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="My Recipes">
                            <Table.Header>
                                <Table.Column isRowHeader>Recipe</Table.Column>
                                <Table.Column>Author Name</Table.Column>
                                <Table.Column>Category</Table.Column>
                                <Table.Column>Prep Time</Table.Column>
                                <Table.Column>Price</Table.Column>
                                <Table.Column>Featured</Table.Column>
                                <Table.Column>Created</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {serialized.map((recipe) => (
                                    <Table.Row key={recipe._id}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
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
                                                <p className="font-medium text-slate-900 dark:text-slate-400">
                                                    {recipe.recipeName}
                                                </p>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            {recipe.authorName}
                                            <p className="text-slate-400 text-xs">{recipe.authorEmail}</p>
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

                                        <Table.Cell>{recipe.preparationTime} min</Table.Cell>

                                        <Table.Cell>
                                            {recipe.price > 0 ? `$${recipe.price}` : "Free"}
                                        </Table.Cell>

                                        {/* ── isFeatured Switch ── */}
                                        <Table.Cell>
                                            {featuringId === recipe._id ? (
                                                <Spinner size="sm" className="text-orange-500" />
                                            ) : (
                                                <Switch
                                                    isSelected={!!recipe.isFeatured}
                                                    onChange={() => handleToggleFeatured(recipe)}
                                                    aria-label="Toggle featured"
                                                    size="lg"
                                                >
                                                    {({ isSelected }) => (
                                                        <Switch.Content>
                                                            <Switch.Control
                                                                className={
                                                                    isSelected
                                                                        ? "bg-orange-500/90"
                                                                        : "bg-slate-300 dark:bg-slate-600"
                                                                }
                                                            >
                                                                <Switch.Thumb>
                                                                    <Switch.Icon>
                                                                        {isSelected ? (
                                                                            <Check className="size-3 text-white opacity-100" />
                                                                        ) : (
                                                                            <Xmark className="size-3 text-slate-500 opacity-70" />
                                                                        )}
                                                                    </Switch.Icon>
                                                                </Switch.Thumb>
                                                            </Switch.Control>
                                                        </Switch.Content>
                                                    )}
                                                </Switch>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {new Date(recipe.createdAt).toLocaleDateString()}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    onClick={() => openModal(recipe)}
                                                    aria-label="Edit recipe"
                                                    title="Edit"
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    aria-label="Delete recipe"
                                                    title="Delete"
                                                    onClick={() => handleDelete(recipe._id)}
                                                    isDisabled={deletingId === recipe._id}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
                                                >
                                                    {deletingId === recipe._id ? (
                                                        <Spinner size="sm" className="text-red-500" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}

            <Modal>
                <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant="blur">
                    <Modal.Container size="lg" scroll="inside">
                        <Modal.Dialog aria-labelledby="edit-recipe-title">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading id="edit-recipe-title">Edit Recipe</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="grid gap-4">
                                    <Field label="Recipe Name">
                                        <Input
                                            fullWidth
                                            placeholder="e.g. Chicken Tikka Masala"
                                            value={formData.recipeName || ""}
                                            onChange={set("recipeName")}
                                        />
                                    </Field>

                                    <Field label="Image URL">
                                        <Input
                                            fullWidth
                                            type="url"
                                            placeholder="https://…"
                                            value={formData.recipeImage || ""}
                                            onChange={set("recipeImage")}
                                        />
                                    </Field>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field label="Preparation Time (min)">
                                            <Input
                                                fullWidth
                                                type="number"
                                                min={0}
                                                placeholder="30"
                                                value={String(formData.preparationTime || "")}
                                                onChange={set("preparationTime")}
                                            />
                                        </Field>
                                        <Field label="Price ($)">
                                            <Input
                                                fullWidth
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                placeholder="0 for free"
                                                value={String(formData.price || "")}
                                                onChange={set("price")}
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field label="Category">
                                            <Input
                                                fullWidth
                                                placeholder="e.g. Dinner"
                                                value={formData.category || ""}
                                                onChange={set("category")}
                                            />
                                        </Field>
                                        <Field label="Difficulty Level">
                                            <Input
                                                fullWidth
                                                placeholder="Easy / Medium / Hard"
                                                value={formData.difficultyLevel || ""}
                                                onChange={set("difficultyLevel")}
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field label="Cuisine Type">
                                            <Input
                                                fullWidth
                                                placeholder="e.g. Indian"
                                                value={formData.cuisineType || ""}
                                                onChange={set("cuisineType")}
                                            />
                                        </Field>
                                        <Field label="Status">
                                            <Input
                                                fullWidth
                                                placeholder="published / draft"
                                                value={formData.status || ""}
                                                onChange={set("status")}
                                            />
                                        </Field>
                                    </div>

                                    <TextField fullWidth>
                                        <Label>Ingredients (one per line)</Label>
                                        <TextArea
                                            rows={4}
                                            placeholder={"1 cup flour\n2 eggs\n…"}
                                            value={formData.ingredients || ""}
                                            onChange={set("ingredients")}
                                        />
                                    </TextField>

                                    <TextField fullWidth>
                                        <Label>Instructions (one per line)</Label>
                                        <TextArea
                                            rows={6}
                                            placeholder={"Preheat oven to 200 °C\nMix dry ingredients\n…"}
                                            value={formData.instructions || ""}
                                            onChange={set("instructions")}
                                        />
                                    </TextField>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    slot="close"
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={handleUpdate}
                                    isDisabled={isUpdating}
                                    className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                                >
                                    {isUpdating && <Spinner size="sm" className="text-white" />}
                                    {isUpdating ? "Saving…" : "Save changes"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
};

export default RecipeTableUI;