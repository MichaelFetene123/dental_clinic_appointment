'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceDetailProps {
    serviceName: string;
    imageSrc: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceName,imageSrc }) => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col lg:flex-row gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Left side - Service Image */}
                    <div className="lg:w-1/2">
                        <Image
                            src={imageSrc}
                            alt={`${serviceName} Service`}
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* Right side - Service Information */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold text-[#104B82] mb-6">
                            {serviceName} Treatment
                        </h2>
                        <div className="space-y-4 text-gray-600">
                            <p className="text-lg">
                                Our {serviceName} services are designed to provide you with the highest quality dental care.
                                We use state-of-the-art technology and proven techniques to ensure optimal results.
                            </p>

                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold text-[#104B82] mb-4">Benefits</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Improved oral health and hygiene</li>
                                    <li>Enhanced smile aesthetics</li>
                                    <li>Long-lasting results</li>
                                    <li>Personalized treatment plans</li>
                                    <li>Expert care from experienced professionals</li>
                                </ul>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold text-[#104B82] mb-4">What to Expect</h3>
                                <p className="text-lg">
                                    During your visit, our experienced team will conduct a thorough examination and discuss
                                    your specific needs. We&apos;ll create a customized treatment plan that aligns with your goals
                                    and ensures your comfort throughout the procedure.
                                </p>
                            </div>

                            <motion.div
                                className="mt-8"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/appointment">
                                    <Button className="h-[60px] px-8 text-lg font-semibold">
                                        Schedule Consultation
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetail;