"use client"

import React from 'react'
import { Button } from '../ui/button'
import { IoMdCheckmark } from 'react-icons/io'
import { motion } from 'framer-motion'
import Link from 'next/link'


const ContactUs = () => {
    return (
        <div
            className='min-h-[84vh] w-full bg-cover bg-fixed bg-no-repeat lg:py-8 flex flex-col justify-center'
            style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/images/jose-vazquez-4SUyx4KQ5Ik-unsplash.jpg')",
            }}
        >
            <div className='w-11/12 mx-auto my-auto flex items-center md:items-end justify-center md:justify-end lg:px-3 h-full'>
                <motion.div
                    className='bg-card lg:py-16 py-10 lg:px-16 px-10 flex flex-col gap-4 rounded-tl-3xl rounded-br-3xl shadow-xl'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h4 className='font-inter text-lg font-medium text-muted-foreground'>
                        Feel free to reach out
                    </h4>
                    <h1 className='font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground mb-6'>
                        Making Dentistry Affordable
                    </h1>
                    <div className='space-y-2'>
                        {[
                            'We accept most insurance plans',
                            'We offer affordable rates for all patients',
                            'State-of-the-art dental technology',
                            'Experienced and friendly dental team',
                            'Comfortable and relaxing environment',
                        ].map((item, i) => (
                            <motion.p
                                key={i}
                                className='flex items-center font-inter text-base md:text-lg font-normal text-muted-foreground'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <IoMdCheckmark className='mr-2 text-primary flex-shrink-0' size={20} />
                                {item}
                            </motion.p>
                        ))}
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            asChild
                            variant="default"
                            size="lg"
                            className="h-10 md:h-14 lg:h-16 w-fit mt-5 px-4 md:px-6 lg:px-8 rounded-md shadow-md font-inter text-sm md:text-base lg:text-lg font-medium"
                        >
                            <Link href="/appointment">
                                Request Appointment
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default ContactUs
