import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { Button } from '../ui/button'


const AdminHero = () => {
    return (
        <Card className='bg-primary'>
            <CardHeader className='text-3xl text-primary-foreground font-heading'>
                Good Morning, Abebe Debebe 
            </CardHeader>
            <CardContent className='-mt-3'>
                <CardDescription>
                    <p className='md:w-1/2 text-primary-foreground/80 font-normal text-base'>Have nice day it seems like you are in the right place create appointment for your clients</p>
                    <Button variant="secondary" className='font-semibold mt-5'>Create Appointment</Button>
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default AdminHero