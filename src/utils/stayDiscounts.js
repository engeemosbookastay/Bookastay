import useSiteContent, { pickContent } from './useSiteContent';

// Long-stay discounts — editable in Admin → Edit Content → Booking Settings.
export const STAY_DISCOUNT_DEFAULTS = {
  weekly_enabled: true, weekly_min_nights: 7, weekly_percent: 10,
  monthly_enabled: true, monthly_min_nights: 30, monthly_percent: 15,
};

export const useStayDiscounts = () => {
  const saved = pickContent(useSiteContent('booking_settings'), STAY_DISCOUNT_DEFAULTS, STAY_DISCOUNT_DEFAULTS) || {};
  const s = { ...STAY_DISCOUNT_DEFAULTS, ...saved };
  // Active tiers, biggest minimum stay first.
  return [
    { enabled: s.monthly_enabled, minNights: Number(s.monthly_min_nights), percent: Number(s.monthly_percent), label: 'Monthly' },
    { enabled: s.weekly_enabled, minNights: Number(s.weekly_min_nights), percent: Number(s.weekly_percent), label: 'Weekly' },
  ]
    .filter(t => t.enabled && t.minNights > 0 && t.percent > 0)
    .sort((a, b) => b.minNights - a.minNights);
};

// The tier that applies to a stay of `nights`, or null.
export const tierFor = (tiers, nights) => tiers.find(t => nights >= t.minNights) || null;

// e.g. "10% off for 7+ nights • 15% off for 30+ nights" ('' when no discounts are on)
export const describeTiers = (tiers) =>
  [...tiers].sort((a, b) => a.minNights - b.minNights)
    .map(t => `${t.percent}% off for ${t.minNights}+ nights`).join(' • ');
