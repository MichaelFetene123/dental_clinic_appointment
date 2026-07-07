import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../ui/card'
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
        className='w-full sm:w-80 lg:w-96 mx-auto cursor-pointer hover:-translate-y-6 transition-transform duration-300 ease-in-out'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.6,
            delay: index * 0.5,
            ease: 'easeOut',
        }}
        viewport={{ once: true }}
    >
        <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col">
            <div className="overflow-hidden">
                <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    width={380}
                    height={400}
                    className='w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105'
                />
            </div>
            <CardHeader>
                <CardTitle className='font-instrument-serif text-2xl font-normal text-foreground'>
                    {service.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className='font-inter text-base font-normal text-muted-foreground'>
                    {service.description.length > 200
                        ? `${service.description.substring(0, 200)}...`
                        : service.description}
                </CardDescription>
            </CardContent>
            <CardFooter className='justify-center'>
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-10 md:h-14 lg:h-16 px-4 md:px-6 lg:px-8 border-2 border-primary font-inter text-sm md:text-base lg:text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 just"
                >
                    <Link href={'/appointment'}>Request Appointment</Link>
                </Button>
            </CardFooter>
        </Card>
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
                    <h2 className='font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground mb-4'>
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
                                size="lg"
                                className="h-10 md:h-14 lg:h-16 px-4 md:px-6 lg:px-8 border-2 border-primary font-inter text-sm md:text-base lg:text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
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
