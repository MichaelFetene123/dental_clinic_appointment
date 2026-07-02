'use client'

import HeroSection from '@/components/Hero'
import About from '@/components/homePage/about'
import ContactUs from '@/components/homePage/ContactUs'
import ServicesList from '@/components/homePage/Services'
import Testimony from '@/components/homePage/Testimony'
import Layout from '@/components/layout/Layout'
import TreatmentSteps from '@/components/services/treatmentSteps '
import React from 'react'


const page = () => {
    return (
        <Layout>
            <HeroSection
                title="About Our Dental Practice"
                subtitle={
                    <>
                        <span className="block md:mb-2 mt-2 md:mt-0 text-[50px]">Excellence in Every Smile</span>
                        <span className="block text-[50px] leading-[50px]">Gentle, expert care you can trust.</span>
                    </>
                }
                buttonText="Learn More"
                backgroundImage="/images/jose-vazquez-4SUyx4KQ5Ik-unsplash.jpg"
                phoneNumbers={["+251909696945", "+251909696946"]}
                location="Bisrate Gebrale, Adot Cinema, Addis Ababa"
            />

            <About />

            <ServicesList isHidden={true}/>
            <TreatmentSteps treatmentName='Root Canal Treatment'/>
            <ContactUs />
            <Testimony />

        </Layout>
    )
}

export default page