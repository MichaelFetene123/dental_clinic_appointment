'use client'

import React from 'react';
import { Button } from '../ui/button';
import { FaCheckCircle } from "react-icons/fa";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const reasons = [
    'Expert & Caring Team',
    'State-of-the-Art Equipment',
    'Comprehensive Treatment Options',
    'Affordable Care Plans',
];

const WhyChooseUs = () => {

    return (
        <div className='w-full min-h-[60vh] pt-10 pb-20 overflow-x-hidden'>
            <motion.div
                className='w-[90%] mx-auto flex flex-col sm:flex-col lg:flex-row justify-between items-center'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {/* Left Image Section */}
                <motion.div
                    className='relative'
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={'/images/atikah-akhtar-XJptUS8nbhs-unsplash.jpg'}
                        alt="Why Choose Us"
                        width={500}
                        height={500}
                        className='border-2 border-border rounded-lg inverted-radius'
                    />
                </motion.div>

                {/* Right Content Section */}
                <motion.div
                    className='lg:w-[50%]'
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <h2 className='font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-foreground mt-10'>
                        Why Classic Specialty
                    </h2>
                    <p className='font-inter text-base md:text-lg font-normal text-muted-foreground mt-8'>
                        At Classic Dental, we understand the importance of a confident smile, and we are committed to providing exceptional dental care. Here are a few reasons why you should choose us:
                    </p>

                    {/* Key Reasons List */}
                    <div className='mt-8 space-y-6'>
                        {reasons.map((reason) => (
                            <div key={reason} className='flex items-center'>
                                <FaCheckCircle className='text-primary text-2xl mr-3 flex-shrink-0' />
                                <p className='font-inter text-base md:text-lg font-normal text-muted-foreground'>{reason}</p>
                            </div>
                        ))}
                    </div>

                    {/* Animated Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            asChild
                            variant="default"
                            className='w-fit rounded-none shadow-md font-inter text-xl font-medium px-8 py-8 border-none mt-10 flex'
                        >
                            <Link href="/appointment">
                                Book now
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default WhyChooseUs;
