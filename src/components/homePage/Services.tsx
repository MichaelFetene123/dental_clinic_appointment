import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { servicesData } from '@/lib/constants';

interface ServiceListProps {
    isHidden?: boolean;
}

interface ServiceCardProps {
    service: typeof servicesData[number];
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => (
    <motion.div
        className='w-[340px] lg:w-[400px] mx-auto p-4 hover:bg-card hover:shadow-md rounded-t-[13px] cursor-pointer hover:-translate-y-6 transition-all duration-300 ease-in-out'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.6,
            delay: index * 0.5,
            ease: 'easeOut',
        }}
        viewport={{ once: true }}
    >
        <Image
            src={service.imageSrc}
            alt={service.alt}
            width={380}
            height={400}
            className='rounded-t-[6px] w-[340px] lg:w-[380px] h-[320px] object-cover'
        />
        <h2 className='font-instrument-serif text-2xl font-normal text-foreground my-3'>
            {service.name}
        </h2>
        <p className='font-inter text-base font-normal text-muted-foreground mb-6'>
            {service.description.length > 200
                ? `${service.description.substring(0, 200)}...`
                : service.description}
        </p>
        <Button
            asChild
            variant="outline"
            className="h-[70px] px-8 border-2 border-primary rounded-none font-inter text-xl font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
        >
            <Link href={'/appointment'}>Request Appointment</Link>
        </Button>
    </motion.div>
);

const ServicesList: React.FC<ServiceListProps> = ({ isHidden }) => {
    const services = isHidden ? servicesData : servicesData.slice(0, 6);

    return (
        <div className='w-screen md:min-h-[100vh] py-8'>
            <div className="w-[90%] mx-auto items-center">

                <div className='mb-12 pt-10'>
                    <p className='font-inter text-sm font-medium text-primary uppercase tracking-wider mb-2 px-2'>
                        SERVICES
                    </p>
                    <h2 className='font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-foreground mb-4'>
                        Tailored treatments just for you
                    </h2>
                    <p className='font-inter text-base md:text-lg font-normal text-muted-foreground max-w-2xl px-2'>
                        Our services are designed to meet the unique needs of each individual, ensuring that you receive the best
                        possible care.
                    </p>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

                {!isHidden && (
                    <div className='flex justify-center mt-12 mb-5'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                        >
                            <Button
                                asChild
                                variant="outline"
                                className="h-[70px] px-8 border-2 border-primary rounded-none font-inter text-xl font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                            >
                                <Link href={"/services"}>View All Services</Link>
                            </Button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ServicesList;
