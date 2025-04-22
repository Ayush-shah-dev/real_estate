import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen(!projectsDropdownOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-900' : 'text-white'}`}>
              ABS <span className="text-yellow-500">Real Estate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-yellow-500 transition-colors`}
            >
              Home
            </Link>
            <div className="relative group">
              <button 
                onClick={toggleProjectsDropdown}
                className={`flex items-center ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-yellow-500 transition-colors`}
              >
                Projects <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1">
                  <Link 
                    to="/projects/ongoing" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Ongoing Projects
                  </Link>
                  <Link 
                    to="/projects/completed" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Completed Projects
                  </Link>
                  <Link 
                    to="/projects/upcoming" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Upcoming Projects
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/about" 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-yellow-500 transition-colors`}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-yellow-500 transition-colors`}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-yellow-500 transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={closeMenu}
            >
              Home
            </Link>
            <div>
              <button 
                onClick={toggleProjectsDropdown}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                <span>Projects</span>
                <ChevronDown size={16} />
              </button>
              {projectsDropdownOpen && (
                <div className="pl-4">
                  <Link 
                    to="/projects/ongoing" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Ongoing Projects
                  </Link>
                  <Link 
                    to="/projects/completed" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Completed Projects
                  </Link>
                  <Link 
                    to="/projects/upcoming" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Upcoming Projects
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/about" 
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;