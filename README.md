# Little Lemon — React Front-End Capstone

A responsive, accessible Mediterranean restaurant demo built with React, React Router, and Vite for the front-end capstone exercise.

## Features

- Responsive homepage, menu, story page and reservation flow
- Accessible navigation, alt text, labeled inputs, error messages, skip link and keyboard focus styling
- Controlled booking form with client-side validation
- Date-specific evening time slots, restricted to future times
- Reservation confirmation with reference number
- Session-based demo booking storage and duplicate slot prevention
- Unit and UI tests using Vitest and React Testing Library
- Components organized by responsibility

## Setup and run

Requires Node.js 20+ and npm.

```bash
npm install
npm start
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Build and test

```bash
npm test
npm run build
```

## Project structure

- `src/components/` — header, footer, special cards
- `src/pages/` — home, menu, about, reservations, confirmation
- `src/context/` — demo booking state/session storage
- `src/utils/booking.js` — availability and validation logic
- `src/data/` — sample menu data
- `src/tests/` — validation and form tests
- `src/styles.css` — responsive styles

## Important scope and limitations

This project is an educational **front-end demonstration**, not a real restaurant system. Booking confirmation is local only and **does not reserve a real table**, send an email, or communicate with a production server. Bookings are retained in `sessionStorage` for the browser tab, and do not synchronize across different users or devices. Slot exclusion is a simple demo rule, not actual table capacity management. Production would require a secured booking API, authoritative capacity logic, server-side validation, notifications, and secure persistence. Example menu photos are served from Unsplash and need internet access.

## How to submit on Coursera

1. Run the project and verify form behavior and tests.
2. Create your own public GitHub repository named `little-lemon-capstone`.
3. From this project directory:

```bash
git init
git add .
git commit -m "Build Little Lemon React capstone"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/little-lemon-capstone.git
git push -u origin main
```

4. Paste your actual GitHub repository URL in the Coursera submission form.
5. Complete the required peer reviews.

`node_modules` and `dist` are excluded from version control via `.gitignore`.

## Suggested manual review checklist

- Open and close mobile navigation using a keyboard
- Inspect desktop and mobile layouts
- Submit a completely empty form and inspect validation messages
- Enter an invalid email, past date, and unavailable time
- Submit a valid booking and verify the confirmation page
- Return to booking form and verify the same date/time is excluded
- Run `npm test` and `npm run build`

## License

Educational sample project. Customize it and ensure that your submitted work complies with your course's academic integrity rules.
# little-lemon-capstone
