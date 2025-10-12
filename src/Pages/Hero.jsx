import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span>Premium Apartments in Abeokuta</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Home Away </span>
                From Home
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience comfort and luxury in our fully furnished 2-bedroom apartment. Book the entire space or a single room with shared amenities.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Prime Location</h3>
                  <p className="text-sm text-gray-600">Abeokuta</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sleeps 4</h3>
                  <p className="text-sm text-gray-600">Flexible options</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/bookings"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">5.0 Rating on Google</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-600">Happy Guests</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 h-80 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                  Living Room
                </div>
              </div>
              
              {/* Two smaller images */}
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                  Bedroom
                </div>
              </div>
              
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                  Kitchen
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl shadow-lg font-bold transform rotate-3">
              Available Now!
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;