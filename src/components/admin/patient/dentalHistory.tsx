"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { MoreHorizontal, Check } from "lucide-react";
import { FaTooth } from "react-icons/fa";

// Sample data
const initialData = [
    { id: 1, treatmentType: "Teeth Cleaning", date: "2024-02-10", treatmentStatus: "Completed", paymentStatus: "Paid" },
    { id: 2, treatmentType: "Root Canal", date: "2024-03-05", treatmentStatus: "Ongoing", paymentStatus: "Pending" },
    { id: 3, treatmentType: "Braces Adjustment", date: "2024-03-20", treatmentStatus: "Scheduled", paymentStatus: "Paid" },
    { id: 4, treatmentType: "Teeth Cleaning", date: "2024-02-10", treatmentStatus: "Completed", paymentStatus: "Paid" },
    { id: 5, treatmentType: "Root Canal", date: "2024-03-05", treatmentStatus: "Ongoing", paymentStatus: "Pending" },
    { id: 6, treatmentType: "Braces Adjustment", date: "2024-03-20", treatmentStatus: "Scheduled", paymentStatus: "Paid" },
];

const DentalHistoryTable = () => {
    const [data] = useState(initialData);
    const [selectedHistory, setSelectedHistory] = useState<{
        id: number;
        treatmentType: string;
        date: string;
        treatmentStatus: string;
        paymentStatus: string;
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open modal and set selected history data
    const handleViewDetail = (history: { 
        id: number;
        treatmentType: string;
        date: string;
        treatmentStatus: string;
        paymentStatus: string;
    }) => {
        setSelectedHistory(history);
        setIsModalOpen(true);
    };

    // Define columns inside the component so it has access to `handleViewDetail`
    const columns: ColumnDef<{
        id: number;
        treatmentType: string;
        date: string;
        treatmentStatus: string;
        paymentStatus: string;
    }>[] = [
        { accessorKey: "id", header: "ID" },
        {
            accessorKey: "treatmentType",
            header: "Treatment Type",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                    <FaTooth className="h-4 w-4" />
                    {row.original.treatmentType}
                </div>
            ),
        },
        { 
            accessorKey: "date", 
            header: "Date",
            cell: ({ row }) => (
                <div className="font-semibold text-gray-900">{row.original.date}</div>
            )
        },
        {
            accessorKey: "treatmentStatus",
            header: "Treatment Status",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 border px-2 py-1 rounded-md border-gray-300 font-semibold text-gray-900">
                    <Check className="h-4 w-4 text-green-600" />
                    {row.original.treatmentStatus}
                </div>
            ),
        },
        {
            accessorKey: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => (
                <span
                    className={`px-3 py-1 text-sm rounded-md ${
                        row.original.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700 border-green-500 border-[1px]"
                            : "bg-orange-100 text-orange-700 border-red-500 border-[1px]"
                    }`}
                >
                    {row.original.paymentStatus}
                </span>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id.toString())}>
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetail(row.original)}>View Detail</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Dental History</h2>
            <Card>
                <Table>
                    <TableHeader className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-semibold text-gray-600">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Modal for Viewing Detail */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Medical History Detail</DialogTitle>
                        <DialogDescription>
                            Below are the details of the selected dental treatment.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedHistory && (
                        <div className="space-y-3">
                            <p><strong>ID:</strong> {selectedHistory.id}</p>
                            <p><strong>Treatment Type:</strong> {selectedHistory.treatmentType}</p>
                            <p><strong>Date:</strong> {selectedHistory.date}</p>
                            <p><strong>Treatment Status:</strong> {selectedHistory.treatmentStatus}</p>
                            <p><strong>Payment Status:</strong> {selectedHistory.paymentStatus}</p>
                        </div>
                    )}
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default DentalHistoryTable;
