import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppModal from './components/AppModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Drivers from './pages/Drivers';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Global Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    tab: 'passenger',
    trigger: ''
  });

  const handleOpenModal = (tab = 'passenger', trigger = '') => {
    setModalState({
      isOpen: true,
      tab: tab,
      trigger: trigger
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      tab: 'passenger',
      trigger: ''
    });
  };

  return (
    <div className="otox-app-root">
      <ScrollToTop />

      {/* Shared Header across all pages */}
      <Header onOpenModal={handleOpenModal} />

      {/* Page Routes */}
      <main className="otox-main-content">
        <Routes>
          <Route path="/" element={<Home onOpenModal={handleOpenModal} />} />
          <Route path="/about" element={<About onOpenModal={handleOpenModal} />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Home onOpenModal={handleOpenModal} />} />
        </Routes>
      </main>

      {/* Shared Footer across all pages */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Shared QR Verification & Driver Modal */}
      <AppModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialTab={modalState.tab}
        triggerSource={modalState.trigger}
      />
    </div>
  );
}
