import React from "react";
import { CheckCircle, Wifi, Tv, Coffee, MapPin, Star } from "lucide-react";
import Navbar from "./Navbar";

const Feauters = () => {
  const benefits = [
    { title: "Central Location", desc: "Close to shops, nightlife, and restaurants." },
    { title: "Affordable Luxury", desc: "Enjoy premium comfort without the high price tag." },
    { title: "24/7 Support", desc: "We’re always available to assist you." },
  ];

  const properties = [
    {
      id: 1,
      title: "Entire Apartment",
      desc: "Spacious 2-bedroom apartment with full amenities — perfect for families or groups.",
      image: "https://a0.muscache.com/im/pictures/miso/Hosting-1062424467186970425/original/3a39d6c7-8e9c-46ff-9e9c-f6b3c92b62df.jpeg?im_w=1200",
      link: "https://www.airbnb.com.au/rooms/1062424467186970425",
    },
    {
      id: 2,
      title: "Deluxe Private Room",
      desc: "Cozy and private room with modern furnishings and great lighting.",
      image: "https://a0.muscache.com/im/pictures/miso/Hosting-1073067628849955052/original/63a8dd89-b083-4519-bad9-99cf14e62fef.jpeg?im_w=1200",
      link: "https://www.airbnb.com.au/rooms/1073067628849955052",
    },
    {
      id: 3,
      title: "Premium Studio Suite",
      desc: "A stylish suite perfect for solo travelers or couples.",
      image: "https://a0.muscache.com/im/pictures/miso/Hosting-1062425116260973522/original/4203a5db-290b-4e47-a7cc-f78643df87e2.jpeg?im_w=1200",
      link: "https://www.airbnb.com.au/rooms/1062425116260973522",
    },
  ];

  const amenities = [
    { icon: Wifi, label: "Free Wi-Fi" },
    { icon: Tv, label: "Smart TV" },
    { icon: Coffee, label: "Coffee Maker" },
    { icon: CheckCircle, label: "Private Bathroom" },
    { icon: MapPin, label: "Secure Location" },
  ];

  const reviews = [
    {
      name: "Blessing A.",
      comment:
        "The place is clean, peaceful, and well-equipped. The host was very kind and responsive. I’ll definitely come again!",
    },
    {
      name: "Tunde O.",
      comment:
        "Perfect location and amenities! Booking was easy and the service top-notch. Highly recommended.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://a0.muscache.com/im/pictures/miso/Hosting-1062424467186970425/original/3a39d6c7-8e9c-46ff-9e9c-f6b3c92b62df.jpeg?im_w=1200')",
        }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Book A Stay</h1>
          <p className="text-xl mb-8">Your comfort getaway in Abeokuta — where luxury meets peace.</p>
          <a
            href="#properties"
            className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition"
          >
            Explore Apartments
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Why Stay With Us?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition">
                <CheckCircle className="text-yellow-500 w-10 h-10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Spaces</h2>
            <p className="text-xl text-gray-600">Choose from our full apartment or private suites</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-3">{property.title}</h3>
                  <p className="text-gray-600 mb-5">{property.desc}</p>
                  <a
                    href={property.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View on Airbnb
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Amenities</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {amenities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex flex-col items-center space-y-3">
                  <Icon className="text-blue-600 w-10 h-10" />
                  <span className="text-gray-800 font-medium">{a.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">What Our Guests Say</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg">
                <p className="text-lg mb-4">“{review.comment}”</p>
                <h4 className="text-yellow-300 font-semibold">{review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-2">Book A Stay</h3>
          <p className="mb-6">Abeokuta • Premium Apartments</p>
          <p>© {new Date().getFullYear()} Book A Stay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Feauters;
