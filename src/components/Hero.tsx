'use client'
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
    title?: string;
    subtitle?: React.ReactNode; // Allow both text and JSX elements
    buttonText?: string;
    backgroundImage?: string;
    phoneNumbers?: string[];
    location?: string;
}


const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    buttonText,
    backgroundImage,
    phoneNumbers = [],
    location
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Remove cz-shortcut-listen attribute if it exists
        const body = document.body;
        if (body.hasAttribute('cz-shortcut-listen')) {
            body.removeAttribute('cz-shortcut-listen');
        }
        setIsMounted(true);
    }, []);

    // Suppress hydration warnings for this component
    useEffect(() => {
        const suppressHydrationWarning = () => {
            const originalConsoleError = console.error;
            console.error = (...args) => {
                if (args[0]?.includes('Hydration failed')) {
                    return;
                }
                originalConsoleError.apply(console, args);
            };
        };
        suppressHydrationWarning();
        return () => {
            console.error = console.error;
        };
    }, []);

    return (
        <div className="h-screen md:h-[100vh] relative flex items-center text-white" suppressHydrationWarning>
            {/* Optimized Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero background"
                        fill
                        priority
                        quality={75}
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            )}
            
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 px-6 w-full flex flex-col justify-end mb-20 h-full">
                <div className="w-[90%] mx-auto md:gap-5 flex flex-col justify-center">
                    {/* Static Title */}
                    <h1 className="font-inter text-sm font-medium text-white uppercase tracking-wider leading-tight mt-10">
                        {title}
                    </h1>
                    
                    {/* Static Subtitle */}
                    <p className="font-instrument-serif text-[32px] md:text-[52px] lg:text-[70px] font-normal text-white max-w-3xl leading-tight">
                        {subtitle}
                    </p>

                    {/* Static Button */}
                    <div className="w-fit">
                        <Button variant="default" className="h-[70px] mt-2 px-8 rounded-none shadow-md text-xl font-inter font-medium">
                            {buttonText}
                        </Button>
                    </div>

                    {/* Phone and Location */}
                    <div className="mt-4 w-fit">
                        {phoneNumbers.map((phone, index) => (
                            <h4 key={index} className="flex items-center gap-3 font-inter text-lg font-medium text-white hover:text-[#dd9639] w-fit mb-4">
                                <div className="bg-primary h-[40px] w-[40px] hover:text-[#dd9639] flex items-center justify-center rounded-full">
                                    <FaPhoneVolume size={20} />
                                </div>
                                <a href={`tel:${phone}`} className="transition-colors duration-300">
                                    {phone}
                                </a>
                            </h4>
                        ))}
                        {location && (
                            <h4 className="mt-4 flex items-center gap-3 font-inter text-lg font-medium text-white hover:text-[#dd9639] w-fit">
                                <div className="bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-full">
                                    <FaLocationDot size={20} />
                                </div>
                                <p>{location}</p>
                            </h4>
                        )}
                    </div>
                </div>
            </div>

            {/* Client-side only animations */}
            <AnimatePresence>
                {isMounted && (
                    <>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeroSection;
