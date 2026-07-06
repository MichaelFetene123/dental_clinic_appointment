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
      <div className="lg:pr-8 md:pl-10 my-5 md:my-0">
        <h2 className={`font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground ${classes}`}>
          {title}
        </h2>
        <p className="my-10 font-inter text-base md:text-lg font-normal text-muted-foreground">
          More questions? We&rsquo;re ready to help. Give us a call at{" "}
          <a
            href="tel:7207309140"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            (720) 730-9140
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:max-w-[50%] w-[50%]">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              value={faq.question}
              key={index}
              className="border border-border my-3 px-3 rounded-md"
            >
              <AccordionTrigger className="font-inter text-lg font-medium text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-inter text-base font-normal text-muted-foreground text-justify">
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
