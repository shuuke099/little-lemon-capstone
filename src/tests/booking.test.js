import { describe, it, expect } from 'vitest';
import { getAvailableTimes, todayLocal, validateReservation } from '../utils/booking';
const tomorrow = () => { const date = new Date(); date.setDate(date.getDate() + 1); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; };
const valid = () => ({ name: 'Alex Lee', email: 'alex@example.com', date: tomorrow(), time: '18:00', guests: '2', occasion: 'Birthday' });
describe('reservation validation', () => {
  it('accepts a valid booking', () => expect(validateReservation(valid())).toEqual({}));
  it('rejects missing fields', () => { const errors = validateReservation({ name: '', email: '', date: '', time: '', guests: '0', occasion: '' }); expect(errors.name).toBeTruthy(); expect(errors.email).toBeTruthy(); expect(errors.date).toBeTruthy(); expect(errors.time).toBeTruthy(); });
  it('rejects invalid emails and oversized parties', () => { const errors = validateReservation({ ...valid(), email: 'wrong', guests: '11' }); expect(errors.email).toMatch(/valid email/); expect(errors.guests).toBeTruthy(); });
  it('rejects unavailable times', () => { const values = valid(); expect(validateReservation(values, ['19:00']).time).toBeTruthy(); });
  it('does not offer an already-booked time', () => { const date = tomorrow(); expect(getAvailableTimes(date, [{ date, time: '18:00' }])).not.toContain('18:00'); });
  it('returns times for a future date', () => expect(getAvailableTimes(tomorrow()).length).toBeGreaterThan(0));
  it('rejects past dates', () => { const errors = validateReservation({ ...valid(), date: '2020-01-01' }); expect(errors.date).toBeTruthy(); });
  it('returns a local today date', () => expect(todayLocal()).toMatch(/^\d{4}-\d{2}-\d{2}$/));
});
