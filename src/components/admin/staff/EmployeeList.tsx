"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users, Ellipsis, ArrowRight } from 'lucide-react'
import React from 'react'


const employees = [
    { name: 'Abel Mekonn', position: 'Manager', department: 'Sales', contact: '987-654-3210' },
    { name: 'Sara Johnson', position: 'Developer', department: 'Engineering', contact: '123-456-7890' },
    { name: 'John Doe', position: 'HR Specialist', department: 'Human Resources', contact: '555-123-4567' },
    { name: 'Emily Smith', position: 'Designer', department: 'Creative', contact: '222-333-4444' },
]

const EmployeeList = () => {
    return (
        <div>
            <Card className='p-6 min-h-[430px]'>
                <div className='flex justify-between mb-6'>
                    <p className='text-lg font-semibold flex gap-2'>
                        <Users className='self-center text-base text-[#3383c8]' />
                        Employee List
                    </p>
                    <Ellipsis />
                </div>
                {employees.map((employee, index) => (
                    <div key={index} className='mb-4'>
                        <div className='flex justify-between mb-1'>
                            <div className='flex flex-col'>
                                <p className='text-[17px]'>{employee.name}</p>
                                <span className='text-gray-600 text-sm'>{employee.position}</span>
                                {/* <span className='text-gray-600 text-sm'>{employee.department}</span> */}
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-sm'>{employee.contact}</p>
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}
                <div className='flex items-center justify-center py-2'>
                    <Button
                        className="card-bg font-semibold hover:scale-105 transition-all ease-in-out duration-300"
                        onClick={() => { window.location.href = "admin/patients" }}
                    >
                        All Patients <ArrowRight />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default EmployeeList
