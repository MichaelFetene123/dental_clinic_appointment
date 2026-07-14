"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaCalendarAlt, FaTooth } from 'react-icons/fa';


const data = [
  { image: '/images/services/stage1.png', title:"Make Appointment" , description: 'Schedule an appointment ', icon: <FaCalendarAlt /> },
  { image: '/images/services/stage2.png', title: "Expert Dental Care", description: 'Speak with a dentist about your goals', icon:<FaUserDoctor /> },
  { image: '/images/services/stage3.png', title: "Radiate Confidence", description: 'Create a plan and start your smile journey', icon:<FaTooth />}
];

const GetStarted = () => {
  return (
    <div className="relative">
      <div className="w-[90%] mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className=" mb-16"
        >
          <p className="font-inter text-sm font-medium text-primary uppercase tracking-wider mb-4">How It Work</p>
          <h2 className="font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground mb-4 w-1/2">Your Journey to a Healthy Smile Starts Here</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          { data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl min-h-[380px] p-8 flex flex-col justify-between group"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient Overlay for better readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-all duration-500 group-hover:bg-black/50" />
              
              <div className="relative z-10 text-4xl w-20 h-20 flex items-center justify-center bg-primary text-primary-foreground rounded-full transform group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <div className="relative z-10 mt-auto transform group-hover:-translate-y-2 transition-transform duration-500">
                <p className="font-instrument-serif text-3xl font-normal text-white mt-2">
                  {item.title}
                </p>
                <p className="font-inter text-base font-normal text-white/80 mt-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            variant="default"
            className="px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 font-inter text-sm md:text-base lg:text-lg font-medium rounded-lg"
          >
            <Link href="/appointment">
              Request Appointment
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;
