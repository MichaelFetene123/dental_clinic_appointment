import React from 'react'
import { Phone, Mail, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';


const Footer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Call to Action Section */}
      <div
        className="w-full py-20 text-white relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative w-[90%] mx-auto px-4 text-center">
          <h2 className="font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-white mb-6">
            Transform Your Smile Today
          </h2>
          <p className="font-inter text-base md:text-lg font-normal text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Experience world-class dental care with our team of experts. Schedule your visit now and take the first step towards your perfect smile.
          </p>
          <Button
            asChild
            variant="default"
            className="flex items-center gap-2 mx-auto px-8 py-6 rounded-full font-inter text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
          >
            <Link href="/appointment">
              Book Appointment
              <Calendar className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="w-[90%] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div>
              <h3 className="font-instrument-serif text-2xl font-normal text-primary-foreground mb-6">
                DentalCare Plus
              </h3>
              <p className="font-inter text-base font-normal mb-6 text-primary-foreground/70">
                Leading the way in modern dentistry with compassionate care and cutting-edge technology.
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+251911123456"
                  className="flex items-center gap-3 font-inter text-base font-normal text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +251 911 123 456
                </a>
                <a
                  href="mailto:info@dentalcare.com"
                  className="flex items-center gap-3 font-inter text-base font-normal text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  info@dentalcare.com
                </a>
                <div className="flex items-center gap-3 font-inter text-base font-normal text-primary-foreground/70">
                  <MapPin className="w-5 h-5" />
                  Addis Ababa, Ethiopia
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-instrument-serif text-2xl font-normal text-primary-foreground mb-6">
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  'General Dentistry',
                  'Cosmetic Dentistry',
                  'Orthodontics',
                  'Dental Implants',
                  'Teeth Whitening',
                  'Oral Surgery'
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="flex items-center gap-2 font-inter text-base font-normal text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="font-instrument-serif text-2xl font-normal text-primary-foreground mb-6">
                Opening Hours
              </h3>
              <ul className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' }
                ].map((schedule) => (
                  <li key={schedule.day} className="font-inter text-base font-normal text-primary-foreground/70">
                    <span className="flex justify-between">
                      <span>{schedule.day}</span>
                      <span className="text-accent font-medium">{schedule.hours}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-instrument-serif text-2xl font-normal text-primary-foreground mb-6">
                Newsletter
              </h3>
              <p className="font-inter text-base font-normal mb-4 text-primary-foreground/70">
                Subscribe to our newsletter for dental health tips and updates.
              </p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
                />
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-inter text-base font-medium transition-colors"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="font-inter text-sm font-normal text-primary-foreground/70">
                © {new Date().getFullYear()} DentalCare Plus. All rights reserved.
              </div>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebook, href: '#', name: "facebook" },
                  { Icon: FaInstagram, href: '#', name: "instagram" },
                  { Icon: FaTwitter, href: '#', name: "twitter" },
                ].map(({ Icon, href, name }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="p-2 rounded-full bg-primary-foreground/20 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
