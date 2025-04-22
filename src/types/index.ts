export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'ongoing' | 'completed' | 'upcoming';
  coverImage: string;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  floorPlans?: string[];
  estimatedCompletion?: string;
  price: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  testimonial: string;
}