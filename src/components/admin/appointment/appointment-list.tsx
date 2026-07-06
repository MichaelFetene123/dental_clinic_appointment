"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, ClipboardPlus, Ellipsis } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
const appointments = [
    { name: 'Abel Mekonn', type: 'Canal test', date: 'Tomorrow', time: '10:00 AM' },
    { name: 'Sara Johnson', type: 'Teeth Cleaning', date: 'March 20', time: '2:00 PM' },
    { name: 'John Doe', type: 'Root Canal', date: 'March 21', time: '11:00 AM' },
    { name: 'Emily Smith', type: 'Braces Checkup', date: 'March 22', time: '3:30 PM' },
]

const AppointmentList = () => {
    return (
        <div>
            <Card className='p-6 min-h-[410px]'>
                <div className='flex justify-between mb-6'>
                    <p className='text-lg font-semibold flex gap-2'>
                        <ClipboardPlus className='self-center text-base text-primary' />
                        Appointment List
                    </p>
                    <Ellipsis />
                </div>
                {appointments.map((appointment, index) => (
                    <div key={index} className='mb-4'>
                        <div className='flex justify-between mb-1'>
                            <div className='flex flex-col'>
                                <p className='text-base font-medium text-foreground'>{appointment.name}</p>
                                <span className='text-muted-foreground text-sm'>{appointment.type}</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-sm font-medium text-foreground'>{appointment.date}</p>
                                <span className='text-sm text-muted-foreground'>{appointment.time}</span>
                            </div>

                        </div>
                        <Separator />
                    </div>
                ))}
                <div className='flex items-center justify-center py-2'>
                    <Button
                        asChild
                        className="font-semibold hover:scale-105 transition-all ease-in-out duration-300"
                    >
                        <Link href="/admin/patients">
                            All Patients <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AppointmentList
