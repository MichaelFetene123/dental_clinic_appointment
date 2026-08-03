import { Skeleton } from '@/components/ui/skeleton';

export function HeaderSkeleton() {
    return (
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm'>
            <div className="flex gap-4 items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )
}
