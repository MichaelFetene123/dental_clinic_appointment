"use client"

import * as React from "react"
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ArrowRight,
    ArrowUpDown,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    CopyIcon,
    MoreHorizontal,
} from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import Link from "next/link"

export const schema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
    phone: z.string(),
})

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="flex items-center gap-2 font-bold"
            >
                Id
                <ArrowUpDown size={16} />
            </button>
        ),
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) =>
            <Link href={`/admin/patients/${row.original.id}`} className="flex gap-2 items-center">
                <div>
                    <Image
                        src={"/images/download.jpg"}
                        alt="pp"
                        width={40}
                        height={40}
                        className="rounded-full "
                    />
                </div>
                <div>
                    <p className="text-lg font-subheading font-medium">{row.getValue("name")}</p>
                </div>
            </Link>,
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => <div className="font-subheading font-[500]">{row.getValue("age")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div className="font-subheading font-[500]">{row.getValue("gender")}</div>,
    },
    {
        header: "Contact Info",
        cell: ({ row }) => (
            <div className="space-y-1">
                <div className="font-subheading font-[500]">{row.original.email}</div>
                <div className="font-subheading font-[500] ">{row.original.phone}</div>
            </div>
        ),
    },
    {
        accessorKey: "lastVisited",
        header: "Last visit",
        cell: ({ row }) => <div>{row.getValue("lastVisited")}</div>,
    },
    {
        accessorKey: "appointmentDate",
        header: "Appointment",
        cell: ({ row }) => <div>{row.getValue("appointmentDate")}</div>,
    },
    {
        accessorKey: "dueDate",
        header: "Due date",
        cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
    },
    {
        accessorKey: "dueStatus",
        header: "Due status",
        cell: ({ row }) => {
            const status = row.getValue("dueStatus");
            if (status == "partiallyPaid") {
                return (
                    <div className="text-center -z-10">
                        <p className=" bg-blue-100 text-center py-1 rounded-lg text-blue-600 font-[500]">Partially paid </p>
                    </div>
                )
            }
            if (status == "Pending") {
                return (
                    <div className="text-center -z-10">
                        <p className=" bg-yellow-100 text-center py-1 rounded-lg text-yellow-600 font-[500]">Pending</p>
                    </div>
                )
            }
            if (status == "Paid") {
                return (
                    <div className="text-center -z-10">
                        <p className=" bg-green-100 text-center py-1 rounded-lg text-green-600 font-[500]">Paid </p>
                    </div>
                )
            }
            if (status == "Overdue") {
                return (
                    <div className="text-center -z-10">
                        <p className=" bg-blue-100 text-center py-1 rounded-lg text-blue-600 font-[500]">Overdue </p>
                    </div>
                )
            }
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const patient = row.original
            return (
                <div className="z-50">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            side="bottom"
                            className="z-[9999] p-3 bg-white rounded-lg shadow-lg border-2 space-y-3"
                        >
                            <DropdownMenuItem
                                className="flex gap-2 px-3 py-2 hover:bg-slate-50 border-none rounded-md"
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        navigator.clipboard.writeText(String(patient.id))
                                    }
                                }}
                            >
                                Copy patient ID <CopyIcon size={20} />
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="flex gap-2 px-3 py-2 hover:bg-slate-50 border-none rounded-md">View patient details</DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2 px-3 py-2 hover:bg-slate-50 border-none rounded-md">Edit patient details</DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2 px-3 py-2 hover:bg-slate-50 border-none rounded-md">Delete patient</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },

]
function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function DataTable({
    data: initialData,
    isDashboard
}: {
    data: z.infer<typeof schema>[]
    isDashboard: boolean
}) {
    const [data, setData] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: isDashboard ? 5 : 10,
    })
    const sortableId = React.useId()
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id) || [],
        [data]
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id)
                const newIndex = dataIds.indexOf(over.id)
                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    const [filterValue, setFilterValue] = React.useState<string>("");

    React.useEffect(() => {
        if (filterValue) {
            const filteredData = initialData.filter(item => {
                const idMatch = String(item.id).toLowerCase().startsWith(filterValue.toLowerCase());
                const nameMatch = item.name.toLowerCase().startsWith(filterValue.toLowerCase());
                return idMatch || nameMatch;
            });
            setData(filteredData);
        } else {
            setData(initialData);
        }
    }, [filterValue, initialData]);

    return (
        <Tabs
            defaultValue="outline"
            className="flex w-full flex-col justify-start gap-6 "
        >
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto"
            >
                <div className="flex justify-between ">
                    <Input
                        placeholder="Filter by id or name..."
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value);
                        }}
                        className="outline-none w-[40%]  focus:outline-none border-2 border-gray-300 px-4 py-2 rounded-lg"
                    />
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-muted">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext
                                        items={dataIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <div className="flex items-center justify-between px-4">
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
                                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
                {
                    isDashboard && <div className="flex justify-center items-center py-3 w-full">
                        <Button
                            className="card-bg font-semibold hover:scale-105 transition-all ease-in-out duration-300"
                            onClick={() => { window.location.href = "admin/patients" }}
                        >
                            All Patients <ArrowRight />
                        </Button>
                    </div>
                }
            </TabsContent>
            <TabsContent
                value="past-performance"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="focus-documents"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>

        </Tabs>
    )
}

