import { createContext, useContext, useState } from 'react';
import { getAvailableTimes } from '../utils/booking';

const BookingContext = createContext(null);
const STORAGE_KEY = 'little-lemon-demo-bookings';
function readStoredBookings() {
  try { return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readStoredBookings);
  function submitBooking(values) {
    const available = getAvailableTimes(values.date, bookings);
    if (!available.includes(values.time)) return { ok: false, error: 'Sorry, this time is no longer available. Please choose another time.' };
    const booking = { ...values, id: `LL-${Date.now().toString(36).toUpperCase()}` };
    const updated = [...bookings, booking];
    setBookings(updated);
    try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* session storage is optional */ }
    return { ok: true, booking };
  }
  return <BookingContext.Provider value={{ bookings, submitBooking }}>{children}</BookingContext.Provider>;
}
export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBookings must be used within BookingProvider');
  return value;
}
