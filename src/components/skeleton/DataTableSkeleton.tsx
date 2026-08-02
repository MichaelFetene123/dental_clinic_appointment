import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function DataTableSkeleton({ columnCount = 5, rowCount = 5 }: { columnCount?: number; rowCount?: number }) {
    return (
        <div className="w-full space-y-4">
            {/* Toolbar / Filters Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px] rounded-lg" />
                <Skeleton className="h-10 w-[100px] rounded-lg" />
            </div>

            {/* Table Skeleton */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: columnCount }).map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-6 w-full rounded" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rowCount }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from({ length: columnCount }).map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <Skeleton className="h-6 w-full rounded" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {/* Pagination Skeleton */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Skeleton className="h-8 w-[100px] rounded" />
                <Skeleton className="h-8 w-[70px] rounded" />
                <Skeleton className="h-8 w-[70px] rounded" />
            </div>
        </div>
    );
}
