import React, { useRef } from "react";
import { treatmentSteps } from "@/lib/data/services";
import { FaCheckCircle } from 'react-icons/fa';
import { motion, useScroll } from "framer-motion";

type Props = {
    treatmentName: string;
};

const TreatmentSteps = ({ treatmentName }: Props) => {
    const steps = (treatmentSteps as { [key: string]: string[] })[treatmentName];
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold text-center text-gray-800 mb-16"
                >
                    Your Journey to a Perfect Smile
                </motion.h2>
                <div className="relative w-[95%] md:w-[85%] mx-auto">
                    <div className="relative">
                        {/* Animated progress line */}
                        <motion.div 
                            className="absolute ml-3 md:ml-0 md:block w-1 bg-gradient-to-b from-primary/30 to-primary h-full md:left-1/2 transform -translate-x-1/2"
                            style={{
                                scaleY: scrollYProgress,
                                transformOrigin: "top"
                            }}
                        />
                        
                        {steps?.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className={`md:flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
                            >
                                <div className="relative md:w-1/2 px-8 py-4">
                                    <motion.div 
                                        className={`absolute w-14 h-14 rounded-full bg-white shadow-lg top-0 flex items-center justify-center 
                                            ${index % 2 === 0 ? '-left-7' : '-right-7'}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaCheckCircle size={28} className="text-primary" />
                                    </motion.div>
                                    <motion.div 
                                        className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300
                                            transform hover:-translate-y-1 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-700 flex items-center gap-3 mb-3">
                                            <span className="text-primary">Step {index + 1}</span>
                                        </h3>
                                        <p className="text-gray-600 text-lg leading-relaxed">{step}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentSteps;
