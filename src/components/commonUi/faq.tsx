import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Tqa = {
  question: string;
  answer: string;
};

type TFaq = {
  faqs: Tqa[];
  title: string;
  classes?: string;
};

const FAQComponent = ({ title, faqs, classes }: TFaq) => {
  return (
    <div className="w-[90%] mx-auto px-3 flex justify-center items-center flex-col lg:flex-row py-16">
      {/* Left Section */}
      <div className=" lg:pr-8 md:pl-10 my-5 md:my-0">
        <h2 className={`font-instrument-serif text-[32px] md:text-[52px] lg:text-[68px] font-normal text-gray-950 ${classes}`}>{title}</h2>
        <p className="my-10 font-inter text-base md:text-lg font-normal text-gray-700">
          More questions? We&rsquo;re ready to help. Give us a call at {" "} 
          <a href={`tel: 720 730-9140`}> 
          (720) 730-9140{" "} </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:max-w-[50%] w-[50%]">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              value={faq.question}
              key={index}
              className="border my-3 px-3 border-black"
            >
              <AccordionTrigger className="font-inter text-lg font-medium text-gray-950">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-inter text-base font-normal text-gray-700 text-justify">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQComponent;
