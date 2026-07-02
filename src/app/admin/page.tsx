import { ChartAreaInteractive } from "@/components/admin/sidebar/chart-area-interactive"
import { SectionCards } from "@/components/admin/sidebar/section-cards"
import AppointmentList from "@/components/admin/appointment/appointment-list"
import { DataTable } from "@/components/admin/patient/PatientTable"
import data from './data.json'
import { AlertTriangleIcon, CalendarCheckIcon, CircleCheckBig, TrendingDownIcon, TrendingUpIcon, Users } from "lucide-react"
import { PatientStatusChart } from "@/components/admin/sidebar/PatientStatusChart"
import EmployeeList from "@/components/admin/staff/EmployeeList"
import AdminHero from "@/components/admin/adminHero"

export default function Page() {
    const cardData = [
        {
            title: "Increased patient visits",
            value: 125,
            description: "Total Patients Today",
            icon: <Users className="text-primary" />,
            badge: { text: "+10%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "More patients booking in advance",
            value: 340,
            description: "Appointments Scheduled",
            icon: <CalendarCheckIcon />,
            badge: { text: "+5%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "More successful treatments",
            value: 210,
            description: "Completed Procedures",
            icon: <CircleCheckBig />,
            badge: { text: "+12%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Immediate attention needed",
            value: 8,
            description: "Emergency Cases",
            icon: <AlertTriangleIcon />,
            badge: { text: "Critical", icon: <TrendingDownIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
    ];

    const dataWithDefaults = data.map(item => ({
        ...item,
        id: Number(item.id),
        header: "Default Header",
        type: "Default Type",
        status: "Default Status",
        target: "Default Target",
        limit: "Default Limit",
        reviewer: "Default Reviewer"
    }));

    return (
        <div className="flex flex-1 flex-col px-4 lg:px-6">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <AdminHero />
                    <SectionCards data={cardData} />
                    <div className="md:flex justify-between gap-4 h-full">
                        <div className="md:w-[70%]  md:h-full h-[100vh]">
                            <ChartAreaInteractive />
                        </div>
                        <div className="md:w-[30%] h-full">
                            <PatientStatusChart />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 h-full">
                        <div>
                            <EmployeeList />
                        </div>
                        <div className="">
                            <AppointmentList />
                        </div>
                    </div>
                    <div className="w-full">
                        <DataTable data={dataWithDefaults} isDashboard={true} />
                    </div>

                </div>
            </div>
        </div>
    )
}
