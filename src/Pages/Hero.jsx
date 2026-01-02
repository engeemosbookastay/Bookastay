import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, Users, Search, Check, X, Cookie, Star, ExternalLink } from 'lucide-react';
import { backendUrl } from '../App';

import Living from '../assets/Living.jpg';
import Dine from '../assets/Dine.jpg';
import LiveRoom from '../assets/LiveRoom.jpg';
import Room from '../assets/Room.jpg';
import Bedroom from '../assets/Bedroom.jpg';
import Bedroomss from '../assets/Bedroomss.jpg';
import Logo from '../assets/Logo.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Cookie consent state
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // Availability state
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  // Debounce timer
  const availabilityTimer = useRef(null);

  // Updated images with italicized subtitles
  const images = [
    { src: Living, caption: "Engeemos Bookastay", subtitle: "Hosting Temporary Stay In Exotic Style", transition: "fade" },
    { src: LiveRoom, caption: "Modern Interiors", subtitle: "Designed For Your Comfort", transition: "slide" },
    { src: Room, caption: "Peaceful Retreats", subtitle: "Your Home Away From Home", transition: "zoom" },
    { src: Bedroomss, caption: "Luxury Living Spaces", subtitle: "Where Comfort Meets Elegance", transition: "slide" },
    { src: Dine, caption: "Elegant Dining", subtitle: "Create Memorable Moments", transition: "fade" },
    { src: Bedroom, caption: "Cozy Bedrooms", subtitle: "Restful Sleep Awaits", transition: "zoom" },
  ];

  // Check cookie consent on mount
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setShowCookieConsent(true), 2000);
    }
  }, []);

  // Handle cookie consent
  const handleCookieConsent = (accepted) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowCookieConsent(false);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Central availability check function
  const checkAvailability = useCallback(async (opts = {}) => {
    const inDate = opts.checkIn ?? checkIn;
    const outDate = opts.checkOut ?? checkOut;

    if (!inDate || !outDate) {
      setAvailability(null);
      setAvailabilityError('');
      setAvailabilityLoading(false);
      return;
    }

    const start = new Date(inDate);
    const end = new Date(outDate);
    if (end <= start) {
      setAvailability(false);
      setAvailabilityError('Check-out date must be after check-in date');
      setAvailabilityLoading(false);
      return;
    }

    if (availabilityTimer.current) clearTimeout(availabilityTimer.current);
    
    setAvailabilityLoading(true);
    setAvailabilityError('');

    availabilityTimer.current = setTimeout(async () => {
      try {
        const roomTypes = ['entire', 'room1', 'room2'];
        const availabilityChecks = await Promise.all(
          roomTypes.map(async (roomType) => {
            const params = new URLSearchParams({
              room_type: roomType,
              check_in_date: inDate,
              check_out_date: outDate,
            });
            
            const resp = await fetch(`${backendUrl}/api/availability?${params.toString()}`);
            const json = await resp.json().catch(() => ({}));
            
            return {
              roomType,
              available: resp.ok && json && json.success && json.available
            };
          })
        );

        const availableRooms = availabilityChecks.filter(check => check.available);
        
        if (availableRooms.length > 0) {
          setAvailability(true);
          setAvailabilityError('');
        } else {
          setAvailability(false);
          setAvailabilityError('No rooms available for selected dates');
        }
      } catch (e) {
        setAvailability(false);
        setAvailabilityError('Network error checking availability');
      } finally {
        setAvailabilityLoading(false);
        availabilityTimer.current = null;
      }
    }, 600);
  }, [checkIn, checkOut]);

  useEffect(() => {
    checkAvailability();
    return () => {
      if (availabilityTimer.current) {
        clearTimeout(availabilityTimer.current);
        availabilityTimer.current = null;
      }
    };
  }, [checkIn, checkOut, checkAvailability]);

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (availabilityLoading) {
      alert('Please wait while we check availability');
      return;
    }

    if (availability === false) {
      alert('No rooms available for selected dates. Please choose different dates.');
      return;
    }

    if (availability === true) {
      window.location.href = `/rooms?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`;
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const getTransitionClass = (index, transition) => {
    const isActive = index === currentSlide;
    
    switch(transition) {
      case 'slide':
        return isActive 
          ? 'opacity-100 scale-100 translate-x-0' 
          : 'opacity-0 scale-100 translate-x-full';
      case 'zoom':
        return isActive 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-110';
      case 'fade':
      default:
        return isActive 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-blue-900 to-blue-800 border-t-4 border-amber-400 shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold mb-1">We Value Your Privacy</p>
                <p className="text-blue-100 text-sm">
                  We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => handleCookieConsent(false)}
                className="px-6 py-2 bg-white/10 text-white border border-white/30 rounded-lg hover:bg-white/20 transition-all font-semibold"
              >
                Decline
              </button>
              <button
                onClick={() => handleCookieConsent(true)}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-900 rounded-lg hover:from-amber-300 hover:to-yellow-400 transition-all font-bold shadow-lg"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Full-Screen Carousel */}
      <div className="relative h-screen overflow-hidden">
        
        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${getTransitionClass(index, img.transition)}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Logo Overlay - Top Left */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30">
          <img 
            src={Logo} 
            alt="Engeemos Bookastay" 
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Animated Text Tags - Top Left Below Logo */}
        <div className="absolute top-28 sm:top-40 md:top-44 left-4 sm:left-8 z-30">
          {images.map((img, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-full absolute'
              }`}
            >
              <div className="bg-white/95 backdrop-blur-sm shadow-xl px-3 py-2 sm:px-6 sm:py-3 rounded-r-full border-l-4 border-teal-500 animate-slide-in">
                <p className="text-sm sm:text-lg md:text-xl font-bold text-gray-800">
                  {img.caption}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 italic">
                  {img.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 sm:bottom-56 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-10 sm:w-16 bg-white' 
                  : 'w-2 sm:w-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Check Availability Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-3 sm:pb-6">
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 shadow-2xl">
              <h2 className="text-sm sm:text-lg font-bold text-white text-center mb-2 sm:mb-4">Check Availability</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-2 sm:mb-4">
                
                <div className="col-span-1">
                  <label className="block text-white text-[10px] sm:text-xs font-medium mb-1 sm:mb-1.5">Check In</label>
                  <div className="relative">
                    <Calendar className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-teal-400 pointer-events-none z-10" />
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-7 sm:pl-10 pr-1 sm:pr-3 py-1.5 sm:py-2.5 bg-white/10 border border-white/30 rounded-md sm:rounded-lg text-white text-[10px] sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-white text-[10px] sm:text-xs font-medium mb-1 sm:mb-1.5">Check Out</label>
                  <div className="relative">
                    <Calendar className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-teal-400 pointer-events-none z-10" />
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || today}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-7 sm:pl-10 pr-1 sm:pr-3 py-1.5 sm:py-2.5 bg-white/10 border border-white/30 rounded-md sm:rounded-lg text-white text-[10px] sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-white text-[10px] sm:text-xs font-medium mb-1 sm:mb-1.5">Adults</label>
                  <div className="relative">
                    <Users className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-teal-400 pointer-events-none z-10" />
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full pl-7 sm:pl-10 pr-1 sm:pr-3 py-1.5 sm:py-2.5 bg-white/10 border border-white/30 rounded-md sm:rounded-lg text-white text-[10px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num} className="bg-slate-800">{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-white text-[10px] sm:text-xs font-medium mb-1 sm:mb-1.5">Children</label>
                  <div className="relative">
                    <Users className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-teal-400 pointer-events-none z-10" />
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full pl-7 sm:pl-10 pr-1 sm:pr-3 py-1.5 sm:py-2.5 bg-white/10 border border-white/30 rounded-md sm:rounded-lg text-white text-[10px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num} className="bg-slate-800">{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex items-end">
                  <button
                    onClick={handleCheckAvailability}
                    disabled={availabilityLoading || !checkIn || !checkOut}
                    className={`w-full px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg font-bold text-[10px] sm:text-sm transition-all shadow-lg flex items-center justify-center gap-1 sm:gap-2 ${
                      availabilityLoading || !checkIn || !checkOut
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : availability === true
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/50 hover:scale-105'
                        : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 hover:shadow-teal-500/50 hover:scale-105'
                    }`}
                  >
                    {availabilityLoading ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Checking...</span>
                      </>
                    ) : availability === true ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>View Rooms</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Check</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {availabilityLoading && checkIn && checkOut && (
                <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-blue-500/20 border-2 border-blue-400/50 rounded-md sm:rounded-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] sm:text-xs font-bold text-blue-100">Checking availability...</p>
                  </div>
                </div>
              )}

              {!availabilityLoading && availability === true && checkIn && checkOut && (
                <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-green-500/20 border-2 border-green-400/50 rounded-md sm:rounded-lg backdrop-blur-md">
                  <p className="text-[10px] sm:text-xs font-bold text-green-100 flex items-center gap-2">
                    <Check size={14} className="text-green-300 hidden sm:inline" />
                    Great news! We have rooms available for your dates
                  </p>
                </div>
              )}

              {!availabilityLoading && availability === false && availabilityError && (
                <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-red-500/20 border-2 border-red-400/50 rounded-md sm:rounded-lg backdrop-blur-md">
                  <p className="text-[10px] sm:text-xs font-bold text-red-100 flex items-center gap-2">
                    <X size={14} className="text-red-300 hidden sm:inline" />
                    {availabilityError}
                  </p>
                  <p className="text-[10px] sm:text-xs text-red-200 mt-1">Please try different dates</p>
                </div>
              )}

              <p className="text-center text-gray-300 text-[10px] sm:text-xs">
                {availability === true 
                  ? '✨ Rooms are available - Click "View Rooms" to see options and book'
                  : 'Enter your dates and number of guests to check availability'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Boxes - Before About Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Airbnb Reviews */}
          <a
            href="https://www.airbnb.com/users/show/YOUR_AIRBNB_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-200 rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Airbnb Reviews</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">5.0</span>
                </div>
              </div>
              <ExternalLink className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-gray-600">See what our guests say about their stay</p>
          </a>

          {/* Google Reviews */}
          <a
            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Google Reviews</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">5.0</span>
                </div>
              </div>
              <ExternalLink className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-gray-600">Read our guest reviews on Google</p>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Hero;