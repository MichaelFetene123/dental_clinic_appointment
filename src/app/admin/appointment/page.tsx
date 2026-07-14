"use client"
import { useState, Suspense } from 'react';
import { AppointmentTable } from '@/components/admin/appointment/appointment-table';
import { SectionCards } from '@/components/admin/sidebar/section-cards';
import { AlertTriangleIcon, CalendarCheckIcon, CircleCheckBig, TrendingUpIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AppointmentForm from '@/components/admin/forms/appointmentForm';
import AppointmentCalendar from '@/components/admin/appointment/calendar/AppointmentCalendar';
import { AppointmentCalendarSkeleton } from '@/lib/skeleton/AppointmentCalendarSkeleton';
import { useDashboardStats } from '@/hooks/use-dashboard';

const Page = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'queue' | 'archive'>('all');
    const [showForm, setShowForm] = useState(false);
    const { data: dashData } = useDashboardStats();

    const cardData = [
        {
            title: "Total registered patients",
            value: dashData?.stats.totalPatients ?? 0,
            description: "Total Patients",
            icon: <Users className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Currently confirmed appointments",
            value: dashData?.stats.scheduledAppointments ?? 0,
            description: "Scheduled Appointments",
            icon: <CalendarCheckIcon className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Successfully completed procedures",
            value: dashData?.stats.completedProcedures ?? 0,
            description: "Completed Procedures",
            icon: <CircleCheckBig className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Appointments awaiting confirmation",
            value: dashData?.stats.pendingInQueue ?? 0,
            description: "In Queue",
            icon: <AlertTriangleIcon className="text-primary" />,
            badge: { text: "Pending", icon: <AlertTriangleIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
    ];

    return (
        <div className="flex flex-col w-full min-w-0 gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className='flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center'>
                <h1 className='text-2xl font-semibold'>Appointments</h1>
                <Button
                    size="lg"
                    className="font-semibold w-full sm:w-auto"
                    onClick={() => setShowForm(!showForm)} // Toggle form visibility
                >
                    {showForm ? "Close Form" : "Add Appointment"}
                </Button>
            </div>

            <SectionCards data={cardData} />

            <Suspense fallback={<AppointmentCalendarSkeleton />}>
                <AppointmentCalendar />
            </Suspense>

            {/* Tab Navigation */}
            <div className="flex gap-4 border-b-2 py-2 px-4 flex-wrap">
                <button
                    className={`relative px-4 py-2 text-foreground transition-all duration-300 ${activeTab === 'all' ? 'font-semibold' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Appointments
                    <div className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-all duration-300 ${activeTab === 'all' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
                <button
                    className={`relative px-4 py-2 text-foreground transition-all duration-300 ${activeTab === 'queue' ? 'font-semibold' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('queue')}
                >
                    In Queue
                    <div className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-all duration-300 ${activeTab === 'queue' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
                <button
                    className={`relative px-4 py-2 text-foreground transition-all duration-300 ${activeTab === 'confirmed' ? 'font-semibold' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('confirmed')}
                >
                    Confirmed
                    <div className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-all duration-300 ${activeTab === 'confirmed' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
                <button
                    className={`relative px-4 py-2 text-foreground transition-all duration-300 ${activeTab === 'archive' ? 'font-semibold' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('archive')}
                >
                    Archive
                    <div className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-all duration-300 ${activeTab === 'archive' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
            </div>

            {/* Conditional Rendering with Animation */}
            <AnimatePresence mode="wait">
                {activeTab === 'all' && (
                    <motion.div
                        key="all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<div className="h-96 rounded-lg border animate-pulse bg-muted/40" />}>
                            <AppointmentTable />
                        </Suspense>
                    </motion.div>
                )}
                {activeTab === 'queue' && (
                    <motion.div
                        key="queue"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<div className="h-96 rounded-lg border animate-pulse bg-muted/40" />}>
                            <AppointmentTable statusFilter="PENDING" />
                        </Suspense>
                    </motion.div>
                )}
                {activeTab === 'confirmed' && (
                    <motion.div
                        key="confirmed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<div className="h-96 rounded-lg border animate-pulse bg-muted/40" />}>
                            <AppointmentTable statusFilter="CONFIRMED" />
                        </Suspense>
                    </motion.div>
                )}
                {activeTab === 'archive' && (
                    <motion.div
                        key="archive"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<div className="h-96 rounded-lg border animate-pulse bg-muted/40" />}>
                            <AppointmentTable statusFilter={["COMPLETED", "CANCELLED"]} />
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Show Appointment Form when showForm is true */}
            <AppointmentForm show={showForm} setShow={setShowForm} />
        </div>
    );
}

export default Page;
