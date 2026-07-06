'use client'
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
    title?: string;
    subtitle?: React.ReactNode;
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
        const body = document.body;
        if (body.hasAttribute('cz-shortcut-listen')) {
            body.removeAttribute('cz-shortcut-listen');
        }
        setIsMounted(true);
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Hero Content */}
            <AnimatePresence>
                {isMounted && (
                    <motion.div
                        className="relative z-10 px-6 w-full flex flex-col justify-end mb-20 h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-[90%] mx-auto md:gap-5 flex flex-col justify-center">
                            {/* Title */}
                            <h1 className="font-inter text-sm font-medium text-white uppercase tracking-wider leading-tight mt-10">
                                {title}
                            </h1>

                            {/* Subtitle */}
                            <p className="font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-white max-w-3xl leading-tight">
                                {subtitle}
                            </p>

                            {/* CTA Button */}
                            <div className="w-fit">
                                <Button
                                    asChild
                                    variant="default"
                                    size="lg"
                                    className="h-16 mt-2 px-8 rounded-md shadow-md text-lg font-inter font-medium"
                                >
                                    <Link href="/appointment">
                                        {buttonText}
                                    </Link>
                                </Button>
                            </div>

                            {/* Phone and Location */}
                            <div className="mt-4 w-fit">
                                {phoneNumbers.map((phone, index) => (
                                    <div key={index} className="flex items-center gap-3 font-inter text-lg font-medium text-white hover:text-accent w-fit mb-4 transition-colors duration-300">
                                        <div className="bg-primary h-10 w-10 flex items-center justify-center rounded-full">
                                            <FaPhoneVolume size={20} />
                                        </div>
                                        <a href={`tel:${phone}`} className="transition-colors duration-300">
                                            {phone}
                                        </a>
                                    </div>
                                ))}
                                {location && (
                                    <div className="mt-4 flex items-center gap-3 font-inter text-lg font-medium text-white hover:text-accent w-fit transition-colors duration-300">
                                        <div className="bg-primary h-10 w-10 flex items-center justify-center rounded-full">
                                            <FaLocationDot size={20} />
                                        </div>
                                        <p>{location}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeroSection;
