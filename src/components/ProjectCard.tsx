import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="group overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <div className="flex items-center text-yellow-400 mt-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{project.location}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${project.category === 'ongoing' ? 'bg-blue-500 text-white' : 
              project.category === 'completed' ? 'bg-green-500 text-white' :
              'bg-yellow-500 text-gray-900'}
          `}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 line-clamp-2 mb-3">{project.description}</p>
        <div>
          <p className="font-semibold text-gray-900">Starting at {project.price}</p>
          {project.estimatedCompletion && (
            <p className="text-sm text-gray-500 mt-1">
              Estimated completion: {project.estimatedCompletion}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {project.features.slice(0, 1).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {project.features.length > 1 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                +{project.features.length - 1} more
              </span>
            )}
          </div>
          <span className="text-yellow-500 text-sm font-medium group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;