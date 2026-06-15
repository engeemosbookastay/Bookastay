import React, { useState, useEffect, useCallback, useRef } from "react";
import { backendUrl } from "../App";
import {
  Users, Home, Bed, Star, ChevronLeft, ChevronRight, Upload, Wifi, Tv,
  Wind, Car, MapPin, Check, X, DoorOpen, Utensils, Shield, Calendar,
  Sparkles, FileText, Clock, Tag, CreditCard, Percent,
} from "lucide-react";

import Living from "../assets/Living.jpg";
import Dine from "../assets/Dine.jpg";
import LiveRoom from "../assets/LiveRoom.jpg";
import Room from "../assets/Room.jpg";
import Bedroom from "../assets/Bedroom.jpg";
import Bedroomss from "../assets/Bedroomss.jpg";

const FALLBACK_ROOMS = {
  entire: {
    room_key: "entire",
    id: "2bedroom",
    tabKey: "2bedroom",
    title: "2 Bedroom Apartment",
    subtitle: "Spacious luxury apartment perfect for families",
    category: "Entire Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    description:
      "Experience luxury in our spacious 2-bedroom apartment. Featuring modern amenities, a fully equipped kitchen, elegant living spaces, and stunning balconies with breathtaking views.",
    base_price: 100000,
    max_guests: 4,
    min_nights: 1,
    accentColor: "from-blue-900 to-blue-800",
    amenities: [
      { name: "High-Speed WiFi", desc: "100 Mbps fiber" },
      { name: "Full Kitchen", desc: "Cooking essentials" },
      { name: "Air Conditioning", desc: "Climate control" },
      { name: "Smart TV", desc: "Netflix & Prime Video" },
      { name: "Free Parking", desc: "On-site parking" },
      { name: "Private Balcony", desc: "City views" },
    ],
    images: [Living, LiveRoom, Bedroom, Bedroomss, Room, Dine],
  },
  room1: {
    room_key: "room1",
    id: "1bedroom",
    tabKey: "1bedroom",
    title: "1 Bedroom Suite",
    subtitle: "Cozy and elegant for solo travelers or couples",
    category: "Private Room",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    description:
      "Your perfect retreat awaits! This beautifully designed 1-bedroom suite offers comfort and privacy with access to premium shared spaces.",
    base_price: 60000,
    max_guests: 2,
    min_nights: 2,
    accentColor: "from-amber-500 to-amber-600",
    amenities: [
      { name: "High-Speed WiFi", desc: "100 Mbps fiber" },
      { name: "Shared Kitchen", desc: "Full access" },
      { name: "Air Conditioning", desc: "In room" },
      { name: "Private Bathroom", desc: "En-suite" },
    ],
    images: [Bedroom, Room, Living, Dine],
  },
};

const amenityIcons = [Wifi, Utensils, Wind, Tv, Car, DoorOpen, Shield, Home];

