import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Calendar, Phone, Star, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Book Now', href: '/bookings', icon: Calendar },
    { name: 'Contact', href: '/contact', icon: Phone },
    { name: 'Reviews', href: '/#reviews', icon: Star },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/BookaStay.png" alt="Book A Stay" className="w-12 h-12 rounded-xl shadow-lg object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Book A Stay
              </h1>
              <p className="text-xs text-gray-600 font-medium">Abeokuta • Premium Living</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center space-x-2 px-5 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-xl hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </Link>
            <Link
              to="/bookings"
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl focus:outline-none transition-all duration-200"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-200 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center space-x-3 px-5 py-4 text-gray-700 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-300">
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 w-full px-5 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-xl hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-md font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
              <Link
                to="/bookings"
                className="flex items-center justify-center space-x-2 w-full px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .border-gradient {
          border-image: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed) 1;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;