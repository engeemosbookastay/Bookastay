// Booking lead-time rule (mirror of Backend/utils/leadTime.js).
//   A guest must book by 9pm the day BEFORE check-in, so the apartment can be
//   prepared for a 2pm check-in. The cutoff is anchored to Nigeria time
//   (WAT = UTC+1, no daylight saving), NOT the guest's browser clock — this is
//   only for the date-picker `min` and helper text; the backend re-enforces it.

const WAT_OFFSET_MS = 60 * 60 * 1000; // Nigeria is UTC+1 all year (no DST)
const CUTOFF_HOUR = 21;               // 9pm WAT, the day before check-in

// Earliest check-in date (YYYY-MM-DD, in WAT) a guest may still book right now.
export const minCheckInDate = (now = new Date()) => {
  const wat = new Date(now.getTime() + WAT_OFFSET_MS);
  const addDays = wat.getUTCHours() >= CUTOFF_HOUR ? 2 : 1;
  const earliest = new Date(Date.UTC(
    wat.getUTCFullYear(), wat.getUTCMonth(), wat.getUTCDate() + addDays
  ));
  return earliest.toISOString().slice(0, 10);
};

export const LEAD_TIME_MESSAGE =
  'Bookings close at 9pm the day before check-in so we can prepare the apartment for you.';
