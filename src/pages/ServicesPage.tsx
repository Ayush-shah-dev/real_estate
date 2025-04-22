import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';

import { services } from '../data/services';

const ServicesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Office building" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="How We Can Help You" 
            subtitle="From project development to after-sales service, we provide end-to-end real estate solutions"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Our Process" 
            subtitle="A structured approach to ensure excellence in every project"
            center
          />
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-200 z-0"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 relative z-10">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">1. Consultation & Planning</h3>
                    <p className="text-gray-700">
                      We begin with a detailed consultation to understand your requirements, preferences, and budget. Our team then creates a comprehensive plan tailored to your needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full text-white font-bold text-lg z-10">1</div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              {/* Item 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full text-white font-bold text-lg z-10">2</div>
                <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">2. Design & Development</h3>
                    <p className="text-gray-700">
                      Our architectural team creates detailed designs and plans, incorporating innovative features and sustainable practices. We collaborate closely with you to refine the designs.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">3. Construction & Quality Control</h3>
                    <p className="text-gray-700">
                      We use premium materials and work with skilled contractors to bring the designs to life. Our rigorous quality control measures ensure that every aspect meets our high standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full text-white font-bold text-lg z-10">3</div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              {/* Item 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full text-white font-bold text-lg z-10">4</div>
                <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">4. Delivery & After-Sales Support</h3>
                    <p className="text-gray-700">
                      We deliver the project on time and provide comprehensive after-sales support, including property management services, maintenance, and addressing any concerns you may have.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about our services"
            center
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900">What types of properties do you develop?</h3>
                <p className="text-gray-700">
                  We develop a wide range of properties, including residential apartments, villas, commercial complexes, and integrated townships. Our portfolio caters to various segments, from affordable housing to ultra-luxury properties.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900">How can I invest in your projects?</h3>
                <p className="text-gray-700">
                  We offer various investment opportunities across our portfolio. Our investment advisory team can guide you through the available options, potential returns, and assist you in selecting the right investment strategy based on your goals.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900">What financing options are available?</h3>
                <p className="text-gray-700">
                  We have partnerships with leading banks and financial institutions that offer competitive home loan rates. Our team can assist you with loan application, documentation, and processing to ensure a smooth experience.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Do you provide after-sales services?</h3>
                <p className="text-gray-700">
                  Yes, we provide comprehensive after-sales services, including property management, maintenance, and addressing any concerns you may have. Our customer service team is available to assist you even after the property handover.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900">What sets your properties apart from others?</h3>
                <p className="text-gray-700">
                  Our properties stand out due to their strategic locations, innovative designs, premium quality, and superior amenities. We focus on creating living spaces that enhance quality of life while ensuring long-term value appreciation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-800 max-w-3xl mx-auto">
            Contact our team today to discuss your real estate needs and discover how we can help you achieve your goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-300"
          >
            Contact Us <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;