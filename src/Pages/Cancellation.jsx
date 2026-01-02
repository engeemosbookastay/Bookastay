import React from 'react';
import { MdCalendarToday, MdCancel, MdWarning, MdCheckCircle, MdRefresh, MdAttachMoney, MdSchedule, MdShield, MdEmail, MdPhone } from 'react-icons/md';
import Navbar from '../Component//Navbar';

const Cancellation = () => {
  const policies = [
    {
      icon: MdCheckCircle,
      title: "Reservation Confirmation",
      content: ["All reservations are considered confirmed only after full payment has been received and a booking confirmation has been issued by Engeemos Bookastay Apartments."],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MdCancel,
      title: "Check-in Day Cancellations",
      content: ["Cancellations made on the day of check-in are non-refundable."],
      color: "from-red-500 to-orange-500"
    },
    {
      icon: MdCalendarToday,
      title: "Booking made a week or less to check-in date",
      content: [
        "Cancellations made 72 hours or more before the scheduled check-in time will be eligible for a full refund, excluding any non-refundable processing or transaction fees (if applicable).",
        "Cancellations made less than 72 hours before check-in will attract a charge equivalent to either one (1) night's stay or 50% of the total booking amount, whichever is higher."
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MdCalendarToday,
      title: "Booking made 2 weeks but less than a month to check-in date",
      content: [
        "Cancellations made 5 days or more before the scheduled check-in time will be eligible for a full refund, excluding any non-refundable processing or transaction fees (if applicable).",
        "Cancellations made less than 5 days before check-in will attract a charge equivalent to 50% of the total booking amount."
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MdCalendarToday,
      title: "Booking made within 1 month or more of check-in",
      content: [
        "Cancellations made 10 days or more before the scheduled check-in time will be eligible for a full refund, excluding any non-refundable processing or transaction fees (if applicable).",
        "Cancellations made less than 10 days before check-in will attract a charge equivalent to 50% of the total booking amount."
      ],
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: MdWarning,
      title: "No-Show",
      content: ["If a guest fails to arrive on the scheduled check-in date without prior notice, the booking will be treated as a no-show and the full booking amount forfeited."],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: MdSchedule,
      title: "Early Check-Out",
      content: ["No refunds will be issued for unused nights if a guest checks out earlier than the confirmed check-out date."],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MdRefresh,
      title: "Modification of Bookings",
      content: ["Requests to modify booking dates shall be considered but approval is subject to availability."],
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: MdCancel,
      title: "Non-refundable Bookings",
      content: ["Promotional, discounted, or special-rate bookings may be designated as non-refundable. This will be clearly stated at the time of booking."],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: MdAttachMoney,
      title: "Refund Processing",
      content: ["Approved refunds will be processed within 7-14 business days and will be refunded to the original payment method. Bank or payment gateway charges may be deducted where applicable."],
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: MdShield,
      title: "Force Majeure",
      content: ["Engeemos Bookastay Apartments shall not be held liable for cancellations or inability to honour bookings due to events beyond our control, including but not limited to natural disasters, government restrictions, strikes, or emergencies. In such cases, we may offer a credit or reschedule at our discretion."],
      color: "from-slate-500 to-gray-600"
    },
    {
      icon: MdWarning,
      title: "Policy Updates",
      content: ["We reserve the right to update or amend this Cancellation Policy at any time. The version in effect at the time of booking shall apply."],
      color: "from-amber-500 to-yellow-500"
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

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900 via-orange-800 to-amber-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-orange-900/95 to-orange-800/95 backdrop-blur-2xl border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MdCalendarToday className="w-6 h-6 text-amber-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                  <span className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  Cancellation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Policy</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-4">
                  Engeemos Bookastay Apartments
                </p>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                  At Engeemos Bookastay Apartments, we understand that plans can change. This Cancellation Policy explains the terms that apply when a guest cancels, modifies, or fails to honour a booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${policy.color}/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${policy.color} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{policy.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {policy.content.map((paragraph, idx) => (
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
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MdEmail className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                For cancellation-related inquiries or requests, please contact us using the contact information available on our website.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:engeemosbookastay@gmail.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
                >
                  <MdEmail className="w-5 h-5" />
                  Email Us
                </a>
                <a 
                  href="tel:+2348166939592"
                  className="inline-flex items-center gap-2 bg-white/10 border-2 border-amber-500/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
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

export default Cancellation;