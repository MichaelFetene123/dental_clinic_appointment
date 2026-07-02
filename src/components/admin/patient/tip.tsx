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
import { Eye, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Card } from "@/components/ui/card"

// Sample patient data
const data: Patient[] = [
    {
        id: 101,
        name: "John Doe",
        gender: "Male",
        age: 32,
        phone: "123-456-7890",
        case: "Routine Checkup",
        createdAt: "2024-03-15",
    },
    {
        id: 102,
        name: "Sara Johnson",
        gender: "Female",
        age: 45,
        phone: "987-654-3210",
        case: "Tooth Extraction",
        createdAt: "2024-03-10",
    },
    {
        id: 103,
        name: "Michael Brown",
        gender: "Male",
        age: 29,
        phone: "456-789-0123",
        case: "Cleaning",
        createdAt: "2024-02-28",
    },
    {
        id: 104,
        name: "Emily Smith",
        gender: "Female",
        age: 37,
        phone: "321-654-0987",
        case: "Braces Adjustment",
        createdAt: "2024-02-20",
    },
    {
        id: 105,
        name: "David Wilson",
        gender: "Male",
        age: 50,
        phone: "789-012-3456",
        case: "Wisdom Tooth Removal",
        createdAt: "2024-01-15",
    },
    {
        id: 106,
        name: "Emily Smith",
        gender: "Female",
        age: 37,
        phone: "321-654-0987",
        case: "Braces Adjustment",
        createdAt: "2024-02-20",
    },
    {
        id: 107,
        name: "David Wilson",
        gender: "Male",
        age: 50,
        phone: "789-012-3456",
        case: "Wisdom Tooth Removal",
        createdAt: "2024-01-15",
    },{
        id: 108,
        name: "Emily Smith",
        gender: "Female",
        age: 37,
        phone: "321-654-0987",
        case: "Braces Adjustment",
        createdAt: "2024-02-20",
    },
    {
        id: 109,
        name: "David Wilson",
        gender: "Male",
        age: 50,
        phone: "789-012-3456",
        case: "Wisdom Tooth Removal",
        createdAt: "2024-01-15",
    },
]

export type Patient = {
    id: number
    name: string
    gender: "Male" | "Female"
    age: number
    phone: string
    case: string
    createdAt: string
}

export const columns: ColumnDef<Patient>[] = [
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
        accessorKey: "id",
        header: "Patient ID",
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => <div>{row.getValue("age")}</div>,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
        accessorKey: "case",
        header: "Case",
        cell: ({ row }) => <div>{row.getValue("case")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4 text-blue-600" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        ),
    },
]

export function PatientTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <Card className="p-5">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter by name or case..."
                    value={(table.getColumn("case")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("case")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
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
        </Card>
    )
}

