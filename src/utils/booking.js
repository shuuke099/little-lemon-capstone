// A deterministic local availability demo. Replace with a real booking API in production.
export const TIME_SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
export function todayLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00`);
  return !Number.isNaN(parsed.getTime()) && parsed.toLocaleDateString('en-CA') === date;
}
export function getAvailableTimes(date, bookings = []) {
  if (!isValidDate(date)) return [];
  const now = new Date();
  return TIME_SLOTS.filter((time) => {
    const localDateTime = new Date(`${date}T${time}:00`);
    if (localDateTime <= now) return false;
    return !bookings.some((booking) => booking.date === date && booking.time === time);
  });
}
export function validateReservation(values, availableTimes = getAvailableTimes(values.date)) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your name.';
  if (!values.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.date) errors.date = 'Please choose a reservation date.';
  else if (!isValidDate(values.date) || values.date < todayLocal()) errors.date = 'Please choose a valid future date.';
  if (!values.time) errors.time = 'Please select an available time.';
  else if (!availableTimes.includes(values.time)) errors.time = 'That time is not available. Please select another.';
  if (!Number.isInteger(Number(values.guests)) || Number(values.guests) < 1 || Number(values.guests) > 10) errors.guests = 'Select between 1 and 10 guests.';
  if (!['Birthday', 'Anniversary', 'Other', 'None'].includes(values.occasion)) errors.occasion = 'Please choose an occasion.';
  return errors;
}
