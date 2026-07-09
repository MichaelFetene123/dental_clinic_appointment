"use client"
import PatientDetail from '@/components/admin/patient/patientDetail'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useParams } from 'next/navigation'
import { usePatientDetail } from '@/hooks/use-patients'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
    const params = useParams()
    const id = params?.id as string
    const { data: patient, isLoading } = usePatientDetail(id)

    if (isLoading) {
        return (
            <div className='flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6'>
                <div className='flex justify-between mt-3'>
                    <div className="flex gap-2 items-center">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!patient) {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className="text-2xl font-bold">Patient Not Found</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 '>
            <div className='flex justify-between mt-3'>
                <div className="flex gap-2 items-center">
                    <div>
                        <Image
                            src={"https://randomuser.me/api/portraits/women/2.jpg"} // Placeholder
                            alt="pp"
                            width={60}
                            height={60}
                            className="rounded-full "
                        />
                    </div>
                    <div>
                        <p className="text-lg font-heading font-medium">{patient.user.name}</p>
                        <p className="text-sm text-muted-foreground">Joined since {patient.user.createdAt.toString().split('T')[0]}</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button
                        size="lg"
                        className="font-semibold"

                    >
                        Add Appointment
                    </Button>
                </div>
            </div>
            <PatientDetail patient={patient} />
        </div>
    )
}

export default Page