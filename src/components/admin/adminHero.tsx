import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth/guards'
import { Skeleton } from '../ui/skeleton'

import { DynamicGreeting } from './DynamicGreeting'

async function UserGreetingName() {
    const session = await requireAuth();
    return <span>{session.userName}</span>
}

const AdminHero = () => {
    return (
        <Card className='bg-primary border-none'>
            <CardHeader>
                <CardTitle className='text-2xl md:text-3xl text-primary-foreground font-heading flex items-center gap-2'>
                    <DynamicGreeting />
                    <Suspense fallback={<Skeleton className="h-7 w-32 bg-primary-foreground/20" />}>
                        <UserGreetingName />
                    </Suspense>
                </CardTitle>
                <CardDescription className='text-primary-foreground/80 font-normal text-sm md:text-base md:w-1/2 mt-2'>
                    Have a nice day! It seems like you are in the right place to create appointments for your clients.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/admin/appointment">
                    <Button variant="secondary" size="lg" className='font-semibold h-10 md:h-12 px-4 md:px-6 text-sm md:text-base'>
                        Create Appointment
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default AdminHero
