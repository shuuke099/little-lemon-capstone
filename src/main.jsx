import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reservations from './pages/Reservations';
import Confirmed from './pages/Confirmed';
import './styles.css';
function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }
function App() { return <BookingProvider><BrowserRouter><ScrollToTop/><a href="#main" className="skip-link">Skip to content</a><Header/><div id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/menu" element={<Menu/>}/><Route path="/about" element={<About/>}/><Route path="/reservations" element={<Reservations/>}/><Route path="/confirmed" element={<Confirmed/>}/><Route path="*" element={<main className="section inner-page container"><h1>Page not found</h1><a href="/">Go home</a></main>}/></Routes></div><Footer/></BrowserRouter></BookingProvider>; }
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
