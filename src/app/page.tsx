'use client'
import { useEffect, useState } from "react";
import About from "@/components/homePage/about";
import ContactUs from "@/components/homePage/ContactUs";
import ServicesList from "@/components/homePage/Services";
import Testimony from "@/components/homePage/Testimony";
import VisitUs from "@/components/homePage/VisitUs";
import WhyChooseUs from "@/components/homePage/WhyChooseUs";
import YourDentist from "@/components/homePage/YourDentist";
import Loader from "@/components/Loader";  // Import the Loader component
import HeroSection from "@/components/Hero";
import Layout from "@/components/layout/Layout";
import FAQComponent from "@/components/commonUi/faq";
import { faqs } from "@/lib/constants";
import GetStarted from "@/components/services/GetStarted";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");

    if (hasVisited) {
      setLoading(false);  // Skip loader on repeat visits
    } else {
      localStorage.setItem("visited", "true");
      setTimeout(() => setLoading(false), 1200);  // Show loader for 2 seconds on first visit
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />  // Show loader only on first visit
      ) : (
        <Layout>
          <HeroSection
            title="Your Trusted Classic Specialty"
            subtitle={
              <>
                <span className="font-instrument-serif text-3xl md:text-4xl lg:text-[80px] max-w-3xl leading-tight">Experience top-quality dental care with a gentle touch.</span>
              </>
            }
            buttonText="Request Appointment"
            backgroundImage="/images/atikah-akhtar-XJptUS8nbhs-unsplash.jpg"
            phoneNumbers={["+251909696945"]}
            location="Bisrate Gebrale, Adot Cinema, Addis Ababa"
          />
          <About />
          <Testimony />
          <ServicesList isHidden={false} />
          <ContactUs />
          <YourDentist isHidden={false} />
          <WhyChooseUs />
          <GetStarted />
          <VisitUs />
          <FAQComponent faqs={faqs} title="Frequently Asked Questions" />
        </Layout>
      )}
    </>
  );
}
