'use client'

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface YourDentistProps {
    isHidden?: boolean;
}

const YourDentist: React.FC<YourDentistProps> = ({ isHidden }) => {
    return (
        <div className='w-full min-h-[90vh] pt-10 pb-10 overflow-x-hidden flex flex-col items-center'>
            <motion.div
                className='w-[90%] mx-auto my-auto px-5 flex flex-col-reverse lg:flex-row justify-between items-center'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {/* Left Content Section */}
                <motion.div
                    className='lg:w-[50%]'
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className='font-inter text-sm font-medium text-primary uppercase tracking-wider'>
                        YOUR DENTIST
                    </p>
                    <h1 className='font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground text-center md:text-start'>
                        Dr. Abel Mekonn
                    </h1>
                    <p className='font-inter text-base md:text-lg font-normal text-muted-foreground mt-8 w-full px-2'>
                        Dr. Abel is passionate about providing patient-focused care. He offers the full scope of oral healthcare treatments here in our local dental office. From routine care to surgical treatments and cosmetic touch-ups, he places you in control of every decision about your smile.
                    </p>

                    {/* Animated Button */}
                    {!isHidden && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className='w-fit rounded-md shadow-md font-inter text-sm md:text-base lg:text-lg font-medium h-10 md:h-14 lg:h-16 px-4 md:px-6 lg:px-8 border-none mt-10 flex'
                            >
                                <Link href="/about">
                                    About Us
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    className='relative flex justify-center items-center md:w-[50%]'
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className='bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8 mt-10 lg:mt-0 max-w-[380px] flex justify-center items-center overflow-hidden'>
                        <Image
                            src={'/images/doc.png'}
                            alt="Your Dentist"
                            width={400}
                            height={400}
                            className='object-contain w-full h-auto'
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default YourDentist;
