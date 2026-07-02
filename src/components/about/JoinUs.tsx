"use client"; // Needed for animations in Next.js App Router

import React from "react";
import { motion } from "framer-motion";

const JoinUs = () => {
    return (
        <div
            className="w-full min-h-[60vh] flex flex-col justify-center items-center text-white relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/image0_0.jpg')" }}
        >
            {/* Lighter Overlay for better visibility */}
            <div className="absolute inset-0 bg-black/20"></div> {/* Changed from bg-black/50 to bg-black/30 */}

            {/* Content Section */}
            <motion.div
                className="relative z-10 text-center px-5 max-w-3xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h1 className="text-4xl font-heading md:text-5xl font-bold mb-10 drop-shadow-lg">
                    Join Our Team
                </h1>
                <p className="text-lg md:text-xl font-subheading text-white mb-2 ">
                    At Classic Specialty, we believe that providing the best patient experience starts with having the best doctors, hygienists, assistants, and support staff.  
                    If you’re passionate about delivering quality dental care and want to help us create a welcoming, positive environment, we’d love to hear from you!  
                    Introduce yourself at:
                </p>
                
                {/* Clickable Email Address */}
                <motion.a
                    href="mailto:careers@villagedental.com"
                    className="text-xl font-semibold text-[#ffcc00] hover:text-[#ffd633] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                >
                    careers@villagedental.com
                </motion.a>
            </motion.div>
        </div>
    );
};

export default JoinUs;
