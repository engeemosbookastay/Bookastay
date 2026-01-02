import React from 'react';
import { MdShield, MdLock, MdVisibility, MdDescription, MdWarning, MdCheckCircle, MdEmail, MdPhone } from 'react-icons/md';
import Navbar from '../Component//Navbar';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: MdDescription,
      title: "Personal Data Collection",
      content: [
        "We collect personal data that you provide when: making reservations or inquiries; communicating with us by phone, email, or messaging apps, and checking in or out of our apartments.",
        "This information may include full name, email, phone number, address, government-issued identification details, booking information (dates, apartment type, etc.), payment transaction data (via third-party providers), optional information you choose to share with us, website usage data (e.g., cookies), and CCTV footage in common/security areas."
      ]
    },
    {
      icon: MdVisibility,
      title: "Manner of Data Collection",
      content: [
        "We obtain personal data from guests via website booking forms, telephone, email, or messaging apps, cookies and analytics on our website."
      ]
    },
    {
      icon: MdCheckCircle,
      title: "Purpose & Legal Basis for Data Processing",
      content: [
        "Collected personal data are processed for purposes including confirming and managing reservations, verifying identity and ensuring guest safety, processing payments and issuing receipts, communicating updates about your stay, complying with legal and regulatory requirements, and improving our services and website experience.",
        "Under the NDPA 2023, the legal basis for data collection includes your consent, the performance of a contract, legal obligations and legitimate interests (when appropriately balanced with your rights)."
      ]
    },
    {
      icon: MdCheckCircle,
      title: "Consent",
      content: [
        "By using our website or providing personal data when booking or staying with us, you consent to the collection and processing of your personal data as described in this policy.",
        "You may withdraw your consent at any time, subject to legal or contractual obligations."
      ]
    },
    {
      icon: MdVisibility,
      title: "Cookies & Website Tracking",
      content: [
        "We use cookies and similar technologies to make the site function properly, analyse website performance, and tailor consent to improve your experience. A cookie banner will appear on your first visit to obtain consent for non-essential cookies."
      ]
    },
    {
      icon: MdShield,
      title: "Sharing Your Data",
      content: [
        "We do not sell or rent personal data. We may, however, share data with payment processors for payment handling, IT service providers supporting our systems, security and law enforcement (if required by law), and professional advisors like auditors. Any third party receiving your data must protect it in according with applicable data protection laws."
      ]
    },
    {
      icon: MdLock,
      title: "Data Security",
      content: [
        "We apply appropriate technical and organisational measures to protect personal data against unauthorised access, loss or corruption, unlawful processing, and data breaches.",
        "We regularly review these safeguards to improve data security."
      ]
    },
    {
      icon: MdDescription,
      title: "Data Retention",
      content: [
        "We retain personal data only as long as necessary for the fulfilment of reservation services, compliance with legal retention obligations, and handling enquiries or disputes. When data is no longer required, it will be securely deleted or anonymised."
      ]
    },
    {
      icon: MdCheckCircle,
      title: "Your Rights",
      content: [
        "Under the NDPA, you have the right to access your personal data, request correction or update of inaccurate data, request deletion of your data, object to certain processing, restrict processing in specific situations, withdraw consent (where processing is consent-based), and lodge a complaint with the Nigeria Data Protection Commission (NDPC). Contact us to exercise any of these rights."
      ]
    },
    {
      icon: MdWarning,
      title: "Data Breach Notification",
      content: [
        "In case of a confirmed data breach involving your personal data, we will notify you and the relevant authorities in accordance with NDPA requirements."
      ]
    },
    {
      icon: MdDescription,
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy to reflect changes in laws or how we process data. The most recent version will always be available on our website."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-2xl border-2 border-blue-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MdShield className="w-6 h-6 text-blue-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
                  <span className="text-blue-400 font-bold text-sm md:text-base uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-purple-200">Policy</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-4">
                  Engeemos Bookastay Apartments
                </p>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                  Engeemos Bookastay Apartments ("Engeemos", "we", "us", or "our") is committed to protecting the privacy and personal data of our guests, website visitors, and customers. This Privacy Policy explains how we collect, use, store, disclose, and safeguard personal information obtained through our website and accommodation services.
                </p>
                <p className="text-sm md:text-base text-gray-400 max-w-3xl leading-relaxed mt-4">
                  This policy is issued in accordance with the Nigeria Data Protection Act, 2023 (NDPA), the General Application & Implementation Directive (GAID) 2025, and other applicable data protection laws in Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MdEmail className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Contact Us</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions or data protection requests, contact Engeemos Bookastay using the contact information on our website.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:engeemosbookastay@gmail.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-400 hover:to-purple-400 transition-all shadow-lg"
                >
                  <MdEmail className="w-5 h-5" />
                  Email Us
                </a>
                <a 
                  href="tel:+2348166939592"
                  className="inline-flex items-center gap-2 bg-white/10 border-2 border-blue-500/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  <MdPhone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;