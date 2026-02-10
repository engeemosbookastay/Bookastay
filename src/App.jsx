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
import VerificationComplete from "./Component/Verificationcomplete";
// Support multiple possible env names and a safe localhost default
export const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:4000';
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
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/facilities" element={<Feauters />} />
        <Route path="/verificationcomplete" element={<VerificationComplete />} />
        <Route path="/why" element={<Why />} />
        <Route path="/getting-around" element={<GettingAround />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-policy" element={<Cancellation />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
