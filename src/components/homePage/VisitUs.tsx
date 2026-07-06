import React from 'react'
import { FaMapMarked, FaPhoneAlt, FaClock, FaEnvelope } from 'react-icons/fa'


const contactDetails = [
  {
    Icon: FaMapMarked,
    size: 30,
    label: 'Address:',
    content: (
      <p className='font-inter text-base md:text-lg font-normal text-muted-foreground'>
        Classic Specialty Dental Center,<br />Bisrate Gebrale, Adot cinema, Addis Ababa, Ethiopia
      </p>
    ),
  },
  {
    Icon: FaPhoneAlt,
    size: 25,
    label: 'Phone:',
    content: (
      <p className='font-inter text-base md:text-lg font-normal text-muted-foreground'>+251 911 123 456</p>
    ),
  },
  {
    Icon: FaClock,
    size: 25,
    label: 'Working Hours:',
    content: (
      <p className='font-inter text-base md:text-lg font-normal text-muted-foreground'>Mon - Sun: 2:00 AM - 12:00 PM</p>
    ),
  },
  {
    Icon: FaEnvelope,
    size: 25,
    label: 'Email:',
    content: (
      <p className='font-inter text-base md:text-lg font-normal text-muted-foreground'>ethiopclassic24@gmail.com</p>
    ),
  },
];

const VisitUs = () => {
  return (
    <div className='w-full py-14 flex items-center'>
      <div className='w-[90%] mx-auto h-full flex justify-between my-auto pt-10'>

        {/* Left Section - Contact Information */}
        <div className='lg:w-[40%]'>
          <div>
            <h4 className='font-inter text-sm font-medium text-primary uppercase tracking-wider mb-3'>
              Visit us
            </h4>
            <h1 className='font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground'>
              We can&rsquo;t wait to meet you!
            </h1>
          </div>

          {/* Contact Details */}
          <div className='mt-6 space-y-6'>
            {contactDetails.map(({ Icon, size, label, content }) => (
              <div key={label} className='flex gap-3'>
                <div className="h-9 w-9 text-muted-foreground hover:text-accent flex items-center justify-center transition-colors duration-200">
                  <Icon size={size} />
                </div>
                <div>
                  <h4 className='font-instrument-serif text-2xl font-normal text-foreground'>{label}</h4>
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Google Map */}
        <div className='md:block hidden w-[55%] h-[400px] rounded-xl overflow-hidden shadow-lg self-center'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3940.7788681785023!2d38.7246556!3d8.9924848!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87464f970d1b%3A0x2258c2817028a1b7!2sClassic%20Specialty%20Dental%20Center!5e0!3m2!1sen!2set!4v1740397029906!5m2!1sen!2set"
            className='w-full h-full border-0'
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  )
}

export default VisitUs