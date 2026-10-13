import React from "react";
import Navbar from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import Hero from "./Pages/Hero";
import Booking from "./Pages/Booking";
import AuthCallback from "./Pages/AuthCallback";
import Admin from "./Pages/Admin";
import Footer from "./Component/Footer";
import Contact from "./Pages/Contact";
import Review from "./Component/Review";
import Login from "./Component/Login";
import Feauters from "./Component/Feauters";
import Why from "./Component/Why";
import GettingAround from "./Pages/GettingAround";
import Rules from "./Component/Rules";
// import { Home } from "lucide-react";
import Home from "./Pages/Home";
import ScrollToTop from "./Component/ScrollToTop";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Cancellation from "./Pages/Cancellation";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Rooms from "./Pages/Rooms";
import About from "./Component/About";
// Prefer an explicit build-time env var. Otherwise use localhost ONLY when the
// app is actually running on localhost — any real domain uses the deployed
// backend, so the hosted site keeps working even if VITE_API_URL wasn't baked
// into the production build.
const isLocalhost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
export const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  (isLocalhost ? 'http://localhost:4000' : 'https://bookastay-backend-zuwa.onrender.com');
const App = () => {
  return (
    <>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/facilities" element={<Feauters />} />
        <Route path="/why" element={<Why />} />
        <Route path="/getting-around" element={<GettingAround />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-policy" element={<Cancellation />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/rooms" element={<Rooms />} />
        {/* Unknown URLs fall back to Home instead of a blank page */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
