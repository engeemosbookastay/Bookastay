import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, Users, Search, Check, X, MapPin, Mail, Phone, Instagram, Home, Bed, Building, Navigation, BookOpen, ChevronDown } from 'lucide-react';
import { backendUrl } from '../App';

// Import your actual apartment images
import Sitting from '../assets/Sitting.jpg';
// import Dining from '../assets/Dinning.jpg';
import SittingRoom from '../assets/SittingRoom.jpg';
import SittingRoom2 from '../assets/SittingRoom2.jpg';
import Bedroom from '../assets/Bedroom1.jpg';
import Bedroom2 from '../assets/Bedroom2.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Availability state
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  // Debounce timer
  const availabilityTimer = useRef(null);

  // High-quality apartment images
  const images = [
    Sitting,
    SittingRoom,
    SittingRoom2,
    // Dining,
    Bedroom,
    Bedroom2
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Central availability check function - checking for ANY available room
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
        // Check all room types to see if ANY room is available
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
      // Redirect to Rooms page with parameters
      window.location.href = `/rooms?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`;
    }
  };

  const scrollToAbout = () => {
    document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Image Carousel */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Engeemos Bookastay Apartment ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90"></div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-12 bg-teal-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
            
            {/* Hero Text */}
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Welcome to
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300">
                  Engeemos Bookastay
                </span>
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Apartments</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                Luxury serviced apartments in the heart of Abeokuta
                <br />Your perfect home away from home
              </p>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-medium">🏠 2 Bedroom & 1 Bedroom Options</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-medium">📶 Free High-Speed WiFi</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-medium">🔒 24/7 Security</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-medium">🅿️ Free Parking</span>
                </div>
              </div>
            </div>

            {/* Check Availability Card */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Check Availability</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                  
                  {/* Check-in Date */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm font-medium mb-2">
                      Check In
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400 pointer-events-none z-10" />
                      <input
                        type="date"
                        value={checkIn}
                        min={today}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm font-medium mb-2">
                      Check Out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400 pointer-events-none z-10" />
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || today}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm font-medium mb-2">
                      Adults
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400 pointer-events-none z-10" />
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num} className="bg-slate-800">{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm font-medium mb-2">
                      Children
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400 pointer-events-none z-10" />
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map(num => (
                          <option key={num} value={num} className="bg-slate-800">{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="lg:col-span-1 flex items-end">
                    <button
                      onClick={handleCheckAvailability}
                      disabled={availabilityLoading || !checkIn || !checkOut}
                      className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                        availabilityLoading || !checkIn || !checkOut
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : availability === true
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/50 hover:scale-105'
                          : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 hover:shadow-teal-500/50 hover:scale-105'
                      }`}
                    >
                      {availabilityLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Checking...</span>
                        </>
                      ) : availability === true ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>View Rooms</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span>Check</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Availability Status Banner */}
                {availabilityLoading && checkIn && checkOut && (
                  <div className="mb-4 p-4 bg-blue-500/20 border-2 border-blue-400/50 rounded-xl backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-blue-100">Checking availability...</p>
                    </div>
                  </div>
                )}

                {!availabilityLoading && availability === true && checkIn && checkOut && (
                  <div className="mb-4 p-4 bg-green-500/20 border-2 border-green-400/50 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="text-sm font-bold text-green-100 flex items-center gap-2">
                      <Check size={18} className="text-green-300" />
                      Great news! We have rooms available for your dates
                    </p>
                  </div>
                )}

                {!availabilityLoading && availability === false && availabilityError && (
                  <div className="mb-4 p-4 bg-red-500/20 border-2 border-red-400/50 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="text-sm font-bold text-red-100 flex items-center gap-2">
                      <X size={18} className="text-red-300" />
                      {availabilityError}
                    </p>
                    <p className="text-xs text-red-200 mt-2">Please try different dates</p>
                  </div>
                )}

                <p className="text-center text-gray-300 text-sm">
                  {availability === true 
                    ? '✨ Rooms are available - Click "View Rooms" to see options and book'
                    : 'Enter your dates and number of guests to check availability'
                  }
                </p>
              </div>

              {/* Scroll Down Indicator */}
              <div className="text-center mt-12">
                <button
                  onClick={scrollToAbout}
                  className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all animate-bounce mx-auto"
                >
                  <span className="text-sm font-medium">Learn more about us</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
      </div>

      {/* About Us Section */}
      <div id="about-us" className="bg-gradient-to-br from-slate-800 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Welcome to <span className="text-teal-400 font-semibold">Engeemos Bookastay Apartments</span>, 
                your premier choice for luxury serviced apartments in the heart of Abeokuta, Nigeria.
              </p>
              <p>
                We offer beautifully furnished apartments designed to provide you with the comfort and convenience 
                of home while traveling. Whether you're visiting for business or leisure, our apartments feature 
                modern amenities, elegant interiors, and exceptional service.
              </p>
              <p>
                Our commitment is to ensure your stay is comfortable, memorable, and hassle-free. Experience the 
                perfect blend of luxury, convenience, and Nigerian hospitality at Engeemos Bookastay Apartments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center">
                <Bed className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Premium Rooms</h3>
                <p className="text-gray-300 text-sm">2 & 1 bedroom options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center">
                <Building className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Prime Location</h3>
                <p className="text-gray-300 text-sm">Heart of Abeokuta</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center">
                <Home className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Home Comfort</h3>
                <p className="text-gray-300 text-sm">Fully furnished spaces</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center">
                <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Top Service</h3>
                <p className="text-gray-300 text-sm">24/7 support available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Hero;