const Booking = () => {
  // ── Room options from API
  const [roomOptions, setRoomOptions] = useState(null);
  const [activeTab, setActiveTab] = useState("2bedroom");

  // ── Booking dates & guests
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numGuests, setNumGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ── Guest details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [idFileUrl, setIdFileUrl] = useState("");

  // ── Discount code
  const [discountCode, setDiscountCode] = useState("");
  const [discountResult, setDiscountResult] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState("");

  // ── Payment options
  const [paymentType, setPaymentType] = useState("full"); // full | deposit
  const [depositPct, setDepositPct] = useState(20); // 10 | 20
  const [paymentProvider, setPaymentProvider] = useState("paystack"); // paystack | paypal | klump

  // ── Consent
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [cancellationConsent, setCancellationConsent] = useState(false);

  // ── Modal / flow state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [uploadStep, setUploadStep] = useState("form"); // form | uploading | done
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Scroll ref for room details
  const detailsRef = useRef(null);

  // ── Availability
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const availabilityTimer = useRef(null);

  // ── Load properties from backend
  useEffect(() => {
    fetch(`${backendUrl}/api/properties`)
      .then(r => r.json())
      .then(d => {
        if (d.success && d.properties.length > 0) {
          const map = {};
          d.properties.forEach(p => {
            const tabKey = p.room_key === "entire" ? "2bedroom" : p.room_key === "room1" ? "1bedroom" : p.room_key;
            map[tabKey] = {
              ...p,
              tabKey,
              title: p.name,
              base_price: Number(p.base_price),
              max_guests: Number(p.max_guests),
              min_nights: Number(p.min_nights),
              bedrooms: Number(p.bedrooms),
              bathrooms: Number(p.bathrooms),
              images: p.images && p.images.length > 0 ? p.images : (FALLBACK_ROOMS[p.room_key]?.images || [Living]),
              accentColor: p.room_key === "entire" ? "from-blue-900 to-blue-800" : "from-amber-500 to-amber-600",
            };
          });
          setRoomOptions(map);
          setActiveTab(Object.keys(map)[0]);
        }
      })
      .catch(() => {}); // silently fall through to fallback
  }, []);

  const rooms = roomOptions || {
    "2bedroom": { ...FALLBACK_ROOMS.entire, tabKey: "2bedroom" },
    "1bedroom": { ...FALLBACK_ROOMS.room1, tabKey: "1bedroom" },
  };
  const currentOption = rooms[activeTab] || Object.values(rooms)[0];
  const currentRoomKey = currentOption?.room_key || (activeTab === "2bedroom" ? "entire" : "room1");

  // ── URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkin")) setCheckIn(params.get("checkin"));
    if (params.get("checkout")) setCheckOut(params.get("checkout"));
    if (params.get("adults")) setNumGuests(parseInt(params.get("adults")));
    if (params.get("type")) setActiveTab(params.get("type"));
  }, []);

  // ── Load Paystack SDK
  useEffect(() => {
    if (typeof window !== "undefined" && !window.PaystackPop) {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // ── Availability check
  const checkAvailability = useCallback(async (opts = {}) => {
    const roomType = opts.roomType ?? currentRoomKey;
    const inDate = opts.checkIn ?? checkIn;
    const outDate = opts.checkOut ?? checkOut;

    if (!inDate || !outDate) { setAvailability(null); setAvailabilityError(""); setAvailabilityLoading(false); return; }
    if (availabilityTimer.current) clearTimeout(availabilityTimer.current);

    setAvailabilityLoading(true); setAvailabilityError("");

    availabilityTimer.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ room_type: roomType, check_in_date: inDate, check_out_date: outDate });
        const resp = await fetch(`${backendUrl}/api/availability?${params.toString()}`);
        const json = await resp.json().catch(() => ({}));
        if (!resp.ok || !json?.success) {
          setAvailability(false); setAvailabilityError(json?.message || "Failed to check availability");
        } else if (json.available) {
          setAvailability(true); setAvailabilityError("");
        } else {
          setAvailability(false); setAvailabilityError(json.message || "Selected dates are not available");
        }
      } catch { setAvailability(false); setAvailabilityError("Network error checking availability"); }
      finally { setAvailabilityLoading(false); availabilityTimer.current = null; }
    }, 400);
  }, [activeTab, checkIn, checkOut, currentRoomKey]);

  useEffect(() => {
    checkAvailability();
    return () => { if (availabilityTimer.current) clearTimeout(availabilityTimer.current); };
  }, [checkIn, checkOut, activeTab, checkAvailability]);

  const canProceed = () => availability === true && !availabilityLoading && checkIn && checkOut;

  // ── Price calculation
  const calculatePrice = () => {
    if (!checkIn || !checkOut || !currentOption) return { base: 0, discount: 0, extraGuest: 0, discountCode: 0, total: 0, nights: 0, depositAmount: 0 };
    const start = new Date(checkIn), end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return { base: 0, discount: 0, extraGuest: 0, discountCode: 0, total: 0, nights: 0, depositAmount: 0 };

    const basePrice = currentOption.base_price * nights;
    let discountRate = 0, discountType = "";
    if (nights >= 30) { discountRate = 0.1; discountType = "10% Monthly Discount"; }
    else if (nights >= 7) { discountRate = 0.05; discountType = "5% Weekly Discount"; }
    const discount = Math.round(basePrice * discountRate);

    const extraGuestCharge = currentRoomKey === "entire" && numGuests > 2 ? (numGuests - 2) * 5000 * nights : 0;
    const subtotal = basePrice - discount + extraGuestCharge;
    const codeDiscount = discountResult?.discount?.discount_amount || 0;
    const total = Math.max(0, subtotal - codeDiscount);
    const depositAmount = paymentType === "deposit" ? Math.round(total * (depositPct / 100)) : total;

    return { base: basePrice, discount, discountType, extraGuest: extraGuestCharge, discountCode: codeDiscount, total, nights, depositAmount };
  };

  const price = calculatePrice();

  // ── Image nav
  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % (currentOption?.images?.length || 1));
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + (currentOption?.images?.length || 1)) % (currentOption?.images?.length || 1));

  // ── Validate discount code
  const validateDiscountCode = async () => {
    if (!discountCode.trim()) return;
    setDiscountLoading(true); setDiscountError(""); setDiscountResult(null);
    try {
      const res = await fetch(`${backendUrl}/api/discounts/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCode,
          room_type: currentRoomKey,
          nights: price.nights,
          amount: price.total,
        }),
      });
      const d = await res.json();
      if (d.valid) { setDiscountResult(d); setDiscountError(""); }
      else { setDiscountError(d.message || "Invalid code"); setDiscountResult(null); }
    } catch { setDiscountError("Failed to validate code"); }
    finally { setDiscountLoading(false); }
  };

  // ── Upload ID document only (no ShuftiPro)
  const handleUploadAndProceed = async () => {
    if (!guestName || !guestEmail || !guestPhone || !idType || !idFile) {
      alert("Please fill in all fields and upload your ID document");
      return;
    }
    if (!privacyConsent || !cancellationConsent) {
      alert("Please agree to both the Privacy Policy and Cancellation Policy");
      return;
    }

    setUploadStep("uploading");
    try {
      const formData = new FormData();
      formData.append("id_file", idFile);
      const response = await fetch(`${backendUrl}/api/bookings/upload-id`, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Upload failed");
      setIdFileUrl(data.url);
      setUploadStep("done");
    } catch (error) {
      alert("Failed to upload ID: " + error.message);
      setUploadStep("form");
    }
  };

  // ── Paystack payment
  const handlePaystackPayment = () => {
    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";
    if (!PAYSTACK_KEY) return alert("Paystack public key is not configured.");
    if (!window.PaystackPop) return alert("Paystack library failed to load.");
    const amount = price.depositAmount;
    if (!amount || amount <= 0) return alert("Invalid payment amount");

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: guestEmail,
      amount: Math.round(amount * 100),
      ref: `book_${Date.now()}`,
      onClose: () => {},
      callback: (response) => {
        const paymentRef = response?.reference || response?.txRef;
        if (!paymentRef) return alert("Payment reference missing. Please contact support.");
        submitBooking("paystack", paymentRef, amount);
      },
    });
    handler.openIframe();
  };

  // ── Klump payment
  const handleKlumpPayment = () => {
    if (!window.Klump) return alert("Klump payment library failed to load. Please refresh and try again.");
    const klumpKey = import.meta.env.VITE_KLUMP_PUBLIC_KEY || "";
    if (!klumpKey) return alert("Klump is not configured for this site.");

    const amount = price.depositAmount;
    const pay = new window.Klump({
      publicKey: klumpKey,
      data: {
        amount: amount,
        shipping_fee: 0,
        currency: "NGN",
        merchant_reference: `book_${Date.now()}`,
        meta_data: { name: guestName, email: guestEmail, phone: guestPhone },
        items: [{ image_url: "", item_url: "", name: `BookAStay - ${currentOption.title}`, unit_price: amount, quantity: 1 }],
      },
      onSuccess: (data) => submitBooking("klump", data.data?.merchant_reference || data.merchant_reference, amount),
      onError: (err) => alert("Klump payment error: " + (err?.message || "Unknown error")),
      onLoad: () => {},
      onOpen: () => {},
      onClose: () => {},
    });
    pay.show();
  };

  // ── PayPal payment
  const handlePayPalPayment = async () => {
    const amount = price.depositAmount;
    // Convert NGN to USD (approximate; ideally use live rate)
    const usdAmount = (amount / 1500).toFixed(2);

    try {
      const createRes = await fetch(`${backendUrl}/api/bookings/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: usdAmount, currency: "USD" }),
      });
      const createData = await createRes.json();
      if (!createData.success) return alert("Failed to create PayPal order: " + createData.error);

      const orderID = createData.orderID;

      // Load PayPal SDK if not already loaded
      const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";
      if (!PAYPAL_CLIENT_ID) return alert("PayPal is not configured.");

      if (!document.querySelector('script[data-paypal-sdk]')) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
          s.setAttribute("data-paypal-sdk", "true");
          s.onload = resolve; s.onerror = reject;
          document.body.appendChild(s);
        });
      }

      // Render PayPal buttons in a modal
      const container = document.createElement("div");
      container.id = "paypal-button-container-modal";
      container.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999";
      const inner = document.createElement("div");
      inner.style.cssText = "background:white;padding:32px;border-radius:16px;min-width:320px";
      inner.innerHTML = '<p style="margin-bottom:16px;font-weight:bold;text-align:center">Complete PayPal Payment</p><div id="paypal-btns"></div><button id="close-paypal" style="margin-top:16px;width:100%;padding:8px;cursor:pointer">Cancel</button>';
      container.appendChild(inner);
      document.body.appendChild(container);
      document.getElementById("close-paypal").onclick = () => container.remove();

      window.paypal.Buttons({
        order: () => orderID,
        onApprove: async (data) => {
          container.remove();
          const captureRes = await fetch(`${backendUrl}/api/bookings/paypal/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID,
              name: guestName, email: guestEmail, phone: guestPhone,
              room_type: currentRoomKey, check_in_date: checkIn, check_out_date: checkOut,
              price: price.depositAmount, original_price: price.total,
              guests: numGuests, id_type: idType, id_file_url: idFileUrl,
              discount_code: discountResult ? discountCode : null,
              discount_amount: price.discountCode,
              payment_type: paymentType, deposit_percentage: depositPct,
              provider: "paypal",
            }),
          });
          const captureData = await captureRes.json();
          if (captureData.success) {
            setBookingDetails({
              transactionRef: data.orderID, name: guestName, email: guestEmail,
              roomType: currentOption.title, checkIn, checkOut, guests: numGuests,
              total: price.depositAmount, balanceDue: captureData.balance_due,
              paymentType,
            });
            resetForm();
            setBookingSuccess(true);
          } else {
            alert("PayPal capture failed: " + captureData.error);
          }
        },
        onError: (err) => { container.remove(); alert("PayPal error: " + err); },
      }).render("#paypal-btns");
    } catch (err) {
      alert("PayPal payment error: " + err.message);
    }
  };

  // ── Submit booking (Paystack / Klump)
  const submitBooking = (provider, paymentRef, paidAmount) => {
    const form = new FormData();
    form.append("name", guestName);
    form.append("email", guestEmail);
    form.append("phone", guestPhone);
    form.append("room_type", currentRoomKey);
    form.append("check_in_date", checkIn);
    form.append("check_out_date", checkOut);
    form.append("price", price.depositAmount);
    form.append("original_price", price.total);
    form.append("payment_reference", paymentRef);
    form.append("provider", provider);
    form.append("id_type", idType);
    form.append("id_file_url", idFileUrl);
    form.append("guests", numGuests);
    form.append("payment_type", paymentType);
    form.append("deposit_percentage", depositPct);
    if (discountResult) {
      form.append("discount_code", discountCode);
      form.append("discount_amount", price.discountCode);
    }

    setIsSubmitting(true);
    fetch(`${backendUrl}/api/bookings/confirm`, { method: "POST", body: form })
      .then(async r => {
        const data = await r.json().catch(() => ({}));
        setIsSubmitting(false);
        if (!r.ok || data.error) return alert("Booking failed: " + (data?.error || data?.message || "Unknown error"));
        setBookingDetails({
          transactionRef: paymentRef, name: guestName, email: guestEmail,
          roomType: currentOption.title, checkIn, checkOut, guests: numGuests,
          total: price.depositAmount, balanceDue: data.balance_due, paymentType,
        });
        resetForm();
        setBookingSuccess(true);
      })
      .catch(err => { setIsSubmitting(false); alert("Confirmation failed: " + err.message); });
  };

  const resetForm = () => {
    setGuestName(""); setGuestEmail(""); setGuestPhone(""); setIdType(""); setIdFile(null); setIdFileUrl("");
    setCheckIn(""); setCheckOut(""); setNumGuests(2); setAvailability(null);
    setPrivacyConsent(false); setCancellationConsent(false);
    setShowBookingModal(false); setUploadStep("form");
    setDiscountCode(""); setDiscountResult(null); setDiscountError("");
    setPaymentType("full"); setPaymentProvider("paystack");
  };

  const handleProceedToPayment = () => {
    if (!idFileUrl) { alert("Please upload your ID document first"); return; }
    if (paymentProvider === "paystack") handlePaystackPayment();
    else if (paymentProvider === "klump") handleKlumpPayment();
    else if (paymentProvider === "paypal") handlePayPalPayment();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

      {/* ── Booking Success Modal ── */}
      {bookingSuccess && bookingDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-green-500/30 max-w-md w-full">
            <div className="p-6 md:p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Check size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-400 text-sm mb-6">
                A confirmation email has been sent to {bookingDetails.email}
              </p>
              <div className="bg-slate-700/50 rounded-xl p-4 mb-4 text-left space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Booking ID:</span><span className="text-amber-400 font-mono text-xs">{bookingDetails.transactionRef}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Room:</span><span className="text-white">{bookingDetails.roomType}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Check-in:</span><span className="text-white">{new Date(bookingDetails.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Check-out:</span><span className="text-white">{new Date(bookingDetails.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>
                <div className="flex justify-between border-t border-slate-600 pt-2">
                  <span className="text-gray-300 font-semibold">{bookingDetails.paymentType === "deposit" ? "Deposit Paid:" : "Total Paid:"}</span>
                  <span className="text-green-400 font-bold">₦{Number(bookingDetails.total).toLocaleString()}</span>
                </div>
                {bookingDetails.paymentType === "deposit" && Number(bookingDetails.balanceDue) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-amber-400 font-semibold">Balance at Property:</span>
                    <span className="text-amber-300 font-bold">₦{Number(bookingDetails.balanceDue).toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-6 text-left text-xs">
                <p className="text-amber-400 font-semibold mb-1">Important:</p>
                <p className="text-gray-300">Check-in: 2:00 PM | Check-out: 12:00 PM</p>
                <p className="text-gray-300">Please bring a valid ID for verification at check-in</p>
              </div>
              <button onClick={() => { setBookingSuccess(false); setBookingDetails(null); }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-xl hover:from-amber-400 hover:to-yellow-400 transition">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Modal ── */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-amber-500/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                    {uploadStep === "form" ? "Complete Booking" : uploadStep === "uploading" ? "Uploading..." : "Choose Payment"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {uploadStep === "form" ? "Enter your details" : uploadStep === "uploading" ? "Uploading your ID securely..." : "Your ID is verified — select how to pay"}
                  </p>
                </div>
                <button onClick={() => { setShowBookingModal(false); setUploadStep("form"); }}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              {/* STEP 1 — Guest details + ID upload */}
              {uploadStep === "form" && (
                <div className="space-y-4">
                  {[
                    { label: "Full Name", value: guestName, setter: setGuestName, type: "text", placeholder: "John Doe" },
                    { label: "Email Address", value: guestEmail, setter: setGuestEmail, type: "email", placeholder: "you@example.com" },
                    { label: "Phone Number", value: guestPhone, setter: setGuestPhone, type: "tel", placeholder: "+234 800 000 0000" },
                  ].map(({ label, value, setter, type, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">{label}</label>
                      <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 text-sm" />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">ID Type</label>
                    <select value={idType} onChange={e => setIdType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Select ID type</option>
                      <option value="nin">NIN</option>
                      <option value="passport">International Passport</option>
                      <option value="license">Driver's License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Upload ID Document</label>
                    <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-4 text-center hover:border-amber-500/50 hover:bg-slate-700/30 transition cursor-pointer">
                      <input type="file" accept="image/*,.pdf" onChange={e => setIdFile(e.target.files[0])} className="hidden" id="id-upload-modal" />
                      <label htmlFor="id-upload-modal" className="cursor-pointer">
                        {idFile ? (
                          <div className="flex items-center justify-center gap-2 text-white">
                            <Check size={18} className="text-green-400" />
                            <span className="font-bold text-sm">{idFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                            <p className="font-bold text-white text-sm">Click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Applied discount confirmation */}
                  {discountResult?.valid && price.discountCode > 0 && (
                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-3 flex justify-between items-center text-sm">
                      <span className="text-pink-300 flex items-center gap-1"><Check size={14} /> Code: <strong>{discountCode}</strong></span>
                      <span className="text-pink-400 font-bold">-₦{price.discountCode.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Agreements */}
                  <div className="border-t-2 border-amber-500/20 pt-4 space-y-3">
                    <p className="text-xs font-bold text-gray-300">Required Agreements</p>
                    {[
                      { id: "privacy", checked: privacyConsent, setter: setPrivacyConsent, label: "I have read and agree to the", link: "/privacy-policy", linkText: "Privacy Policy" },
                      { id: "cancel", checked: cancellationConsent, setter: setCancellationConsent, label: "I agree to the", link: "/cancellation-policy", linkText: "Cancellation Policy" },
                    ].map(({ id, checked, setter, label, link, linkText }) => (
                      <div key={id} className="flex items-start gap-3">
                        <input type="checkbox" id={id} checked={checked} onChange={e => setter(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-amber-500/30 bg-slate-700/50 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer" />
                        <label htmlFor={id} className="text-xs text-gray-300 cursor-pointer">
                          {label}{" "}
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline font-semibold">{linkText}</a>
                        </label>
                      </div>
                    ))}
                  </div>

                  <button onClick={handleUploadAndProceed}
                    disabled={!guestName || !guestEmail || !guestPhone || !idType || !idFile || !privacyConsent || !cancellationConsent}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-blue-400 hover:to-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm">
                    Upload ID & Continue to Payment
                  </button>
                  <p className="text-xs text-center text-gray-400">Your ID is stored securely on our servers</p>
                </div>
              )}

              {/* STEP 2 — Uploading */}
              {uploadStep === "uploading" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Uploading ID Document</h3>
                  <p className="text-gray-400">Please wait while we securely upload your ID...</p>
                </div>
              )}

              {/* STEP 3 — Payment options */}
              {uploadStep === "done" && (
                <div className="space-y-5">
                  {/* ID confirmed */}
                  <div className="bg-green-500/20 border-2 border-green-400/50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                      <Check size={20} /> ID Document Uploaded
                    </div>
                  </div>

                  {/* Booking summary */}
                  <div className="bg-slate-700/50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300"><span>Room:</span><span className="text-white">{currentOption.title}</span></div>
                    <div className="flex justify-between text-gray-300"><span>{price.nights} nights:</span><span className="text-white">₦{price.base.toLocaleString()}</span></div>
                    {price.discount > 0 && <div className="flex justify-between text-green-400"><span>Length discount:</span><span>-₦{price.discount.toLocaleString()}</span></div>}
                    {price.discountCode > 0 && <div className="flex justify-between text-pink-400"><span>Code ({discountCode}):</span><span>-₦{price.discountCode.toLocaleString()}</span></div>}
                    <div className="flex justify-between font-bold border-t border-slate-600 pt-2 text-lg">
                      <span className="text-white">Total:</span>
                      <span className="text-amber-400">₦{price.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment type: full or deposit */}
                  <div>
                    <p className="text-xs font-semibold text-gray-300 mb-2">Payment Option</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="paymentType" checked={paymentType === "full"} onChange={() => setPaymentType("full")} className="text-amber-500" />
                        <span className="text-white text-sm">Pay in full — ₦{price.total.toLocaleString()}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="paymentType" checked={paymentType === "deposit" && depositPct === 20} onChange={() => { setPaymentType("deposit"); setDepositPct(20); }} className="text-amber-500" />
                        <span className="text-white text-sm">Pay 20% deposit — ₦{Math.round(price.total * 0.2).toLocaleString()} <span className="text-gray-400">(₦{Math.round(price.total * 0.8).toLocaleString()} at property)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="paymentType" checked={paymentType === "deposit" && depositPct === 10} onChange={() => { setPaymentType("deposit"); setDepositPct(10); }} className="text-amber-500" />
                        <span className="text-white text-sm">Pay 10% deposit — ₦{Math.round(price.total * 0.1).toLocaleString()} <span className="text-gray-400">(₦{Math.round(price.total * 0.9).toLocaleString()} at property)</span></span>
                      </label>
                    </div>
                  </div>

                  {/* Amount to pay now */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
                    <p className="text-gray-300 text-xs">Amount to pay now</p>
                    <p className="text-amber-400 font-bold text-2xl">₦{price.depositAmount.toLocaleString()}</p>
                  </div>

                  {/* Payment provider */}
                  <div>
                    <p className="text-xs font-semibold text-gray-300 mb-2">Payment Method</p>
                    <div className="space-y-2">
                      {[
                        { value: "paystack", label: "Paystack", desc: "Cards, bank transfer, USSD" },
                        { value: "klump", label: "Klump", desc: "Buy now, pay later" },
                        { value: "paypal", label: "PayPal", desc: "Pay in USD (approx.)" },
                      ].map(({ value, label, desc }) => (
                        <label key={value} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition ${paymentProvider === value ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                          <input type="radio" name="paymentProvider" checked={paymentProvider === value} onChange={() => setPaymentProvider(value)} className="text-amber-500" />
                          <div>
                            <span className="text-white font-semibold text-sm">{label}</span>
                            <span className="text-gray-400 text-xs ml-2">{desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleProceedToPayment} disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 py-3.5 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 text-sm">
                    {isSubmitting ? "Processing..." : `Pay ₦${price.depositAmount.toLocaleString()} with ${paymentProvider.charAt(0).toUpperCase() + paymentProvider.slice(1)}`}
                  </button>
                  <p className="text-xs text-center text-gray-400">Secure payment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-20"></div>

      {/* Room selector tabs */}
      <div className="border-b border-amber-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">Select Your Suite</h2>
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
            {Object.entries(rooms).map(([key, option]) => (
              <button key={key} onClick={() => { setActiveTab(key); setCurrentImageIndex(0); setNumGuests(2); setAvailability(null); setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}
                className={`relative group px-8 md:px-12 py-6 md:py-8 rounded-2xl font-semibold transition-all transform hover:scale-105 overflow-hidden ${activeTab === key ? "shadow-2xl shadow-amber-500/50" : "bg-slate-800/50 border-2 border-slate-700 hover:border-amber-500/50"}`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${option.accentColor || "from-blue-900 to-blue-800"} ${activeTab === key ? "opacity-100" : "opacity-0"} transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    {(Number(option.bedrooms) >= 2) ? <Home size={36} /> : <Bed size={36} />}
                  </div>
                  <div className={`font-bold text-lg mb-1 ${activeTab === key ? "text-white" : "text-gray-300"}`}>{option.title}</div>
                  <div className={`text-xs ${activeTab === key ? "text-amber-200" : "text-gray-500"}`}>
                    ₦{Number(option.base_price).toLocaleString()}/night
                    {option.min_nights > 1 && <span className="block text-xs mt-1">(Min {option.min_nights} nights)</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={detailsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Left: details */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold text-xs">{currentOption?.category}</span>
                <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-amber-500/20 text-white text-xs">
                  <MapPin className="w-3 h-3 text-amber-400" /> Abeokuta, Nigeria
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{currentOption?.title}</h1>
              <p className="text-gray-400 text-base md:text-xl">{currentOption?.subtitle}</p>
            </div>

            {/* Image carousel */}
            <div className="relative rounded-2xl overflow-hidden group shadow-2xl">
              <div className="relative h-64 md:h-96 lg:h-[500px]">
                <img src={currentOption?.images?.[currentImageIndex] || Living} alt="Room" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {(currentOption?.images?.length || 0) > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition">
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {currentOption.images.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-amber-400 w-8" : "bg-white/60 w-1.5"}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Room stats */}
            <div className="flex items-center gap-4 py-6 border-y-2 border-amber-500/20 flex-wrap">
              {[
                { icon: Users, text: `${currentOption?.max_guests || 2} guests` },
                { icon: Bed, text: `${currentOption?.bedrooms || 1} bedroom${currentOption?.bedrooms > 1 ? "s" : ""}` },
                { icon: Home, text: `${currentOption?.bathrooms || 1} bathroom${currentOption?.bathrooms > 1 ? "s" : ""}` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-amber-500/20">
                  <Icon className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-bold text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 md:p-10 rounded-2xl border border-amber-500/20">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" /> About This Space
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-lg">{currentOption?.description}</p>
            </div>

            {/* Amenities */}
            {(currentOption?.amenities || []).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Premium Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(currentOption.amenities || []).map((amenity, idx) => {
                    const Icon = amenityIcons[idx % amenityIcons.length];
                    const name = typeof amenity === 'string' ? amenity : amenity.name;
                    const desc = typeof amenity === 'object' ? amenity.desc : '';
                    return (
                      <div key={idx} className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition group">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 text-slate-900" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{name}</p>
                          {desc && <p className="text-xs text-gray-400">{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 md:top-24">
              <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                      ₦{Number(currentOption?.base_price || 0).toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">/ night</span>
                  </div>
                  {(currentOption?.min_nights || 0) > 1 && (
                    <p className="text-xs text-amber-400 mt-1 font-semibold">Minimum {currentOption.min_nights} nights required</p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-0 border-2 border-amber-500/30 rounded-xl overflow-hidden">
                    <div className="p-3 border-r-2 border-amber-500/30 bg-slate-700/30">
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Check-in</label>
                      <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)}
                        className="w-full text-xs text-white focus:outline-none bg-transparent font-semibold" />
                    </div>
                    <div className="p-3 bg-slate-700/30">
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Checkout</label>
                      <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)}
                        className="w-full text-xs text-white focus:outline-none bg-transparent font-semibold" />
                    </div>
                  </div>
                  <div className="border-2 border-amber-500/30 rounded-xl p-3 bg-slate-700/30">
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Guests</label>
                    <select value={numGuests} onChange={e => setNumGuests(parseInt(e.target.value))}
                      className="w-full text-xs text-white focus:outline-none bg-transparent font-semibold">
                      {[...Array(currentOption?.max_guests || 2)].map((_, i) => (
                        <option key={i + 1} value={i + 1} className="bg-slate-800">{i + 1} guest{i > 0 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {availabilityLoading && (
                  <div className="mb-4 p-3 bg-blue-500/20 border-2 border-blue-400/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs font-bold text-blue-200">Checking availability...</p>
                    </div>
                  </div>
                )}
                {!availabilityLoading && availability === true && checkIn && checkOut && (
                  <div className="mb-4 p-3 bg-green-500/20 border-2 border-green-400/50 rounded-xl">
                    <p className="text-xs font-bold text-green-200 flex items-center gap-2"><Check size={14} /> Available for your dates</p>
                  </div>
                )}
                {!availabilityLoading && availability === false && availabilityError && (
                  <div className="mb-4 p-3 bg-red-500/20 border-2 border-red-400/50 rounded-xl">
                    <p className="text-xs font-bold text-red-200 flex items-center gap-2"><X size={14} /> {availabilityError}</p>
                  </div>
                )}

                {checkIn && checkOut && price.nights > 0 && (
                  <>
                    <div className="mb-6 space-y-3 pb-6 border-b-2 border-amber-500/20">
                      <div className="flex justify-between text-gray-300 font-semibold text-sm">
                        <span>₦{Number(currentOption?.base_price || 0).toLocaleString()} × {price.nights} nights</span>
                        <span className="text-white">₦{price.base.toLocaleString()}</span>
                      </div>
                      {price.discount > 0 && (
                        <div className="flex justify-between text-green-400 font-bold bg-green-500/20 px-3 py-2 rounded-lg text-xs">
                          <span>{price.discountType}</span>
                          <span>-₦{price.discount.toLocaleString()}</span>
                        </div>
                      )}
                      {price.extraGuest > 0 && (
                        <div className="flex justify-between text-gray-300 text-sm">
                          <span>Extra guest fee</span>
                          <span className="text-white">₦{price.extraGuest.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    {/* Discount code */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Discount Code</label>
                      <div className="flex gap-2">
                        <input value={discountCode} onChange={e => { setDiscountCode(e.target.value); setDiscountResult(null); setDiscountError(""); }}
                          placeholder="e.g. WELCOME10"
                          className="flex-1 px-3 py-2 bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 text-xs" />
                        <button onClick={validateDiscountCode} disabled={!discountCode.trim() || discountLoading}
                          className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl font-bold text-xs disabled:opacity-50 whitespace-nowrap">
                          {discountLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {discountResult?.valid && (
                        <p className="text-green-400 text-xs mt-1 flex items-center gap-1"><Check size={12} /> {discountResult.message}</p>
                      )}
                      {discountError && <p className="text-red-400 text-xs mt-1">{discountError}</p>}
                    </div>

                    <div className="mb-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 rounded-xl border-2 border-amber-500/30">
                      {price.discountCode > 0 && (
                        <div className="flex justify-between text-pink-400 font-semibold text-sm mb-2">
                          <span>Code ({discountCode})</span>
                          <span>-₦{price.discountCode.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">₦{price.total.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Deposit or full payment options available at checkout</p>
                    </div>
                    <button onClick={() => canProceed() && setShowBookingModal(true)} disabled={!canProceed()}
                      className={`w-full py-4 rounded-xl font-bold text-base transition transform ${!canProceed() ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-60" : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/50 hover:scale-105"}`}>
                      {availabilityLoading ? "Checking..." : canProceed() ? "Reserve Now" : "Not Available"}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-3">Secure booking • Deposit option available</p>
                  </>
                )}

                {(!checkIn || !checkOut) && (
                  <div className="text-center py-10">
                    <Calendar className="w-14 h-14 mx-auto mb-3 text-amber-400" />
                    <p className="text-yellow-400 text-sm">5% off for 7+ days • 10% off for 30+ days</p>
                    <p className="text-gray-400 text-sm mt-1">Select dates to view pricing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
