import React from 'react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 mx-auto md:mx-0">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-full h-full object-cover rounded-full border-2 border-yellow-400"
        />
      </div>
      <div>
        <div className="text-yellow-400 mb-2">★★★★★</div>
        <p className="text-gray-700 italic mb-4">"{testimonial.testimonial}"</p>
        <div>
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;