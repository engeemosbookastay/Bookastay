import React from "react";
import { CheckCircle, Wifi, Tv, Coffee, MapPin, Zap, Shield, Car, Droplet, Home, Wind, Utensils, Waves, Gamepad2, Briefcase, Sparkles, Crown, Lock, AlertTriangle, Activity, Flame, Snowflake, Package } from "lucide-react";
import Navbar from "./Navbar";

const Features = () => {
  const amenitiesCategories = [
    {
      category: "Entertainment & Connectivity",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      items: [
        { icon: Wifi, label: "Unlimited Internet", desc: "MTN 5G Broadband for seamless streaming" },
        { icon: Tv, label: "Smart TV", desc: "Premium entertainment in the living area" },
        { icon: Gamepad2, label: "Board Games Collection", desc: "Snake-and-ladder, chess, ludo, scrabble and opon ayo" },
      ]
    },
    {
      category: "Kitchen & Dining",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-500/10 to-amber-500/10",
      items: [
        { icon: Utensils, label: "Fully-Kitted Kitchen", desc: "Gas cooker, blender, microwave, electric kettle, toaster, air fryer, fridge-and-freezer (combined), dishes and cutlery" },
        { icon: Coffee, label: "Complimentary Beverages", desc: "Teabags, coffee, milk, sugar and welcome juice" },
      ]
    },
    {
      category: "Comfort & Convenience",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      items: [
        { icon: Snowflake, label: "Air Conditioners", desc: "Climate control in all rooms" },
        { icon: Wind, label: "Rechargeable Fans", desc: "For additional ventilation" },
        { icon: Waves, label: "Washing Machine", desc: "Detergent supplied, clips and drying rack included" },
        { icon: Droplet, label: "Water Heater", desc: "Hot water system in bathroom" },
        { icon: CheckCircle, label: "Hair Dryers", desc: "Available for guest use" },
        { icon: Sparkles, label: "Hotel-Grade Beddings", desc: "Premium linens and towels" },
        { icon: Package, label: "Bathroom Essentials", desc: "Bathing soap, toothbrush and toothpaste provided" },
        { icon: Home, label: "Smart Home Features", desc: "Light and AC switches are remotely operated sometimes" },
      ]
    },
    {
      category: "Work & Productivity",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      items: [
        { icon: Briefcase, label: "Dedicated Workspace", desc: "Comfortable work area for remote work" },
        { icon: Zap, label: "Constant Electricity", desc: "10Kva inverter, generator and PHCN (Band C with 12 hours minimum per day)" },
      ]
    },
    {
      category: "Security & Safety",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-500/10 to-orange-500/10",
      items: [
        { icon: Shield, label: "Maximum Security", desc: "Exterior CCTVs, high and electric wire fencing" },
        { icon: Lock, label: "Self Check-in", desc: "Contactless check-in with Key Safe" },
        { icon: Flame, label: "Fire Extinguisher", desc: "Safety equipment on premises" },
        { icon: Activity, label: "First Aid Box", desc: "Emergency medical supplies available" },
        { icon: Car, label: "Spacious Parking", desc: "Compound with multiple parking spots" },
      ]
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Navbar />

      {/* Hero Banner - Dark Blue & Gold */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-transparent to-amber-600 animate-pulse"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Multiple Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-2xl border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                  <span className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">Premium Amenities</span>
                </div>
                {/* UPDATED: Heading on single line */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 mb-4 md:mb-6 tracking-tight">
                  World-Class Facilities
                </h1>
                {/* UPDATED: Subtitle moved below */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Every detail thoughtfully designed for your comfort and convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities by Category - Vibrant Color-Coded */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          {amenitiesCategories.map((category, idx) => (
            <div key={idx} className="space-y-6 md:space-y-8">
              {/* Category Header with Gradient */}
              <div className="relative">
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
                  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                    {category.category}
                  </h2>
                  <div className={`h-1 w-20 bg-gradient-to-l ${category.gradient} rounded-full hidden md:block`}></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {category.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden"
                    >
                      {/* Animated gradient blur on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                      
                      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-2 border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-6 md:p-8 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2">
                        <div className="relative z-10">
                          <div className="mb-4 md:mb-5">
                            <div className={`inline-flex p-3 md:p-4 bg-gradient-to-br ${category.gradient} rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                              <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-amber-400 transition-all duration-300">
                            {item.label}
                          </h3>
                          <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>

                        {/* Decorative corner accent */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.gradient} opacity-5 rounded-bl-full`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info Banner */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Experience Luxury Living</h3>
              <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
                From self-check-in convenience to 24/7 power supply, every facility has been carefully selected to ensure your stay is comfortable, secure, and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;