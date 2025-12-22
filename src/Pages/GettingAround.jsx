import React from 'react';
import { MapPin, Car, Plane, Bus, Navigation, Clock, Phone, Mail, Instagram, Compass, Map } from 'lucide-react';

const GettingAround = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Navbar Spacer */}
      <div className="h-20 lg:h-24"></div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white py-24 lg:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
              <Navigation size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight">Getting Around</h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-3"></div>
            </div>
          </div>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-200">
            Find your way to Engeemos Bookastay Apartments and explore the vibrant city of Abeokuta
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Compass size={120} className="text-white animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <Map size={100} className="text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

        {/* Location Section */}
        <div className="mb-20 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl">
              <MapPin size={32} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Our Location</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div className="p-8 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-b-2 border-teal-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-3xl">📍</span>
                <span>Address</span>
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>No 5, Adesola Babarinde Close</strong>, Off Professor Adewunmi Abioye Avenue, 
                Olomore, Abeokuta, Ogun State, Nigeria
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-[500px] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0123456789!2d3.3445678!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDcnMjQuNSJOIDPCsDIwJzQwLjQiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Engeemos Bookastay Apartments Location"
                className="grayscale-0 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>

            <div className="p-8 bg-gradient-to-r from-gray-50 to-white">
              <a
                href="https://maps.app.goo.gl/WNAr99EDRRyCWmDU9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform"
              >
                <Navigation size={24} />
                <span>Open in Google Maps</span>
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Transportation Options */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <span className="text-4xl">🚗</span>
            <span>How to Get Here</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* From Airport */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-teal-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Plane size={36} className="text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">From Murtala Muhammed Airport (Lagos)</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3 bg-teal-50 px-4 py-3 rounded-lg border border-teal-200">
                      <Clock size={20} className="text-teal-600 flex-shrink-0" />
                      <span className="font-semibold">Approx. 1.5 - 2 hours drive</span>
                    </div>
                    <p className="leading-relaxed">Take the Lagos-Abeokuta Expressway heading north. Exit at Olomore and follow the signs to Professor Adewunmi Abioye Avenue.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* By Car */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Car size={36} className="text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">By Car / Taxi</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">We offer secure parking facilities for guests arriving by car.</p>
                    <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                      <p className="font-bold text-cyan-700 mb-2">📍 Directions:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-600 mt-1">→</span>
                          <span>Navigate to Olomore, Abeokuta</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-600 mt-1">→</span>
                          <span>Find Professor Adewunmi Abioye Avenue</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-600 mt-1">→</span>
                          <span>Turn into Adesola Babarinde Close</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-600 mt-1">→</span>
                          <span className="font-semibold">We're at No. 5</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public Transport */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Bus size={36} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Public Transportation</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>Several bus routes serve the Olomore area. Ask your driver to drop you at <strong className="text-purple-700">Professor Adewunmi Abioye Avenue</strong>.</p>
                    <p className="bg-purple-50 px-4 py-3 rounded-lg border border-purple-200">From there, it's a short walk to Adesola Babarinde Close.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={36} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Landmarks</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">Look out for these landmarks to help you navigate:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 bg-orange-50 px-3 py-2 rounded-lg">
                        <span className="text-orange-600 font-bold">🏬</span>
                        <span>Olomore Shopping Complex</span>
                      </li>
                      <li className="flex items-start gap-3 bg-orange-50 px-3 py-2 rounded-lg">
                        <span className="text-orange-600 font-bold">🎓</span>
                        <span>Federal University of Agriculture (FUNAAB)</span>
                      </li>
                      <li className="flex items-start gap-3 bg-orange-50 px-3 py-2 rounded-lg">
                        <span className="text-orange-600 font-bold">📚</span>
                        <span>Olusegun Obasanjo Presidential Library</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Area Information */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <span className="text-4xl">🌆</span>
            <span>Explore Abeokuta</span>
          </h2>

          <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-3xl p-10 border-2 border-teal-200 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🏛️</span>
                  <span>Popular Attractions</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: 'Olumo Rock', desc: 'Historic landmark and tourist attraction', time: '15 mins drive', emoji: '🪨' },
                    { name: 'Olusegun Obasanjo Presidential Library', desc: 'Museum and library', time: '10 mins drive', emoji: '📚' },
                    { name: 'Centenary Hall', desc: 'Historical building', time: '12 mins drive', emoji: '🏛️' },
                    { name: "Alake's Palace", desc: 'Traditional palace', time: '18 mins drive', emoji: '👑' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300">
                      <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <div className="flex-1">
                        <strong className="text-gray-900 block">{item.name}</strong>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        <span className="inline-block mt-2 text-xs font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                          🚗 {item.time}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🍽️</span>
                  <span>Dining & Shopping</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: 'Olomore Shopping Complex', desc: 'Shopping and dining', time: '5 mins walk', emoji: '🛍️' },
                    { name: 'Local Markets', desc: 'Fresh produce and local crafts', time: 'Nearby', emoji: '🏪' },
                    { name: 'Restaurants', desc: 'Nigerian and international cuisines', time: 'Nearby', emoji: '🍲' },
                    { name: 'Supermarkets', desc: 'Well-stocked stores', time: 'Walking distance', emoji: '🏬' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
                      <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <div className="flex-1">
                        <strong className="text-gray-900 block">{item.name}</strong>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        <span className="inline-block mt-2 text-xs font-semibold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                          📍 {item.time}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 lg:p-14 text-white shadow-2xl border border-slate-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Need Directions or Assistance?</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Our team is here to help you find your way. Don't hesitate to reach out if you need any assistance.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="tel:+2348166939592"
                className="group flex items-center gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-7 rounded-2xl transition-all duration-300 border border-white/20 hover:border-teal-400 hover:shadow-xl hover:scale-105 transform"
              >
                <div className="bg-teal-500/20 p-4 rounded-xl group-hover:bg-teal-500/30 transition-colors">
                  <Phone size={28} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Call Us</p>
                  <p className="font-bold text-lg">+234 816 693 9592</p>
                </div>
              </a>

              <a
                href="mailto:engeemosbookastay@gmail.com"
                className="group flex items-center gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-7 rounded-2xl transition-all duration-300 border border-white/20 hover:border-cyan-400 hover:shadow-xl hover:scale-105 transform"
              >
                <div className="bg-cyan-500/20 p-4 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                  <Mail size={28} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Us</p>
                  <p className="font-bold text-lg break-all">engeemosbookastay@gmail.com</p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/WNAr99EDRRyCWmDU9"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-7 rounded-2xl transition-all duration-300 border border-white/20 hover:border-blue-400 hover:shadow-xl hover:scale-105 transform"
              >
                <div className="bg-blue-500/20 p-4 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <Navigation size={28} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Navigate</p>
                  <p className="font-bold text-lg">Get Directions</p>
                </div>
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              <a 
                href="https://instagram.com/engeemosbookastay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-300 hover:scale-105 transform"
              >
                <Instagram size={20} />
                <span>@engeemosbookastay</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GettingAround;