import React from 'react';
import { MapPin, Shield, Crown, Sparkles, Award, Heart, Star } from 'lucide-react';

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
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxury Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
            <Crown className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Us</span>
          </h2>
          {/* REMOVED: "Where luxury hospitality meets exceptional comfort" */}
        </div>

        {/* Main Prose Section */}
        <div className="mb-12 md:mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-900/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  <span className="text-amber-400 font-semibold text-lg md:text-xl">Engeemos Bookastay Ventures</span> is a registered business name. We currently oversee hosting services for <span className="text-amber-400 font-semibold">Oluwadarasimi Villa</span> a block of flats boasting of modern facilities and aesthetically styled interior. Ensconced in a serene and secure part of <span className="text-amber-400 font-semibold">Olomore</span>, Abeokuta, this property is close to Lafenwa, Ita-Oshin, Brewery, Ibara-Omida, Oke-Ilewo, and just about 20-25 minutes of driving to Kuto/Oke-Mosan area and Olusegun Obasanjo Presidential Library.
                </p>
                
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  Rare find tourist attraction centres like the recently revamped Olumo Rock, the Kuti Heritage Museum and the Adire Mall, Itoku are just few minutes of driving away.
                </p>
                
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  At <span className="text-amber-400 font-semibold">Engeemos Bookastay</span>, we put <span className="text-amber-400 font-semibold">guests' satisfaction and privacy</span> at the core of our service delivery, thus ensuring guests never felt like they have left their homes <span className="text-amber-400 font-semibold">-a sharp contrast to the prevailing atmosphere at hotels</span>.
                </p>
                
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  As part of our future plan, we intend to bring on board more verified, comfortable and guests-centric short stay accommodations.
                </p>
                {/* REMOVED: "Watch this space!" */}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - 2x2 on mobile, moved below prose */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-900/10 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
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

      </div>
    </section>
  );
};

export default About;