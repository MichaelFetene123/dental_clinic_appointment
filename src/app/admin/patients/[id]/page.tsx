"use client"
import PatientDetail from '@/components/admin/patient/patientDetail'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 '>
            <div className='flex justify-between mt-3'>
                <div className="flex gap-2 items-center">
                    <div>
                        <Image
                            src={"https://randomuser.me/api/portraits/women/2.jpg"}
                            alt="pp"
                            width={60}
                            height={60}
                            className="rounded-full "
                        />
                    </div>
                    <div>
                        <p className="text-lg font-heading font-medium">Abebe Kebede</p>
                        <p className="text-sm text-muted-foreground">Joined since jan-20-2024</p>
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
            <PatientDetail />
            
        </div>
    )
}

export default page