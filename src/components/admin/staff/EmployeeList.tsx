import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Users, Ellipsis, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


import { Skeleton } from '@/components/ui/skeleton'
import { useStaff } from '@/hooks/use-staff'

const EmployeeList = () => {
    const { data, isLoading } = useStaff()
    const employees = data?.data ?? []

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
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full rounded-md" />
                        ))}
                    </div>
                ) : employees.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                        No staff members found.
                    </div>
                ) : (
                    employees.slice(0, 5).map((employee, index) => (
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
                                <p className='text-xs text-muted-foreground'>{employee.phone}</p>
                            </div>
                        </div>
                        {index < Math.min(employees.length, 5) - 1 && <Separator />}
                    </div>
                )))}
            </CardContent>
            <CardFooter className='flex justify-center pt-2'>
                <Button
                    asChild
                    variant="default"
                    className="font-semibold"
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

