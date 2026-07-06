import React from 'react';
import { CheckCircle, Clock, Shield, Smile } from "lucide-react";
import { CLINIC_NAME } from '@/lib/constants';

const ForYou = () => {
  const items = [
    {
      title: "Transparent Pricing",
      description: `At ${CLINIC_NAME} Dental, the cost of cosmetic dentistry treatment is clear and affordable.`,
      icon: <CheckCircle size={32} className="text-blue-600" />,
    },
    {
      title: "A Dental Spa",
      description: "Essential oils, a warm compress — time to relax and have some fun.",
      icon: <Smile size={32} className="text-blue-600" />,
    },
    {
      title: "Efficient Care",
      description: "We know you’re busy. Your time with us will be efficient and well worth it.",
      icon: <Clock size={32} className="text-blue-600" />,
    },
    {
      title: "Safety First",
      description: "Medical-grade sterilization, enhanced PPE, and more to keep you safe.",
      icon: <Shield size={32} className="text-blue-600" />,
    },
  ];

  return (
          <div className="py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-16">This part is all for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-6 flex flex-col items-center text-center bg-muted/50"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-foreground mt-4">{item.title}</h3>
              <p className="text-base text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForYou;
