'use client';

import React, { useState, useEffect } from 'react';
import { IoStarSharp } from "react-icons/io5";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/constants';


const Testimony = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Create extended array for seamless infinite scroll
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <div className='w-full pb-8 pt-16'>
            <div className='w-[90%] mx-auto px-4'>
                {/* Header */}
                <div className=' mb-12'>
                    <p className='font-inter text-sm font-medium uppercase tracking-wider mb-2'>TESTIMONIALS</p>
                    <h2 className='font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-gray-950 mb-4'>What Our Patients Say</h2>
                    <p className='font-inter text-base md:text-lg font-normal text-gray-700 max-w-2xl'>
                        Real experiences from our valued patients who trust us with their dental care
                    </p>
                </div>

                {/* Carousel Container */}
                <div className='relative overflow-hidden'>
                    <motion.div
                        className='flex gap-6'
                        animate={{
                            x: -currentIndex * 340 // 320px card width + 20px gap
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: `${extendedTestimonials.length * 340}px`
                        }}
                    >
                        {extendedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.name}-${index}`}
                                className='min-w-[350px]  rounded-xl p-6 shadow-sm border-2 border-primary hover:shadow-md transition-shadow duration-300'
                            >
                                {/* Stars */}
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-1 mb-4'>
                                        {[...Array(testimonial.stars)].map((_, idx) => (
                                            <IoStarSharp key={idx} className='text-yellow-400' size={16} />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className='font-inter text-base md:text-lg font-normal text-gray-800 leading-relaxed mb-6'>
                                        {testimonial.text}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className='flex items-center gap-3 self-end'>
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={40}
                                        height={40}
                                        className='w-10 h-10 rounded-full object-cover'
                                    />
                                    <div>
                                        <p className='font-inter text-sm font-medium text-gray-950'>{testimonial.name}</p>
                                        <p className='font-inter text-xs font-normal text-gray-600'>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Pagination Dots */}
                <div className='flex justify-center gap-2 mt-8'>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex
                                    ? 'bg-primary'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimony;
