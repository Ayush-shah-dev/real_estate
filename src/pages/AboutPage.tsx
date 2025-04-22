import React from 'react';
import { Award, Target, TrendingUp, CheckCircle } from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import TeamMemberCard from '../components/TeamMemberCard';
import TestimonialCard from '../components/TestimonialCard';

import { teamMembers } from '../data/team';
import { testimonials } from '../data/testimonials';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Buildings" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About ABS Real Estate</h1>
            <p className="text-xl text-gray-300">
              Building exceptional properties and creating memorable experiences since 1995
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Our Story" 
                subtitle="From humble beginnings to becoming one of India's leading real estate developers"
              />
              
              <div className="space-y-6 text-gray-700">
                <p>
                  Founded in 1995 by Amit Sharma, ABS Real Estate began with a vision to create living spaces that combine luxury, functionality, and sustainability. What started as a small venture with a single residential project in Mumbai has now grown into a nationwide presence with over 50 successful projects.
                </p>
                <p>
                  Throughout our journey, we have maintained an unwavering commitment to quality, innovation, and customer satisfaction. Our team of experienced professionals works tirelessly to ensure that every project we undertake reflects our core values and exceeds the expectations of our clients.
                </p>
                <p>
                  Today, ABS Real Estate is recognized as a trusted name in the industry, known for delivering premium properties that stand the test of time. Our portfolio includes a diverse range of projects, from luxury residential apartments to commercial complexes and integrated townships, each crafted with meticulous attention to detail and a deep understanding of our customers' needs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Our company history" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-yellow-500 p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold text-gray-900">25+</div>
                <p className="text-gray-900 font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionTitle 
              title="Our Mission & Vision" 
              subtitle="Guided by strong principles and a clear direction for the future"
              center
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-6">
                <Target size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To create exceptional living and working spaces that enhance the quality of life for our customers, while maintaining the highest standards of integrity, sustainability, and innovation in all our endeavors.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Deliver premium quality in every project</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Ensure complete customer satisfaction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Maintain transparency in all dealings</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-6">
                <TrendingUp size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700 mb-6">
                To be the most trusted and innovative real estate developer in India, setting new benchmarks in architectural excellence, sustainable development, and customer-centric practices.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Lead the industry in sustainable building practices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Expand our presence across major Indian cities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Create communities that stand the test of time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionTitle 
              title="Our Core Values" 
              subtitle="The principles that guide every decision we make"
              center
              light
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-300">
                We strive for excellence in every aspect of our business, from design and construction to customer service and after-sales support.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-300">
                We conduct our business with the highest levels of integrity, ensuring transparency, honesty, and ethical practices in all our dealings.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-300">
                We embrace innovation and continuously seek new ways to improve our designs, construction techniques, and customer experiences.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-300">
                We are committed to sustainable development practices that minimize environmental impact and create healthier living spaces.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Our Leadership Team" 
            subtitle="Meet the visionaries behind ABS Real Estate's success"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="What Our Clients Say" 
            subtitle="The trust and satisfaction of our clients is our greatest achievement"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;