import React from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Book A Stay
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your premier destination for comfortable and affordable accommodation in Abeokuta. Experience hospitality at its finest.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center hover:scale-110 transition-transform">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</a>
              </li>
              <li>
                <a href="#rooms" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Rooms & Suites</a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">About Us</a>
              </li>
              <li>
                <a href="#amenities" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Amenities</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Contact</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Room Booking</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Airport Pickup</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Restaurant & Bar</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Event Spaces</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Laundry Service</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">24/7 Support</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">+234 803 456 7890</p>
                  <p className="text-slate-400 text-sm">+234 701 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">info@bookastay.com</p>
                  <p className="text-slate-400 text-sm">bookings@bookastay.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">123 GRA Phase 2,</p>
                  <p className="text-slate-400 text-sm">Abeokuta, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © 2025 Book A Stay. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-slate-400 text-sm">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>in Abeokuta</span>
            </div>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer