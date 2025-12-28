import React, { useState } from 'react';
import { MapPin, ShoppingCart, Utensils, Camera, Music, DollarSign, Fuel, Navigation, Clock, ExternalLink } from 'lucide-react';

const GettingAround = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    markets: {
      icon: ShoppingCart,
      title: 'Local Markets',
      color: 'blue',
      items: [
        { name: 'Olomore Market', time: '5-6 mins', link: '#' },
        { name: 'Lafenwa Market', time: '8-10 mins', link: '#' },
        { name: 'Omida Market', time: '12-15 mins', link: '#' }
      ]
    },
    supermarkets: {
      icon: ShoppingCart,
      title: 'Supermarkets',
      color: 'green',
      items: [
        { name: 'FoodCo Supermarket Akin Olugbade', time: '8 mins', link: '#' },
        { name: 'Justrite Superstore Lafenwa', time: '8 mins', link: '#' },
        { name: 'Justrite Superstore Ibara', time: '13 mins', link: '#' },
        { name: 'Bestdeal Supermarket Oke-Ilewo', time: '13 mins', link: '#' },
        { name: 'Shalom Megastores Oke-Ilewo', time: '13 mins', link: '#' }
      ]
    },
    food: {
      icon: Utensils,
      title: 'Food & Dining',
      color: 'orange',
      items: [
        { name: 'Burger King Oke-Ilewo', time: '13 mins', link: '#' },
        { name: 'SUPERFOODS Oke-Ilewo', time: '11 mins', link: '#' },
        { name: 'Sweet Sensation Oke-Ilewo', time: '12 mins', link: '#' },
        { name: 'WokCity Restaurant', time: '12 mins', link: '#' },
        { name: 'CHOW TOWN Adigbe', time: '19 mins', link: '#' },
        { name: 'Halaga Restaurant', time: '8 mins', link: '#' },
        { name: 'South Kitchen & Lounge', time: '18-20 mins', link: '#' },
        { name: 'Royal Mandarin Restaurant', time: '17 mins', link: '#' }
      ]
    },
    attractions: {
      icon: Camera,
      title: 'Tourist Attractions',
      color: 'purple',
      items: [
        { name: 'Olumo Rock', time: '15-17 mins', link: '#' },
        { name: 'Nike Art Gallery', time: '15-17 mins', link: '#' },
        { name: 'Kuti Heritage Museum', time: '15-17 mins', link: '#' },
        { name: 'OOPL Wildlife Park', time: '19-22 mins', link: '#' },
        { name: 'OOPL Rounda Fun Spot', time: '16-21 mins', link: '#' },
        { name: 'Adonis Plaza Paintball', time: '21-25 mins', link: '#' },
        { name: 'Funsation Games', time: '13-15 mins', link: '#' },
        { name: 'FoodCo Social Centre', time: '8 mins', link: '#' },
        { name: 'OOPL Cinemas', time: '19-23 mins', link: '#' },
        { name: 'Centenary Hall', time: '15 mins', link: '#' },
        { name: 'Alake Palace Ground', time: '18 mins', link: '#' },
        { name: 'Adire Mall', time: '15 mins', link: '#' }
      ]
    },
    nightlife: {
      icon: Music,
      title: 'Nightlife',
      color: 'pink',
      items: [
        { name: 'Quench Nightlife', time: '11 mins', link: '#' },
        { name: 'BarCode Lounge', time: '11 mins', link: '#' },
        { name: 'Red Dot Club', time: '10 mins', link: '#' },
        { name: 'XO RestoBar', time: '9 mins', link: '#' },
        { name: 'Elysium Oasis', time: '11 mins', link: '#' },
        { name: 'The South Club', time: '16 mins', link: '#' }
      ]
    },
    atm: {
      icon: DollarSign,
      title: 'ATMs',
      color: 'teal',
      items: [
        { name: 'WEMA Bank ATM', time: '9 mins', link: '#' },
        { name: 'Polaris Bank ATM', time: '12 mins', link: '#' },
        { name: 'UBA ATM', time: '10 mins', link: '#' },
        { name: 'GTB ATM', time: '12 mins', link: '#' },
        { name: 'Access Bank ATM', time: '13 mins', link: '#' },
        { name: 'FCMB ATM', time: '11 mins', link: '#' }
      ]
    },
    fuel: {
      icon: Fuel,
      title: 'Filling Stations',
      color: 'red',
      items: [
        { name: 'Bovas Filling Station', time: '6 mins', link: '#' },
        { name: 'NNPC Filling Station (Ita-Oshin)', time: '6 mins', link: '#' },
        { name: 'NNPC Filling Station (Akin Olugbade)', time: '9 mins', link: '#' },
        { name: 'Fatgbem Filling Station', time: '10 mins', link: '#' },
        { name: 'World Oil Filling Station', time: '11 mins', link: '#' }
      ]
    }
  };

  const colorClasses = {
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
    green: { bg: 'bg-green-500', hover: 'hover:bg-green-600', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
    orange: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' },
    purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', light: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
    pink: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', light: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600' },
    teal: { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', light: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600' },
    red: { bg: 'bg-red-500', hover: 'hover:bg-red-600', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Getting Around</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Everything you need within reach. Explore Abeokuta's best spots.
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Location</h2>
                <p className="text-gray-700 text-lg">
                  <strong>No 5, Adesola Babarinde Close</strong>, Off Professor Adewunmi Abioye Avenue, Olomore, Abeokuta
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0123456789!2d3.3445678!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDcnMjQuNSJOIDPCsDIwJzQwLjQiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location"
            />
          </div>
          
          <div className="p-6 md:p-8 bg-gray-50">
            <a
              href="https://maps.app.goo.gl/WNAr99EDRRyCWmDU9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
            >
              <Navigation className="w-5 h-5" />
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            const colors = colorClasses[cat.color];
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeCategory === key
                    ? `${colors.bg} text-white`
                    : `bg-white text-gray-700 hover:${colors.light}`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{cat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories)
            .filter(([key]) => activeCategory === 'all' || activeCategory === key)
            .map(([key, category]) => {
              const Icon = category.icon;
              const colors = colorClasses[category.color];
              
              return (
                <div key={key} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                  <div className={`${colors.light} border-b ${colors.border} p-4`}>
                    <div className="flex items-center gap-3">
                      <div className={`${colors.bg} p-2 rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">{category.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    {category.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-gray-700">
            <strong>Note:</strong> There are small stalls along Sekoni Street within walking distance where you can shop for essentials like pepper, vegetables, and beverages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GettingAround;