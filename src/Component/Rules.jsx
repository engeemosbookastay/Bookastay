import React, { useState } from 'react';
import { Shield, Cigarette, Users, Clock, Lightbulb, Gamepad2, Zap, UtensilsCrossed, Trash2, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Home as HomeIcon, Music, Eye, Key, Crown, Thermometer, RefreshCw } from 'lucide-react';
import Navbar from './Navbar';

const Rules = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const rules = [
    {
      icon: HomeIcon,
      title: "Shoes in the Living Room Area",
      category: "Cleanliness",
      gradient: "from-blue-500 to-cyan-500",
      content: "We prefer that shoes not be worn in the living room area, including on the centre rug."
    },
    {
      icon: Cigarette,
      title: "Smoking",
      category: "Health & Safety",
      gradient: "from-red-500 to-orange-500",
      content: "Smoking of any kind is not permitted inside the apartment. If you need to smoke, please do so outside."
    },
    {
      icon: Music,
      title: "Parties",
      category: "Entertainment",
      gradient: "from-purple-500 to-pink-500",
      content: "Parties are not allowed, although guests are welcome to play/listen to music in-house for self-entertainment purposes."
    },
    {
      icon: Users,
      title: "Number of Guests",
      category: "Occupancy",
      gradient: "from-emerald-500 to-teal-500",
      content: "Number of guests (including children) must be clearly indicated during booking as only number of guests so indicated will be allowed to stay at the apartment. Being precise in this regard ensures we can appropriately prepare the apartment for guests' arrival. Your comfort and wellbeing is our priority!"
    },
    {
      icon: Eye,
      title: "Visitors",
      category: "Guest Policy",
      gradient: "from-indigo-500 to-purple-500",
      content: "Guests are free to have visitors over during their stay. However, visitors are not allowed to sleep over. Similarly, guests have the responsibility to ensure that their visitors do not breach the House Rules or break/damage anything in the apartment."
    },
    {
      icon: Gamepad2,
      title: "Entertainment and Games",
      category: "Amenities",
      gradient: "from-pink-500 to-rose-500",
      content: "There is a 75\" smart TV in the apartment. Feel free to binge your favourite TV shows and movies on Netflix and/or Amazon Prime. You can also stream videos on YouTube.",
      extra: "Board games like snake-and-ladder, chess, ludo, and scrabble together with opon ayo are available and can be found inside the cabinet below the TV."
    },
    {
      icon: Lightbulb,
      title: "Lights",
      category: "Energy Conservation",
      gradient: "from-yellow-500 to-amber-500",
      content: "The lighting system in the apartment is made for beautification. Feel free to use them. However, once it is past 3pm (when the sun's intensity would have reduced), only switch on the light when needed."
    },
    {
      icon: Zap,
      title: "Power Supply Arrangement",
      category: "Electricity",
      gradient: "from-orange-500 to-red-500",
      isExpanded: true,
      content: "The house is powered by a combination of 10kva inverter, PHCN and (sometimes) generator.",
      details: [
        {
          subtitle: "Inverter Schedule",
          text: "The inverter (especially during summer period) supports heavy appliance usage (2 ACs, washing machine, iron, electric kettles, microwave, and lights) from around 8.30am to 3pm and support light appliance usage (TV and few lights) from 3.01pm to 7pm. The reduction in load capacity is due to an equivalent reduction in the sun's intensity from 3pm. To use microwave after 3pm, temporarily turn off TV and unused lights.",
          extra: "During summer period, solar panels charge the inverter from 7.30am/8am, while during raining season, charging usually commences around 9am/9.30am. At both seasons, allow the inverter some time to charge before loading appliances on it. Inverter power is usually at its strongest from midday to 3pm."
        },
        {
          subtitle: "PHCN Connection",
          text: "The house is connected to PHCN. The pre-installed alarm in the gate house notify guests when PHCN is restored. A coloured bulb located in the small corridor to the rooms serves the same purpose – when this bulb is on, the house is operating on government light. Although ACs and other appliances can be used when PHCN is available, kindly note that fair use policy applies especially to AC usage as the apartment runs on pre-paid meter.",
          extra: "The apartment is located in a BAND C zone; there will therefore be light for a minimum of 12 hours on most days. The bulk of the 12 hours of light is made available over the night."
        },
        {
          subtitle: "Generator Usage",
          text: "A 9kva generator is used to complement inverter and PHCN – usually from 7pm to 11.30pm (most times, PHCN is restored before 11.30pm). Please note that only 1 AC can and should be used with the generator. TV and microwave can also be used, but to use microwave, temporarily switch off AC."
        },
        {
          subtitle: "Changeover System",
          text: "An automatic changeover system is in place. This automates changing of power source between PHCN, generator and inverter. Occasionally check the coloured bulb or listen for the sound alarm to know when the apartment is on government light."
        },
        {
          subtitle: "Keeping Cool",
          text: "There are 4 ACs in the apartment. All 4 work on government light but only 2 work with the inverter – 1 in the living room, 1 in the bedroom with water heater.",
          extra: "For period when ACs cannot be used, 4 rechargeable fans are available for keeping cool. It is also safe to open the windows if necessary."
        },
        {
          subtitle: "Daily Schedule Summary",
          list: [
            "During the day (morning to 3pm) – Inverter (when there is no light)",
            "From 3pm to 7pm – Inverter (but no AC use except government light is available)",
            "From 7pm to 11.30pm – Generator (1 AC can be used)",
            "From 11.30pm to morning – Inverter (no AC use except government light is restored)"
          ]
        },
        {
          subtitle: "Important Tips for 24/7 Power",
          list: [
            "Use WASHING MACHINE during the day, preferably from 8.30am/9.30am but not later than 3pm. Consider using quick wash option (soft materials) and wool option (thick materials)",
            "IRON clothes during the day (from 8.30/9.30am to 3pm)",
            "DO NOT use the ACs after 3pm (except if PHCN is available)",
            "If you are home throughout the day, consider allowing the AC some resting time",
            "When going to bed, switch off the AC connected to the inverter with the remote",
            "Use the 4 rechargeable fans for ventilation outside the AC use period",
            "Don't switching on/off the bathroom water heater as this is remotely operated around 6am every morning"
          ]
        }
      ]
    },
    {
      icon: UtensilsCrossed,
      title: "Kitchen",
      category: "Appliances",
      gradient: "from-green-500 to-emerald-500",
      content: "There is gas cooker in the kitchen. If you need help using this, let the House Manager know. Gas should be turned off once cooking is completed. If the gas in the connected cylinder finishes, please change to the back-up cylinder.",
      details: [
        {
          text: "Electric kettle, toaster, microwave & blender are also in the kitchen. It is recommended that these appliances be used during the day (till 3pm) and when there is light. Microwave can, however, be used after 3pm, but make sure to turn off other TV temporarily."
        },
        {
          text: "Air fryer should be used with PHCN or, if with inverter, before 3pm. Plates and kitchen utensils are located in the cabinets/centre cabinet."
        },
        {
          text: "Washing machine is in the kitchen balcony. Locate the switch at the back (see welcome video). Select the washing program that works best for you (quick wash or wool options). Press the start/pause button. Detergent and clips/pegs are inside the unlocked shelf on top of the washing machine. Clothes hanger is stationed in the balcony."
        }
      ]
    },
    {
      icon: Trash2,
      title: "Left-Over Frozen Food",
      category: "Cleanliness",
      gradient: "from-cyan-500 to-blue-500",
      content: "Leftover frozen food items in the fridge/freezer should be cleared out and trashed before check-out."
    },
    {
      icon: Shield,
      title: "Cleaning",
      category: "Maintenance",
      gradient: "from-teal-500 to-green-500",
      content: "Please keep the apartment in the same clean and presentable state in which it's handed over to you. All used kitchen utensils must therefore be washed. Bathroom floors should be kept in dry condition."
    },
    {
      icon: AlertCircle,
      title: "Damage",
      category: "Responsibility",
      gradient: "from-red-500 to-pink-500",
      content: "In the unlikely event that there is a damage to any of the items within the apartment, please make sure to report such damage/breakage in a timely manner. The host reserves their right to seek legal remedy from the booker in respect of such damage."
    },
    {
      icon: Key,
      title: "Before You Check Out",
      category: "Checkout",
      gradient: "from-purple-500 to-indigo-500",
      content: "Check out time is 12pm. All keys must be returned into the Key Safe by this time. Kindly notify the House Manager upon check-out.",
      details: [
        {
          subtitle: "Rubbish",
          text: "Please deposit used bin bags inside the bigger bin located around the carport."
        },
        {
          subtitle: "Turn Things Off",
          text: "Confirm all bulbs/lights and appliances have been turned off."
        },
        {
          subtitle: "Return Keys into the Key Safe",
          text: "Check out time is 12pm. All keys must be returned into the Key Safe by this time. Kindly notify the House Manager upon check-out."
        }
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

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-2xl border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                  <span className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">Guest Guidelines</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  House <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Rules</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Find below some of our most important House Rules. House Rules are put together to ensure guests are speedily familiarised with their new accommodation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            const isExpanded = expandedSections[index] || false;
            const hasDetails = rule.details && rule.details.length > 0;

            return (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${rule.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300">
                  {/* Header */}
                  <div 
                    className={`bg-gradient-to-r ${rule.gradient} p-6 cursor-pointer`}
                    onClick={() => hasDetails && toggleSection(index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">{rule.category}</div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{rule.title}</h3>
                        </div>
                      </div>
                      {hasDetails && (
                        <button className="text-white hover:scale-110 transition-transform">
                          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                      {rule.content}
                    </p>

                    {rule.extra && (
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4">
                        {rule.extra}
                      </p>
                    )}

                    {/* Expandable Details */}
                    {hasDetails && (
                      <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[3000px] mt-6' : 'max-h-0'}`}>
                        <div className="space-y-6 pt-6 border-t border-amber-500/20">
                          {rule.details.map((detail, idx) => (
                            <div key={idx} className="bg-slate-700/30 rounded-xl p-5 border border-amber-500/10">
                              {detail.subtitle && (
                                <h4 className="text-lg font-bold text-amber-400 mb-3">{detail.subtitle}</h4>
                              )}
                              {detail.text && (
                                <p className="text-gray-300 leading-relaxed">{detail.text}</p>
                              )}
                              {detail.extra && (
                                <p className="text-gray-300 leading-relaxed mt-3">{detail.extra}</p>
                              )}
                              {detail.list && (
                                <ul className="space-y-2 mt-3">
                                  {detail.list.map((item, listIdx) => (
                                    <li key={listIdx} className="flex items-start gap-3 text-gray-300">
                                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Thank You for Your Cooperation</h3>
              <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Following these house rules ensures a comfortable and enjoyable stay for everyone. If you have any questions or concerns, please don't hesitate to contact the House Manager.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;