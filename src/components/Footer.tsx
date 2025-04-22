import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              ABS <span className="text-yellow-500">Real Estate</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Building dreams and creating spaces where life happens. Experience luxury, comfort, and innovation with ABS Real Estate.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects/ongoing" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Ongoing Projects
                </Link>
              </li>
              <li>
                <Link to="/projects/completed" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link to="/projects/upcoming" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Upcoming Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">Project Development</Link>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">Property Sales</Link>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">Investment Advisory</Link>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">Legal Assistance</Link>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">Home Loan Assistance</Link>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Link to="/services">After-Sales Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-yellow-500" />
                <span className="text-gray-300">
                  ABS Towers, 123 Business Park, <br />
                  Andheri East, Mumbai 400069
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-yellow-500" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-yellow-500" />
                <a href="mailto:info@absrealestate.com" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  info@absrealestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ABS Real Estate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 text-sm hover:text-yellow-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-yellow-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-yellow-500 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;