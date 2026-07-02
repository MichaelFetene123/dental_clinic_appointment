import React from "react";
import { Phone, Calendar, Mail } from "lucide-react"; 
import { CLINIC_PHONE } from "@/lib/constants"; 

const ReachOut: React.FC = () => {
  return (
    <div className="z-50 bg-white block md:hidden max-w-md mx-auto px-4 fixed bottom-0 left-0 right-0">
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center flex-col justify-center mb-4">
          <Phone size={24} className="text-classic_yellow bold" />
          <a
            href={`tel:${CLINIC_PHONE}`}
            className="text-lg text-classic_yellow bold"
          >
            Call Us
          </a>
        </div>
        <div className="flex items-center flex-col justify-center mb-4">
          <Calendar size={24} className="text-classic_yellow bold" />
          <a href="/book-online" className="text-classic_yellow bold text-lg">
            Book Online
          </a>
        </div>
        <div className="flex items-center flex-col justify-center mb-4">
          <Mail size={24} className="text-classic_yellow bold " />
          <a
            href="mailto:contact@yourdomain.com"
            className="text-classic_yellow bold text-lg"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;
