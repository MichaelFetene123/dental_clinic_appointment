'use client'
import AboutUs from '@/components/about/about_us'
import JoinUs from '@/components/about/JoinUs'
import MeetOurTeam from '@/components/about/MeetOurTeam'
import FAQComponent from '@/components/commonUi/faq'
import HeroSection from '@/components/Hero'
import ContactUs from '@/components/homePage/ContactUs'
import Testimony from '@/components/homePage/Testimony'
import VisitUs from '@/components/homePage/VisitUs'
import WhyChooseUs from '@/components/homePage/WhyChooseUs'
import YourDentist from '@/components/homePage/YourDentist'
import Layout from '@/components/layout/Layout'
import { faqs } from '@/lib/constants'
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
            <AboutUs />
            <ContactUs />
            <YourDentist isHidden={true} />
            <MeetOurTeam />
            <JoinUs />
            <Testimony />
            <WhyChooseUs />
            <VisitUs />
            <FAQComponent faqs={faqs} title="Frequently Asked Questions" />

        </Layout>
    )
}

export default page