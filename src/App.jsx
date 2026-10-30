import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollProgressBar from './components/common/ScrollProgressBar';
import BackToTopButton from './components/common/BackToTopButton';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';

// 4 Main Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite text-navy font-body selection:bg-steel selection:text-white">
      {/* Scroll restore on route change */}
      <ScrollToTop />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Main Persistent Navbar */}
      <Navbar />

      {/* Main Page Routing */}
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services-and-products" element={<Navigate to="/products" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Bottom Floating Interactive Utilities */}
      <WhatsAppFloatingButton />
      <BackToTopButton />

      {/* Persistent Professional Footer */}
      <Footer />
    </div>
  );
}
