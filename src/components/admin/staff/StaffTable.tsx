"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStaff, useDeleteStaff } from "@/hooks/use-staff"
import type { StaffRow } from "@/lib/actions/queries/staff-queries"
import { Skeleton } from "@/components/ui/skeleton"
import { RoleData } from "@/lib/actions/queries/role-queries"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { StaffForm } from "./StaffForm"
import { usePermissions } from "@/components/providers/PermissionProvider"

function StaffRowActions({ staff, roles }: { staff: StaffRow, roles: RoleData[] }) {
    const { hasPermission, isSuperAdmin } = usePermissions();
    const canEdit = isSuperAdmin || hasPermission("staff.edit");
    const canDelete = isSuperAdmin || hasPermission("staff.delete");
    const [action, setAction] = React.useState<"edit" | "delete" | null>(null);
    const deleteMutation = useDeleteStaff();
    const isDeleting = deleteMutation.isPending;

    if (!canEdit && !canDelete) return null;

    const handleDelete = () => {
        deleteMutation.mutate(staff.id, {
            onSuccess: (result) => {
                if (result.success) setAction(null);
            },
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {canEdit && (
                        <DropdownMenuItem onClick={() => setAction("edit")}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </DropdownMenuItem>
                    )}
                    {canDelete && (
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setAction("delete")}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Staff
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {canEdit && (
                <Dialog open={action === "edit"} onOpenChange={(v) => !v && setAction(null)}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Staff Member</DialogTitle>
                            <DialogDescription>
                                Update profile details for {staff.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <StaffForm roles={roles} staff={staff} onSuccess={() => setAction(null)} />
                    </DialogContent>
                </Dialog>
            )}

            {canDelete && (
                <AlertDialog open={action === "delete"} onOpenChange={(v) => !v && setAction(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Staff Member?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete <span className="font-semibold">{staff.name}</span>? 
                                This action cannot be undone and will permanently remove their access.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-destructive hover:bg-destructive/90 text-white"
                            >
                                {isDeleting ? "Deleting..." : "Delete Member"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

export function getColumns(roles: RoleData[]): ColumnDef<StaffRow>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "roles",
            header: "Role",
            cell: ({ row }) => <div>{(row.getValue("roles") as string[]).join(", ")}</div>,
        },
        {
            accessorKey: "position",
            header: "Position",
            cell: ({ row }) => <div>{row.getValue("position")}</div>,
        },
        {
            accessorKey: "department",
            header: "Department",
            cell: ({ row }) => <div>{row.getValue("department")}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => <div className="text-right"><StaffRowActions staff={row.original} roles={roles} /></div>,
        }
    ];
}

export function StaffTable({ roles }: { roles: RoleData[] }) {
    const { data: queryData, isLoading } = useStaff()
    const data = queryData?.data ?? []
    
    const columns = React.useMemo(() => getColumns(roles), [roles]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No staff members found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
