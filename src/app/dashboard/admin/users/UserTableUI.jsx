"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
    Table,
    Chip,
    Button,
    Pagination,
} from "@heroui/react";

import {
    Users,
    Crown,
    User,
    Pencil,
    Trash2,
    ShieldCogCorner,
    ShieldCheck,
    Ban,
    ShieldCog,
    Eye,
    UserRound,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

export default function UserTableUI({
    users,
    total,
    page,
    pageSize,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);

        if (newPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(newPage));
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const generatePages = () => {
        const pages = [];

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (!users?.length) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40">
                    <Users className="h-8 w-8 text-orange-500" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    No users found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    No registered users available.
                </p>
            </div>
        );
    }
    const handleRole = async (id, role) => {
        const { data, error } = await authClient.admin.updateUser({
            userId: id, // required
            data: { role: role === 'admin' ? 'user' : 'admin' }, // required
        });
        if (data) {
            router.refresh()
            toast.success("Role Changed!")
        }
        if (error) {
            toast.error("Failed to Change Role !")
        }
    }
    const handleBann = async (id, banned) => {
        if (banned) {
            await authClient.admin.unbanUser({
                userId: id, // required
            });
            toast.success("User Unbanned !")
        } else {
            await authClient.admin.banUser({
                userId: id, // required
                banReason: "Spamming",
                banExpiresIn: 60 * 60 * 24 * 7,
            });
            toast.success("User banned !")
        }
        router.refresh()
    }
    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Users
                    </h3>

                    <p className="text-sm text-slate-500">
                        {total} registered users
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Users Table">
                            <Table.Header>
                                <Table.Column isRowHeader>
                                    User
                                </Table.Column>

                                <Table.Column>
                                    Verification
                                </Table.Column>

                                <Table.Column>
                                    Role
                                </Table.Column>

                                <Table.Column>
                                    Status
                                </Table.Column>

                                <Table.Column>
                                    Created
                                </Table.Column>

                                <Table.Column>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {users.map((user) => (
                                    <Table.Row key={user.email}>
                                        {/* USER */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                    {user.image ? (
                                                        <Image
                                                            src={user.image}
                                                            alt={user.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <Users className="h-5 w-5 text-slate-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* EMAIL VERIFIED */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                className={
                                                    user.emailVerified
                                                        ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                        : "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                                                }
                                            >
                                                {user.emailVerified
                                                    ? "Verified"
                                                    : "Not Verified"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* ROLE */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                className={
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                                                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                                                }
                                            >
                                                <span className="flex items-center gap-1">
                                                    {user.role === "admin" ? (
                                                        <Crown size={14} />
                                                    ) : (
                                                        <User size={14} />
                                                    )}

                                                    {user.role}
                                                </span>
                                            </Chip>
                                        </Table.Cell>

                                        {/* STATUS */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                className={
                                                    user.banned
                                                        ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                                        : "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                }
                                            >
                                                {user.banned ? "Banned" : "Active"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* DATE */}
                                        <Table.Cell>
                                            <span className="text-sm text-slate-500">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </Table.Cell>

                                        {/* ACTIONS */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                {/* Role Switch */}
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleRole(user.id, user.role)}
                                                >
                                                    {user.role === "admin" ? (
                                                        <span className="flex items-center gap-1"><UserRound size={16} /> <span className="hidden md:block">Make User</span></span>
                                                    ) : (
                                                        <span className="flex items-center gap-1"><ShieldCog size={16} /> <span className="hidden md:block">Make Admin</span></span>
                                                    )}
                                                </Button>

                                                {/* Block / Unblock */}
                                                <Button
                                                    size="sm"
                                                    variant={user.banned ? "outline" : "danger"}
                                                    onClick={() => handleBann(user.id, user.banned)}
                                                >
                                                    {user.banned ? (
                                                        <span className="flex items-center gap-1"><ShieldCheck size={16} /> <span>Unban</span></span>
                                                    ) : (
                                                        <span className="flex items-center gap-1"><Ban size={16} /> <span>Ban</span></span>
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
            </div>

            {/* Pagination */}
            <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                <Pagination className="w-full" size="lg">
                    <Pagination.Summary>
                        Showing {(page - 1) * pageSize + 1}
                        -
                        {Math.min(page * pageSize, total)}
                        {" "}of {total} users
                    </Pagination.Summary>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                                onPress={() =>
                                    handlePageChange(page - 1)
                                }
                            >
                                <span>Previous</span>
                            </Pagination.Previous>
                        </Pagination.Item>

                        {generatePages().map((p) => (
                            <Pagination.Item key={p}>
                                <Pagination.Link
                                    isActive={p === page}
                                    onPress={() =>
                                        handlePageChange(p)
                                    }
                                >
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ))}

                        <Pagination.Item>
                            <Pagination.Next isDisabled={page === totalPages}
                                onPress={() =>
                                    handlePageChange(page + 1)
                                }>
                                <span>Next</span>
                                <Pagination.NextIcon />
                            </Pagination.Next>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
}