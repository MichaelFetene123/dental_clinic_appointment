import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { Button } from '../ui/button'


const AdminHero = () => {
    return (
        <Card className='card-bg '>
            <CardHeader className='text-3xl text-white font-heading'>
                Good Morning, Abebe Debebe 
            </CardHeader>
            <CardContent className='-mt-3'>
                <CardDescription>
                    <p className='md:w-[50%] text-gray-100 font-normal text-base'>Have nice day it seems like you are in the right place create appointment for your clients</p>
                    <Button className='bg-white text-black font-semibold mt-5 hover:bg-white hover:text-black'>Create Appointment</Button>
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default AdminHero