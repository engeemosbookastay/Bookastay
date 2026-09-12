import React, { useState, useEffect } from 'react';
import { Check, X, Crown, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../App';

// Defaults mirror the seeded `comparison` row in site_content, so the section
// renders correctly even before the admin edits (or seeds) it.
const DEFAULTS = {
  heading: 'Book Direct & Save',
  subheading: 'See how much you keep by booking with us instead of third-party sites.',
  columns: { ours: 'Book Direct With Us', theirs: 'Booking.com / 3rd-Party' },
  rows: [
    { label: 'Nightly rate', ours: 'Best price', theirs: 'Same or higher' },
    { label: 'Service / booking fee', ours: 'None', theirs: 'Up to 15%' },
    { label: 'Payment', ours: 'Secure Paystack', theirs: 'Third-party processor' },
    { label: 'Support', ours: 'Direct with host', theirs: 'Call centre' },
  ],
  footnote: 'Prices are illustrative — edit these rows in the admin panel.',
};

// A cell reads as "positive" (green check) when it clearly favours booking
// direct, and "negative" (muted X) for the third-party column. We keep this
// purely visual — the text always comes from the admin content.
const NEGATIVE_HINTS = ['higher', 'up to', 'fee', 'third', 'call', 'none of', 'limited'];
const isNegative = (text = '') =>
  NEGATIVE_HINTS.some((h) => String(text).toLowerCase().includes(h));

const Comparison = () => {
  const [data, setData] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${backendUrl}/api/content/comparison`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.content?.value) {
          const v = d.content.value;
          setData({
            heading: v.heading || DEFAULTS.heading,
            subheading: v.subheading || DEFAULTS.subheading,
            columns: {
              ours: v.columns?.ours || DEFAULTS.columns.ours,
              theirs: v.columns?.theirs || DEFAULTS.columns.theirs,
            },
            rows: Array.isArray(v.rows) && v.rows.length ? v.rows : DEFAULTS.rows,
            footnote: v.footnote ?? DEFAULTS.footnote,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
            <Crown className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </div>

        {/* Comparison card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-900/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Column headers */}
            <div className="grid grid-cols-3">
              <div className="p-4 md:p-6"></div>
              <div className="p-4 md:p-6 text-center bg-gradient-to-b from-amber-500/20 to-transparent border-l border-r border-amber-500/20">
                <div className="flex items-center justify-center gap-1.5 md:gap-2">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-400 shrink-0" />
                  <span className="text-sm md:text-lg font-bold text-amber-300 leading-tight">
                    {data.columns.ours}
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <span className="text-sm md:text-lg font-semibold text-gray-400 leading-tight">
                  {data.columns.theirs}
                </span>
              </div>
            </div>

            {/* Rows */}
            {data.rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 items-center border-t border-slate-700/50 ${
                  i % 2 === 0 ? 'bg-slate-800/30' : ''
                }`}
              >
                <div className="p-4 md:p-6 text-sm md:text-base font-medium text-gray-200">
                  {row.label}
                </div>
                <div className="p-4 md:p-6 text-center bg-amber-500/5 border-l border-r border-amber-500/10 h-full flex items-center justify-center">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm md:text-base font-semibold text-white">{row.ours}</span>
                  </div>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 md:gap-2">
                    {isNegative(row.theirs) && (
                      <X className="w-4 h-4 md:w-5 md:h-5 text-rose-400/70 shrink-0" />
                    )}
                    <span className="text-sm md:text-base text-gray-400">{row.theirs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote + CTA */}
        {data.footnote && (
          <p className="text-center text-gray-500 text-xs md:text-sm mt-4">{data.footnote}</p>
        )}
        <div className="text-center mt-8">
          <Link
            to="/bookings"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/40 hover:scale-105"
          >
            Book Direct Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
