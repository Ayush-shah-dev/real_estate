import React from 'react';
import { useParams } from 'react-router-dom';

import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';

import { getProjectsByCategory } from '../data/projects';

const ProjectsPage: React.FC = () => {
  const { category = 'ongoing' } = useParams<{ category: 'ongoing' | 'completed' | 'upcoming' }>();
  const projects = getProjectsByCategory(category as any);
  
  const getCategoryTitle = () => {
    switch (category) {
      case 'ongoing':
        return 'Ongoing Projects';
      case 'completed':
        return 'Completed Projects';
      case 'upcoming':
        return 'Upcoming Projects';
      default:
        return 'Our Projects';
    }
  };
  
  const getCategoryDescription = () => {
    switch (category) {
      case 'ongoing':
        return 'Discover our current projects under construction with premium amenities and strategic locations';
      case 'completed':
        return 'Explore our successfully delivered projects that stand as a testament to our quality and commitment';
      case 'upcoming':
        return 'Get a glimpse of our future projects and secure your dream property at pre-launch prices';
      default:
        return 'Browse our diverse portfolio of residential and commercial properties';
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={`https://images.pexels.com/photos/${
              category === 'ongoing' ? '1170412' : 
              category === 'completed' ? '323780' : '1642125'
            }/pexels-photo-${
              category === 'ongoing' ? '1170412' : 
              category === 'completed' ? '323780' : '1642125'
            }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
            alt="Projects" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{getCategoryTitle()}</h1>
            <p className="text-xl text-gray-300">
              {getCategoryDescription()}
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap mb-10 justify-center">
            <a 
              href="/projects/ongoing" 
              className={`px-6 py-2 m-2 font-medium rounded transition-colors ${
                category === 'ongoing' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Ongoing
            </a>
            <a 
              href="/projects/completed" 
              className={`px-6 py-2 m-2 font-medium rounded transition-colors ${
                category === 'completed' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Completed
            </a>
            <a 
              href="/projects/upcoming" 
              className={`px-6 py-2 m-2 font-medium rounded transition-colors ${
                category === 'upcoming' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </a>
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No projects found</h3>
              <p className="text-gray-500">
                There are currently no projects in this category. Please check back later or explore other categories.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Can't find what you're looking for?</h2>
            <p className="text-lg mb-8 text-gray-700">
              Contact our team to discuss your specific requirements or to get more information about our projects.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;