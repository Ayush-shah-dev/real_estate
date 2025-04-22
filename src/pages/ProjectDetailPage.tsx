import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeft, CheckCircle, Home, Dumbbell, Warehouse, Shield } from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';

import { getProjectById } from '../data/projects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');
  const [activeImage, setActiveImage] = useState(0);
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/projects/ongoing" 
          className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Browse Our Projects
        </Link>
      </div>
    );
  }
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleGoBack} 
            className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Projects
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-200 rounded-xl overflow-hidden mb-4">
                <img 
                  src={project.images[activeImage] || project.coverImage} 
                  alt={project.title} 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-md overflow-hidden cursor-pointer border-2 ${
                      activeImage === index ? 'border-yellow-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} - view ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                project.category === 'ongoing' ? 'bg-blue-500 text-white' : 
                project.category === 'completed' ? 'bg-green-500 text-white' :
                'bg-yellow-500 text-gray-900'
              }`}>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
              
              <div className="flex items-center text-gray-700 mb-6">
                <MapPin size={18} className="mr-2 text-yellow-500" />
                <span>{project.location}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{project.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Starting Price:</span>
                  <span className="text-xl font-bold text-yellow-600">{project.price}</span>
                </div>
                {project.estimatedCompletion && (
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-yellow-500" />
                    <span className="text-gray-700">Estimated Completion: {project.estimatedCompletion}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <a 
                  href="#contact-form" 
                  className="px-6 py-3 bg-yellow-500 text-white text-center font-medium rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Inquire Now
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 text-center font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionTitle 
                title="Project Highlights" 
                subtitle="Key features that make this property exceptional"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-yellow-500 mr-2 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Premium Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.amenities.map((amenity, index) => {
                    // Determine icon based on amenity name
                    let IconComponent = CheckCircle;
                    if (amenity.toLowerCase().includes('pool')) IconComponent = Home;
                    else if (amenity.toLowerCase().includes('gym')) IconComponent = Dumbbell;
                    else if (amenity.toLowerCase().includes('security')) IconComponent = Shield;
                    else if (amenity.toLowerCase().includes('club')) IconComponent = Warehouse;
                    
                    return (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          <IconComponent size={16} className="text-yellow-600" />
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {project.floorPlans && project.floorPlans.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Floor Plans</h3>
                  <div className="space-y-4">
                    {project.floorPlans.map((plan, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{plan}</span>
                          <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div id="contact-form">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Interested in this project?</h3>
                <p className="text-gray-700 mb-6">
                  Fill out the form below, and our team will get in touch with you shortly to provide more information.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Prime Location" 
            subtitle="Strategically located with excellent connectivity and proximity to essential amenities"
            center
          />
          
          <div className="rounded-lg overflow-hidden shadow-md h-96 mb-8">
            {/* Replace with actual Google Maps embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74110193967773!3d19.08268809671484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1622709315843!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title={`${project.title} Location`}
            ></iframe>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Nearby Landmarks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">International Airport</p>
                  <p className="text-gray-600 text-sm">15 mins drive</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Metro Station</p>
                  <p className="text-gray-600 text-sm">5 mins walk</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Shopping Mall</p>
                  <p className="text-gray-600 text-sm">10 mins drive</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Schools & Colleges</p>
                  <p className="text-gray-600 text-sm">Within 3 km radius</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Hospitals</p>
                  <p className="text-gray-600 text-sm">5 km radius</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <MapPin size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">IT Park</p>
                  <p className="text-gray-600 text-sm">20 mins drive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Make This Property Your Own?</h2>
          <p className="text-xl mb-8 text-gray-800 max-w-3xl mx-auto">
            Contact our sales team today to schedule a site visit or to get more information about this project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210" 
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-300"
            >
              Call Us Now
            </a>
            <a 
              href="#contact-form" 
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-md transition-colors duration-300"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;