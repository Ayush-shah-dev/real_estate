import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Award, Users, Building, Clock } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';

import { projects, getProjectsByCategory } from '../data/projects';
import { testimonials } from '../data/testimonials';

const HomePage: React.FC = () => {
  const ongoingProjects = getProjectsByCategory('ongoing').slice(0, 2);
  const completedProjects = getProjectsByCategory('completed').slice(0, 2);
  const upcomingProjects = getProjectsByCategory('upcoming').slice(0, 2);
  
  return (
    <>
      <HeroSlider />
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <span className="text-yellow-500 font-semibold">About ABS Real Estate</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900">Building Dreams Since 1995</h2>
                <div className="h-1 w-20 bg-yellow-500 mb-6"></div>
                <p className="text-gray-700 mb-6">
                  ABS Real Estate is a premier real estate developer with over 25 years of experience in creating exceptional living spaces. We combine innovative design, quality construction, and sustainable practices to deliver properties that exceed expectations.
                </p>
                <p className="text-gray-700 mb-6">
                  Our portfolio includes residential apartments, commercial complexes, and integrated townships across major Indian cities. We pride ourselves on our commitment to excellence, transparency, and customer satisfaction.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Award size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Quality Assurance</h3>
                    <p className="text-gray-600 text-sm">Superior materials and craftsmanship</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Users size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Customer Focus</h3>
                    <p className="text-gray-600 text-sm">Tailored solutions for your needs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Building size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">50+ Projects</h3>
                    <p className="text-gray-600 text-sm">Completed across India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Clock size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Timely Delivery</h3>
                    <p className="text-gray-600 text-sm">On-time project completion</p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
              >
                Learn more about us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-12 grid-rows-12 gap-3 h-full">
              <div className="col-span-7 row-span-7 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Modern building exterior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-5 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Luxury apartment interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-7 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Modern living room" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-7 row-span-5 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1795493/pexels-photo-1795493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Construction site" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Our Featured Projects" 
            subtitle="Discover our selection of premium properties across major Indian cities"
            center
          />
          
          <div className="flex flex-wrap mb-10 justify-center">
            <Link
              to="/projects/ongoing"
              className="px-6 py-2 m-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition-colors"
            >
              Ongoing
            </Link>
            <Link
              to="/projects/completed"
              className="px-6 py-2 m-2 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 transition-colors"
            >
              Completed
            </Link>
            <Link
              to="/projects/upcoming"
              className="px-6 py-2 m-2 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 transition-colors"
            >
              Upcoming
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* Show one of each category type for variety */}
            <ProjectCard project={completedProjects[0]} />
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/projects/ongoing"
              className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition-colors duration-300"
            >
              View All Projects <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Why Choose ABS Real Estate" 
            subtitle="We are committed to excellence and creating value for our customers"
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Premium Quality</h3>
              <p className="text-gray-200">
                We use only the finest materials and work with top architects and contractors to ensure unparalleled quality in all our projects.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Strategic Locations</h3>
              <p className="text-gray-200">
                Our properties are located in prime areas with excellent connectivity, proximity to essential amenities, and strong appreciation potential.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-full inline-block mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Customer Satisfaction</h3>
              <p className="text-gray-200">
                With a customer-first approach, we ensure transparent dealings and provide comprehensive support before, during, and after your purchase.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
                <p className="text-gray-200">Years of Experience</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <p className="text-gray-200">Completed Projects</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
                <p className="text-gray-200">Happy Families</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
                <p className="text-gray-200">Cities Presence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Client Testimonials" 
            subtitle="Don't just take our word for it - hear what our satisfied clients have to say"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/about#testimonials"
              className="inline-flex items-center px-6 py-3 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-medium rounded-md transition-colors duration-300"
            >
              View All Testimonials <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8 text-gray-800 max-w-3xl mx-auto">
            Contact us today to schedule a consultation with our expert team and discover the perfect property for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/projects/ongoing"
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-md transition-colors duration-300"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;