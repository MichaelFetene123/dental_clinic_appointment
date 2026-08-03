"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { usePatients, useDeletePatient } from "@/hooks/use-patients"
import type { PatientRow } from "@/lib/actions/queries/patient-queries"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton"
import { GrantAccessModal } from "@/components/admin/patient/GrantAccessModal"
import PatientForm from "@/components/admin/forms/patientForm"
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
import { toast } from "sonner"
import { usePermissions } from "@/components/providers/PermissionProvider"

function PatientRowActions({ patient }: { patient: PatientRow }) {
    const [grantModalOpen, setGrantModalOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const { hasPermission, isSuperAdmin } = usePermissions();
    const canEdit = isSuperAdmin || hasPermission("patient.edit");
    const canDelete = isSuperAdmin || hasPermission("patient.delete");
    const canManagePortal = isSuperAdmin || hasPermission("portal_users.manage");

    const deleteMutation = useDeletePatient();

    const handleDelete = () => {
        deleteMutation.mutate(patient.id, {
            onSuccess: (result) => {
                if (result.success) {
                    toast.success("Patient deleted successfully");
                    setDeleteOpen(false);
                } else {
                    toast.error(result.error || "Failed to delete patient");
                }
            },
            onError: () => {
                toast.error("Failed to delete patient");
            }
        });
    };

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
                    className="z-[9999] p-3 rounded-lg shadow-lg space-y-1"
                >
                    <DropdownMenuItem
                        className="flex gap-2 cursor-pointer"
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                navigator.clipboard.writeText(String(patient.id))
                            }
                        }}
                    >
                        Copy patient ID <CopyIcon size={16} />
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" asChild>
                        <Link href={`/admin/patients/${patient.id}`}>View patient details</Link>
                    </DropdownMenuItem>
                    {canEdit && (
                        <DropdownMenuItem
                            className="flex gap-2 cursor-pointer"
                            onClick={() => setEditOpen(true)}
                        >
                            Edit patient details
                        </DropdownMenuItem>
                    )}
                    {canManagePortal && (
                        <DropdownMenuItem 
                            className="flex gap-2 cursor-pointer"
                            onClick={() => setGrantModalOpen(true)}
                        >
                            {patient.userId ? "Manage Portal Access" : "Grant Portal Access"}
                        </DropdownMenuItem>
                    )}
                    {canDelete && (
                        <DropdownMenuItem 
                            className="flex gap-2 cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => setDeleteOpen(true)}
                        >
                            Delete patient
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete {patient.name}'s record and all related data (appointments, history, etc.).
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <GrantAccessModal 
                patientId={patient.id} 
                patientName={patient.name} 
                defaultEmail={patient.email !== "N/A" ? patient.email : ""} 
                hasAccess={!!patient.userId} 
                open={grantModalOpen} 
                onOpenChange={setGrantModalOpen} 
            />
            <PatientForm
                patient={patient}
                show={editOpen}
                setShow={setEditOpen}
            />
        </div>
    )
}

export const columns: ColumnDef<PatientRow>[] = [
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
                <div className="hidden md:block shrink-0">
                    <Image
                        src={"/images/download.jpg"}
                        alt="pp"
                        width={35}
                        height={35}
                        className="rounded-full object-cover aspect-square"
                    />
                </div>
                <div>
                    <p className="text-[16px] font-subheading font-medium">{row.getValue("name")}</p>
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
        cell: ({ row }) => <div>{row.getValue("lastVisited") || "N/A"}</div>,
    },
    {
        accessorKey: "appointmentDate",
        header: "Appointment",
        cell: ({ row }) => <div>{row.getValue("appointmentDate") || "N/A"}</div>,
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
            const statusMap: Record<string, string> = {
                partiallyPaid: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                Pending:       "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                Paid:          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                Overdue:       "bg-destructive/10 text-destructive",
            };
            const label: Record<string, string> = {
                partiallyPaid: "Partially Paid",
                Pending: "Pending",
                Paid: "Paid",
                Overdue: "Overdue",
            };
            const cls = statusMap[status as string] ?? "bg-muted text-muted-foreground";
            return (
                <div className="text-center">
                    <p className={`${cls} text-center py-1 px-2 rounded-lg text-xs font-medium`}>
                        {label[status as string] ?? String(status)}
                    </p>
                </div>
            );
        }
    },
    {
        accessorKey: "userId",
        header: "Portal",
        cell: ({ row }) => {
            const hasPortal = !!row.getValue("userId");
            return (
                <div className="text-center">
                    {hasPortal ? (
                        <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-center py-1 px-2 rounded-lg text-xs font-medium">Active</span>
                    ) : (
                        <span className="bg-muted text-muted-foreground text-center py-1 px-2 rounded-lg text-xs font-medium">None</span>
                    )}
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <PatientRowActions patient={row.original} />
    },

]
function DraggableRow({ row }: { row: Row<PatientRow> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })
    const router = useRouter();

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-muted/50 transition-colors"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
            onClick={() => router.push(`/admin/patients/${row.original.id}`)}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {cell.column.id === "actions" ? (
                        <div onClick={(e) => e.stopPropagation()}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function DataTable({
    isDashboard
}: {
    isDashboard: boolean
}) {
    const { hasPermission, isSuperAdmin } = usePermissions();
    const canRead = isSuperAdmin || hasPermission("patient.read");

    const { data: queryData, isLoading } = usePatients();
    const initialData = React.useMemo(() => queryData?.data ?? [], [queryData?.data]);
    
    const [data, setData] = React.useState<PatientRow[]>([]);
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
                {!canRead ? (
                    isDashboard ? (
                        <div className="w-full flex items-center justify-center h-[300px] border rounded-lg text-muted-foreground bg-muted/20">
                            <p>Insufficient permissions to view patients.</p>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center p-12 border rounded-lg text-muted-foreground bg-muted/20">
                            <p>You do not have permission to view patients.</p>
                        </div>
                    )
                ) : (
                <>
                <div className="flex justify-between ">
                    <Input
                        placeholder="Filter by id or name..."
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value);
                        }}
                        className="outline-none w-[40%]  focus:outline-none border-2 border-input px-4 py-2 rounded-lg"
                    />
                </div>
                {isLoading ? (
                    <DataTableSkeleton columnCount={7} rowCount={isDashboard ? 5 : 10} />
                ) : (
                <div>
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="sticky top-0 z-10">
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
                )}
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
                            className="card-bg font-semibold"
                            onClick={() => { window.location.href = "admin/patients" }}
                        >
                            All Patients <ArrowRight />
                        </Button>
                    </div>
                }
                </>
                )}
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

