import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
        <Card className='flex flex-col min-h-[430px]'>
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className='text-lg font-semibold flex gap-2 items-center'>
                    <ClipboardPlus className='text-primary h-5 w-5' />
                    Appointment List
                </CardTitle>
                <Ellipsis className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent className="flex-1">
                {appointments.map((appointment, index) => (
                    <div key={index} className='mb-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {appointment.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col flex-1'>
                                <p className='text-sm font-medium leading-none'>{appointment.name}</p>
                                <span className='text-sm text-muted-foreground mt-1.5'>{appointment.type}</span>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p className='text-sm font-medium'>{appointment.date}</p>
                                <span className='text-xs text-muted-foreground mt-1'>{appointment.time}</span>
                            </div>
                        </div>
                        {index < appointments.length - 1 && <Separator />}
                    </div>
                ))}
            </CardContent>
            <CardFooter className='flex justify-center pt-2'>
                <Button
                    asChild
                    variant="default"
                    className="font-semibold hover:scale-105 transition-all ease-in-out duration-300"
                >
                    <Link href="/admin/appointment">
                        All Appointments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AppointmentList
