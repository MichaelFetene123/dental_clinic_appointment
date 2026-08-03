import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RoleCardSkeleton({ isSystem = false }: { isSystem?: boolean }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 w-full max-w-md">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-7 w-48" />
            {isSystem && <Skeleton className="h-5 w-16 rounded-full" />}
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-36" />
        </div>

        <div className="flex gap-2 self-start md:self-auto">
          {!isSystem && (
            <>
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-10" />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function RolesPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>
        <Skeleton className="h-9 w-28 sm:self-start" />
      </div>

      <div className="grid gap-4">
        <RoleCardSkeleton isSystem={true} />
        <RoleCardSkeleton isSystem={true} />
        <RoleCardSkeleton />
        <RoleCardSkeleton />
      </div>
    </div>
  )
}

export function PermissionMatrixSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64 mt-1.5" />
      </div>

      <div className="h-[420px] rounded-lg border bg-muted/10 p-4 overflow-hidden">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-dashed">
              <CardHeader className="space-y-2 pb-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-28" />
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-start gap-3 py-1.5">
                    <Skeleton className="h-4 w-4 rounded-sm mt-0.5" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
