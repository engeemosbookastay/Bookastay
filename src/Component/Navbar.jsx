import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Home, Bed, Building, Navigation, BookOpen, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-2xl' 
        : isHomePage 
          ? 'bg-transparent' 
          : 'bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-100 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img 
                src={Logo} 
                alt="Engeemos Bookastay Logo" 
                className="w-10 h-10 lg:w-14 lg:h-14 object-contain relative" 
              />
            </div>
            <div>
              <div className={`text-base lg:text-xl font-bold tracking-tight leading-tight transition-colors ${
                !scrolled && isHomePage 
                  ? 'text-white drop-shadow-lg' 
                  : 'bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent'
              }`}>
                Engeemos Bookastay
              </div>
              <div className={`text-xs lg:text-sm font-medium -mt-0.5 transition-colors ${
                !scrolled && isHomePage 
                  ? 'text-amber-300 drop-shadow-lg' 
                  : 'text-amber-600'
              }`}>
                Apartments
              </div>
            </div>
          </Link>

         
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {/* Rooms Dropdown */}
            <div className="relative group">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}>
                <Bed size={18} />
                <span>Rooms</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 overflow-hidden">
                <Link 
                  to="/bookings?type=2bedroom" 
                  className="block px-5 py-3 text-gray-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 transition-all"
                >
                  <div className="font-semibold">2 Bedroom Apartment</div>
                  <div className="text-xs text-amber-600 mt-0.5">Entire Place</div>
                </Link>
                <div className="border-t border-gray-200"></div>
                <Link 
                  to="/bookings?type=1bedroom" 
                  className="block px-5 py-3 text-gray-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 transition-all"
                >
                  <div className="font-semibold">1 Bedroom Suite</div>
                  <div className="text-xs text-amber-600 mt-0.5">Private Room</div>
                </Link>
              </div>
            </div>

            <Link
              to="/facilities" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              <Building size={18} />
              <span>Facilities</span>
            </Link>
            
            <Link 
              to="/getting-around" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              <Navigation size={18} />
              <span>Getting Around</span>
            </Link>

            <Link 
              to="/rules" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              <FileText size={18} />
              <span>House Rules</span>
            </Link>
            
            <Link 
              to="/blog" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                !scrolled && isHomePage
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </Link>
            
            <Link  
              to="/bookings" 
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-full font-bold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-900/50 hover:scale-105"
            >
             BOOK
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all ${
              !scrolled && isHomePage
                ? 'text-white hover:bg-white/20'
                : 'text-blue-900 hover:bg-blue-50'
            }`}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="bg-white/98 backdrop-blur-xl border-t border-gray-200">
          <div className="px-4 py-4 space-y-1">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {/* Mobile Rooms Section */}
            <div>
              <button 
                onClick={() => setRoomsOpen(!roomsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bed size={20} />
                  <span>Rooms</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${roomsOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${roomsOpen ? 'max-h-48' : 'max-h-0'}`}>
                <div className="ml-4 mt-1 space-y-1 pb-1">
                  <Link 
                    to="/bookings?type=2bedroom" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-semibold">2 Bedroom Apartment</div>
                    <div className="text-xs text-amber-600 mt-0.5">Entire Place</div>
                  </Link>
                  <Link 
                    to="/bookings?type=1bedroom" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-semibold">1 Bedroom Suite</div>
                    <div className="text-xs text-amber-600 mt-0.5">Private Room</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/facilities" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Building size={20} />
              <span>Facilities</span>
            </Link>
            
            <Link 
              to="/getting-around" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Navigation size={20} />
              <span>Getting Around</span>
            </Link>

            <Link 
              to="/rules" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <FileText size={20} />
              <span>House Rules</span>
            </Link>
            
            <Link 
              to="/blog" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={20} />
              <span>Blog</span>
            </Link>
            
            <Link 
              to="/bookings" 
              className="block mt-3 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center rounded-xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              BOOK
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;