import React from 'react';
import { MapPin, Shield, Crown, Sparkles, Award, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      
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
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
            <Crown className="w-8 h-8 text-amber-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Luxury <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Redefined</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the pinnacle of comfort and elegance at Engeemos Bookastay
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Story */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/50">
                    <Award className="w-8 h-8 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Our Heritage</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
                  </div>
                </div>
                
                <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
                  <p>
                    <span className="text-amber-400 font-semibold">Engeemos Bookastay Ventures</span>, a distinguished registered establishment, proudly oversees <span className="text-amber-400 font-semibold">Oluwadarasimi Villa</span>—an exquisite collection of residences featuring state-of-the-art facilities and meticulously curated interiors.
                  </p>
                  
                  <p>
                    Nestled in the prestigious and tranquil enclave of Olomsore, Abeokuta, our property offers unparalleled access to the city's finest destinations. Within a leisurely 20-25 minute drive, discover the Olusegun Obasanjo Presidential Library, while cultural treasures like the revitalized Olumo Rock and Kuti Heritage Museum await just moments away.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-10 h-10 text-amber-400" />
                  <h3 className="text-3xl font-bold text-white">Our Philosophy</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We elevate <span className="text-amber-400 font-semibold">privacy and satisfaction</span> to an art form. Unlike conventional hotels where staff presence can intrude upon your sanctuary, we ensure every guest experiences the warmth of home while enjoying world-class luxury.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Features & Attractions */}
          <div className="space-y-8">
            
            {/* Premium Features */}
            <div className="grid gap-6">
              {[
                { icon: Crown, title: "Unmatched Elegance", desc: "Aesthetically designed with premium finishes" },
                { icon: Shield, title: "Exclusive Sanctuary", desc: "Serene, secure & private location" },
                { icon: Sparkles, title: "Modern Opulence", desc: "State-of-the-art facilities throughout" },
                { icon: Star, title: "Prime Positioning", desc: "Minutes from Abeokuta's finest attractions" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                          <Icon className="w-6 h-6 text-slate-900" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attractions */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="w-8 h-8 text-amber-400" />
                  <h3 className="text-3xl font-bold text-white">Cultural Landmarks</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "Olumo Rock Heritage Site",
                    "Kuti Heritage Museum",
                    "Adire Mall, Itoku",
                    "Presidential Library Complex"
                  ].map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 bg-amber-400 rounded-full group-hover/item:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-300 text-lg group-hover/item:text-white transition-colors duration-300">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="relative group max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div className="relative bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl p-12 shadow-2xl text-center">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">The Future Awaits</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our vision extends beyond today. We are curating a collection of <span className="text-amber-400 font-semibold">extraordinary accommodations</span>, each handpicked for exceptional comfort and uncompromising quality. 
              <span className="block mt-4 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                The journey has only just begun.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;