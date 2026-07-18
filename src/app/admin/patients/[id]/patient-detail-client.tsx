"use client"

import PatientDetail from '@/components/admin/patient/patientDetail'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { usePatientDetail } from '@/hooks/use-patients'
import { Skeleton } from '@/components/ui/skeleton'
import { GrantAccessModal } from '@/components/admin/patient/GrantAccessModal'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
interface PatientDetailClientProps {
    id: string;
}

export default function PatientDetailClient({ id }: PatientDetailClientProps) {
    const { data: patient, isLoading } = usePatientDetail(id)
    const [grantModalOpen, setGrantModalOpen] = useState(false);

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
                        <p className="text-lg font-heading font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Joined since {patient.createdAt.toString().split('T')[0]}</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    {patient.userId ? (
                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 h-10 px-4 cursor-pointer" onClick={() => setGrantModalOpen(true)}>
                            Portal Active
                        </Badge>
                    ) : (
                        <Button variant="outline" onClick={() => setGrantModalOpen(true)}>
                            Grant Online Access
                        </Button>
                    )}
                    <Button
                        size="lg"
                        className="font-semibold"
                    >
                        Add Appointment
                    </Button>
                </div>
            </div>
            <PatientDetail patient={patient} />
            <GrantAccessModal 
                patientId={patient.id} 
                patientName={patient.name} 
                defaultEmail={patient.email} 
                hasAccess={!!patient.userId} 
                open={grantModalOpen} 
                onOpenChange={setGrantModalOpen} 
            />
        </div>
    )
}
