import Image from 'next/image'
import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div
            className='w-full md:h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center py-8'
            style={{ backgroundImage: "url('/images/image0_0.jpg')" }}
        >
            <motion.div
                className='w-[90%] mx-auto md:flex md:flex-wrap lg:flex-nowrap justify-between items-center border-2 border-white/30 rounded-3xl px-8 py-10'
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {/* Left Content Section */}
                <motion.div
                    className='md:w-[50%] text-white'
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className='font-instrument-serif text-3xl md:text-5xl font-normal text-white mb-5'>
                        World-Class Specialists | Painless Treatments | Personalized Care
                    </h2>
                    <p className='font-inter text-base md:text-lg font-normal text-white leading-relaxed'>
                        We welcome patients of all ages, from curious 3-year-olds to wise seniors.
                        Our expert team is committed to exceptional care, lifelong relationships, and stress-free experiences
                        in a warm, welcoming environment.
                    </p>

                    {/* Key Benefits List */}
                    <motion.ul
                        className='mt-6 space-y-3 font-inter text-base font-normal text-white'
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <li className='flex items-center'>
                            <IoMdCheckmark className='text-accent mr-2' size={30} />
                            <strong>Transparent &amp; Honest Pricing</strong>
                        </li>
                        <li className='flex items-center'>
                            <IoMdCheckmark className='text-accent mr-2' size={30} />
                            <strong>Unmatched Warranty</strong>
                        </li>
                        <li className='flex items-center'>
                            <IoMdCheckmark className='text-accent mr-2' size={30} />
                            <strong>FREE Lifetime Whitening!</strong>
                        </li>
                    </motion.ul>

                    <motion.p
                        className='mt-6 flex items-center border-l-4 border-accent px-4 italic font-inter text-lg font-normal text-white'
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        &#x201F; Your Comfort, Our Priority! From painless treatments to cutting-edge technology, we ensure a gentle and satisfying dental experience. &#x201F;
                    </motion.p>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    className='flex-shrink-0 mt-6 lg:mt-0 md:w-[45%] self-start h-full relative'
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={"/images/atikah-akhtar-XJptUS8nbhs-unsplash.jpg"}
                        alt='Expert Dentist'
                        width={300}
                        height={300}
                        className='shadow-lg w-full h-full rounded-lg'
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About;
