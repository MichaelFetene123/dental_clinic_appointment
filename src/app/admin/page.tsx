import { ChartAreaInteractive } from "@/components/admin/sidebar/chart-area-interactive"
import { DataTable } from "@/components/admin/patient/PatientTable"
import { PatientStatusChart } from "@/components/admin/sidebar/PatientStatusChart"
import AdminHero from "@/components/admin/adminHero"
import DashboardClient from "@/components/admin/DashboardClient"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardCardsSkeleton, ChartAreaInteractiveSkeleton, PatientStatusChartSkeleton } from "@/components/skeleton/DashboardCardSkeleton"
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton"

export default function Page() {
    return (
        <div className="flex flex-1 flex-col px-4 lg:px-6">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <AdminHero />
                    
                    {/* Live stats + recent appointments via TanStack Query */}
                    <Suspense fallback={<DashboardCardsSkeleton count={4} />}>
                        <DashboardClient />
                    </Suspense>

                    <div className="md:flex justify-between gap-4 h-full">
                        <div className="md:w-[70%] md:h-full h-[100vh]">
                            <Suspense fallback={<ChartAreaInteractiveSkeleton />}>
                                <ChartAreaInteractive />
                            </Suspense>
                        </div>
                        <div className="md:w-[30%] h-full">
                            <Suspense fallback={<PatientStatusChartSkeleton />}>
                                <PatientStatusChart />
                            </Suspense>
                        </div>
                    </div>
                    <div className="w-full">
                        <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={5} />}>
                            <DataTable isDashboard={true} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
