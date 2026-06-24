"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input, Label } from "@heroui/react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { userNavItems } from "@/components/dashboard/nav-items";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import {
    Plus,
    Trash2,
    ChefHat,
    ImageIcon,
    Clock,
    Tag,
    DollarSign,
    Utensils,
} from "lucide-react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Main Course", "Snacks", "Drinks"];
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Expert"];
const CUISINE_TYPES = ["International", "Italian", "Mexican", "Indian", "Chinese", "Japanese", "American", "French", "Thai", "Mediterranean"];

export default function AddRecipePage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!user?.isPremium && user?.uploaded >= 2) {
        router.push("/dashboard/user");
    }

    const [isPending, startTransition] = useTransition();

    const [form, setForm] = useState({
        recipeName: "",
        recipeImage: "",
        preparationTime: "",
        category: "Main Course",
        difficultyLevel: "Medium",
        cuisineType: "International",
    });
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [imageFile, setImageFile] = useState(null);

    const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

    const addIngredient = () => setIngredients((p) => [...p, ""]);
    const removeIngredient = (i) => setIngredients((p) => p.filter((_, idx) => idx !== i));
    const updateIngredient = (i, val) =>
        setIngredients((p) => p.map((item, idx) => (idx === i ? val : item)));

    const addInstruction = () => setInstructions((p) => [...p, ""]);
    const removeInstruction = (i) => setInstructions((p) => p.filter((_, idx) => idx !== i));
    const updateInstruction = (i, val) =>
        setInstructions((p) => p.map((item, idx) => (idx === i ? val : item)));

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 1024 * 1024) {
            toast.error("Image must be less than 1 MB");
            e.target.value = "";
            return;
        }
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in.");
            return;
        }

        const filteredIngredients = ingredients.filter((i) => i.trim());
        const filteredInstructions = instructions.filter((s) => s.trim());

        if (!filteredIngredients.length || !filteredInstructions.length) {
            toast.error("Please add at least one ingredient and one instruction step.");
            return;
        }

        startTransition(async () => {
            try {
                // Step 1: Upload image if one was selected
                let imageUrl = "";
                if (imageFile) {
                    const formData = new FormData();
                    formData.append("image", imageFile);

                    const imgRes = await fetch(
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB}`,
                        { method: "POST", body: formData }
                    );
                    const imgResult = await imgRes.json();

                    if (!imgResult.success) {
                        toast.error("Failed to upload image. Please try again.");
                        return;
                    }

                    imageUrl = imgResult.data.url;
                }

                // Step 2: Submit recipe with image URL
                const { data } = await authClient.token();

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data?.token}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        recipeImage: imageUrl,
                        ingredients: filteredIngredients,
                        instructions: filteredInstructions,
                    }),
                });

                const result = await response.json();

                if (result.success || response.ok) {
                    toast.success("Recipe published successfully!");
                    router.push("/dashboard/user/my-recipes");
                } else {
                    toast.error(result.error || "Failed to create recipe.");
                }
            } catch (error) {
                toast.error(error.message || "An error occurred while creating the recipe.");
            }
        });
    };

    return (
        <DashboardShell
            user={user}
            navItems={userNavItems}
            title="Add Recipe"
            description="Share your culinary creation with the RecipeHub community."
            logoSrc="/RecipeHub Logo.png"
            brandName="RecipeHub"
        >
            <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-6">

                {/* Basic Info Card */}
                <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                            <ChefHat className="h-5 w-5" />
                        </div>
                        <h2 className="text-base font-semibold">Basic Information</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <Label htmlFor="recipeName">Recipe Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="recipeName"
                                required
                                value={form.recipeName}
                                onChange={(e) => update("recipeName", e.target.value)}
                                placeholder="e.g. Spicy Thai Basil Chicken"
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <Label htmlFor="recipeImage">
                                <ImageIcon className="inline h-3.5 w-3.5 mr-1 align-middle" />
                                Recipe Image (Max 1 MB)
                            </Label>
                            <Input
                                id="recipeImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="rounded border-2 dark:border-white/25"
                            />
                            {imageFile && (
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    📎 {imageFile.name} — will upload on submit
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="preparationTime">
                                <Clock className="inline h-3.5 w-3.5 mr-1 align-middle" />
                                Prep Time (minutes) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="preparationTime"
                                type="number"
                                required
                                min={1}
                                value={form.preparationTime}
                                onChange={(e) => update("preparationTime", e.target.value)}
                                placeholder="30"
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div>

                        {/* <div className="flex flex-col gap-1.5">
                            <Label htmlFor="price">
                                <DollarSign className="inline h-3.5 w-3.5 mr-1 align-middle" />
                                Price (USD) — 0 for free
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                step={0.01}
                                value={form.price}
                                onChange={(e) => update("price", e.target.value)}
                                placeholder="0.00"
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div> */}
                    </div>
                </div>

                {/* Classification Card */}
                <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                            <Tag className="h-5 w-5" />
                        </div>
                        <h2 className="text-base font-semibold">Classification</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                value={form.category}
                                onChange={(e) => update("category", e.target.value)}
                                className="rounded border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-400 dark:border-white/25 dark:bg-slate-900 dark:text-slate-400"
                            >
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="difficultyLevel">Difficulty</Label>
                            <select
                                id="difficultyLevel"
                                value={form.difficultyLevel}
                                onChange={(e) => update("difficultyLevel", e.target.value)}
                                className="rounded border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-400 dark:border-white/25 dark:bg-slate-900 dark:text-slate-400"
                            >
                                {DIFFICULTY_LEVELS.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="cuisineType">Cuisine Type</Label>
                            <select
                                id="cuisineType"
                                value={form.cuisineType}
                                onChange={(e) => update("cuisineType", e.target.value)}
                                className="rounded border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-400 dark:border-white/25 dark:bg-slate-900 dark:text-slate-400"
                            >
                                {CUISINE_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Ingredients Card */}
                <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                            <Utensils className="h-5 w-5" />
                        </div>
                        <h2 className="text-base font-semibold">Ingredients</h2>
                    </div>
                    <div className="space-y-2.5">
                        {ingredients.map((val, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                    {i + 1}
                                </span>
                                <Input
                                    value={val}
                                    onChange={(e) => updateIngredient(i, e.target.value)}
                                    placeholder={`Ingredient ${i + 1} (e.g. 2 cups flour)`}
                                    className="rounded border-2 dark:border-white/25"
                                />
                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(i)}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors"
                    >
                        <Plus className="h-4 w-4" /> Add Ingredient
                    </button>
                </div>

                {/* Instructions Card */}
                <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500 text-white shadow-lg shadow-purple-500/20">
                            <ChefHat className="h-5 w-5" />
                        </div>
                        <h2 className="text-base font-semibold">Instructions</h2>
                    </div>
                    <div className="space-y-3">
                        {instructions.map((val, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 mt-1">
                                    {i + 1}
                                </div>
                                <textarea
                                    value={val}
                                    onChange={(e) => updateInstruction(i, e.target.value)}
                                    placeholder={`Step ${i + 1}: Describe what to do...`}
                                    rows={2}
                                    className="flex-1 rounded border-2 border-slate-100 bg-white px-3 py-2 text-sm text-slate-800 outline-none resize-none transition focus:border-orange-400 dark:border-white/25 dark:bg-slate-900 dark:text-slate-400"
                                />
                                {instructions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeInstruction(i)}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors mt-0.5"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addInstruction}
                        className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors"
                    >
                        <Plus className="h-4 w-4" /> Add Step
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-xl bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 text-sm shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                    {isPending ? "Publishing Recipe..." : "Publish Recipe"}
                </button>
            </form>
        </DashboardShell>
    );
}