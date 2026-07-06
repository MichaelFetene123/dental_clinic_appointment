import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Check, ClipboardPlus, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'


const InQueue = () => {
    return (
        <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3'>
            <Card>
                <CardHeader>
                    <div className="flex gap-3 items-center">
                        <div className='h-10 w-10 border-2 shadow-inner rounded-full flex items-center justify-between'>
                            <ClipboardPlus className='self-center mx-auto' />
                        </div>
                        <CardTitle>#1234</CardTitle>
                    </div>
                </CardHeader>
                <Separator className='my-3'/>
                <CardContent className=''>
                    <div className='flex justify-between mb-5'>
                        <div className='flex gap-3 items-center w-[60%]'>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="https://randomuser.me/api/portraits/women/2.jpg" alt="Patient photo" />
                                <AvatarFallback className="bg-primary/10 text-primary">AK</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardDescription >Patient name</CardDescription>
                                <CardTitle className='text-base mt-2'>Abebe Kebede</CardTitle>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <CardDescription>Date of register</CardDescription>
                            <CardTitle className='text-base mt-2'>12 Dec,2025</CardTitle>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-[60%]'>
                            <CardDescription >Telephone number</CardDescription>
                            <CardTitle className='text-base mt-2'>0923434344</CardTitle>
                        </div>
                        <div className='w-[40%]'>
                            <CardDescription>Email</CardDescription>
                            <CardTitle className='text-base mt-2'>Abebe@gmail.com</CardTitle>
                        </div>
                    </div>
                </CardContent>
                <Separator className='my-3 px-4' />
                <CardFooter className='flex justify-between items-center gap-4'>
                    <Button variant="outline" className='flex-1 text-sm md:text-base hover:bg-destructive hover:text-destructive-foreground transition-colors ease-linear duration-300 font-semibold'><Plus className='mr-2 h-4 w-4 rotate-45'/> Cancel</Button>
                    <Button variant="default" className='flex-1 transition-all ease-linear text-sm md:text-base font-semibold'> <Check className='mr-2 h-4 w-4' /> Accept</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default InQueue