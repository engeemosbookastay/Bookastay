import React, { useState } from 'react';
import { backendUrl } from '../App';
import { Users, Home, Bed, Star, ChevronLeft, ChevronRight, Upload, Wifi, Tv, Wind, Car, MapPin, Check, X, DoorOpen, Utensils, Shield, Calendar, Lock, Eye, EyeOff, Sparkles, Hotel } from 'lucide-react';

const Booking = () => {
  const [activeTab, setActiveTab] = useState('entire');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [blockedRanges, setBlockedRanges] = useState([]);
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
  

  const bookingOptions = {
    entire: {
      id: 'entire',
      title: 'Entire Luxury Apartment',
      subtitle: 'Private 2-bedroom apartment with stunning city views',
      category: 'Entire Place',
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
  description: 'Experience the ultimate comfort in our spacious 2-bedroom luxury apartment. Featuring modern amenities, a fully equipped kitchen, elegant living spaces, and two stunning balconies with breathtaking views. Located in the heart of Abeokuta with easy access to shopping, dining, and entertainment.',
      basePrice: 50000,
      extraGuestCharge: 5000,
      maxGuests: 4,
      accentColor: 'bg-gradient-to-br from-rose-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
      borderColor: 'border-rose-300',
      textColor: 'text-rose-700',
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
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80'
      ]
    },
    room1: {
      id: 'room1',
      title: 'Deluxe Suite 1',
      subtitle: 'Private bedroom in shared apartment',
      category: 'Private Room',
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description: 'Your private oasis awaits! This beautifully designed bedroom offers comfort and privacy with access to premium shared spaces. Perfect for solo travelers or couples seeking a peaceful retreat with all the amenities of home.',
      basePrice: 27000,
      maxGuests: 2,
      accentColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-300',
      textColor: 'text-indigo-700',
      amenities: [
        { name: 'High-Speed WiFi', icon: Wifi, desc: '100 Mbps fiber' },
        { name: 'Shared Kitchen', icon: Utensils, desc: 'Full access' },
        { name: 'Air Conditioning', icon: Wind, desc: 'In room' },
        { name: 'Shared Living', icon: Tv, desc: 'Common areas' },
        { name: 'Parking', icon: Car, desc: 'Available' },
        { name: 'Balcony Access', icon: DoorOpen, desc: 'Shared' },
        { name: 'Private Bathroom', icon: Shield, desc: 'En-suite' }
      ],
      images: [
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80'
      ]
    },
    room2: {
      id: 'room2',
      title: 'Deluxe Suite 2',
      subtitle: 'Cozy private bedroom with modern amenities',
      category: 'Private Room',
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description: 'Unwind in style! This charming bedroom combines modern comfort with thoughtful design. Enjoy your private space while having access to shared amenities including kitchen, living room, and balcony areas.',
      basePrice: 27000,
      maxGuests: 2,
      accentColor: 'bg-gradient-to-br from-teal-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50',
      borderColor: 'border-teal-300',
      textColor: 'text-teal-700',
      amenities: [
        { name: 'High-Speed WiFi', icon: Wifi, desc: '100 Mbps fiber' },
        { name: 'Shared Kitchen', icon: Utensils, desc: 'Full access' },
        { name: 'Air Conditioning', icon: Wind, desc: 'In room' },
        { name: 'Shared Living', icon: Tv, desc: 'Common areas' },
        { name: 'Parking', icon: Car, desc: 'Available' },
        { name: 'Balcony Access', icon: DoorOpen, desc: 'Shared' },
        { name: 'Private Bathroom', icon: Shield, desc: 'En-suite' }
      ],
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80'
      ]
    }
  };

  const reviews = [
    { name: 'Chioma A.', rating: 5, date: 'September 2024', comment: 'Absolutely stunning! The apartment exceeded all expectations. Everything was pristine, modern, and comfortable. Ore was an exceptional host.', avatar: 'CA' },
    { name: 'David O.', rating: 5, date: 'August 2024', comment: 'Perfect location and amazing value. The WiFi was incredibly fast - great for remote work. Will definitely return!', avatar: 'DO' },
    { name: 'Blessing J.', rating: 5, date: 'July 2024', comment: 'Such a wonderful experience! The space was clean, spacious, and had everything we needed. Highly recommend!', avatar: 'BJ' },
    { name: 'Emmanuel P.', rating: 5, date: 'June 2024', comment: 'Outstanding for business travel. Professional setup, quiet environment, and excellent amenities. Five stars!', avatar: 'EP' }
  ];

  const currentOption = bookingOptions[activeTab];

  const isOptionAvailable = (optionId) => {
    if (!checkIn || !checkOut) return true;
    const requestStart = new Date(checkIn);
    const requestEnd = new Date(checkOut);
    return !bookings.some(booking => {
      const bookingStart = new Date(booking.checkIn);
      const bookingEnd = new Date(booking.checkOut);
      const hasDateConflict = requestStart < bookingEnd && requestEnd > bookingStart;
      if (!hasDateConflict) return false;
      if (booking.option === 'entire') return true;
      if (optionId === 'entire' && (booking.option === 'room1' || booking.option === 'room2')) return true;
      if (optionId === booking.option) return true;
      return false;
    });
  };

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
    if (activeTab === 'entire' && numGuests === 4) {
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
        // Supabase returns session in data.session or data
        const session = body.data?.session || body.data || body;
        const accessToken = session?.access_token || session?.accessToken || null;
        const refreshToken = session?.refresh_token || null;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
          // fetch user info
          fetch(`${baseUrl}/auth/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
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
          // fallback: set as authenticated (email magic link case)
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
    const baseUrl = backendUrl;
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

  const startOAuth = (provider) => {
    const redirect = `${window.location.origin}/auth/callback`;
    window.location.href = `${backendUrl}/auth/oauth/${provider}?redirect=${encodeURIComponent(redirect)}`;
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!guestPhone || !idType || !idFile) {
      alert('Please complete all required fields');
      return;
    }

    const txRef = `book_${Date.now()}`;
    const amount = price.total;

    // open Paystack inline modal
    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
    if (!PAYSTACK_KEY) return alert('Paystack public key is not configured.');
    if (!window.PaystackPop) return alert('Paystack library failed to load. Check your internet or try reloading the page.');
    if (!amount || amount <= 0) return alert('Invalid payment amount');

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: guestEmail || authEmail || 'guest@example.com',
      amount: Math.round(amount * 100), // Paystack expects kobo
      ref: txRef,
      onClose: function() {
        // user closed the modal
      },
      callback: function(response) {
        // Normalize payment reference (Paystack returns `reference`; other responses might vary)
        const paymentRef = response?.reference || response?.txRef || response?.transaction_reference || null;
        if (!paymentRef) {
          console.error('Missing payment reference from payment provider', response);
          return alert('Payment succeeded but payment reference is missing. Please contact support with your transaction details.');
        }

        // Build multipart form with multiple commonly-expected keys so backend can verify
        const form = new FormData();
        form.append('user_id', localStorage.getItem('userId') || '');
        form.append('name', guestName || authName || 'Guest User');
        form.append('email', guestEmail || authEmail || '');
        form.append('phone', guestPhone);
        form.append('room_type', activeTab);
        form.append('check_in_date', checkIn);
        form.append('check_out_date', checkOut);
        form.append('price', amount);
        form.append('payment_reference', paymentRef);
        form.append('tx_ref', txRef); // original reference we sent to Paystack
        form.append('transaction_reference', paymentRef);
        form.append('provider', 'paystack');
        form.append('id_type', idType);
        try { form.append('provider_response', JSON.stringify(response)); } catch (e) { /* ignore circular */ }
        if (idFile) form.append('id_file', idFile, idFile.name);

        fetch(`${backendUrl}/api/bookings/confirm`, {
          method: 'POST',
          body: form // let browser set Content-Type for multipart/form-data
        })
          .then(async (r) => {
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
              const msg = data?.error || data?.message || `Server responded ${r.status}`;
              console.error('Booking confirmation failed', msg, data);
              return alert('Booking failed: ' + msg);
            }
            if (data.error) {
              return alert('Booking failed: ' + data.error);
            }
            setBookings(prev => [...prev, { option: activeTab, checkIn, checkOut }]);
            setGuestPhone(''); setIdType(''); setIdFile(null); setCheckIn(''); setCheckOut(''); setNumGuests(1);
            alert('Booking confirmed!');
          })
          .catch(err => {
            console.error('Confirmation request error', err);
            alert('Confirmation failed: ' + (err.message || err));
          });
      }
    });
    handler.openIframe();
  };

  // Fetch blocked booking date ranges on mount and load Flutterwave script if missing
  React.useEffect(() => {
    fetch(`${backendUrl}/api/bookings/dates`)
      .then(r => r.json())
      .then(d => {
        const ranges = (d.dates || []).map(x => ({ from: x.check_in_date, to: x.check_out_date }));
        setBlockedRanges(ranges);
      })
      .catch(() => setBlockedRanges([]));

  // load Paystack inline script if not present
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const s = document.createElement('script');
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.async = true;
      s.onload = () => console.log('Paystack script loaded');
      s.onerror = () => console.warn('Failed to load Paystack script');
      document.body.appendChild(s);
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {authMode === 'login' ? 'Welcome back' : 'Join us'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {authMode === 'login' ? 'Sign in to continue' : 'Create your account'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAuthSubmit}
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    authMode === 'login' ? 'Continue' : 'Agree and continue'
                  )}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {authMode === 'login' 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Log in"}
                  </button>
                </div>
                
                {/* OAuth buttons */}
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2 text-center">Or continue with</div>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => startOAuth('google')} className="px-3 py-2 rounded-xl border-2 border-gray-200 hover:bg-gray-50">Google</button>
                    <button onClick={() => startOAuth('facebook')} className="px-3 py-2 rounded-xl border-2 border-gray-200 hover:bg-gray-50">Facebook</button>
                    <button onClick={() => startOAuth('apple')} className="px-3 py-2 rounded-xl border-2 border-gray-200 hover:bg-gray-50">Apple</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-lg z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Book A Stay</h1>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full text-sm font-medium text-green-700 border border-green-200">
                <Check size={16} />
                <span className="font-medium">{guestEmail}</span>
                <button onClick={handleLogout} className="ml-3 text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 hover:bg-red-100">Logout</button>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* Room Selection Tabs */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto py-4">
            {Object.entries(bookingOptions).map(([key, option]) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setCurrentImageIndex(0); setNumGuests(1); }}
                  className={`px-6 py-3.5 rounded-xl font-semibold whitespace-nowrap transition-all transform hover:scale-105 ${
                    isActive
                      ? `${option.accentColor} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hotel size={18} />
                    {option.title}
                  </div>
                </button>
              );
            })}
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
              <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={currentOption.images[currentImageIndex]}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                
                {currentOption.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-900" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {currentOption.images.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setCurrentImageIndex(idx)} 
                          className={`h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-white w-10' : 'bg-white/60 w-2'
                          }`} 
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold text-gray-900 shadow-lg border border-gray-200">
                  {currentImageIndex + 1} / {currentOption.images.length}
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center gap-6 py-6 border-y-2 border-gray-200">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900 font-semibold">{currentOption.guests} guests</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200">
                <Bed className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900 font-semibold">{currentOption.bedrooms} bedroom{currentOption.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-xl border border-pink-200">
                <Home className="w-5 h-5 text-pink-600" />
                <span className="text-gray-900 font-semibold">{currentOption.bathrooms} bathroom{currentOption.bathrooms > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
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
                    <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition hover:shadow-lg">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl">
                        <Icon className="w-6 h-6 text-purple-600" />
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
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
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
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₦{currentOption.basePrice.toLocaleString()}</span>
                    <span className="text-gray-600 font-medium">/ night</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-0 border-2 border-gray-300 rounded-xl overflow-hidden">
                    <div className="p-4 border-r-2 border-gray-300 bg-gradient-to-br from-blue-50 to-purple-50">
                      <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Check-in</label>
                      <input 
                        type="date" 
                        value={checkIn} 
                        min={today} 
                        onChange={(e) => setCheckIn(e.target.value)} 
                        className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold" 
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                      <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Checkout</label>
                      <input 
                        type="date" 
                        value={checkOut} 
                        min={checkIn || today} 
                        onChange={(e) => setCheckOut(e.target.value)} 
                        className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold" 
                      />
                    </div>
                  </div>

                  <div className="border-2 border-gray-300 rounded-xl p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1">Guests</label>
                    <select 
                      value={numGuests} 
                      onChange={(e) => setNumGuests(parseInt(e.target.value))} 
                      className="w-full text-sm text-gray-900 focus:outline-none bg-transparent font-semibold"
                    >
                      {[...Array(currentOption.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkIn && checkOut && !isOptionAvailable(activeTab) && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl">
                    <p className="text-sm font-bold text-red-800 flex items-center gap-2">
                      <X size={18} />
                      Not available for selected dates
                    </p>
                  </div>
                )}

                {checkIn && checkOut && isOptionAvailable(activeTab) && price.nights > 0 && (
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

                    <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₦{price.total.toLocaleString()}</span>
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

                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setShowAuthModal(true);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Log in
                        </button>

                        <button
                          onClick={() => {
                            setAuthMode('signup');
                            setShowAuthModal(true);
                          }}
                          className="w-full border-2 border-gray-900 text-gray-900 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Sign up
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl mb-4">
                          <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                            <Check size={18} />
                            Available for your dates
                          </p>
                        </div>

                        <input 
                          type="tel" 
                          value={guestPhone} 
                          onChange={(e) => setGuestPhone(e.target.value)} 
                          placeholder="Phone number" 
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-semibold" 
                          required 
                        />
                        
                        <select 
                          value={idType} 
                          onChange={(e) => setIdType(e.target.value)} 
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-gray-900 font-semibold" 
                          required
                        >
                          <option value="">Select ID type</option>
                          <option value="nin">NIN</option>
                          <option value="passport">International Passport</option>
                          <option value="license">Driver's License</option>
                        </select>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={(e) => setIdFile(e.target.files[0])} 
                            className="hidden" 
                            id="id-upload" 
                            required 
                          />
                          <label htmlFor="id-upload" className="cursor-pointer">
                            {idFile ? (
                              <div className="flex items-center justify-center gap-2 text-gray-900">
                                <Check size={22} className="text-green-600" />
                                <span className="font-bold">{idFile.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 mx-auto mb-2 text-purple-500" />
                                <p className="font-bold text-gray-900">Upload ID document</p>
                                <p className="text-sm text-gray-600 mt-1">PNG, JPG or PDF</p>
                              </>
                            )}
                          </label>
                        </div>

                        <button
                          onClick={handleProceedToPayment}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Reserve
                        </button>
                        <p className="text-xs text-center text-gray-600 font-medium">You won't be charged yet</p>
                      </div>
                    )}
                  </>
                )}

                {(!checkIn || !checkOut) && (
                  <div className="text-center py-8">
                    <Calendar className="w-14 h-14 mx-auto mb-3 text-purple-400" />
                    <p className="text-sm text-gray-600 font-semibold">Add dates for prices</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-center text-gray-600 mt-4 font-medium bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                ⭐ This property is highly rated for cleanliness and location
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;