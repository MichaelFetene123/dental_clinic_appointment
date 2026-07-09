"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Check, ClipboardPlus, Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { AppointmentStatus } from '@prisma/client'
import { useAppointments, useUpdateAppointmentStatus } from '@/hooks/use-appointments'
import { format } from 'date-fns'
import React from 'react'

const InQueue = () => {
    const { data, isLoading } = useAppointments("PENDING" as AppointmentStatus)
    const updateStatus = useUpdateAppointmentStatus()
    const [pendingId, setPendingId] = React.useState<string | null>(null)

    const handle = async (id: string, status: AppointmentStatus) => {
        setPendingId(id)
        await updateStatus(id, status)
        setPendingId(null)
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-52 rounded-xl" />
                ))}
            </div>
        )
    }

    const appointments = data?.data ?? []

    if (appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
                <ClipboardPlus className="h-10 w-10 opacity-40" />
                <p className="text-sm">No appointments in queue.</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {appointments.map((appt) => (
                <Card key={appt.id}>
                    <CardHeader>
                        <div className="flex gap-3 items-center">
                            <div className='h-10 w-10 border-2 shadow-inner rounded-full flex items-center justify-between'>
                                <ClipboardPlus className='self-center mx-auto h-5 w-5' />
                            </div>
                            <CardTitle className="text-sm text-muted-foreground truncate">{appt.id.slice(0, 8).toUpperCase()}</CardTitle>
                        </div>
                    </CardHeader>
                    <Separator className='my-3' />
                    <CardContent>
                        <div className='flex justify-between mb-5'>
                            <div className='flex gap-3 items-center w-[60%]'>
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {appt.patientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardDescription>Patient name</CardDescription>
                                    <CardTitle className='text-base mt-2 truncate'>{appt.patientName}</CardTitle>
                                </div>
                            </div>
                            <div className='w-[40%]'>
                                <CardDescription>Date</CardDescription>
                                <CardTitle className='text-base mt-2'>{format(new Date(appt.date), 'dd MMM, yyyy')}</CardTitle>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[60%]'>
                                <CardDescription>Reason</CardDescription>
                                <CardTitle className='text-base mt-2 truncate'>{appt.reason}</CardTitle>
                            </div>
                            <div className='w-[40%]'>
                                <CardDescription>Time</CardDescription>
                                <CardTitle className='text-base mt-2'>{appt.time}</CardTitle>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className='my-3 px-4' />
                    <CardFooter className='flex justify-between items-center gap-4'>
                        <Button
                            variant="outline"
                            className='flex-1 text-sm md:text-base hover:bg-destructive hover:text-destructive-foreground transition-colors ease-linear duration-300 font-semibold'
                            disabled={pendingId === appt.id}
                            onClick={() => handle(appt.id, "CANCELLED" as AppointmentStatus)}
                        >
                            <Plus className='mr-2 h-4 w-4 rotate-45' /> Cancel
                        </Button>
                        <Button
                            variant="default"
                            className='flex-1 transition-all ease-linear text-sm md:text-base font-semibold'
                            disabled={pendingId === appt.id}
                            onClick={() => handle(appt.id, "CONFIRMED" as AppointmentStatus)}
                        >
                            <Check className='mr-2 h-4 w-4' /> Accept
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default InQueue