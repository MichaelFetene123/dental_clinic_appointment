import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'


const AdminHero = () => {
    return (
        <Card className='bg-primary border-none'>
            <CardHeader>
                <CardTitle className='text-2xl md:text-3xl text-primary-foreground font-heading'>
                    Good Morning, Abebe Debebe 
                </CardTitle>
                <CardDescription className='text-primary-foreground/80 font-normal text-sm md:text-base md:w-1/2 mt-2'>
                    Have a nice day! It seems like you are in the right place to create appointments for your clients.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="secondary" size="lg" className='font-semibold h-10 md:h-12 px-4 md:px-6 text-sm md:text-base'>
                    Create Appointment
                </Button>
            </CardContent>
        </Card>
    )
}

export default AdminHero