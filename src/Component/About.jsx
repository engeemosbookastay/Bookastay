import React from 'react';
import { MapPin, Shield, Crown, Sparkles, Award, Heart, Star, Building } from 'lucide-react';

const About = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxury Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
            <Crown className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Engeemos</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Where luxury hospitality meets exceptional comfort
          </p>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          
          {/* Who We Are - Compact */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Who We Are</h3>
              </div>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                <span className="text-amber-400 font-semibold">Engeemos Bookastay Ventures</span> manages <span className="text-amber-400 font-semibold">Oluwadarasimi Villa</span>—a premium short-stay property in Olomsore, Abeokuta, featuring modern amenities and elegant interiors.
              </p>
            </div>
          </div>

          {/* Our Promise - Compact */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Our Promise</h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We prioritize <span className="text-amber-400 font-semibold">guest privacy and satisfaction</span>, offering a home-like experience without the intrusion typical of traditional hotels.
              </p>
            </div>
          </div>

        </div>

        {/* Features Grid - 2x2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {[
            { icon: Crown, title: "Elegant Design", desc: "Premium finishes" },
            { icon: Shield, title: "Private & Secure", desc: "Peaceful location" },
            { icon: Sparkles, title: "Modern Amenities", desc: "State-of-the-art" },
            { icon: Star, title: "Prime Location", desc: "City attractions" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 md:p-5 hover:border-amber-500/40 transition-all duration-300 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30 mx-auto mb-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location & Vision - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          
          {/* Nearby Attractions - Compact */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Prime Location</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {[
                  "Olumo Rock",
                  "Kuti Museum",
                  "Adire Mall",
                  "Presidential Library"
                ].map((attraction, idx) => (
                  <div key={idx} className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-300 text-sm md:text-base group-hover/item:text-white transition-colors duration-300">{attraction}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-4 italic">Minutes from major attractions</p>
            </div>
          </div>

          {/* Our Vision - Compact */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We're expanding our collection of <span className="text-amber-400 font-semibold">premium accommodations</span>, each selected for exceptional comfort and guest-centric service.
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full text-sm md:text-base font-semibold text-amber-300">
                  More Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Statement - Full Width */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div className="relative bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl text-center">
            <Building className="w-8 h-8 md:w-10 md:h-10 text-amber-400 mx-auto mb-3 md:mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Experience Hospitality Excellence</h3>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              At <span className="text-amber-400 font-semibold">Engeemos Bookastay</span>, we combine luxury accommodation with personalized service, creating unforgettable stays in the heart of Abeokuta.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;