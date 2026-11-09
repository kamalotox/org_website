import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { Menu, X, QrCode, UserCheck } from 'lucide-react';
import '../styles/Header.css';

export default function Header({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer upon navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`otox-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="otox-container header-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-link" aria-label="OTOX Home">
          <span className="brand-name">
            OT<span>O</span>X
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links-desktop">
            {siteData.navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions-desktop">
          <button
            onClick={() => onOpenModal && onOpenModal('passenger')}
            className="btn-outline"
            style={{ padding: '9px 18px', fontSize: '0.9rem' }}
          >
            <QrCode size={16} />
            <span>Scan QR Demo</span>
          </button>

          <button
            onClick={() => onOpenModal && onOpenModal('driver')}
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: '0.9rem' }}
          >
            <UserCheck size={16} />
            <span>Become a Driver</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-list">
            {siteData.navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/privacy-policy"
                className={`mobile-nav-link ${location.pathname === '/privacy-policy' ? 'active' : ''}`}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className={`mobile-nav-link ${location.pathname === '/terms-and-conditions' ? 'active' : ''}`}
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>

          <div className="mobile-actions">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal && onOpenModal('passenger');
              }}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <QrCode size={18} />
              <span>Get Started / Scan Demo</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal && onOpenModal('driver');
              }}
              className="btn-secondary"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <UserCheck size={18} />
              <span>Become a Verified Driver</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
