import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ChevronRight, MessageCircle, FileText } from "lucide-react";
import Logo from '../assets/Logo.png';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-teal-500/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Logo & Brand - Centered at Top */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-1">
            <img
              src={Logo}
              alt="Engeemos Bookastay Apartments Logo"
              className="w-16 h-16 object-contain"
            />
            <h3 className="text-2xl font-bold text-white">
              Engeemos Bookastay Apartments
            </h3>
          </div>
          {/* Changed text-center to text-left and removed centering */}
          <p className="text-sm text-teal-300 font-medium italic ml-20 sm:ml-[-25px] mt-2 sm:mt-[-20px]">
            ...hosting temporary stay in exotic style
          </p>
        </div>
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* COLUMN 1 – CONTACT */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></span>
              Contact
            </h4>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="bg-teal-500/10 p-3 rounded-lg group-hover:bg-teal-500/20 transition-all">
                  <MapPin size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Address</p>
                  <p className="text-gray-300 text-sm">
                    No 5, Adesola Babarinde Close, Off Professor Adewunmi Abioye Avenue, Olomore
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-teal-500/10 p-3 rounded-lg group-hover:bg-teal-500/20 transition-all">
                  <Mail size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Email</p>
                  <a href="mailto:engeemosbookastay@gmail.com" className="text-gray-300 text-sm hover:text-teal-400 transition-colors">
                    engeemosbookastay@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-teal-500/10 p-3 rounded-lg group-hover:bg-teal-500/20 transition-all">
                  <Phone size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Phone</p>
                  <a href="tel:+2348166939592" className="text-gray-300 text-sm hover:text-teal-400 transition-colors block">
                    +234 816 693 9592
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 transition-all">
                  <MessageCircle size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">WhatsApp</p>
                  <a 
                    href="https://wa.me/2348066215431" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    +234 806 621 5431
                    <span className="text-xs text-green-400 font-medium">(WhatsApp Only)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-teal-500/10 p-3 rounded-lg group-hover:bg-teal-500/20 transition-all">
                  <Instagram size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Instagram</p>
                  <a 
                    href="https://instagram.com/engeemos.bookastay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-teal-400 transition-colors"
                  >
                    @engeemos.bookastay
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-4">
              <a 
                href="https://wa.me/2348066215431" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-green-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-green-400/50"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://instagram.com/engeemos.bookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="https://facebook.com/engeemosbookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com/engeemosbookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* COLUMN 2 – QUICK LINKS */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></span>
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <a 
                  href="/" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Home</span>
                </a>
              </li>
              <li>
                <a 
                  href="/bookings" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Rooms</span>
                </a>
              </li>
              <li>
                <a 
                  href="/facilities" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Facilities</span>
                </a>
              </li>
              <li>
                <a 
                  href="/getting-around" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Getting Around</span>
                </a>
              </li>
              <li>
                <a 
                  href="/rules" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">House Rules</span>
                </a>
              </li>
              <li>
                <a 
                  href="/blog" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Blog</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 – LEGAL */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></span>
              Legal
            </h4>

            <ul className="space-y-3">
              <li>
                <a 
                  href="/cancellation-policy" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Cancellation Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-policy" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Engeemos Bookastay Apartments. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Chat Button */}
      <a
        href="https://wa.me/2348066215431"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:animate-bounce" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </a>
    </footer>
  );
};

export default Footer;