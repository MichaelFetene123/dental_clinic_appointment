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
import { ArrowUpDown, Eye, Trash2, CheckCircle, XCircle, Calendar, Clock, Phone, FileText } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import type { AppointmentStatus } from "@/app/generated/prisma/client"
import { useAppointments, useDeleteAppointment, useUpdateAppointmentStatus } from "@/hooks/use-appointments"
import type { AppointmentRow } from "@/lib/actions/queries/appointment-queries"

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-semibold",
    CONFIRMED: "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold",
    CANCELLED: "bg-destructive/10 text-destructive font-semibold",
    COMPLETED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold",
}

function AppointmentActions({ appointment }: { appointment: AppointmentRow }) {
    const updateStatus = useUpdateAppointmentStatus()
    const deleteAppt = useDeleteAppointment()
    const [isPending, setIsPending] = React.useState(false)

    const handle = async (fn: () => Promise<unknown>) => {
        setIsPending(true)
        await fn()
        setIsPending(false)
    }

    return (
        <div className="flex justify-center gap-2 flex-wrap">
            {appointment.status === "PENDING" && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-emerald-600 border-emerald-500/50 hover:bg-emerald-500/10"
                    disabled={isPending}
                    onClick={() => handle(() => updateStatus(appointment.id, "CONFIRMED" as AppointmentStatus))}
                >
                    <CheckCircle className="w-4 h-4 mr-1" /> Accept
                </Button>
            )}
            {appointment.status === "CONFIRMED" && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-emerald-600 border-emerald-500/50 hover:bg-emerald-500/10"
                    disabled={isPending}
                    onClick={() => handle(() => updateStatus(appointment.id, "COMPLETED" as AppointmentStatus))}
                >
                    <CheckCircle className="w-4 h-4 mr-1" /> Complete
                </Button>
            )}
            {(appointment.status === "PENDING" || appointment.status === "CONFIRMED") && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/50 hover:bg-destructive/10"
                    disabled={isPending}
                    onClick={() => handle(() => updateStatus(appointment.id, "CANCELLED" as AppointmentStatus))}
                >
                    <XCircle className="w-4 h-4 mr-1" /> Cancel
                </Button>
            )}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive hover:text-destructive transition-colors" disabled={isPending}>
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
                        <AlertDialogAction
                            onClick={() => handle(() => deleteAppt(appointment.id))}
                            className="bg-transparent border border-destructive text-destructive hover:bg-red-500/10 hover:text-destructive transition-colors"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

const columns: ColumnDef<AppointmentRow>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
        accessorKey: "patientName",
        header: "Patient",
        cell: ({ row }) => <div className="font-medium">{row.getValue("patientName")}</div>,
    },
    {
        accessorKey: "patientPhone",
        header: "Phone",
        cell: ({ row }) => <div className="text-sm">{row.getValue("patientPhone") || "N/A"}</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Date <ArrowUpDown className="ml-1 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm">{format(new Date(row.getValue("date")), "MMM d, yyyy")}</div>
        ),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => <div className="text-sm">{row.getValue("time")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[status]}`}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <div>{row.getValue("reason")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <AppointmentActions appointment={row.original} />,
    },
]

interface AppointmentTableProps {
    statusFilter?: AppointmentStatus | AppointmentStatus[];
}

export function AppointmentTable({ statusFilter }: AppointmentTableProps = {}) {
    const { data, isLoading } = useAppointments(statusFilter)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
    const [selectedAppointment, setSelectedAppointment] = React.useState<AppointmentRow | null>(null)

    const tableData = data?.data ?? []

    const table = useReactTable({
        data: tableData,
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
        state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-md" />
                    ))}
                </CardContent>
            </Card>
        )
    }

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
                        onChange={(event) => table.getColumn("reason")?.setFilterValue(event.target.value)}
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
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow 
                                        key={row.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => setSelectedAppointment(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell 
                                                key={cell.id}
                                                onClick={(e) => {
                                                    if (cell.column.id === "select" || cell.column.id === "actions") {
                                                        e.stopPropagation();
                                                    }
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                                        No appointments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between px-4 mt-3">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">Rows per page</Label>
                            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
                                <SelectTrigger className="w-20" id="rows-per-page">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                                <ChevronsLeftIcon />
                            </Button>
                            <Button variant="outline" className="size-8" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                <ChevronLeftIcon />
                            </Button>
                            <Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                <ChevronRightIcon />
                            </Button>
                            <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                                <ChevronsRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>

            <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
                <DialogContent className="sm:max-w-xl md:max-w-2xl w-[95vw]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Appointment Details</DialogTitle>
                        <DialogDescription>
                            Review the complete details of this appointment.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedAppointment && (
                        <div className="space-y-6 mt-4">
                            {/* Header Section */}
                            <Card className="bg-muted border-border/50 shadow-sm">
                                <CardContent className="p-5 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14 border-2">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                                                {selectedAppointment.patientName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold leading-tight">{selectedAppointment.patientName}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                                <Phone className="mr-2 h-4 w-4" />
                                                {selectedAppointment.patientPhone || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm ${statusColors[selectedAppointment.status]}`}>
                                        {selectedAppointment.status}
                                    </span>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Date & Time Section */}
                                <Card className="bg-muted border-border/50 shadow-sm">
                                    <CardContent className="p-5">
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center text-sm text-muted-foreground mb-1.5 font-medium">
                                                    <Calendar className="mr-2 h-4 w-4" /> Date
                                                </div>
                                                <p className="font-semibold text-foreground md:text-lg ml-6">
                                                    {format(new Date(selectedAppointment.date), "EEEE, MMMM d, yyyy")}
                                                </p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <div className="flex items-center text-sm text-muted-foreground mb-1.5 font-medium">
                                                    <Clock className="mr-2 h-4 w-4" /> Time
                                                </div>
                                                <p className="font-semibold text-foreground md:text-lg ml-6">
                                                    {selectedAppointment.time}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Reason Section */}
                                <Card className="bg-muted border-border/50 shadow-sm">
                                    <CardContent className="p-5 h-full flex flex-col">
                                        <div className="flex items-center text-sm font-semibold mb-3 text-muted-foreground">
                                            <FileText className="mr-2 h-4 w-4" /> 
                                            Reason for Visit
                                        </div>
                                        <div className="flex-1 text-sm md:text-base text-foreground/90 leading-relaxed">
                                            {selectedAppointment.reason}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    )
}
