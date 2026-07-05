'use client'

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image';
import { motion } from 'framer-motion';

interface YourDentistProps {
    isHidden?: boolean;
}

const YourDentist : React.FC<YourDentistProps> = ({
    isHidden
}) => {
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
                    className='lg:w-[50%] '
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className='font-inter text-sm font-medium uppercase tracking-wider '>YOUR DENTIST</p>
                    <h1 className='font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-gray-950 text-center md:text-start'>Dr. Abel Mekonn</h1>
                    <p className='font-inter text-base md:text-lg font-normal text-gray-700 mt-8 w-full px-2'>
                        Dr. Abel is passionate about providing patient-focused care. He offers the full scope of oral healthcare treatments here in our local dental office. From routine care to surgical treatments and cosmetic touch-ups, he places you in control of every decision about your smile.
                    </p>

                    {/* Animated Button */}
                    {
                        !isHidden && 
                           <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="default" className='w-fit rounded-none shadow-md font-inter text-xl font-medium px-8 py-8 border-none mt-10 flex'>
                            About Us
                        </Button>
                    </motion.div>
                    }
                </motion.div>

                {/* Right Image Section */}
                <motion.div 
                    className='relative flex justify-center items-center md:w-[50%]'
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Image 
                        src={'/images/doc.png'}
                        alt="Your Dentist"
                        width={500}
                        height={500}
                        // className='w-[400px] h-[500px]'
                        className='fit'
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default YourDentist;
