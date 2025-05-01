
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold ${isScrolled ? 'text-travel-blue' : 'text-white'}`}>
            TravelMate
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-medium hover:text-travel-blue transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Home
          </Link>
          <Link to="/destinations" className={`font-medium hover:text-travel-blue transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Destinations
          </Link>
          <Link to="/blog" className={`font-medium hover:text-travel-blue transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Blog
          </Link>
          <Link to="/contact" className={`font-medium hover:text-travel-blue transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Contact
          </Link>
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className={`p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-gray-800 hover:text-travel-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="font-medium text-gray-800 hover:text-travel-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              to="/blog" 
              className="font-medium text-gray-800 hover:text-travel-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-gray-800 hover:text-travel-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
