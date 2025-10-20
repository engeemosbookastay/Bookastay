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
// import { Home } from "lucide-react";
import Home from "./Pages/Home";
// Support multiple possible env names and a safe localhost default
export const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:4000';
const App = () => {
  return (
    <>
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
        <Route path="/features" element={<Feauters />} />
        <Route path="/why" element={<Why />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
