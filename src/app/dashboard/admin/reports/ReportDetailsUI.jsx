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
import { ok } from "better-auth/api";
import Link from "next/link";

export default function ReportDetailsUI({
    users,
    total,
    page,
    pageSize,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // console.log(users)
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
                    No Reports found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    No Reports available.
                </p>
            </div>
        );
    }
    const handleDismis = async (reportId) => {
        const { data } = await authClient.token()
        const reportsRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/report/${reportId.toString()}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${data?.token}`
                },
            }
        );
        if (reportsRes.ok) {
            toast.success("Report Dismissed !")
            router.refresh()
            return
        }
        toast.error("Failed to Report Dismissed !")


    }
    const handleDelete = async (reportId) => {
        const { data } = await authClient.token()
        const reportsRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/report/${reportId.toString()}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${data?.token}`
                },
            }
        );
        if (reportsRes.ok) {
            toast.success("Recipe Deleted !")
            router.refresh()

            return
        }
        toast.error("Failed to Recipe Delete !")
    }
    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Reports
                </h3>

                <p className="text-sm text-slate-500">
                    {total} Reports
                </p>
            </div>


            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Users Table">
                            <Table.Header >
                                <Table.Column isRowHeader>
                                    User
                                </Table.Column>

                                {/* <Table.Column>
                                    Email
                                </Table.Column> */}

                                <Table.Column>
                                    Reason
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
                                    <Table.Row key={user._id}>
                                        {/* USER */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                {/* <div className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
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
                                                </div> */}

                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {user.reporterName}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {user.reporterEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* EMAIL VERIFIED
                                        <Table.Cell>
                                            {user.reporterEmail}
                                        </Table.Cell> */}

                                        {/* ROLE */}
                                        <Table.Cell>
                                            {user.reason}
                                        </Table.Cell>

                                        {/* STATUS */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                className={
                                                    user.status === 'pending'
                                                        ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                                        : user.status === 'dismissed'
                                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                                                            : user.status === 'removed'
                                                                ? "bg-gray-100 text-gray-700 dark:bg-gray-950/40 dark:text-gray-400"
                                                                : "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                }
                                            >
                                                {user.status === 'pending' ? 'Pending'
                                                    : user.status === 'dismissed' ? 'Dismissed'
                                                        : user.status === 'removed' ? 'Removed Recipe'
                                                            : 'Active'}
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
                                            <div className="flex items-center gap-2 w-full justify-center ">
                                                <Link href={`/recipes/${user.recipeId}`}>
                                               <Button variant="outline">
                                                 <span className="flex items-center gap-1"><Eye size={16} /> <span className="hidden md:block">View</span></span>
                                               </Button>
                                        
                                                </Link>
                                                {/* Dismiss */}
                                                <Button
                                                    size="sm"
                                                    isDisabled={user.status === "dismissed"}
                                                    variant="outline"
                                                    onClick={() => handleDismis(user._id)}
                                                >
                                                    {user.status === "dismissed" ? (
                                                        <span className="flex items-center gap-1"><ShieldCheck size={16} /> <span className="hidden md:block">Dismissed</span></span>
                                                    ) : (
                                                        <span className="flex items-center gap-1"><ShieldCog size={16} /> <span className="hidden md:block">Dismiss</span></span>
                                                    )}
                                                </Button>

                                                {/* Remove Recipe */}
                                                <Button
                                                    size="sm"
                                                    variant={user.banned ? "outline" : "danger"}
                                                    isDisabled={user.status === "removed"}
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    {user.status === "removed" ? (
                                                        <span className="flex items-center gap-1"><ShieldCheck size={16} /> <span>Removed</span></span>
                                                    ) : (
                                                        <span className="flex items-center gap-1"><Ban size={16} /> <span>Remove Recipe</span></span>
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