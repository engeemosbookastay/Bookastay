import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import { Users, Home, Bed, Star, ChevronLeft, ChevronRight, Upload, Wifi, Tv, Wind, Car, MapPin, Check, X, DoorOpen, Utensils, Shield, Calendar, Sparkles } from 'lucide-react';

// Import actual images
import Living from '../assets/Living.jpg';
import Dine from '../assets/Dine.jpg';
import LiveRoom from '../assets/LiveRoom.jpg';
import Room from '../assets/Room.jpg';

const Rooms = () => {
  const [activeTab, setActiveTab] = useState('2bedroom');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numGuests, setNumGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [idType, setIdType] = useState('');
  const [idFile, setIdFile] = useState(null);
  
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Availability state
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const availabilityTimer = React.useRef(null);

  // Get URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkin = params.get('checkin');
    const checkout = params.get('checkout');
    const adults = params.get('adults');
    const type = params.get('type');
    
    if (checkin) setCheckIn(checkin);
    if (checkout) setCheckOut(checkout);
    if (adults) setNumGuests(parseInt(adults));
    if (type) setActiveTab(type);
  }, []);

  // Central availability check function
  const checkAvailability = React.useCallback(async (opts = {}) => {
    const roomType = opts.roomType ?? (activeTab === '2bedroom' ? 'entire' : 'room1');
    const inDate = opts.checkIn ?? checkIn;
    const outDate = opts.checkOut ?? checkOut;

    if (!inDate || !outDate) {
      setAvailability(null);
      setAvailabilityError('');
      setAvailabilityLoading(false);
      return;
    }

    if (availabilityTimer.current) clearTimeout(availabilityTimer.current);
    
    setAvailabilityLoading(true);
    setAvailabilityError('');

    availabilityTimer.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          room_type: roomType,
          check_in_date: inDate,
          check_out_date: outDate,
        });
        
        const resp = await fetch(`${backendUrl}/api/availability?${params.toString()}`);
        const json = await resp.json().catch(() => ({}));

        if (!resp.ok || !json || !json.success) {
          setAvailability(false);
          setAvailabilityError(json?.message || 'Failed to check availability');
        } else {
          if (json.available) {
            setAvailability(true);
            setAvailabilityError('');
          } else {
            const msg = json.message || 'Selected dates are not available';
            setAvailabilityError(msg);
            setAvailability(false);
          }
        }
      } catch (e) {
        setAvailability(false);
        setAvailabilityError('Network error checking availability');
      } finally {
        setAvailabilityLoading(false);
        availabilityTimer.current = null;
      }
    }, 400);
  }, [activeTab, checkIn, checkOut]);

  useEffect(() => {
    checkAvailability();
    return () => {
      if (availabilityTimer.current) {
        clearTimeout(availabilityTimer.current);
      }
    };
  }, [checkIn, checkOut, activeTab, checkAvailability]);

  const canProceedToBooking = () => {
    return availability === true && !availabilityLoading && checkIn && checkOut;
  };

  const roomOptions = {
    '2bedroom': {
      id: '2bedroom',
      title: '2 Bedroom Apartment',
      subtitle: 'Spacious luxury apartment perfect for families',
      category: 'Entire Apartment',
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      description: 'Experience luxury in our spacious 2-bedroom apartment. Featuring modern amenities, a fully equipped kitchen, elegant living spaces, and stunning balconies with breathtaking views. Perfect for families or groups seeking comfort and privacy in the heart of Abeokuta.',
      basePrice: 100000,
      extraGuestCharge: 0,
      maxGuests: 4,
      accentColor: 'from-blue-900 to-blue-800',
      bgColor: 'from-slate-800 to-slate-900',
      amenities: [
        { name: 'High-Speed WiFi', icon: Wifi, desc: '100 Mbps fiber' },
        { name: 'Full Kitchen', icon: Utensils, desc: 'Cooking essentials' },
        { name: 'Air Conditioning', icon: Wind, desc: 'Climate control' },
        { name: 'Smart TV', icon: Tv, desc: 'Netflix & DSTV' },
        { name: 'Free Parking', icon: Car, desc: 'On-site parking' },
        { name: 'Private Balcony', icon: DoorOpen, desc: 'City & garden views' },
        { name: 'Self Check-in', icon: Shield, desc: 'Keyless entry' },
        { name: 'Workspace', icon: Home, desc: 'Dedicated desk' }
      ],
      images: [Living, LiveRoom, Room, Dine]
    },
    '1bedroom': {
      id: '1bedroom',
      title: '1 Bedroom Suite',
      subtitle: 'Cozy and elegant for solo travelers or couples',
      category: 'Private Room',
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description: 'Your perfect retreat awaits! This beautifully designed 1-bedroom suite offers comfort and privacy with access to premium shared spaces. Ideal for solo travelers or couples seeking a peaceful escape with all the amenities you need.',
      basePrice: 60000,
      maxGuests: 2,
      accentColor: 'from-amber-500 to-amber-600',
      bgColor: 'from-slate-800 to-slate-900',
      amenities: [
        { name: 'High-Speed WiFi', icon: Wifi, desc: '100 Mbps fiber' },
        { name: 'Shared Kitchen', icon: Utensils, desc: 'Full access' },
        { name: 'Air Conditioning', icon: Wind, desc: 'In room' },
        { name: 'Shared Living', icon: Tv, desc: 'Common areas' },
        { name: 'Parking', icon: Car, desc: 'Available' },
        { name: 'Balcony Access', icon: DoorOpen, desc: 'Shared' },
        { name: 'Private Bathroom', icon: Shield, desc: 'En-suite' }
      ],
      images: [Living, LiveRoom, Room, Dine]
    }
  };

  const currentOption = roomOptions[activeTab];

  const calculatePrice = () => {
    if (!checkIn || !checkOut) return { base: 0, discount: 0, extraGuest: 0, total: 0, nights: 0, discountType: '' };
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return { base: 0, discount: 0, extraGuest: 0, total: 0, nights: 0, discountType: '' };
    
    let basePrice = currentOption.basePrice * nights;
    let discountRate = 0;
    let discountType = '';
    
    if (nights >= 30) {
      discountRate = 0.10;
      discountType = '10% Monthly Discount';
    } else if (nights >= 7) {
      discountRate = 0.05;
      discountType = '5% Weekly Discount';
    }
    
    const discount = basePrice * discountRate;
    let extraGuestCharge = 0;
    
    if (activeTab === '2bedroom' && numGuests === 4) {
      extraGuestCharge = currentOption.extraGuestCharge * nights;
    }
    
    const total = basePrice - discount + extraGuestCharge;
    return { base: basePrice, discount, extraGuest: extraGuestCharge, total, nights, discountType };
  };

  const price = calculatePrice();

  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % currentOption.images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + currentOption.images.length) % currentOption.images.length);

  const handleProceedToPayment = () => {
    if (!canProceedToBooking()) {
      alert('Please wait for availability confirmation or select different dates');
      return;
    }

    if (!guestName || !guestEmail || !guestPhone || !idType || !idFile) {
      alert('Please complete all required fields');
      return;
    }

    const txRef = `book_${Date.now()}`;
    const amount = price.total;
    const roomType = activeTab === '2bedroom' ? 'entire' : 'room1';

    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
    if (!PAYSTACK_KEY) return alert('Paystack public key is not configured.');
    if (!window.PaystackPop) return alert('Paystack library failed to load.');
    if (!amount || amount <= 0) return alert('Invalid payment amount');

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: guestEmail,
      amount: Math.round(amount * 100),
      ref: txRef,
      onClose: function() {},
      callback: function(response) {
        const paymentRef = response?.reference || response?.txRef || null;
        if (!paymentRef) {
          return alert('Payment reference missing. Please contact support.');
        }

        const form = new FormData();
        form.append('name', guestName);
        form.append('email', guestEmail);
        form.append('phone', guestPhone);
        form.append('room_type', roomType);
        form.append('check_in_date', checkIn);
        form.append('check_out_date', checkOut);
        form.append('price', amount);
        form.append('payment_reference', paymentRef);
        form.append('tx_ref', txRef);
        form.append('provider', 'paystack');
        form.append('id_type', idType);
        if (idFile) form.append('id_file', idFile);

        fetch(`${backendUrl}/api/bookings/confirm`, {
          method: 'POST',
          body: form
        })
          .then(async (r) => {
            const data = await r.json().catch(() => ({}));
            if (!r.ok || data.error) {
              return alert('Booking failed: ' + (data?.error || data?.message || 'Unknown error'));
            }
            setGuestName('');
            setGuestEmail('');
            setGuestPhone(''); 
            setIdType(''); 
            setIdFile(null); 
            setCheckIn(''); 
            setCheckOut(''); 
            setNumGuests(2);
            setAvailability(null);
            setShowBookingModal(false);
            alert('Booking confirmed successfully!');
          })
          .catch(err => {
            alert('Confirmation failed: ' + err.message);
          });
      }
    });
    handler.openIframe();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const s = document.createElement('script');
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-amber-500/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                    Complete Booking
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Enter your details to proceed
                  </p>
                </div>
                <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={guestName} 
                    onChange={(e) => setGuestName(e.target.value)} 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={guestEmail} 
                    onChange={(e) => setGuestEmail(e.target.value)} 
                    placeholder="you@example.com" 
                    className="w-full px-4 py-3 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={guestPhone} 
                    onChange={(e) => setGuestPhone(e.target.value)} 
                    placeholder="+234 800 000 0000" 
                    className="w-full px-4 py-3 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">ID Type</label>
                  <select 
                    value={idType} 
                    onChange={(e) => setIdType(e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                    required
                  >
                    <option value="">Select ID type</option>
                    <option value="nin">NIN</option>
                    <option value="passport">International Passport</option>
                    <option value="license">Driver's License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Upload ID Document</label>
                  <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-6 text-center hover:border-amber-500/50 hover:bg-slate-700/30 transition cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      onChange={(e) => setIdFile(e.target.files[0])} 
                      className="hidden" 
                      id="id-upload-modal" 
                      required 
                    />
                    <label htmlFor="id-upload-modal" className="cursor-pointer">
                      {idFile ? (
                        <div className="flex items-center justify-center gap-2 text-white">
                          <Check size={22} className="text-green-400" />
                          <span className="font-bold">{idFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mx-auto mb-2 text-amber-400" />
                          <p className="font-bold text-white">Click to upload</p>
                          <p className="text-sm text-gray-400 mt-1">PNG, JPG or PDF</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={!guestName || !guestEmail || !guestPhone || !idType || !idFile}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 py-3.5 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  Proceed to Payment
                </button>

                <p className="text-xs text-center text-gray-400 font-medium">
                  Secure payment via Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar Spacer */}
      <div className="h-16 lg:h-20"></div>

      {/* Room Type Selection */}
      <div className="border-b border-amber-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-5xl font-bold text-white mb-8 text-center">Select Your Suite</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {Object.entries(roomOptions).map(([key, option]) => (
              <button
                key={key}
                onClick={() => { 
                  setActiveTab(key); 
                  setCurrentImageIndex(0); 
                  setNumGuests(key === '2bedroom' ? 2 : 2);
                  setAvailability(null);
                }}
                className={`relative group px-12 py-8 rounded-2xl font-semibold transition-all transform hover:scale-105 overflow-hidden ${
                  activeTab === key
                    ? 'shadow-2xl shadow-amber-500/50'
                    : 'bg-slate-800/50 border-2 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${option.accentColor} ${activeTab === key ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{option.bedrooms === 2 ? '🏠' : '🛏️'}</div>
                  <div className={`font-bold text-2xl mb-2 ${activeTab === key ? 'text-white' : 'text-gray-300'}`}>{option.title}</div>
                  <div className={`text-sm ${activeTab === key ? 'text-amber-200' : 'text-gray-500'}`}>₦{option.basePrice.toLocaleString()}/night</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-3 text-sm mb-4 flex-wrap">
                <span className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold shadow-lg">
                  {currentOption.category}
                </span>
                <span className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-amber-500/20 text-white">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Abeokuta, Nigeria
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">{currentOption.title}</h1>
              <p className="text-xl text-gray-400">{currentOption.subtitle}</p>
            </div>

            {/* Image Gallery */}
            <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
              <div className="relative h-96 sm:h-[500px]">
                <img src={currentOption.images[currentImageIndex]} alt="Room" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {currentOption.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-white">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-white">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                      {currentOption.images.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-amber-400 w-12' : 'bg-white/60 w-2'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center gap-6 py-8 border-y-2 border-amber-500/20 flex-wrap">
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-amber-500/20">
                <Users className="w-6 h-6 text-amber-400" />
                <span className="text-white font-bold text-lg">{currentOption.guests} guests</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-amber-500/20">
                <Bed className="w-6 h-6 text-amber-400" />
                <span className="text-white font-bold text-lg">{currentOption.bedrooms} bedroom{currentOption.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-amber-500/20">
                <Home className="w-6 h-6 text-amber-400" />
                <span className="text-white font-bold text-lg">{currentOption.bathrooms} bathroom{currentOption.bathrooms > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Description */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-10 rounded-3xl border border-amber-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  About This Space
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">{currentOption.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Premium Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {currentOption.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition hover:shadow-lg hover:shadow-amber-500/10 group">
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-slate-900" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{amenity.name}</p>
                        <p className="text-sm text-gray-400">{amenity.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl shadow-2xl p-8">
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">₦{currentOption.basePrice.toLocaleString()}</span>
                      <span className="text-gray-400 font-medium">/ night</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-0 border-2 border-amber-500/30 rounded-xl overflow-hidden">
                      <div className="p-4 border-r-2 border-amber-500/30 bg-slate-700/30">
                        <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Check-in</label>
                        <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm text-white focus:outline-none bg-transparent font-semibold" />
                      </div>
                      <div className="p-4 bg-slate-700/30">
                        <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Checkout</label>
                        <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm text-white focus:outline-none bg-transparent font-semibold" />
                      </div>
                    </div>

                    <div className="border-2 border-amber-500/30 rounded-xl p-4 bg-slate-700/30">
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Guests</label>
                      <select value={numGuests} onChange={(e) => setNumGuests(parseInt(e.target.value))} className="w-full text-sm text-white focus:outline-none bg-transparent font-semibold">
                        {[...Array(currentOption.maxGuests)].map((_, i) => (
                          <option key={i + 1} value={i + 1} className="bg-slate-800">{i + 1} guest{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Availability Status */}
                  {availabilityLoading && (
                    <div className="mb-6 p-4 bg-blue-500/20 border-2 border-blue-400/50 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-blue-200">Checking availability...</p>
                      </div>
                    </div>
                  )}

                  {!availabilityLoading && availability === true && checkIn && checkOut && (
                    <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-400/50 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-green-200 flex items-center gap-2">
                        <Check size={18} />
                        Available for your dates
                      </p>
                    </div>
                  )}

                  {!availabilityLoading && availability === false && availabilityError && (
                    <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-400/50 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-red-200 flex items-center gap-2">
                        <X size={18} />
                        {availabilityError}
                      </p>
                    </div>
                  )}

                  {checkIn && checkOut && price.nights > 0 && (
                    <>
                      <div className="mb-8 space-y-4 pb-8 border-b-2 border-amber-500/20">
                        <div className="flex justify-between text-gray-300 font-semibold text-lg">
                          <span>₦{currentOption.basePrice.toLocaleString()} × {price.nights} nights</span>
                          <span className="text-white">₦{price.base.toLocaleString()}</span>
                        </div>
                        {price.discount > 0 && (
                          <div className="flex justify-between text-green-400 font-bold bg-green-500/20 px-4 py-3 rounded-lg border border-green-500/30">
                            <span>{price.discountType}</span>
                            <span>-₦{price.discount.toLocaleString()}</span>
                          </div>
                        )}
                        {price.extraGuest > 0 && (
                          <div className="flex justify-between text-gray-300 font-semibold">
                            <span>4th guest fee</span>
                            <span className="text-white">₦{price.extraGuest.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-8 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-6 rounded-xl border-2 border-amber-500/30">
                        <div className="flex justify-between text-2xl font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">₦{price.total.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (canProceedToBooking()) {
                            setShowBookingModal(true);
                          }
                        }}
                        disabled={!canProceedToBooking()}
                        className={`w-full py-5 rounded-xl font-bold text-lg transition transform ${
                          !canProceedToBooking()
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105'
                        }`}
                      >
                        {availabilityLoading ? 'Checking...' : canProceedToBooking() ? 'Reserve Now' : 'Not Available'}
                      </button>
                      <p className="text-xs text-center text-gray-400 font-medium mt-4">Secure booking • No hidden fees</p>
                    </>
                  )}

                  {(!checkIn || !checkOut) && (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-amber-400" />
                      <p className="text-gray-400 font-semibold">Select dates to view pricing</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rooms;