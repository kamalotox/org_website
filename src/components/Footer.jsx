import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import '../styles/Footer.css';

// Crisp SVG Brand Icons
const BrandIcons = {
  twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
    </svg>
  ),
  whatsapp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r=".5" fill="currentColor"/>
    </svg>
  )
};

export default function Footer({ onOpenModal }) {
  const getSocialIcon = (id) => {
    const IconComp = BrandIcons[id];
    if (IconComp) return <IconComp />;
    return <ExternalLink size={18} />;
  };

  return (
    <footer className="otox-footer">
      <div className="otox-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="footer-logo-box">O</div>
              <span className="footer-brand-title">
                OT<span>O</span>X
              </span>
            </Link>

            <p className="footer-tagline">
              {siteData.brand.tagline}
            </p>

            <p className="footer-desc">
              {siteData.brand.subheadline}
            </p>

            <div className="footer-socials-wrapper">
              <div className="footer-social-label">Follow & Connect</div>
              <div className="footer-social-icons">
                {siteData.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-pill"
                    title={`${social.name} (${social.handle})`}
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              {siteData.navigation.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
              <li className="footer-link-item">
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal && onOpenModal('passenger');
                  }}
                >
                  Scan QR Verification
                </a>
              </li>
              <li className="footer-link-item">
                <Link to="/drivers">Driver Portal & KYC</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div>
            <h4 className="footer-col-title">Legal & Trust</h4>
            <ul className="footer-links-list">
              {siteData.legalNavigation.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
              <li className="footer-link-item">
                <Link to="/contact">Safety Escalations</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about">Driver Verification Standards</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact">Grievance Officer</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-col-title">Contact & Helpdesk</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Mail size={16} className="contact-icon-wrapper" />
                <div className="contact-detail-text">
                  <a href={`mailto:${siteData.contact.generalEmail}`}>
                    {siteData.contact.generalEmail}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Phone size={16} className="contact-icon-wrapper" />
                <div className="contact-detail-text">
                  <a href={`tel:${siteData.contact.phone}`}>
                    {siteData.contact.displayPhone}
                  </a>
                  <div>
                    <span className="contact-hours-badge">
                      <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                      {siteData.contact.officeHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="footer-contact-row">
                <MapPin size={16} className="contact-icon-wrapper" />
                <div className="contact-detail-text">
                  <span>
                    {siteData.contact.headquarters.address},{' '}
                    {siteData.contact.headquarters.cityState}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile App Download Quick Links */}
            <div className="footer-app-badges">
              <a
                href={siteData.appLinks.playStorePassenger}
                target="_blank"
                rel="noopener noreferrer"
                className="app-badge-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenModal && onOpenModal('passenger');
                }}
              >
                <Smartphone size={20} color="#FFC107" />
                <div>
                  <span className="app-badge-sub">Download App for</span>
                  <span className="app-badge-name">Passengers</span>
                </div>
              </a>
              <Link to="/drivers" className="app-badge-btn">
                <ShieldCheck size={20} color="#10B981" />
                <div>
                  <span className="app-badge-sub">Onboard & Partner</span>
                  <span className="app-badge-name">OTOX for Auto Drivers</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div>{siteData.brand.copyright}</div>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact">Support</Link>
          </div>

          <div className="footer-uber-vibe-tag">
            <span>Powered by QR Handshake Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
