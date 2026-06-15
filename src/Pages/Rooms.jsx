import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import {
  Users, Bed, Bath, Star, Wifi, Wind, Monitor, Zap, Shield, Activity,
  Briefcase, Sun, Droplet, RefreshCw, Coffee, MapPin, Anchor,
  SlidersHorizontal, ChevronRight, Home,
} from 'lucide-react';

import Living from '../assets/Living.jpg';

const AMENITY_ICONS = {
  'High-Speed WiFi':          Wifi,
  'Full Kitchen':             Coffee,
  'Shared Kitchen':           Coffee,
  'Air Conditioning':         Wind,
  'Smart TV':                 Monitor,
  'DSTV / Cable TV':          Monitor,
  'Free Parking':             MapPin,
  'Private Balcony':          Sun,
  'Private Bathroom':         Droplet,
  'Washing Machine':          RefreshCw,
  'Generator / Backup Power': Zap,
  'Security / Gated':         Shield,
  'Swimming Pool':            Anchor,
  'Gym / Fitness':            Activity,
  'Work Desk':                Briefcase,
  'Iron & Board':             SlidersHorizontal,
};

const ACCENT_COLORS = [
  'from-blue-900 to-blue-800',
  'from-amber-700 to-amber-800',
  'from-emerald-800 to-emerald-900',
  'from-purple-800 to-purple-900',
  'from-rose-800 to-rose-900',
];

const FALLBACK_IMAGE = Living;

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/api/properties`)
      .then(r => r.json())
      .then(d => {
        if (d.success && d.properties.length > 0) setRooms(d.properties);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const book = (room) => {
    navigate(`/bookings?type=${room.room_key}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Oluwadarasimi Villa · Abeokuta
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Suites &amp; Rooms</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Choose your perfect stay. All rooms include premium amenities and the warmth of home.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <p className="text-center text-gray-400 py-24">No rooms available right now. Check back soon.</p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {rooms.map((room, idx) => {
            const amenities = (room.amenities || []).map(a => typeof a === 'string' ? a : a.name);
            const images = room.images && room.images.length > 0 ? room.images : [FALLBACK_IMAGE];
            const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];

            return (
              <div key={room.room_key}
                className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition-all hover:-translate-y-1 group">

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={images[0]} alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${accent} opacity-40`} />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-xs font-bold">
                      {room.category || 'Suite'}
                    </span>
                    {room.min_nights > 1 && (
                      <span className="px-3 py-1 bg-slate-900/80 text-white rounded-full text-xs font-semibold">
                        Min {room.min_nights} nights
                      </span>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 text-white rounded text-xs">
                      +{images.length - 1} photos
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-bold text-white">{room.name}</h2>
                      {room.subtitle && <p className="text-amber-400 text-sm mt-0.5">{room.subtitle}</p>}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-2xl font-bold text-amber-400">₦{Number(room.base_price).toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">per night</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-gray-400 text-sm mt-3 mb-4">
                    {room.bedrooms > 0 && (
                      <span className="flex items-center gap-1">
                        {Number(room.bedrooms) >= 2 ? <Home size={14} /> : <Bed size={14} />}
                        {room.bedrooms} bed{room.bedrooms > 1 ? 's' : ''}
                      </span>
                    )}
                    {room.bathrooms > 0 && (
                      <span className="flex items-center gap-1"><Bath size={14} /> {room.bathrooms} bath</span>
                    )}
                    {room.max_guests > 0 && (
                      <span className="flex items-center gap-1"><Users size={14} /> {room.max_guests} guests</span>
                    )}
                  </div>

                  {room.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                  )}

                  {/* Amenities */}
                  {amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {amenities.slice(0, 6).map(name => {
                        const Icon = AMENITY_ICONS[name];
                        return (
                          <span key={name} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs">
                            {Icon && <Icon size={11} />}
                            {name}
                          </span>
                        );
                      })}
                      {amenities.length > 6 && (
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-xs">
                          +{amenities.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  <button onClick={() => book(room)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40">
                    Book This Room <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
