import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Link to="/" className="brand" onClick={close} aria-label="Little Lemon home"><span className="brand-symbol" aria-hidden="true">✳</span><span>LITTLE <strong>LEMON</strong><small>CHICAGO</small></span></Link>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="site-navigation" aria-label="Main navigation" className={open ? 'navigation open' : 'navigation'}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/menu" onClick={close}>Menu</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <NavLink to="/reservations" onClick={close}>Reservations</NavLink>
        <Link className="nav-book" to="/reservations" onClick={close}>Book a table</Link>
      </nav>
    </div>
  </header>;
}
