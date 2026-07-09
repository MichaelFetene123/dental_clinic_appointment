import { ChartAreaInteractive } from "@/components/admin/sidebar/chart-area-interactive"
import { DataTable } from "@/components/admin/patient/PatientTable"
import { PatientStatusChart } from "@/components/admin/sidebar/PatientStatusChart"
import AdminHero from "@/components/admin/adminHero"
import DashboardClient from "@/components/admin/DashboardClient"
import { Suspense } from "react"

export default function Page() {
    return (
        <div className="flex flex-1 flex-col px-4 lg:px-6">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <AdminHero />
                    {/* Live stats + recent appointments via TanStack Query */}
                    <DashboardClient />
                    <div className="md:flex justify-between gap-4 h-full">
                        <div className="md:w-[70%] md:h-full h-[100vh]">
                            <ChartAreaInteractive />
                        </div>
                        <div className="md:w-[30%] h-full">
                            <PatientStatusChart />
                        </div>
                    </div>
                    <div className="w-full">
                        <Suspense fallback={<div className="h-[400px] flex items-center justify-center border rounded-lg text-muted-foreground">Loading Table...</div>}>
                            <DataTable isDashboard={true} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
