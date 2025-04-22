import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1)];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full mb-4">
        {IconComponent && <IconComponent size={24} />}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;