import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Office interior" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300">
              We're here to answer any questions you may have about our properties
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-4">
                <MapPin size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Our Location</h3>
              <p className="text-gray-700">
                ABS Towers, 123 Business Park, <br />
                Andheri East, Mumbai 400069
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-4">
                <Phone size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Phone Number</h3>
              <p className="text-gray-700">
                <a href="tel:+919876543210" className="hover:text-yellow-600 transition-colors">
                  +91 98765 43210
                </a>
                <br />
                <a href="tel:+911234567890" className="hover:text-yellow-600 transition-colors">
                  +91 123 456 7890
                </a>
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-4">
                <Mail size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Email Address</h3>
              <p className="text-gray-700">
                <a href="mailto:info@absrealestate.com" className="hover:text-yellow-600 transition-colors">
                  info@absrealestate.com
                </a>
                <br />
                <a href="mailto:sales@absrealestate.com" className="hover:text-yellow-600 transition-colors">
                  sales@absrealestate.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle 
                title="Get in Touch" 
                subtitle="Fill out the form below, and our team will get back to you shortly"
              />
              
              <ContactForm />
            </div>
            
            <div>
              <SectionTitle 
                title="Visit Our Office" 
                subtitle="We'd love to meet you in person to discuss your requirements"
              />
              
              <div className="rounded-lg overflow-hidden shadow-md mb-8 h-96">
                {/* Replace with actual Google Maps embed */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74110193967773!3d19.08268809671484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1622709315843!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="ABS Real Estate Office Location"
                ></iframe>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock size={20} className="text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-gray-700">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={20} className="text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Saturday</p>
                      <p className="text-gray-700">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={20} className="text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Sunday</p>
                      <p className="text-gray-700">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Find quick answers to common inquiries"
            center
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-gray-900">How quickly can I expect a response to my inquiry?</h3>
                <p className="text-gray-700">
                  We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our sales team directly.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Can I schedule a site visit to see your properties?</h3>
                <p className="text-gray-700">
                  Absolutely! We encourage potential buyers to visit our properties. You can schedule a site visit by filling out the contact form or calling our sales team.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Do you have branch offices in other cities?</h3>
                <p className="text-gray-700">
                  Yes, we have branch offices in major Indian cities including Delhi, Bangalore, Chennai, and Hyderabad. Please contact our main office for specific addresses and contact information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;