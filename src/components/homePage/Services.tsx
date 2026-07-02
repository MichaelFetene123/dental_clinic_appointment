import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'  // Import framer-motion
import Link from 'next/link';
import { servicesData } from '@/lib/constants';
interface ServiceListProps {
    isHidden?: boolean;
}

const ServicesList: React.FC<ServiceListProps> = ({
    isHidden
}) => {
    // Array of services data


    return (
        <div className='w-screen md:min-h-[100vh] py-8'>
            <div className="w-[90%] mx-auto items-center">

                <div className=' mb-12  pt-10'>
                    <p className='font-inter text-sm font-medium uppercase tracking-wider mb-2 px-2'>SERVICES</p>
                    <h2 className='font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-gray-950 mb-4'>Tailored treatments just for you</h2>
                    <p className='font-inter text-base md:text-lg font-normal text-gray-700 max-w-2xl px-2'>
                        Our services are designed to meet the unique needs of each individual, ensuring that you receive the best
                        possible care.
                    </p>
                </div>

                {/* Map over the services array to create service cards */}
                {
                    isHidden ? (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 justify-center '>
                            {servicesData.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className='w-[340px] lg:w-[400px] mx-auto p-4 hover:bg-white hover:shadow-md rounded-t-[13px] cursor-pointer hover:-translate-y-6 transition-all duration-300 ease-in-out'
                                    initial={{ opacity: 0, y: 50 }}  // Initial position and opacity
                                    animate={{ opacity: 1, y: 0 }}   // Final position and opacity
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.5,   // Sequential animation with step-by-step delay
                                        ease: 'easeOut',
                                    }}  // Staggered entrance animation based on index
                                    viewport={{ once: true }}

                                >
                                    <Image
                                        src={service.imageSrc}
                                        alt={service.alt}
                                        width={380}
                                        height={400}
                                        className='rounded-t-[6px] w-[340px] lg:w-[380px] h-[320px] bg-contain'
                                    />
                                    <h2 className='font-instrument-serif text-2xl font-normal text-gray-950 my-3'>{service.name}</h2>
                                    <p className='font-inter text-base font-normal text-gray-700 mb-6'>{service.description.length > 200 ? `${service.description.substring(0, 200)}...` : service.description}</p>
                                    <Button variant="default" className="h-[70px] px-8 hover:bg-[#53898e] hover:text-white bg-white text-black border-2 border-[#53898e] rounded-none font-inter text-xl font-medium">
                                        <Link href={'/appointment'}>Request Appointment</Link>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 justify-center '>
                            {servicesData.slice(0, 6).map((service, index) => (
                                <motion.div
                                    key={index}
                                    className='w-[340px] lg:w-[400px] mx-auto p-4 hover:bg-white hover:shadow-md rounded-t-[13px] cursor-pointer hover:-translate-y-6 transition-all duration-300 ease-in-out'
                                    initial={{ opacity: 0, y: 50 }}  // Initial position and opacity
                                    animate={{ opacity: 1, y: 0 }}   // Final position and opacity
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.5,   // Sequential animation with step-by-step delay
                                        ease: 'easeOut',
                                    }}  // Staggered entrance animation based on index
                                    viewport={{ once: true }}

                                >
                                    <Image
                                        src={service.imageSrc}
                                        alt={service.alt}
                                        width={380}
                                        height={400}
                                        className='rounded-t-[6px] w-[340px] lg:w-[380px] h-[320px] bg-contain'
                                    />
                                    <h2 className='font-instrument-serif text-2xl font-normal text-gray-950 my-3'>{service.name}</h2>
                                    <p className='font-inter text-base font-normal text-gray-700 mb-6'>{service.description.length > 200 ? `${service.description.substring(0, 200)}...` : service.description}</p>
                                    <Button variant="default" className="h-[70px] px-8 hover:bg-[#53898e] hover:text-white bg-white text-black border-2 border-[#53898e] rounded-none font-inter text-xl font-medium">
                                        <Link href={'/appointment'}>Request Appointment</Link>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )
                }

                {
                    !isHidden && <div className='flex justify-center mt-12 mb-5'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}   // Hover animation for the button
                            whileTap={{ scale: 0.95 }}    // Tap effect
                            viewport={{ once: true }}
                        >
                            <Button className="h-[70px] px-8 hover:bg-[#53898e] hover:text-white bg-white text-black border-2 border-[#53898e] rounded-none font-inter text-xl font-medium">
                                <Link href={"/services"}>View All Services</Link>
                            </Button>
                        </motion.div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ServicesList;
