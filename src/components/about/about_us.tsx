"use client"; // Enables animations in Next.js App Router

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutUs = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <div ref={sectionRef} className="w-full min-h-[90vh] flex flex-col justify-center py-14">
            <div className="w-[90%] lg:w-[85%] h-full mx-auto my-auto flex flex-col md:flex-row-reverse items-center justify-center md:justify-between gap-8 p-6">

                {/* Image Section with Animations */}
                <motion.div 
                    className="w-full md:w-2/5 h-full grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0, transition: { staggerChildren: 0.3, duration: 0.6, ease: "easeInOut" } } : {}}
                >
                    {["/images/d3.jpg", "/images/d4.jpg", "/images/d1.jpg", "/images/doc2.png"].map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="w-full h-full"
                        >
                            <Image
                                src={src}
                                alt={`About Us ${index + 1}`}
                                className={`w-full ${index < 2 ? "h-[300px]" : "h-full"} 
                                    ${index === 0 ? "rounded-tl-3xl" : ""} ${index === 3 ? "rounded-br-3xl" : ""}`}
                                width={200}
                                height={250}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Text Section with Slide-Up Effect */}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left font-subheading text-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 } } : {}}
                >
                    <h1 className="text-5xl font-bold mb-14 font-heading text-primary">
                        Hi! We&rsquo;re Classic Specialty
                    </h1>
                    <p className=" mb-4 font-heading text-base md:text-xl">
                        We’re more than just a dental practice – we’re a family passionate about creating healthy, confident smiles. Since 2002, our team of skilled and caring professionals has been blending advanced technology with a warm, personalized touch to redefine your dental experience.
                    </p>
                    <p className="mb-4 font-heading text-base md:text-xl">
                        Whether it’s routine care, cosmetic enhancements, or specialized treatments, we tailor every visit to your comfort and needs.
                    </p>
                    <p className="text-muted-foreground font-semibold font-heading mt-6 text-base md:text-xl">
                        Your smile is our priority, and we’re here to make it shine brighter than ever!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
