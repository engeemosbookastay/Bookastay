import React, { useState } from 'react';
import { MapPin, ShoppingCart, Utensils, Camera, Music, DollarSign, Fuel, Navigation, Clock, ExternalLink, Crown, Train } from 'lucide-react';

const GettingAround = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    tourism: {
      icon: Camera,
      title: 'Tourism, Play & Games',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      items: [
        { name: 'Olumo Rock (historical sightseeing point)', time: '15-17 mins', link: 'https://www.google.com/maps/place/Olumo+Rock+Tourist+Centre/data=!4m2!3m1!1s0x0:0x8b3b657ec52d6ca2?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Nike Art Gallery (same location as Olumo Rock)', time: '15-17 mins', link: 'https://www.google.com/maps/place/Olumo+Rock+Tourist+Centre/data=!4m2!3m1!1s0x0:0x8b3b657ec52d6ca2?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Kuti Heritage Museum, Isabo (Ransome-Kuti family-focused)', time: '15-17 mins', link: 'https://www.google.com/maps/place/The+Kuti+Heritage+Museum/data=!4m2!3m1!1s0x0:0xbf071edbaf512766?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'OOPL Wildlife Park (mini-zoo experience for kids and adults)', time: '19-22 mins', link: 'https://www.google.com/maps/place/OOPL+WILDLIFE+PARK/data=!4m2!3m1!1s0x0:0xd56fd816953819c9?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'OOPL Rounda Fun Spot (play options for kids)', time: '16-21 mins', link: 'https://www.google.com/maps/place/OOPL+Rounda+Fun+Spot/data=!4m2!3m1!1s0x0:0x444ed0adf08f927a?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Adonis Plaza Paintball and Games (multiple games options)', time: '21-25 mins', link: 'https://www.google.com/maps/place/Muda+Lawal+Stadium/data=!4m2!3m1!1s0x0:0xaf0350ccb7acbb9a?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Funsation Games & Entertainment, Oke-Ilewo', time: '13-15 mins', link: 'https://www.google.com/maps/place/Funsation+Games+and+Entertainment+Center/data=!4m2!3m1!1s0x0:0x3be61307be257838?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'FoodCo Akin-Olugbade Social Centre (kids play area)', time: '8 mins', link: 'https://www.google.com/maps/place/FoodCo+Akin-Olugbade+Social+Centre/data=!4m2!3m1!1s0x0:0x6bdaa90f7fdcf79?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'OOPL Cinemas, Oke-Mosan', time: '19-23 mins', link: 'https://www.google.com/maps/place/OOPL+Cinemas/data=!4m2!3m1!1s0x0:0x9dbe344ed6f63164?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'OOPL Aje Place Cinemas & Lounge, Panseke', time: '13 mins', link: 'https://www.google.com/maps/place/OOPL+Aje+Place+Cinemas+%26+Lounge/data=!4m2!3m1!1s0x0:0x59afe40419450c3c?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Centenary Hall, Ake (historical sight)', time: '15 mins', link: 'https://www.google.com/maps/place/Centenary+Hall-+Abeokuta/data=!4m2!3m1!1s0x0:0x7283ef228c31d42?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Alake Palace Ground (historic seat of the Alake of Egbaland)', time: '18 mins', link: 'https://www.google.com/maps/place/Alake+Palace+Ground/data=!4m2!3m1!1s0x0:0xd1648f6fc8d87370?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Adire Mall, Itoku (for different styles and prints of adire)', time: '15 mins', link: 'https://www.google.com/maps/place/Adire+Mall,+Itoku/data=!4m2!3m1!1s0x0:0x638c56a3be4b135a?sa=X&ved=1t:2428&hl=en&ictx=111' }
      ]
    },
    food: {
      icon: Utensils,
      title: 'Food & Dining',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-500/10 to-amber-500/10',
      items: [
        { name: 'Burger King Oke-Ilewo (fast food)', time: '13 mins', link: 'https://www.google.com/maps/place/burger+king+oke+ilewo+abeokuta/data=!4m2!3m1!1s0x103a4d0000e34531:0x9ac7dd5f0c7b75a?sa=X&ved=1t:242&hl=en&ictx=111' },
        { name: 'SUPERFOODS Oke-Ilewo (fast food)', time: '11 mins', link: 'https://www.google.com/maps/place/SUPERFOODS+Abeokuta/data=!4m2!3m1!1s0x103a4c7175ee7779:0x9957b6fe87e92e1b?sa=X&ved=1t:242&ictx=111' },
        { name: 'Domino\'s Pizza Abeokuta', time: '10 mins', link: 'https://www.google.com/maps/place/Dominos+Pizza+Abeokuta/data=!4m2!3m1!1s0x0:0xdc5f00b31973f0c9?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Sweet Sensation Oke-Ilewo (fast food)', time: '12 mins', link: 'https://www.google.com/maps/place/Sweet+Sensation+(Abeokuta)/data=!4m2!3m1!1s0x0:0x8cd34ac69aab5f16?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'WokCity Restaurant Oke-Ilewo (multiple options)', time: '12 mins', link: 'https://www.google.com/maps/place/WokCity+Restaurant+Ibara+Abeokuta/data=!4m2!3m1!1s0x0:0xb709d11ef8207105?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'CHOW TOWN Adigbe (Rice, Pasta/Noodles & Sandwiches)', time: '19 mins', link: 'https://www.google.com/maps/place/CHOW+TOWN/data=!4m2!3m1!1s0x0:0x427a1b74f8a94ed?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Halaga Restaurant Ope Oluwa Ita Oshin (local food)', time: '8 mins', link: 'https://www.google.com/maps/place/Halaga+Restaurant/data=!4m2!3m1!1s0x0:0x9a6509df71cf0f88?sa=X&ved=1t:2428&ictx=111' },
        { name: 'South Kitchen & Lounge Ibara Housing (fine dining)', time: '18-20 mins', link: 'https://www.google.com/maps/place/south+kitchen+and+lounge+abeokuta/data=!4m2!3m1!1s0x103a4be7c6c2d9c3:0xe1a17fc0472294e8?sa=X&ved=1t:242&hl=en&ictx=111' },
        { name: 'Royal Mandarin Restaurant Ibara Housing (fine dining)', time: '17 mins', link: 'https://www.google.com/maps/place/Royal+mandarin+restaurant/data=!4m2!3m1!1s0x0:0xa1d3a9f9d17f2ac8?sa=X&ved=1t:2428&hl=en&ictx=111' }
      ]
    },
    nightlife: {
      icon: Music,
      title: 'Night Life (Clubs)',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-500/10 to-rose-500/10',
      items: [
        { name: 'Quench Nightlife (Quarry Imperial Hotel)', time: '11 mins', link: 'https://www.google.com/maps/place/quench+nightlife+abeokuta/data=!4m2!3m1!1s0x103a4dc17cf414cd:0x6845d81057ea6494?sa=X&ved=1t:242&ictx=111' },
        { name: 'BarCode Lounge (off Quarry Road)', time: '11 mins', link: 'https://www.google.com/maps/place/BarCode+lounge+Abk/data=!4m2!3m1!1s0x0:0xea0cd2b3fe2b895a?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Red Dot Club (Ita Eko)', time: '10 mins', link: 'https://www.google.com/maps/place/Red+Dot+Club/data=!4m2!3m1!1s0x0:0xc116546d5d76f268?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'XO RestoBar (off Akin Olugbade Road)', time: '9 mins', link: 'https://www.google.com/maps/place/XO+RestoBar/data=!4m2!3m1!1s0x0:0xe3ae6a313f8f9c2e?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Elysium Oasis (Onikolobo area)', time: '11 mins', link: 'https://www.google.com/maps/place/Elysium+Oasis/data=!4m2!3m1!1s0x0:0x6d6d212934fdff56?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'The South Club (Leme/NNPC area)', time: '16 mins', link: 'https://www.google.com/maps/place/The+South+Club/data=!4m2!3m1!1s0x0:0xe629a4c03e6104be?sa=X&ved=1t:2428&ictx=111' }
      ]
    },
    atm: {
      icon: DollarSign,
      title: 'ATM Options',
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-500/10 to-cyan-500/10',
      items: [
        { name: 'WEMA Bank ATM (Lafenwa)', time: '9 mins', link: 'https://www.google.com/maps/place/Wema+Bank+-+Lafenwa/data=!4m2!3m1!1s0x0:0x13b83cbf747dac66?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Polaris Bank ATM (Oke-Ilewo/Ibara)', time: '12 mins', link: 'https://www.google.com/maps/place/Polaris+Bank+Limited/data=!4m2!3m1!1s0x0:0x1bb152198e5f5cc6?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'UBA ATM (Ita-Eko)', time: '10 mins', link: 'https://www.google.com/maps/place/United+Bank+for+Africa/data=!4m2!3m1!1s0x0:0xae29cb562e06f62a?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'GTB ATM (IBB Boulevard)', time: '12 mins', link: 'https://www.google.com/maps/place/Guaranty+Trust+Bank+PLC+Kuto+Abeokuta/data=!4m2!3m1!1s0x0:0x2637eef8f199847d?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Access Bank ATM (Oke-Ilewo)', time: '13 mins', link: 'https://www.google.com/maps/place/Access+Bank+Plc+Oke+Ilewo+Branch/data=!4m2!3m1!1s0x0:0xa4440a234118d531?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'FCMB ATM (Oke-Ilewo)', time: '11 mins', link: 'https://www.google.com/maps/place/FCMB+Abeokuta+Branch/data=!4m2!3m1!1s0x0:0x38132a8454f02dd9?sa=X&ved=1t:2428&hl=en&ictx=111' }
      ]
    },
    supermarkets: {
      icon: ShoppingCart,
      title: 'Grocery Stores/Supermarkets',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      items: [
        { name: 'FoodCo Supermarket Akin Olugbade', time: '8 mins', link: 'https://www.google.com/maps/place/FoodCo+Akin-Olugbade+Social+Centre/data=!4m2!3m1!1s0x0:0x6bdaa90f7fdcf79?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Justrite Superstore Lafenwa', time: '8 mins', link: 'https://www.google.com/maps/place/Justrite+Superstores+lafenwa/data=!4m2!3m1!1s0x0:0x9fe704b6f24bdae3?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Justrite Superstore Ibara', time: '13 mins', link: 'https://www.google.com/maps/place/Justrite+Superstore+Ibara,+Abeokuta/data=!4m2!3m1!1s0x0:0x6055edc019c82d83?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Bestdeal Supermarket Oke-Ilewo', time: '13 mins', link: 'https://www.google.com/maps/place/Bestdeal+Supermarket+Oke-ilewo/data=!4m2!3m1!1s0x0:0x283605172c635e8a?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'Shalom Megastores Oke-Ilewo', time: '13 mins', link: 'https://www.google.com/maps/place/shalom+mega+stores+oke-ilewo+abeokuta/data=!4m2!3m1!1s0x103a4c77f6b6b327:0x6ee76a5b7168a8da?sa=X&ved=1t:242&hl=en&ictx=111' }
      ]
    },
    fuel: {
      icon: Fuel,
      title: 'Filling Stations',
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-500/10 to-orange-500/10',
      items: [
        { name: 'Bovas Filling Station (along Ita-Oshin road)', time: '6 mins', link: 'https://www.google.com/maps/place/Bovas+Filling+Station/data=!4m2!3m1!1s0x0:0x5d102ab52a106ede?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'NNPC Filling Station (Ita-Oshin)', time: '6 mins', link: 'https://www.google.com/maps/place/NNPC+-+Ita-Oshin+Filling+Station/data=!4m2!3m1!1s0x0:0xa8ea96058bc51c06?sa=X&ved=1t:2428&hl=en&ictx=111' },
        { name: 'NNPC Filling Station (Akin Olugbade)', time: '9 mins', link: 'https://maps.app.goo.gl/TjkmGocmpnXSpsCdA' },
        { name: 'World Oil Filling Station (Oke-Ilewo)', time: '11 mins', link: 'https://www.google.com/maps/place/World+Oil+Nigeria+Limited/data=!4m2!3m1!1s0x0:0xf28be25caf21c578?sa=X&ved=1t:2428&hl=en&ictx=111' }
      ]
    },
    markets: {
      icon: ShoppingCart,
      title: 'Local Markets',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      items: [
        { name: 'Olomore Market', time: '5-6 mins', link: 'https://www.google.com/maps/place/Olomore+Market/data=!4m2!3m1!1s0x0:0x3d667733607ee4c1?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Lafenwa Market', time: '8-10 mins', link: 'https://www.google.com/maps/place/Lafenwa+Market/data=!4m2!3m1!1s0x0:0x82f5b5e9d6fd1459?sa=X&ved=1t:2428&ictx=111' },
        { name: 'Omida Market', time: '12-15 mins', link: 'https://www.google.com/maps/place/Omida+Shopping+Complex+Abeokuta/data=!4m2!3m1!1s0x0:0xcfcbddbb8b59d9bf?sa=X&ved=1t:2428&ictx=111' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Banner - Dark Blue & Gold */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-10 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-2xl border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Navigation className="w-6 h-6 text-amber-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                  <span className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">Explore Abeokuta</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  Getting <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Around</span>
                </h1>
                {/* UPDATED: Split into two paragraphs as per Gbenga's feedback */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-4">
                  For guests arriving on the train, the apartment is 27-28 minutes' drive from Professor Wole Soyinka Train Station.
                </p>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Carefully curated below is a list of important places and things that guests may want to visit or do during their stay...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-900/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <MapPin className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Our Location</h2>
                  <p className="text-gray-300 text-lg">
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
            
            <div className="p-6 md:p-8 bg-slate-800/50">
              <a
                href="https://maps.app.goo.gl/WNAr99EDRRyCWmDU9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 hover:scale-105"
              >
                <Navigation className="w-5 h-5" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg'
                : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-amber-500/20'
            }`}
          >
            All
          </button>
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : `bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-amber-500/20`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">{cat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Places Grid - Ordered by length (longest first) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories)
            .filter(([key]) => activeCategory === 'all' || activeCategory === key)
            .sort(([, a], [, b]) => b.items.length - a.items.length)
            .map(([key, category]) => {
              const Icon = category.icon;
              
              return (
                <div key={key} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.bgGradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300">
                    <div className={`bg-gradient-to-r ${category.gradient} p-4`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-white text-sm">{category.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-2">
                      {category.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-all group/item"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">{item.name}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover/item:text-amber-400 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Note */}
        <div className="mt-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-lg"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-amber-400">Note:</strong> There are small stalls along Sekoni Street within walking distance from the apartment where guests can make urgent shopping for things like pepper, vegetable, beverages, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingAround;