import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, CalendarDays, Clock3, Users } from 'lucide-react';
export default function Confirmed() {
  const { state } = useLocation();
  const booking = state?.booking;
  if (!booking) return <main className="section confirmation"><div className="container confirmation-card"><h1>No reservation to display</h1><p>Book a table to see your confirmation.</p><Link className="btn btn-yellow" to="/reservations">Make a reservation</Link></div></main>;
  const date = new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const time = new Date(`2000-01-01T${booking.time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return <main className="section confirmation"><div className="container confirmation-card"><CheckCircle2 className="success-icon" size={64}/><span className="eyebrow">All set!</span><h1>You're on the list, {booking.name.split(' ')[0]}.</h1><p>Your demo table reservation has been confirmed.</p><div className="booking-summary"><div><CalendarDays/><span>{date}</span></div><div><Clock3/><span>{time}</span></div><div><Users/><span>{booking.guests} {Number(booking.guests) === 1 ? 'guest' : 'guests'}</span></div></div><p className="confirmation-id">Reference: {booking.id}</p><p className="form-footnote">Educational demonstration only. This does not reserve a table at a real restaurant.</p><Link className="btn btn-yellow" to="/">Back to home</Link></div></main>;
}
