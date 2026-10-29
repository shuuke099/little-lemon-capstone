import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BookingProvider } from '../context/BookingContext';
import Reservations from '../pages/Reservations';
function renderForm() { return render(<BookingProvider><MemoryRouter><Reservations/></MemoryRouter></BookingProvider>); }
describe('reservation form', () => {
  it('shows required validation on empty submit', () => { renderForm(); fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i })); expect(screen.getByText('Please enter your name.')).toBeInTheDocument(); expect(screen.getByText('Please enter your email address.')).toBeInTheDocument(); });
  it('validates email format', () => { renderForm(); fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } }); fireEvent.blur(screen.getByLabelText(/email address/i)); expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument(); });
  it('includes accessible labels', () => { renderForm(); expect(screen.getByLabelText('Date')).toBeInTheDocument(); expect(screen.getByLabelText('Time')).toBeInTheDocument(); expect(screen.getByLabelText('Number of guests')).toBeInTheDocument(); expect(screen.getByLabelText('Occasion')).toBeInTheDocument(); });
});
