import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock3, Users, CheckCircle2 } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { getAvailableTimes, todayLocal, validateReservation } from '../utils/booking';

const initialValues = { name: '', email: '', date: '', time: '', guests: '2', occasion: 'None' };
const fields = ['name', 'email', 'date', 'time', 'guests', 'occasion'];
function FieldError({ error, id }) { return error ? <span role="alert" className="field-error" id={`${id}-error`}>{error}</span> : null; }
export default function Reservations() {
  const navigate = useNavigate();
  const { bookings, submitBooking } = useBookings();
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const availableTimes = useMemo(() => getAvailableTimes(values.date, bookings), [values.date, bookings]);
  const errors = validateReservation(values, availableTimes);
  const showError = (name) => (touched[name] || submitted) ? errors[name] : undefined;
  const fieldProps = (name) => ({ id: name, name, value: values[name], onBlur: () => setTouched(old => ({ ...old, [name]: true })), 'aria-invalid': !!showError(name), 'aria-describedby': showError(name) ? `${name}-error` : undefined });
  function change(e) { const { name, value } = e.target; setValues(old => ({ ...old, [name]: value, ...(name === 'date' ? { time: '' } : {}) })); setServerError(''); }
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;
    const result = submitBooking(values);
    if (!result.ok) { setServerError(result.error); return; }
    navigate('/confirmed', { state: { booking: result.booking } });
  }
  return <main className="reservation-page"><div className="container reservation-layout"><div className="reservation-intro"><span className="eyebrow light">Join us for dinner</span><h1>Book a table.</h1><p>Whether it's a special celebration or a relaxed evening out, we've got a place for you.</p><div className="reservation-perks"><div><CalendarDays/><span>Choose your date</span></div><div><Clock3/><span>Find a time</span></div><div><Users/><span>Bring your favorite people</span></div></div><div className="tip-card"><CheckCircle2/><p>Booking requests are confirmed instantly in this demo. No payment required.</p></div></div>
  <div className="form-card"><span className="eyebrow">Your reservation</span><h2>Let's get you seated</h2><p>All fields are required unless marked otherwise.</p><form onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
    <div className="form-row"><div className="form-field"><label htmlFor="name">Your name</label><input {...fieldProps('name')} onChange={change} placeholder="Your full name" autoComplete="name" required/><FieldError id="name" error={showError('name')}/></div><div className="form-field"><label htmlFor="email">Email address</label><input {...fieldProps('email')} onChange={change} type="email" placeholder="you@example.com" autoComplete="email" required/><FieldError id="email" error={showError('email')}/></div></div>
    <div className="form-row"><div className="form-field"><label htmlFor="date">Date</label><input {...fieldProps('date')} onChange={change} type="date" min={todayLocal()} required/><FieldError id="date" error={showError('date')}/></div><div className="form-field"><label htmlFor="time">Time</label><select {...fieldProps('time')} onChange={change} required><option value="">Select a time</option>{availableTimes.map(time => <option key={time} value={time}>{new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</option>)}</select><FieldError id="time" error={showError('time')}/>{values.date && availableTimes.length === 0 && <small className="field-hint">No remaining demo times on this date. Try another day.</small>}</div></div>
    <div className="form-row"><div className="form-field"><label htmlFor="guests">Number of guests</label><select {...fieldProps('guests')} onChange={change} required>{Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select><FieldError id="guests" error={showError('guests')}/></div><div className="form-field"><label htmlFor="occasion">Occasion</label><select {...fieldProps('occasion')} onChange={change}><option value="None">Just dining</option><option value="Birthday">Birthday</option><option value="Anniversary">Anniversary</option><option value="Other">Other celebration</option></select><FieldError id="occasion" error={showError('occasion')}/></div></div>
    {serverError && <div role="alert" className="submission-error">{serverError}</div>}
    <button className="btn btn-yellow form-submit" type="submit">Confirm reservation <span aria-hidden="true">↗</span></button><p className="form-footnote">This educational demo stores bookings in your current browser session only. No real restaurant reservation is made.</p>
  </form></div></div></main>;
}
