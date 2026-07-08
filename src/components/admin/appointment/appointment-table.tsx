"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from "lucide-react"
import { Label } from "@/components/ui/label"

// Sample appointment data
const data: Appointment[] = [
    {
        id: 1,
        status: "CONFIRMED",
        reason: "Routine Checkup",
        notes: "Patient requested a follow-up in 3 months.",
        appointmentDate: "2024-03-20 10:30:00",
        patientId: 101,
    },
    {
        id: 2,
        status: "PENDING",
        reason: "Tooth Extraction",
        notes: "Needs anesthesia consultation.",
        appointmentDate: "2024-03-21 14:00:00",
        patientId: 102,
    },
    {
        id: 3,
        status: "CANCELLED",
        reason: "Cleaning",
        notes: "Cancelled due to patient no-show.",
        appointmentDate: "2024-03-19 09:00:00",
        patientId: 103,
    },
    {
        id: 4,
        status: "COMPLETED",
        reason: "Braces Adjustment",
        notes: "Next appointment in 6 weeks.",
        appointmentDate: "2024-03-18 16:00:00",
        patientId: 104,
    },
    {
        id: 5,
        status: "CONFIRMED",
        reason: "Wisdom Tooth Removal",
        notes: "Prescribed painkillers post-op.",
        appointmentDate: "2024-03-22 11:00:00",
        patientId: 105,
    },
]

export type Appointment = {
    id: number
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
    reason: string
    notes: string
    appointmentDate: string
    patientId: number
}

export const columns: ColumnDef<Appointment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "patientId",
        header: "App ID",
        cell: ({ row }) => <div className="w-full">{row.getValue("patientId")}</div>,
    },

    {
        accessorKey: "appointmentDate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Appointment Date
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm">{new Date(row.getValue("appointmentDate")).toLocaleString()}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            const statusColors: Record<string, string> = {
                PENDING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-semibold",
                CONFIRMED: "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold",
                CANCELLED: "bg-destructive/10 text-destructive font-semibold",
                COMPLETED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold",
            };

            return (
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[status]}`}>
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <div>{row.getValue("reason")}</div>,
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => <div className="truncate w-40">{row.getValue("notes")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        
        cell: ({ row }) => {
            const appointment = row.original

            return (
                <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="outline" className="text-emerald-600 hover:text-emerald-700" onClick={() => console.log("Viewing", appointment.id)}>
                        <Eye className="w-4 h-4 mr-1" /> See
                    </Button>
                    <Button size="sm" variant="outline" className="text-primary hover:text-primary/90" onClick={() => console.log("Editing", appointment.id)}>
                        <Edit className="w-4 h-4 mr-1" /> Update
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-destructive border-destructive hover:text-destructive  transition-colors">
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this appointment? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => console.log("Deleting", appointment.id)} className="bg-transparent border border-destructive text-destructive hover:bg-red-500/10 hover:text-destructive transition-colors">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]

export function     AppointmentTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>
                    Manage your patients' appointments, view details, update status, and more.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between pb-4">
                    <Input
                        placeholder="Filter by reason..."
                        value={(table.getColumn("reason")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("reason")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>{row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}</TableRow>
                        )) : (
                            <TableRow><TableCell colSpan={columns.length} className="text-center">No results.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-4 mt-3">
                <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="w-20" id="rows-per-page">
                                <SelectValue
                                    placeholder={table.getState().pagination.pageSize}
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}
