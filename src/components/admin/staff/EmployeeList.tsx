import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Users, Ellipsis, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const employees = [
    { name: 'Abel Mekonn', position: 'Manager', department: 'Sales', contact: '987-654-3210' },
    { name: 'Sara Johnson', position: 'Developer', department: 'Engineering', contact: '123-456-7890' },
    { name: 'John Doe', position: 'HR Specialist', department: 'Human Resources', contact: '555-123-4567' },
    { name: 'Emily Smith', position: 'Designer', department: 'Creative', contact: '222-333-4444' },
]

const EmployeeList = () => {
    return (
        <Card className='flex flex-col min-h-[430px]'>
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className='text-lg font-semibold flex gap-2 items-center'>
                    <Users className='text-primary h-5 w-5' />
                    Employee List
                </CardTitle>
                <Ellipsis className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent className="flex-1">
                {employees.map((employee, index) => (
                    <div key={index} className='mb-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col flex-1'>
                                <p className='text-sm font-medium leading-none'>{employee.name}</p>
                                <span className='text-sm text-muted-foreground mt-1.5'>{employee.position}</span>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p className='text-xs text-muted-foreground'>{employee.contact}</p>
                            </div>
                        </div>
                        {index < employees.length - 1 && <Separator />}
                    </div>
                ))}
            </CardContent>
            <CardFooter className='flex justify-center pt-2'>
                <Button
                    asChild
                    variant="default"
                    className="font-semibold hover:scale-105 transition-all ease-in-out duration-300"
                >
                    <Link href="/admin/staff">
                        All Staff <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default EmployeeList

