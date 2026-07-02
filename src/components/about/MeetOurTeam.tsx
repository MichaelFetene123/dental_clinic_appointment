"use client"; // Needed for animations in Next.js App Router

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Dr. John Doe",
    role: "Lead Dentist",
    image: "/images/d4.jpg",
    description: "Passionate about creating healthy, confident smiles.",
  },
  {
    name: "Dr. Sarah Smith",
    role: "Orthodontist",
    image: "/images/d4.jpg",
    description: "Specialist in braces and aligners with years of experience.",
  },
  {
    name: "Emily Johnson",
    role: "Dental Hygienist",
    image: "/images/d4.jpg",
    description: "Ensuring bright smiles with professional dental cleaning.",
  },
  {
    name: "Michael Brown",
    role: "Patient Coordinator",
    image: "/images/d4.jpg",
    description: "Making sure every patient feels comfortable and cared for.",
  },
];

const MeetOurTeam = () => {
  return (
    <div className="w-full bg-white min-h-[85vh] pt-10 pb-20 overflow-x-hidden">
      <div className="md:w-[80%] mx-auto px-5 text-center">
        <h1 className="text-3xl md:text-5xl text-[#104B82] font-semibold">Our Team</h1>
      </div>
      {/* Team Members Grid */}
      <motion.div 
        className="w-[90%] lg:w-[90%] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
        }}
      >
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index} 
            className="p-5 flex flex-col items-center text-center"
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={120}
              className=" md:w-full md:h-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-700">{member.role}</p>
            {/* <p className="text-sm text-gray-500 mt-2">{member.description}</p> */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MeetOurTeam;
