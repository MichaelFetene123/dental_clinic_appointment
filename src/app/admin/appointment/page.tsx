"use client"
import { useState } from 'react';
import { AppointmentTable } from '@/components/admin/appointment/appointment-table';
import Archive from '@/components/admin/appointment/archive';
import InQueue from '@/components/admin/appointment/inQueue';
import { SectionCards } from '@/components/admin/sidebar/section-cards';
import { AlertTriangleIcon, CalendarCheckIcon, CircleCheckBig, TrendingDownIcon, TrendingUpIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AppointmentForm from '@/components/admin/forms/appointmentForm';
import AppointmentCalendar from '@/components/admin/appointment/AppointmentCalendar';

const Page = () => {
    const [activeTab, setActiveTab] = useState<'accepted' | 'queue' | 'archive'>('accepted');
    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    const cardData = [
        {
            title: "Total Patients",
            value: 125,
            description: "Number of Patients",
            icon: <Users className="text-[#0e4e81]" />,
            badge: { text: "+10%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Scheduled Appointments",
            value: 340,
            description: "Number of Appointments",
            icon: <CalendarCheckIcon className="text-[#0e4e81]" />,
            badge: { text: "+5%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Completed Procedures",
            value: 210,
            description: "Number of Procedures",
            icon: <CircleCheckBig className="text-[#0e4e81]" />,
            badge: { text: "+12%", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Emergency Cases",
            value: 8,
            description: "Number of Cases",
            icon: <AlertTriangleIcon className="text-[#0e4e81]" />,
            badge: { text: "Critical", icon: <TrendingDownIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
    ];

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Appointments</h1>
                <Button
                    size="lg"
                    className="bg-[#407C82] hover:bg-[#366A70] font-semibold"
                    onClick={() => setShowForm(!showForm)} // Toggle form visibility
                >
                    {showForm ? "Close Form" : "Add Appointment"}
                </Button>
            </div>

            <SectionCards data={cardData} />

            <AppointmentCalendar/>

            {/* Tab Navigation */}
            <div className="flex gap-4 border-b-2 py-2 px-4">
                <button
                    className={`relative px-4 py-2 text-gray-700 transition-all duration-300 ${activeTab === 'accepted' ? 'font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('accepted')}
                >
                    Accepted
                    <div className={`absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 transition-all duration-300 ${activeTab === 'accepted' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
                <button
                    className={`relative px-4 py-2 text-gray-700 transition-all duration-300 ${activeTab === 'queue' ? 'font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('queue')}
                >
                    In Queue
                    <div className={`absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 transition-all duration-300 ${activeTab === 'queue' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
                <button
                    className={`relative px-4 py-2 text-gray-700 transition-all duration-300 ${activeTab === 'archive' ? 'font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('archive')}
                >
                    Archive
                    <div className={`absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 transition-all duration-300 ${activeTab === 'archive' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                </button>
            </div>

            {/* Conditional Rendering with Animation */}
            <AnimatePresence mode="wait">
                {activeTab === 'accepted' && (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AppointmentTable />
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
                        <InQueue />
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
                        <Archive />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Show Appointment Form when showForm is true */}
            <AppointmentForm show={showForm} setShow={setShowForm} />
        </div>
    );
}

export default Page;
