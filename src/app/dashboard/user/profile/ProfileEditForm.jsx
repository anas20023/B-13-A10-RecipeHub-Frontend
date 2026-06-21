"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Input, Label } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { Camera, LoaderCircle, Mail, UserRound, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfileEditForm({ user }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || "",
        image: user?.image || "",
    });

    const update = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = form.name.trim();
        const image = form.image.trim();

        if (!name) {
            toast.error("Name is required.");
            return;
        }

        setIsPending(true);
        (async () => {
            try {
                const payload = { name };
                if (image) {
                    payload.image = image;
                }

                await authClient.updateUser(payload);
                toast.success("Profile updated successfully.");
                router.refresh();
            } catch (error) {
                toast.error(error?.message || "Failed to update profile.");
            } finally {
                setIsPending(false);
            }
        })();
    };

    return (
        <Card className="overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="border-b border-slate-100 px-6 py-5 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                        <Camera className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">Edit Profile</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Update your display name and profile photo.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 p-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        {form.image ? (
                            <Image
                                src={form.image}
                                alt={form.name || "Profile image"}
                                width={176}
                                height={176}
                                className="h-44 w-44 rounded-3xl border-4 border-white object-cover shadow-md dark:border-slate-900"
                            />
                        ) : (
                            <div className="flex h-44 w-44 items-center justify-center rounded-3xl border-4 border-white bg-orange-100 shadow-md dark:border-slate-900 dark:bg-orange-950/40">
                                <UserRound className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                            </div>
                        )}
                    </div>
                    <p className="max-w-xs text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Paste a public image URL to replace the default avatar. Leaving it blank keeps your current photo.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <Label htmlFor="profileName">
                                <UserRound className="mr-1 inline h-3.5 w-3.5 align-middle" />
                                Display Name
                            </Label>
                            <Input
                                id="profileName"
                                required
                                value={form.name}
                                onChange={(event) => update("name", event.target.value)}
                                placeholder="Your name"
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <Label htmlFor="profileEmail">
                                <Mail className="mr-1 inline h-3.5 w-3.5 align-middle" />
                                Email Address
                            </Label>
                            <Input
                                id="profileEmail"
                                value={user?.email || ""}
                                isReadOnly
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <Label htmlFor="profileImage">
                                <ImagePlus className="mr-1 inline h-3.5 w-3.5 align-middle" />
                                Profile Image URL
                            </Label>
                            <Input
                                id="profileImage"
                                type="url"
                                value={form.image}
                                onChange={(event) => update("image", event.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                className="rounded border-2 dark:border-white/25"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Changes apply to your profile.
                        </p>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </Card>
    );
}
