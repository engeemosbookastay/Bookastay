import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import { Users, Home, Bed, Star, ChevronLeft, ChevronRight, Upload, Wifi, Tv, Wind, Car, MapPin, Check, X, DoorOpen, Utensils, Shield, Calendar, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

// Import actual images
import Bedroom from '../assets/Bedroom1.jpg';
import Bedroom2 from '../assets/Bedroom2.jpg';
import Sitting from '../assets/Sitting.jpg';
import Dining from '../assets/Dinning.jpg';
import SittingRoom from '../assets/SittingRoom.jpg';
import SittingRoom2 from '../assets/SittingRoom2.jpg';

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
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

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
    
    if (checkin) setCheckIn(checkin);
    if (checkout) setCheckOut(checkout);
    if (adults) setNumGuests(parseInt(adults));
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
      basePrice: 50000,
      extraGuestCharge: 5000,
      maxGuests: 4,
      accentColor: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      borderColor: 'border-teal-300',
      textColor: 'text-teal-700',
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
      images: [Sitting, SittingRoom, SittingRoom2, Dining, Bedroom, Bedroom2]
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
      basePrice: 27000,
      maxGuests: 2,
      accentColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700',
      amenities: [
        { name: 'High-Speed WiFi', icon: Wifi, desc: '100 Mbps fiber' },
        { name: 'Shared Kitchen', icon: Utensils, desc: 'Full access' },
        { name: 'Air Conditioning', icon: Wind, desc: 'In room' },
        { name: 'Shared Living', icon: Tv, desc: 'Common areas' },
        { name: 'Parking', icon: Car, desc: 'Available' },
        { name: 'Balcony Access', icon: DoorOpen, desc: 'Shared' },
        { name: 'Private Bathroom', icon: Shield, desc: 'En-suite' }
      ],
      images: [Bedroom, Bedroom2, SittingRoom, Dining]
    }
  };

  const reviews = [
    { name: 'Chioma A.', rating: 5, date: 'September 2024', comment: 'Absolutely stunning! The apartment exceeded all expectations. Everything was pristine, modern, and comfortable.', avatar: 'CA' },
    { name: 'David O.', rating: 5, date: 'August 2024', comment: 'Perfect location and amazing value. The WiFi was incredibly fast - great for remote work. Will definitely return!', avatar: 'DO' },
    { name: 'Blessing J.', rating: 5, date: 'July 2024', comment: 'Such a wonderful experience! The space was clean, spacious, and had everything we needed. Highly recommend!', avatar: 'BJ' },
    { name: 'Emmanuel P.', rating: 5, date: 'June 2024', comment: 'Outstanding for business travel. Professional setup, quiet environment, and excellent amenities. Five stars!', avatar: 'EP' }
  ];

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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    
    const payload = { email: authEmail, password: authPassword };
    if (authMode === 'signup') payload.name = authName;

    fetch(`${backendUrl}/auth/${authMode === 'login' ? 'login' : 'signup'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Auth failed');
        
        const session = body.data?.session || body.data || body;
        const accessToken = session?.access_token || session?.accessToken || null;
        const refreshToken = session?.refresh_token || null;
        
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
          
          fetch(`${backendUrl}/auth/me`, { 
            headers: { Authorization: `Bearer ${accessToken}` } 
          })
            .then(r => r.json())
            .then(d => {
              setIsAuthenticated(true);
              setGuestName(d.user?.user_metadata?.full_name || d.user?.email || authName || 'Guest User');
              setGuestEmail(d.user?.email || authEmail);
            })
            .catch(() => {
              setIsAuthenticated(true);
              setGuestName(authName || 'Guest User');
              setGuestEmail(authEmail);
            });
        } else {
          setIsAuthenticated(true);
          setGuestName(authName || 'Guest User');
          setGuestEmail(authEmail);
        }
        setShowAuthModal(false);
      })
      .catch(err => {
        alert(err.message || 'Authentication failed');
      })
      .finally(() => {
        setAuthLoading(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthName('');
      });
  };

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    fetch(`${backendUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).finally(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      setGuestName('');
      setGuestEmail('');
    });
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!canProceedToBooking()) {
      alert('Please wait for availability confirmation or select different dates');
      return;
    }

    if (!guestPhone || !idType || !idFile) {
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
      email: guestEmail || authEmail || 'guest@example.com',
      amount: Math.round(amount * 100),
      ref: txRef,
      onClose: function() {},
      callback: function(response) {
        const paymentRef = response?.reference || response?.txRef || null;
        if (!paymentRef) {
          return alert('Payment reference missing. Please contact support.');
        }

        const form = new FormData();
        form.append('name', guestName || authName || 'Guest User');
        form.append('email', guestEmail || authEmail || '');
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
            setGuestPhone(''); 
            setIdType(''); 
            setIdFile(null); 
            setCheckIn(''); 
            setCheckOut(''); 
            setNumGuests(2);
            setAvailability(null);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {authMode === 'login' ? 'Welcome back' : 'Join us'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {authMode === 'login' ? 'Sign in to continue' : 'Create your account'}
                  </p>
                </div>
                <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={authLoading} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50">
                  {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
                <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="w-full text-sm text-teal-600 hover:text-teal-700 font-medium">
                  {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-lg z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Engeemos Bookastay</h1>
            </div>
            {isAuthenticated && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full text-sm">
                <Check size={16} className="text-green-600" />
                <span className="font-medium text-green-700">{guestEmail}</span>
                <button onClick={handleLogout} className="ml-3 text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 hover:bg-red-100">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Room Type Selection */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Choose Your Room</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {Object.entries(roomOptions).map(([key, option]) => (
              <button
                key={key}
                onClick={() => { 
                  setActiveTab(key); 
                  setCurrentImageIndex(0); 
                  setNumGuests(key === '2bedroom' ? 2 : 2);
                  setAvailability(null);
                }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  activeTab === key
                    ? `${option.accentColor} text-white shadow-xl`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{option.bedrooms === 2 ? '🏠' : '🛏️'}</div>
                  <div className="font-bold text-lg">{option.title}</div>
                  <div className="text-sm opacity-90 mt-1">₦{option.basePrice.toLocaleString()}/night</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-2 text-sm mb-3 flex-wrap">
                <span className={`px-4 py-2 ${currentOption.bgColor} ${currentOption.textColor} rounded-xl font-bold border-2 ${currentOption.borderColor}`}>
                  {currentOption.category}
                </span>
                <span className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-xl border border-yellow-200">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-gray-900">5.0</span>
                  <span className="text-gray-600">(12 reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                  <MapPin className="w-4 h-4" />
                  Abeokuta, Nigeria
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentOption.title}</h1>
              <p className="text-lg text-gray-600">{currentOption.subtitle}</p>
            </div>

            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden group shadow-2xl">
              <div className="relative h-96 sm:h-[500px]">
                <img src={currentOption.images[currentImageIndex]} alt="Room" className="w-full h-full object-cover" />
                
                {currentOption.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {currentOption.images.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-10' : 'bg-white/60 w-2'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center gap-6 py-6 border-y-2 border-gray-200">
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl border border-teal-200">
                <Users className="w-5 h-5 text-teal-600" />
                <span className="text-gray-900 font-semibold">{currentOption.guests} guests</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-xl border border-cyan-200">
                <Bed className="w-5 h-5 text-cyan-600" />
                <span className="text-gray-900 font-semibold">{currentOption.bedrooms} bedroom{currentOption.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <Home className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900 font-semibold">{currentOption.bathrooms} bathroom{currentOption.bathrooms > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{currentOption.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentOption.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition hover:shadow-lg">
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-xl">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{amenity.name}</p>
                        <p className="text-sm text-gray-600">{amenity.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-7 h-7 fill-yellow-500 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">5.0 · 12 reviews</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="space-y-3 bg-white p-5 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="border-2 border-gray-200 rounded-2xl shadow-2xl p-6 bg-white">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">₦{currentOption.basePrice.toLocaleString()}</span>
                    <span className="text-gray-600 font-medium">/ night</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-0 border-2 border-gray-300 rounded-xl overflow-hidden">
                    <div className="p-4 border-r-2 border-gray-300 bg-gradient-to-br from-teal-50 to-cyan-50">
                      <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Check-in</label>
                      <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold" />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50">
                      <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Checkout</label>
                      <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold" />
                    </div>
                  </div>

                  <div className="border-2 border-gray-300 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Guests</label>
                    <select value={numGuests} onChange={(e) => setNumGuests(parseInt(e.target.value))} className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold">
                      {[...Array(currentOption.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Availability Status */}
                {availabilityLoading && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-blue-800">Checking availability...</p>
                    </div>
                  </div>
                )}

                {!availabilityLoading && availability === true && checkIn && checkOut && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                    <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                      <Check size={18} />
                      Available for your dates
                    </p>
                  </div>
                )}

                {!availabilityLoading && availability === false && availabilityError && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl">
                    <p className="text-sm font-bold text-red-800 flex items-center gap-2">
                      <X size={18} />
                      {availabilityError}
                    </p>
                  </div>
                )}

                {checkIn && checkOut && price.nights > 0 && (
                  <>
                    <div className="mb-6 space-y-3 pb-6 border-b-2 border-gray-200">
                      <div className="flex justify-between text-gray-900 font-semibold">
                        <span>₦{currentOption.basePrice.toLocaleString()} × {price.nights} nights</span>
                        <span>₦{price.base.toLocaleString()}</span>
                      </div>
                      {price.discount > 0 && (
                        <div className="flex justify-between text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                          <span>{price.discountType}</span>
                          <span>-₦{price.discount.toLocaleString()}</span>
                        </div>
                      )}
                      {price.extraGuest > 0 && (
                        <div className="flex justify-between text-gray-900 font-semibold">
                          <span>4th guest fee</span>
                          <span>₦{price.extraGuest.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border-2 border-teal-200">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">₦{price.total.toLocaleString()}</span>
                      </div>
                    </div>

                    {!isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl mb-4">
                          <p className="text-sm font-bold text-amber-800 flex items-center gap-2">
                            <Lock size={18} />
                            Sign in to complete booking
                          </p>
                        </div>
                        <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3.5 rounded-xl font-bold hover:from-teal-700 hover:to-cyan-700 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                          Log in
                        </button>
                        <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full border-2 border-gray-900 text-gray-900 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                          Sign up
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition font-semibold" required />
                        <select value={idType} onChange={(e) => setIdType(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-900 font-semibold" required>
                          <option value="">Select ID type</option>
                          <option value="nin">NIN</option>
                          <option value="passport">International Passport</option>
                          <option value="license">Driver's License</option>
                        </select>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition cursor-pointer">
                          <input type="file" accept="image/*,.pdf" onChange={(e) => setIdFile(e.target.files[0])} className="hidden" id="id-upload" required />
                          <label htmlFor="id-upload" className="cursor-pointer">
                            {idFile ? (
                              <div className="flex items-center justify-center gap-2 text-gray-900">
                                <Check size={22} className="text-green-600" />
                                <span className="font-bold">{idFile.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 mx-auto mb-2 text-teal-500" />
                                <p className="font-bold text-gray-900">Upload ID document</p>
                                <p className="text-sm text-gray-600 mt-1">PNG, JPG or PDF</p>
                              </>
                            )}
                          </label>
                        </div>
                        <button onClick={handleProceedToPayment} disabled={!canProceedToBooking() || !guestPhone || !idType || !idFile} className={`w-full py-3.5 rounded-xl font-bold transition transform ${(!canProceedToBooking() || !guestPhone || !idType || !idFile) ? 'bg-gray-300 text-gray-700 cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:scale-105'}`}>
                          {availabilityLoading ? 'Checking...' : 'Reserve'}
                        </button>
                        <p className="text-xs text-center text-gray-600 font-medium">You won't be charged yet</p>
                      </div>
                    )}
                  </>
                )}

                {(!checkIn || !checkOut) && (
                  <div className="text-center py-8">
                    <Calendar className="w-14 h-14 mx-auto mb-3 text-teal-400" />
                    <p className="text-sm text-gray-600 font-semibold">Add dates for prices</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-center text-gray-600 mt-4 font-medium bg-teal-50 px-4 py-2 rounded-xl border border-teal-200">
                ⭐ This property is highly rated for cleanliness and location
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rooms;