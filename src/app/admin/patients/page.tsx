"use client"
import { DataTable } from '@/components/admin/patient/PatientTable'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { SectionCards } from '@/components/admin/sidebar/section-cards'
import { AlertTriangleIcon, CalendarCheckIcon, CircleCheckBig, TrendingUpIcon, Users } from 'lucide-react'
import PatientForm from '@/components/admin/forms/patientForm'
import { useDashboardStats } from '@/hooks/use-dashboard'


const Page = () => {
    const [showForm, setShowForm] = useState(false);
    const { data: dashData } = useDashboardStats();

    const cardData = [
        {
            title: "Total registered patients",
            value: dashData?.stats.totalPatients ?? 0,
            description: "Number of all patients",
            icon: <Users className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "New Patients (This Month)",
            value: 0, // Placeholder for future logic
            description: "Number of new patients",
            icon: <CalendarCheckIcon className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Appointments awaiting confirmation",
            value: dashData?.stats.pendingInQueue ?? 0,
            description: "Pending patients",
            icon: <CircleCheckBig className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Currently confirmed appointments",
            value: dashData?.stats.scheduledAppointments ?? 0,
            description: "Scheduled patients",
            icon: <AlertTriangleIcon className="text-primary" />,
            badge: { text: "Live", icon: <AlertTriangleIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
    ];

    return (
        <>
            <div className={`flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 ${showForm ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className='flex justify-between mt-3'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Patients Lists</h1>
                        <p className='text-muted-foreground'>Here are the update patient list last 7 days </p>
                    </div>
                    <div className='flex gap-3'>
                        <Button
                            size="lg"
                            className="font-semibold"
                            onClick={() => setShowForm(!showForm)} // Toggle form visibility
                        >
                            {showForm ? "Close Form" : "Add patient"}
                        </Button>
                    </div>
                </div>
                <SectionCards data={cardData} />
                <DataTable isDashboard={false} />
            </div>
            {showForm && <PatientForm show={showForm} setShow={setShowForm} />}
        </>
    )
}

export default Page