import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import {
  Users,
  Home,
  Bed,
  Star,
  ChevronLeft,
  ChevronRight,
  Upload,
  Wifi,
  Tv,
  Wind,
  Car,
  MapPin,
  Check,
  X,
  DoorOpen,
  Utensils,
  Shield,
  Calendar,
  Sparkles,
  FileText,
} from "lucide-react";

// Import actual images
import Living from "../assets/Living.jpg";
import Dine from "../assets/Dine.jpg";
import LiveRoom from "../assets/LiveRoom.jpg";
import Room from "../assets/Room.jpg";
import Bedroom from "../assets/Bedroom.jpg";
import Bedroomss from "../assets/Bedroomss.jpg";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("2bedroom");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numGuests, setNumGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [idFileUrl, setIdFileUrl] = useState(""); // Store Cloudinary URL after upload

  // Consent checkboxes state
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [cancellationConsent, setCancellationConsent] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);

  // Verification state management
  const [verificationStep, setVerificationStep] = useState("form"); // form, uploading, verifying, verified
  const [verificationReference, setVerificationReference] = useState(null);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const verificationPollingInterval = React.useRef(null);

  // Availability state
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const availabilityTimer = React.useRef(null);

  // Get URL parameters on mount and check for verification redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");
    const adults = params.get("adults");
    const type = params.get("type");
    const reference = params.get("reference");

    if (checkin) setCheckIn(checkin);
    if (checkout) setCheckOut(checkout);
    if (adults) setNumGuests(parseInt(adults));
    if (type) setActiveTab(type);

    // Check if user was redirected back from verification
    if (reference) {
      console.log("Verification redirect detected with reference:", reference);
      setVerificationReference(reference);
      setIsVerified(true);
      setVerificationStep("verified");
      setShowBookingModal(true);

      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);

      // Show success message
      alert("Identity verified successfully! You can now proceed to payment.");
    }
  }, []);

  // Central availability check function
  const checkAvailability = React.useCallback(
    async (opts = {}) => {
      const roomType =
        opts.roomType ?? (activeTab === "2bedroom" ? "entire" : "room1");
      const inDate = opts.checkIn ?? checkIn;
      const outDate = opts.checkOut ?? checkOut;

      if (!inDate || !outDate) {
        setAvailability(null);
        setAvailabilityError("");
        setAvailabilityLoading(false);
        return;
      }

      if (availabilityTimer.current) clearTimeout(availabilityTimer.current);

      setAvailabilityLoading(true);
      setAvailabilityError("");

      availabilityTimer.current = setTimeout(async () => {
        try {
          const params = new URLSearchParams({
            room_type: roomType,
            check_in_date: inDate,
            check_out_date: outDate,
          });

          const resp = await fetch(
            `${backendUrl}/api/availability?${params.toString()}`
          );
          const json = await resp.json().catch(() => ({}));

          if (!resp.ok || !json || !json.success) {
            setAvailability(false);
            setAvailabilityError(
              json?.message || "Failed to check availability"
            );
          } else {
            if (json.available) {
              setAvailability(true);
              setAvailabilityError("");
            } else {
              const msg = json.message || "Selected dates are not available";
              setAvailabilityError(msg);
              setAvailability(false);
            }
          }
        } catch (e) {
          setAvailability(false);
          setAvailabilityError("Network error checking availability");
        } finally {
          setAvailabilityLoading(false);
          availabilityTimer.current = null;
        }
      }, 400);
    },
    [activeTab, checkIn, checkOut]
  );

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
    "2bedroom": {
      id: "2bedroom",
      title: "2 Bedroom Apartment",
      subtitle: "Spacious luxury apartment perfect for families",
      category: "Entire Apartment",
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      description:
        "Experience luxury in our spacious 2-bedroom apartment. Featuring modern amenities, a fully equipped kitchen, elegant living spaces, and stunning balconies with breathtaking views. Perfect for families or groups seeking comfort and privacy in the heart of Abeokuta.",
      basePrice: 100000,
      extraGuestCharge: 0,
      maxGuests: 4,
      accentColor: "from-blue-900 to-blue-800",
      bgColor: "from-slate-800 to-slate-900",
      amenities: [
        { name: "High-Speed WiFi", icon: Wifi, desc: "100 Mbps fiber" },
        { name: "Full Kitchen", icon: Utensils, desc: "Cooking essentials" },
        { name: "Air Conditioning", icon: Wind, desc: "Climate control" },
        { name: "Smart TV", icon: Tv, desc: "Netflix & Prime Video" },
        { name: "Free Parking", icon: Car, desc: "On-site parking" },
        {
          name: "Private Balcony",
          icon: DoorOpen,
          desc: "City & Perfect for relaxation",
        },
        { name: "Self Check-in", icon: Shield, desc: "Contactless entry" },
        { name: "Workspace", icon: Home, desc: "Dedicated desk" },
      ],
      images: [Living, LiveRoom, Bedroom, Bedroomss, Room, Dine],
    },
    "1bedroom": {
      id: "1bedroom",
      title: "1 Bedroom Suite",
      subtitle: "Cozy and elegant for solo travelers or couples",
      category: "Private Room",
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description:
        "Your perfect retreat awaits! This beautifully designed 1-bedroom suite offers comfort and privacy with access to premium shared spaces. Ideal for solo travelers or couples seeking a peaceful escape with all the amenities you need.",
      basePrice: 60000,
      maxGuests: 2,
      minNights: 2,
      accentColor: "from-amber-500 to-amber-600",
      bgColor: "from-slate-800 to-slate-900",
      amenities: [
        { name: "High-Speed WiFi", icon: Wifi, desc: "100 Mbps fiber" },
        { name: "Shared Kitchen", icon: Utensils, desc: "Full access" },
        { name: "Air Conditioning", icon: Wind, desc: "In room" },
        { name: "Shared Living", icon: Tv, desc: "Common areas" },
        { name: "Parking", icon: Car, desc: "Available" },
        { name: "Balcony Access", icon: DoorOpen, desc: "Shared" },
        { name: "Private Bathroom", icon: Shield, desc: "En-suite" },
      ],
      images: [Bedroom, Room, Living, Dine],
    },
  };

  const currentOption = roomOptions[activeTab];

  const calculatePrice = () => {
    if (!checkIn || !checkOut)
      return {
        base: 0,
        discount: 0,
        extraGuest: 0,
        total: 0,
        nights: 0,
        discountType: "",
      };
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0)
      return {
        base: 0,
        discount: 0,
        extraGuest: 0,
        total: 0,
        nights: 0,
        discountType: "",
      };

    let basePrice = currentOption.basePrice * nights;
    let discountRate = 0;
    let discountType = "";

    if (nights >= 30) {
      discountRate = 0.1;
      discountType = "10% Monthly Discount";
    } else if (nights >= 7) {
      discountRate = 0.05;
      discountType = "5% Weekly Discount";
    }

    const discount = basePrice * discountRate;
    let extraGuestCharge = 0;

    if (activeTab === "2bedroom" && numGuests === 4) {
      extraGuestCharge = currentOption.extraGuestCharge * nights;
    }

    const total = basePrice - discount + extraGuestCharge;
    return {
      base: basePrice,
      discount,
      extraGuest: extraGuestCharge,
      total,
      nights,
      discountType,
    };
  };

  const price = calculatePrice();

  const nextImage = () =>
    setCurrentImageIndex((currentImageIndex + 1) % currentOption.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (currentImageIndex - 1 + currentOption.images.length) %
        currentOption.images.length
    );

  // Upload ID file to Cloudinary
  const uploadIdFile = async (file) => {
    const formData = new FormData();
    formData.append("id_file", file);

    try {
      const response = await fetch(`${backendUrl}/api/bookings/upload-id`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to upload ID");
      }

      return data.url; // Returns Cloudinary URL
    } catch (error) {
      throw error;
    }
  };

  // Verification polling function
  const pollVerificationStatus = React.useCallback(
    (reference) => {
      if (verificationPollingInterval.current) {
        clearInterval(verificationPollingInterval.current);
      }

      verificationPollingInterval.current = setInterval(async () => {
        try {
          const response = await fetch(
            `${backendUrl}/api/shufti/check-for-booking?reference=${reference}&email=${guestEmail}`
          );

          const data = await response.json();

          if (data.verified) {
            clearInterval(verificationPollingInterval.current);
            verificationPollingInterval.current = null;
            setIsVerified(true);
            setVerificationStep("verified");
            alert("✅ Identity verified! You can now proceed to payment.");
          } else if (data.status === "declined") {
            clearInterval(verificationPollingInterval.current);
            verificationPollingInterval.current = null;
            setVerificationStep("form");
            alert(
              "❌ Verification failed: " +
                (data.declined_reason || "Please try again")
            );
          } else if (data.status === "cancelled") {
            clearInterval(verificationPollingInterval.current);
            verificationPollingInterval.current = null;
            setVerificationStep("form");
            alert("Verification cancelled. Please try again.");
          }
        } catch (error) {
          console.error("Poll error:", error);
        }
      }, 5000);

      setTimeout(() => {
        if (verificationPollingInterval.current) {
          clearInterval(verificationPollingInterval.current);
          verificationPollingInterval.current = null;
        }
      }, 300000);
    },
    [guestEmail]
  );

  // Handle Verify Identity button click
  const handleVerifyIdentity = async () => {
    if (!guestName || !guestEmail || !idFile) {
      alert("Please enter your name, email, and upload your ID first");
      return;
    }

    try {
      // STEP 1: Upload ID to Cloudinary first
      setVerificationStep("uploading");
      console.log("Uploading ID to Cloudinary...");

      const uploadedUrl = await uploadIdFile(idFile);
      setIdFileUrl(uploadedUrl); // Save Cloudinary URL
      console.log("ID uploaded to Cloudinary:", uploadedUrl);

      // STEP 2: Start Shufti Pro verification with uploaded ID URL
      setVerificationStep("verifying");
      console.log("Starting Shufti Pro verification with uploaded ID...");

      const response = await fetch(
        `${backendUrl}/api/shufti/verify-before-booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: guestName,
            email: guestEmail,
            id_file_url: uploadedUrl, // Pass Cloudinary URL to Shufti Pro
            id_type:
              idType === "nin"
                ? "id_card"
                : idType === "passport"
                ? "passport"
                : "driving_license",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setVerificationReference(data.reference);
        setVerificationUrl(data.verification_url);

        // Open Shufti Pro - user takes selfie to match with uploaded ID
        window.open(
          data.verification_url,
          "shufti_verification",
          "width=800,height=600,scrollbars=yes"
        );

        // Start polling for verification status
        pollVerificationStatus(data.reference);
      } else {
        alert("Failed to initiate verification: " + data.message);
        setVerificationStep("form");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Failed to start verification: " + error.message);
      setVerificationStep("form");
    }
  };

  // Listen for verification completion message from popup window
  useEffect(() => {
    const handleVerificationMessage = (event) => {
      // Verify the message origin for security
      if (event.origin !== window.location.origin) {
        return;
      }

      // Check if this is a verification complete message
      if (
        event.data?.type === "VERIFICATION_COMPLETE" &&
        event.data?.reference
      ) {
        console.log(
          "Verification complete message received:",
          event.data.reference
        );

        // Stop polling
        if (verificationPollingInterval.current) {
          clearInterval(verificationPollingInterval.current);
          verificationPollingInterval.current = null;
        }

        // Update state to verified
        setIsVerified(true);
        setVerificationStep("verified");
        setVerificationReference(event.data.reference);

        // Show success message
        alert(
          "Identity verified successfully! You can now proceed to payment."
        );
      }
    };

    // Add event listener for messages from popup
    window.addEventListener("message", handleVerificationMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleVerificationMessage);
      if (verificationPollingInterval.current) {
        clearInterval(verificationPollingInterval.current);
      }
    };
  }, []);

  const handleProceedToPayment = async () => {
    if (!canProceedToBooking()) {
      alert(
        "Please wait for availability confirmation or select different dates"
      );
      return;
    }

    if (!guestName || !guestEmail || !guestPhone || !idType || !idFileUrl) {
      alert("Please complete all required fields");
      return;
    }

    if (!privacyConsent) {
      alert("Please agree to the Privacy Policy to continue");
      return;
    }

    if (!cancellationConsent) {
      alert("Please agree to the Cancellation Policy to continue");
      return;
    }

    if (!isVerified) {
      alert("Please complete identity verification first");
      return;
    }

    // Use already uploaded ID URL from verification
    const uploadedIdUrl = idFileUrl;

    const txRef = `book_${Date.now()}`;
    const amount = price.total;
    const roomType = activeTab === "2bedroom" ? "entire" : "room1";

    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";
    if (!PAYSTACK_KEY) return alert("Paystack public key is not configured.");
    if (!window.PaystackPop) return alert("Paystack library failed to load.");
    if (!amount || amount <= 0) return alert("Invalid payment amount");

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: guestEmail,
      amount: Math.round(amount * 100),
      ref: txRef,
      onClose: function () {
        console.log("Payment cancelled by user");
      },            
      callback: function (response) {
        const paymentRef = response?.reference || response?.txRef || null;
        if (!paymentRef) {
          return alert("Payment reference missing. Please contact support.");
        }

        const form = new FormData();
        form.append("name", guestName);
        form.append("email", guestEmail);
        form.append("phone", guestPhone);
        form.append("room_type", roomType);
        form.append("check_in_date", checkIn);
        form.append("check_out_date", checkOut);
        form.append("price", amount);
        form.append("payment_reference", paymentRef);
        form.append("tx_ref", txRef);
        form.append("provider", "paystack");
        form.append("id_type", idType);
        form.append("id_file_url", uploadedIdUrl);
        form.append("guests", numGuests);
        form.append("verification_reference", verificationReference);
        form.append("verification_status", "verified");

        fetch(`${backendUrl}/api/bookings/confirm`, {
          method: "POST",
          body: form,
        })
          .then(async (r) => {
            const data = await r.json().catch(() => ({}));
            if (!r.ok || data.error) {
              return alert(
                "Booking failed: " +
                  (data?.error || data?.message || "Unknown error")
              );
            }
            setGuestName("");
            setGuestEmail("");
            setGuestPhone("");
            setIdType("");
            setIdFile(null);
            setIdFileUrl("");
            setCheckIn("");
            setCheckOut("");
            setNumGuests(2);
            setAvailability(null);
            setPrivacyConsent(false);
            setCancellationConsent(false);
            setShowBookingModal(false);
            setVerificationStep("form");
            setIsVerified(false);
            setVerificationReference(null);
            setVerificationUrl(null);
            alert("Booking confirmed successfully!");
          })
          .catch((err) => {
            alert("Confirmation failed: " + err.message);
          });
      },
    });
    handler.openIframe();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !window.PaystackPop) {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl md:rounded-3xl shadow-2xl border border-amber-500/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                    {verificationStep === "form" && "Complete Booking"}
                    {verificationStep === "uploading" &&
                      "Uploading ID Document"}
                    {verificationStep === "verifying" &&
                      "Identity Verification"}
                    {verificationStep === "verified" && "Proceed to Payment"}
                  </h2>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">
                    {verificationStep === "form" &&
                      "Enter your details to proceed"}
                    {verificationStep === "uploading" &&
                      "Uploading your ID to secure servers"}
                    {verificationStep === "verifying" &&
                      "Verification in progress"}
                    {verificationStep === "verified" &&
                      "Your identity has been verified"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setVerificationStep("form");
                    setIsVerified(false);
                    if (verificationPollingInterval.current) {
                      clearInterval(verificationPollingInterval.current);
                    }
                  }}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Step 1: Form */}
              {verificationStep === "form" && (
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-slate-700/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      ID Type
                    </label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-slate-700/50 border border-amber-500/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      required
                    >
                      <option value="">Select ID type</option>
                      <option value="nin">NIN</option>
                      <option value="passport">International Passport</option>
                      <option value="license">Driver's License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      Upload ID Document
                    </label>
                    <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-4 md:p-6 text-center hover:border-amber-500/50 hover:bg-slate-700/30 transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setIdFile(e.target.files[0])}
                        className="hidden"
                        id="id-upload-modal"
                        required
                      />
                      <label
                        htmlFor="id-upload-modal"
                        className="cursor-pointer"
                      >
                        {idFile ? (
                          <div className="flex items-center justify-center gap-2 text-white">
                            <Check size={18} className="text-green-400" />
                            <span className="font-bold text-sm">
                              {idFile.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 md:w-10 h-8 md:h-10 mx-auto mb-2 text-amber-400" />
                            <p className="font-bold text-white text-sm md:text-base">
                              Click to upload
                            </p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              PNG, JPG or PDF
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="border-t-2 border-amber-500/20 pt-4 space-y-3">
                    <p className="text-xs md:text-sm font-bold text-gray-300 mb-3">
                      Required Agreements
                    </p>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy-consent"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded border-amber-500/30 bg-slate-700/50 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        required
                      />
                      <label
                        htmlFor="privacy-consent"
                        className="text-xs md:text-sm text-gray-300 cursor-pointer"
                      >
                        I have read and agree to the{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 underline font-semibold"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="cancellation-consent"
                        checked={cancellationConsent}
                        onChange={(e) =>
                          setCancellationConsent(e.target.checked)
                        }
                        className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded border-amber-500/30 bg-slate-700/50 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        required
                      />
                      <label
                        htmlFor="cancellation-consent"
                        className="text-xs md:text-sm text-gray-300 cursor-pointer"
                      >
                        I agree to Engeemos Bookastay Apartments'{" "}
                        <a
                          href="/cancellation-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 underline font-semibold"
                        >
                          Cancellation Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleVerifyIdentity}
                    disabled={
                      !guestName ||
                      !guestEmail ||
                      !guestPhone ||
                      !idType ||
                      !idFile ||
                      !privacyConsent ||
                      !cancellationConsent
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 md:py-3.5 rounded-xl font-bold hover:from-blue-400 hover:to-blue-500 transition shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-sm md:text-base mt-2"
                  >
                    Verify Identity to Continue
                  </button>

                  <p className="text-xs text-center text-gray-400 font-medium">
                    Identity verification required before payment
                  </p>
                </div>
              )}

              {/* Step 2: Uploading */}
              {verificationStep === "uploading" && (
                <div className="uploading-state text-center py-8">
                  <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Uploading ID Document
                  </h3>
                  <p className="text-gray-400 mb-2">
                    Please wait while we securely upload your ID...
                  </p>
                  <p className="text-sm text-gray-500">
                    This will only take a moment
                  </p>
                </div>
              )}

              {/* Step 3: Verifying */}
              {verificationStep === "verifying" && (
                <div className="verification-pending text-center py-8">
                  <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    ⏳ Verification in Progress
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Please complete the verification process in the popup
                    window.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    This page will update automatically when verification is
                    complete.
                  </p>
                  <button
                    onClick={() => window.open(verificationUrl, "_blank")}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Open Verification Window Again
                  </button>
                </div>
              )}

              {/* Step 4: Verified */}
              {verificationStep === "verified" && isVerified && (
                <div className="payment-section">
                  <div className="success-badge bg-green-500/20 border-2 border-green-400/50 rounded-xl p-4 mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-lg">
                      <Check size={24} />
                      <span>Identity Verified</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Guest:</span>
                        <span className="font-semibold text-white">
                          {guestName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-semibold text-white">
                          {guestEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-bold text-amber-400 text-lg">
                          ₦{price.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 py-3 md:py-3.5 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 text-sm md:text-base"
                  >
                    Pay with Paystack
                  </button>

                  <p className="text-xs text-center text-gray-400 font-medium mt-3">
                    Secure payment via Paystack
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-20"></div>

      <div className="border-b border-amber-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
            Select Your Suite
          </h2>
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
            {Object.entries(roomOptions).map(([key, option]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setCurrentImageIndex(0);
                  setNumGuests(key === "2bedroom" ? 2 : 2);
                  setAvailability(null);
                }}
                className={`relative group px-8 md:px-12 py-6 md:py-8 rounded-2xl font-semibold transition-all transform hover:scale-105 overflow-hidden ${
                  activeTab === key
                    ? "shadow-2xl shadow-amber-500/50"
                    : "bg-slate-800/50 border-2 border-slate-700 hover:border-amber-500/50"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    option.accentColor
                  } ${
                    activeTab === key ? "opacity-100" : "opacity-0"
                  } transition-opacity`}
                ></div>
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">
                    {option.bedrooms === 2 ? "🏠" : "🛏️"}
                  </div>
                  <div
                    className={`font-bold text-lg md:text-2xl mb-1 md:mb-2 ${
                      activeTab === key ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {option.title}
                  </div>
                  <div
                    className={`text-xs md:text-sm ${
                      activeTab === key ? "text-amber-200" : "text-gray-500"
                    }`}
                  >
                    ₦{option.basePrice.toLocaleString()}/night
                    {option.minNights && (
                      <span className="block text-xs mt-1">
                        (Min {option.minNights} nights)
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-3 space-y-6 md:space-y-10">
            <div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm mb-3 md:mb-4 flex-wrap">
                <span className="px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold shadow-lg text-xs md:text-sm">
                  {currentOption.category}
                </span>
                <span className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-amber-500/20 text-white text-xs md:text-sm">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                  Abeokuta, Nigeria
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
                {currentOption.title}
              </h1>
              <p className="text-base md:text-xl text-gray-400">
                {currentOption.subtitle}
              </p>
            </div>

            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
              <div className="relative h-64 md:h-96 lg:h-[500px]">
                <img
                  src={currentOption.images[currentImageIndex]}
                  alt="Room"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {currentOption.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-white"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-white"
                    >
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
                      {currentOption.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-1.5 md:h-2 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "bg-amber-400 w-8 md:w-12"
                              : "bg-white/60 w-1.5 md:w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 py-6 md:py-8 border-y-2 border-amber-500/20 flex-wrap">
              <div className="flex items-center gap-2 md:gap-3 bg-slate-800/50 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border border-amber-500/20">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                <span className="text-white font-bold text-sm md:text-lg">
                  {currentOption.guests} guests
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-slate-800/50 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border border-amber-500/20">
                <Bed className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                <span className="text-white font-bold text-sm md:text-lg">
                  {currentOption.bedrooms} bedroom
                  {currentOption.bedrooms > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-slate-800/50 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border border-amber-500/20">
                <Home className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                <span className="text-white font-bold text-sm md:text-lg">
                  {currentOption.bathrooms} bathroom
                  {currentOption.bathrooms > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-6 md:p-10 rounded-2xl md:rounded-3xl border border-amber-500/20">
                <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                  About This Space
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-lg">
                  {currentOption.description}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
                Premium Amenities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {currentOption.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 md:gap-4 bg-slate-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition hover:shadow-lg hover:shadow-amber-500/10 group"
                    >
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 md:w-6 md:h-6 text-slate-900" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm md:text-lg">
                          {amenity.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          {amenity.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-20 md:top-24">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl group-hover:blur-3xl transition-all"></div>
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                        ₦{currentOption.basePrice.toLocaleString()}
                      </span>
                      <span className="text-gray-400 font-medium text-sm md:text-base">
                        / night
                      </span>
                    </div>
                    {currentOption.minNights && (
                      <p className="text-xs md:text-sm text-amber-400 mt-2 font-semibold">
                        Minimum {currentOption.minNights} nights required
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <div className="grid grid-cols-2 gap-0 border-2 border-amber-500/30 rounded-xl overflow-hidden">
                      <div className="p-3 md:p-4 border-r-2 border-amber-500/30 bg-slate-700/30">
                        <label className="block text-xs font-bold text-gray-300 uppercase mb-1 md:mb-2">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full text-xs md:text-sm text-white focus:outline-none bg-transparent font-semibold"
                        />
                      </div>
                      <div className="p-3 md:p-4 bg-slate-700/30">
                        <label className="block text-xs font-bold text-gray-300 uppercase mb-1 md:mb-2">
                          Checkout
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || today}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full text-xs md:text-sm text-white focus:outline-none bg-transparent font-semibold"
                        />
                      </div>
                    </div>

                    <div className="border-2 border-amber-500/30 rounded-xl p-3 md:p-4 bg-slate-700/30">
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1 md:mb-2">
                        Guests
                      </label>
                      <select
                        value={numGuests}
                        onChange={(e) => setNumGuests(parseInt(e.target.value))}
                        className="w-full text-xs md:text-sm text-white focus:outline-none bg-transparent font-semibold"
                      >
                        {[...Array(currentOption.maxGuests)].map((_, i) => (
                          <option
                            key={i + 1}
                            value={i + 1}
                            className="bg-slate-800"
                          >
                            {i + 1} guest{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {availabilityLoading && (
                    <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-500/20 border-2 border-blue-400/50 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs md:text-sm font-bold text-blue-200">
                          Checking availability...
                        </p>
                      </div>
                    </div>
                  )}

                  {!availabilityLoading &&
                    availability === true &&
                    checkIn &&
                    checkOut && (
                      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-500/20 border-2 border-green-400/50 rounded-xl backdrop-blur-sm">
                        <p className="text-xs md:text-sm font-bold text-green-200 flex items-center gap-2">
                          <Check size={16} />
                          Available for your dates
                        </p>
                      </div>
                    )}

                  {!availabilityLoading &&
                    availability === false &&
                    availabilityError && (
                      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/20 border-2 border-red-400/50 rounded-xl backdrop-blur-sm">
                        <p className="text-xs md:text-sm font-bold text-red-200 flex items-center gap-2">
                          <X size={16} />
                          {availabilityError}
                        </p>
                      </div>
                    )}

                  {checkIn && checkOut && price.nights > 0 && (
                    <>
                      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4 pb-6 md:pb-8 border-b-2 border-amber-500/20">
                        <div className="flex justify-between text-gray-300 font-semibold text-sm md:text-lg">
                          <span>
                            ₦{currentOption.basePrice.toLocaleString()} ×{" "}
                            {price.nights} nights
                          </span>
                          <span className="text-white">
                            ₦{price.base.toLocaleString()}
                          </span>
                        </div>
                        {price.discount > 0 && (
                          <div className="flex justify-between text-green-400 font-bold bg-green-500/20 px-3 md:px-4 py-2 md:py-3 rounded-lg border border-green-500/30 text-xs md:text-base">
                            <span>{price.discountType}</span>
                            <span>-₦{price.discount.toLocaleString()}</span>
                          </div>
                        )}
                        {price.extraGuest > 0 && (
                          <div className="flex justify-between text-gray-300 font-semibold text-sm md:text-base">
                            <span>4th guest fee</span>
                            <span className="text-white">
                              ₦{price.extraGuest.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mb-6 md:mb-8 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 md:p-6 rounded-xl border-2 border-amber-500/30">
                        <div className="flex justify-between text-xl md:text-2xl font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                            ₦{price.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (canProceedToBooking()) {
                            setShowBookingModal(true);
                          }
                        }}
                        disabled={!canProceedToBooking()}
                        className={`w-full py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition transform ${
                          !canProceedToBooking()
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-60"
                            : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105"
                        }`}
                      >
                        {availabilityLoading
                          ? "Checking..."
                          : canProceedToBooking()
                          ? "Reserve Now"
                          : "Not Available"}
                      </button>
                      <p className="text-xs text-center text-gray-400 font-medium mt-3 md:mt-4">
                        Secure booking • No hidden fees
                      </p>
                    </>
                  )}

                  {(!checkIn || !checkOut) && (
                    <div className="text-center py-8 md:py-12">
                      <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-amber-400" />
                      <p className="text-yellow-400">
                        5% discount for 7+ days • 10% discount for 30+ days
                      </p>
                      <p className="text-sm md:text-base text-gray-400 font-semibold">
                        Select dates to view pricing
                      </p>
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

export default Booking;
