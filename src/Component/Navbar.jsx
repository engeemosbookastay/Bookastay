import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Home, Bed, Building, Navigation, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl' : 'bg-gradient-to-b from-slate-900/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          {/* Logo Section - Conspicuously Located */}
          <a href="/" className="flex items-center gap-3 lg:gap-4 group">
            <div className="relative">
              <div className=""></div>
              <img 
                src={Logo} 
                alt="Engeemos Bookastay Logo" 
                className="w-12 h-12 lg:w-16 lg:h-16 object-contain relative " 
              />
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight">
                Engeemos Bookastay
              </div>
              <div className="text-xs lg:text-sm font-medium text-teal-300 -mt-0.5">
                Apartments
              </div>
            </div>
          </a>

         
          <div className="hidden lg:flex items-center gap-1">
            <a 
              href="/" 
              className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              <Home size={18} />
              <span>Home</span>
            </a>
            
            {/* Rooms Dropdown - 2 Bedroom & 1 Bedroom Options */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                <Bed size={18} />
                <span>Rooms</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-lg rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-white/10 overflow-hidden">
                <a 
                  href="/rooms?type=2bedroom" 
                  className="block px-5 py-3 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 transition-all"
                >
                  <div className="font-semibold">2 Bedroom Apartment</div>
                  <div className="text-xs text-teal-300 mt-0.5">Entire Place</div>
                </a>
                <div className="border-t border-white/10"></div>
                <a 
                  href="/rooms?type=1bedroom" 
                  className="block px-5 py-3 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 transition-all"
                >
                  <div className="font-semibold">1 Bedroom Suite</div>
                  <div className="text-xs text-teal-300 mt-0.5">Private Room</div>
                </a>
              </div>
            </div>

            <Link
              to="/facilities" 
              className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              <Building size={18} />
              <span>Facilities</span>
            </Link>
            
            <a 
              href="/getting-around" 
              className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              <Navigation size={18} />
              <span>Getting Around</span>
            </a>
            
            <a 
              href="/blog" 
              className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </a>
            
            <Link  
              to="/bookings" 
              className="ml-4 px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-bold hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg hover:shadow-teal-500/50 hover:scale-105"
            >
             BOOK
            </Link  >
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-white hover:bg-white/10 rounded-lg transition-all"
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
        <div className="bg-slate-900/98 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 space-y-2">
            <a 
              href="/" 
              className="flex items-center gap-3 px-5 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </a>
            
            {/* Mobile Rooms Section */}
            <div>
              <button 
                onClick={() => setRoomsOpen(!roomsOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bed size={20} />
                  <span>Rooms</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${roomsOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${roomsOpen ? 'max-h-48' : 'max-h-0'}`}>
                <div className="ml-4 mt-2 space-y-2 pb-2">
                  <a 
                    href="/rooms?type=2bedroom" 
                    className="block px-5 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-semibold">2 Bedroom Apartment</div>
                    <div className="text-xs text-teal-300 mt-0.5">Entire Place</div>
                  </a>
                  <a 
                    href="/rooms?type=1bedroom" 
                    className="block px-5 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-semibold">1 Bedroom Suite</div>
                    <div className="text-xs text-teal-300 mt-0.5">Private Room</div>
                  </a>
                </div>
              </div>
            </div>

            <a 
              href="/facilities" 
              className="flex items-center gap-3 px-5 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Building size={20} />
              <span>Facilities</span>
            </a>
            
            <a 
              href="/getting-around" 
              className="flex items-center gap-3 px-5 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Navigation size={20} />
              <span>Getting Around</span>
            </a>
            
            <a 
              href="/blog" 
              className="flex items-center gap-3 px-5 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={20} />
              <span>Blog</span>
            </a>
            
            <a 
              href="/rooms" 
              className="block mt-4 px-5 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center rounded-xl font-bold shadow-lg hover:from-teal-400 hover:to-cyan-400 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Check Availability
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;