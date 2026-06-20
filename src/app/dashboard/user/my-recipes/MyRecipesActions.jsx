"use client";

import { useState, useTransition } from "react";
import { deleteRecipeAction } from "@/app/lib/actions";
import { Trash2 } from "lucide-react";
import { Modal, Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function MyRecipesActions({ recipeId }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteRecipeAction(recipeId);
            if (result.success) {
                toast.success("Recipe deleted.");
                setOpen(false);
            } else {
                toast.error(result.error || "Failed to delete.");
            }
        });
    };

    return (
        <Modal>
            <Button
                variant="flat"
                isIconOnly
                onPress={() => setOpen(true)}
                className="h-9 w-9 shrink-0 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </Button>

            {open && (
                <Modal.Backdrop>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                            <Modal.CloseTrigger onPress={() => setOpen(false)} />
                            <Modal.Header className="border-b border-zinc-200 dark:border-zinc-800">
                                <Modal.Icon className="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                    <Trash2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Delete Recipe</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Are you sure you want to delete this recipe? This action cannot be undone.
                                </p>
                            </Modal.Body>
                            <Modal.Footer className="border-t border-zinc-200 dark:border-zinc-800">
                                <Button
                                    slot="close"
                                    variant="flat"
                                    onPress={() => setOpen(false)}
                                    className="rounded-xl bg-zinc-100 text-slate-700 shadow-none hover:bg-zinc-200 dark:bg-zinc-800 dark:text-slate-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={handleDelete}
                                    isLoading={isPending}
                                    className="rounded-xl bg-red-500 text-white shadow-none hover:bg-red-600"
                                >
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            )}
        </Modal>
    );
}
