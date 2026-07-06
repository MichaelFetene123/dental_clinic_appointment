import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Check, ClipboardPlus, Plus } from 'lucide-react'
import Image from 'next/image'
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
                            <Image
                                src={"https://randomuser.me/api/portraits/women/2.jpg"}
                                alt="pp"
                                width={50}
                                height={50}
                                className="rounded-full "
                            />
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
                <CardFooter className='flex justify-between items-center '>
                    <Button variant="outline" className='text-lg hover:bg-destructive hover:text-destructive-foreground transition-colors ease-linear duration-300 font-semibold px-10'><Plus size={44} strokeWidth={2.75}  className='rotate-45'/> Cancel</Button>
                    <Button variant="default" className='transition-all ease-linear text-lg font-semibold px-10'> <Check size={44} strokeWidth={2.75} />Accept</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default InQueue