import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ChevronRight, MessageCircle } from "lucide-react";
import Logo from '../assets/Logo.png';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-teal-500/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT – CONTACT INFO */}
          <div className="space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className=""></div>
                <img
                  src={Logo}
                  alt="Engeemos Bookastay Apartments Logo"
                  className="w-16 h-16 object-contain relative"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Engeemos Bookastay Apartments
                </h3>
                <p className="text-sm text-teal-300 font-medium">Luxury Serviced Apartments</p>
              </div>
            </div>

            <p className="text-base text-gray-300 leading-relaxed max-w-md">
              Experience comfort, security, and style in our premium serviced apartments. 
              Designed for both short and extended stays in the heart of Abeokuta.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 pt-4">
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
                  <div className="space-y-1">
                    <a href="tel:+2348166939592" className="text-gray-300 text-sm hover:text-teal-400 transition-colors block">
                      +234 816 693 9592
                    </a>
                  </div>
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
              >
                <MessageCircle size={20} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://instagram.com/engeemos.bookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
              >
                <Instagram size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="https://facebook.com/engeemosbookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
              >
                <Facebook size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com/engeemosbookastay" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-teal-500/20 p-3 rounded-lg transition-all group border border-white/10 hover:border-teal-400/50"
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* RIGHT – SITE LINKS */}
          <div className="lg:pl-16">
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
                  href="/rooms" 
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
                  href="/blog" 
                  className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all group py-2"
                >
                  <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
                  <span className="text-base">Blog</span>
                </a>
              </li>
            </ul>

            {/* Newsletter/CTA Section */}
            <div className="mt-12 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-6">
              <h5 className="text-lg font-bold text-white mb-2">Ready to Book?</h5>
              <p className="text-sm text-gray-300 mb-4">
                Reserve your luxury apartment today and experience premium comfort.
              </p>
              <a 
                href="/bookings" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg hover:shadow-teal-500/50"
              >
                <span>Book Now</span>
                <ChevronRight size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Engeemos Bookastay Apartments. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;