import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Emerald Heights',
    location: 'Bandra West, Mumbai',
    category: 'ongoing',
    coverImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1082326/pexels-photo-1082326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Luxury high-rise apartments with panoramic sea views and world-class amenities in the heart of Bandra West.',
    features: ['2, 3 & 4 BHK Luxury Apartments', 'Sea-facing balconies', 'Double-height lobby', 'Smart home technology'],
    amenities: ['Infinity pool', 'Fully-equipped gym', 'Landscaped gardens', 'Club house', '24/7 security'],
    floorPlans: ['2 BHK - 1250 sq.ft', '3 BHK - 1800 sq.ft', '4 BHK - 2400 sq.ft'],
    estimatedCompletion: 'December 2025',
    price: '₹ 3.5 Cr onwards'
  },
  {
    id: '2',
    title: 'Celestial Gardens',
    location: 'Electronic City, Bangalore',
    category: 'ongoing',
    coverImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Modern apartments surrounded by lush greenery, designed for tech professionals with premium amenities and connectivity.',
    features: ['1, 2 & 3 BHK Smart Apartments', 'Eco-friendly design', 'High-speed fiber internet', 'Co-working spaces'],
    amenities: ['Olympic-sized swimming pool', 'Yoga deck', 'Sports complex', 'Children\'s play area', 'EV charging stations'],
    floorPlans: ['1 BHK - 750 sq.ft', '2 BHK - 1100 sq.ft', '3 BHK - 1650 sq.ft'],
    estimatedCompletion: 'March 2026',
    price: '₹ 85 Lakhs onwards'
  },
  {
    id: '3',
    title: 'Royal Meadows',
    location: 'Sector 150, Noida',
    category: 'upcoming',
    coverImage: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Premium township with vast open spaces, combining modern living with natural surroundings in the developing Noida Extension.',
    features: ['2 & 3 BHK Premium Apartments', 'Villa plots', 'Central park view', 'Low-density community'],
    amenities: ['Clubhouse with indoor games', 'Tennis courts', 'Amphitheater', 'Organic farm', 'Walking trails'],
    floorPlans: ['2 BHK - 1200 sq.ft', '3 BHK - 1750 sq.ft', 'Villa Plots - 2400 sq.ft onwards'],
    estimatedCompletion: 'June 2026',
    price: '₹ 75 Lakhs onwards'
  },
  {
    id: '4',
    title: 'Urban Square',
    location: 'Whitefield, Bangalore',
    category: 'completed',
    coverImage: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'A completed luxury project with ready-to-move-in apartments, featuring contemporary architecture and premium finishes.',
    features: ['2 & 3 BHK Luxury Apartments', 'Italian marble flooring', 'Designer kitchens', 'Home automation'],
    amenities: ['Infinity pool', 'Fully-equipped gym', 'Landscaped gardens', 'Club house', '24/7 security'],
    price: '₹ 1.2 Cr onwards'
  },
  {
    id: '5',
    title: 'Harmony Heights',
    location: 'Anna Nagar, Chennai',
    category: 'completed',
    coverImage: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Contemporary living spaces in the heart of Chennai with excellent connectivity and elegant design elements.',
    features: ['1, 2 & 3 BHK Apartments', 'Vastu compliant', 'Premium finishes', 'Spacious interiors'],
    amenities: ['Swimming pool', 'Multi-purpose hall', 'Landscaped gardens', 'Children\'s play area', 'Senior citizen corner'],
    price: '₹ 90 Lakhs onwards'
  },
  {
    id: '6',
    title: 'Platinum Towers',
    location: 'Jubilee Hills, Hyderabad',
    category: 'upcoming',
    coverImage: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Ultra-luxury apartments in Hyderabad\'s most premium locality, featuring cutting-edge design and panoramic city views.',
    features: ['3 & 4 BHK Ultra Luxury Apartments', 'Private terraces', 'Double-height ceilings', 'Designer fixtures'],
    amenities: ['Rooftop infinity pool', 'Temperature-controlled indoor pool', 'Home theatre', 'Business center', 'Helipad'],
    floorPlans: ['3 BHK - 2100 sq.ft', '4 BHK - 3200 sq.ft', 'Penthouse - 5000 sq.ft'],
    estimatedCompletion: 'September 2026',
    price: '₹ 2.5 Cr onwards'
  }
];

export const getProjectsByCategory = (category: Project['category']) => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};