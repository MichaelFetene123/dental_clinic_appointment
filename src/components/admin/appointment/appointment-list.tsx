import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowRight, ClipboardPlus, Ellipsis } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import type { AppointmentStatus } from '@prisma/client'

type RecentAppointment = {
    id: string;
    patientName: string;
    reason: string;
    date: Date;
    time: string;
    status: AppointmentStatus;
};

interface AppointmentListProps {
    recentAppointments?: RecentAppointment[];
}

const AppointmentList = ({ recentAppointments = [] }: AppointmentListProps) => {
    return (
        <Card className='flex flex-col min-h-[430px]'>
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className='text-lg font-semibold flex gap-2 items-center'>
                    <ClipboardPlus className='text-primary h-5 w-5' />
                    Recent Appointments
                </CardTitle>
                <Ellipsis className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent className="flex-1">
                {recentAppointments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No recent appointments.</p>
                ) : (
                    recentAppointments.map((appointment, index) => (
                        <div key={appointment.id} className='mb-4'>
                            <div className='flex items-center gap-4 mb-4'>
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col flex-1'>
                                    <p className='text-sm font-medium leading-none'>{appointment.patientName}</p>
                                    <span className='text-sm text-muted-foreground mt-1.5'>{appointment.reason}</span>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p className='text-sm font-medium'>{format(new Date(appointment.date), 'MMM d')}</p>
                                    <span className='text-xs text-muted-foreground mt-1'>{appointment.time}</span>
                                </div>
                            </div>
                            {index < recentAppointments.length - 1 && <Separator />}
                        </div>
                    ))
                )}
            </CardContent>
            <CardFooter className='flex justify-center pt-2'>
                <Button asChild variant="default" className="font-semibold">
                    <Link href="/admin/appointment">
                        All Appointments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AppointmentList
