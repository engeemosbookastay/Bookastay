import React from "react";
import { CheckCircle, Wifi, Tv, Coffee, MapPin, Zap, Shield, Car, Droplet, Home, Wind, Utensils, Waves, Gamepad2, Briefcase, Sparkles } from "lucide-react";
import Navbar from "./Navbar";

const Feauters = () => {
  const amenitiesCategories = [
    {
      category: "Entertainment & Connectivity",
      items: [
        { icon: Wifi, label: "Unlimited Internet", desc: "MTN 5G Broadband for seamless streaming" },
        { icon: Tv, label: "Smart TV", desc: "Premium entertainment in every room" },
        { icon: Gamepad2, label: "Board Games Collection", desc: "Chess, Scrabble, Ludo, Opon Ayo & more" },
      ]
    },
    {
      category: "Kitchen & Dining",
      items: [
        { icon: Utensils, label: "Fully-Equipped Kitchen", desc: "Gas cooker, microwave, air fryer, blender, toaster & refrigerator" },
        { icon: Coffee, label: "Complimentary Beverages", desc: "Tea, coffee, milk, sugar & welcome juice" },
      ]
    },
    {
      category: "Comfort & Convenience",
      items: [
        { icon: Wind, label: "Climate Control", desc: "Air conditioners with remote smart controls" },
        { icon: Waves, label: "Laundry Service", desc: "Washing machine, detergent, clips & drying rack" },
        { icon: Droplet, label: "Hot Water System", desc: "Water heaters in all bathrooms" },
        { icon: CheckCircle, label: "Hair Dryers", desc: "Available in every bathroom" },
        { icon: Sparkles, label: "Premium Bedding", desc: "Hotel-grade linens, towels & toiletries" },
      ]
    },
    {
      category: "Work & Productivity",
      items: [
        { icon: Briefcase, label: "Dedicated Workspace", desc: "Comfortable work area with ergonomic setup" },
        { icon: Zap, label: "Uninterrupted Power", desc: "10Kva inverter, generator & PHCN backup" },
      ]
    },
    {
      category: "Security & Access",
      items: [
        { icon: Shield, label: "24/7 Security System", desc: "CCTV surveillance & electric fencing" },
        { icon: MapPin, label: "Contactless Check-in", desc: "Self check-in with secure key safe" },
        { icon: Car, label: "Private Parking", desc: "Spacious compound with multiple spots" },
      ]
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Minimalist Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-blue-600 font-medium text-sm">PREMIUM AMENITIES</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            World-Class<br />Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every detail thoughtfully designed for your comfort and convenience
          </p>
        </div>
      </section>

      {/* Facilities by Category */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          {amenitiesCategories.map((category, idx) => (
            <div key={idx} className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="h-px bg-gradient-to-r from-blue-500 to-transparent flex-1"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {category.category}
                </h2>
                <div className="h-px bg-gradient-to-l from-blue-500 to-transparent flex-1"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-all duration-500 overflow-hidden"
                    >
                      {/* Hover gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="mb-5">
                          <div className="inline-flex p-3 bg-gray-50 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                            <Icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elegant CTA */}
      {/* <section className="py-32 px-4 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Experience Excellence
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Book your stay and discover why our guests choose us time and time again
          </p>
          
          <a>
            href="/"
            className="inline-flex items-center px-12 py-5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
            Reserve Your Stay
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default Feauters;