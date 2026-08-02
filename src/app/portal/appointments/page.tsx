"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton";
import { format } from "date-fns";
import { PortalAppointmentModal } from "@/components/portal/PortalAppointmentModal";
import { usePortalAppointments } from "@/hooks/use-portal-appointments";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Type based on what is mapped in the original page
type PortalApptRow = {
    id: string;
    reason: string;
    status: string;
    date: string | Date;
    time: string;
    notes?: string | null;
};

const columns: ColumnDef<PortalApptRow>[] = [
    {
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => {
            const appt = row.original;
            return (
                <div>
                    <div className="font-medium">{format(new Date(appt.date), "MMM dd, yyyy")}</div>
                    <div className="text-xs text-muted-foreground">{appt.time}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <div>{row.getValue("reason")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge variant={status === "CONFIRMED" ? "default" : status === "PENDING" ? "secondary" : "outline"}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
            const notes = row.getValue("notes") as string | null | undefined;
            return <div className="max-w-[300px] truncate text-muted-foreground">{notes || "-"}</div>;
        },
    },
];

export default function PortalAppointmentsPage() {
    const { data: appointments, isLoading } = usePortalAppointments();
    const data = useMemo(() => appointments || [], [appointments]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
                <div>
                    <h1 className="text-2xl font-semibold">Appointments</h1>
                    <p className="text-muted-foreground mt-1">Manage your upcoming and past appointments.</p>
                </div>
                <PortalAppointmentModal />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <DataTableSkeleton columnCount={4} rowCount={5} />
                    ) : (
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
                                            <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                                                No appointments found. Use the button above to book one!
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
