import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import {
  Envelope,
  Phone,
  Clock,
  MapPin,
  DeviceMobile,
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  ArrowRight
} from '@phosphor-icons/react';
import '../styles/Footer.css';

export default function Footer({ onOpenModal }) {
  const getSocialIcon = (id) => {
    switch (id) {
      case 'twitter':
        return <XLogo size={18} weight="fill" />;
      case 'instagram':
        return <InstagramLogo size={18} weight="fill" />;
      case 'linkedin':
        return <LinkedinLogo size={18} weight="fill" />;
      default:
        return <ArrowRight size={16} weight="bold" />;
    }
  };

  return (
    <footer className="otox-footer">
      <div className="otox-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo" aria-label="OTOX Home">
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
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              {siteData.navigation.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links-list">
              {siteData.legalNavigation.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-col-title">Contact & Helpdesk</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Envelope size={16} weight="duotone" className="contact-icon-wrapper" />
                <div className="contact-detail-text">
                  <a href={`mailto:${siteData.contact.generalEmail}`}>
                    {siteData.contact.generalEmail}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Phone size={16} weight="duotone" className="contact-icon-wrapper" />
                <div className="contact-detail-text">
                  <a href={`tel:${siteData.contact.phone}`}>
                    {siteData.contact.displayPhone}
                  </a>
                  <div>
                    <span className="contact-hours-badge">
                      <Clock size={12} weight="bold" style={{ flexShrink: 0 }} />
                      <span>{siteData.contact.officeHours}</span>
                    </span>
                  </div>
                </div>
              </div>

              {siteData.contact.headquarters.isEstablished && siteData.contact.headquarters.address && (
                <div className="footer-contact-row">
                  <MapPin size={16} weight="duotone" className="contact-icon-wrapper" />
                  <div className="contact-detail-text">
                    <span>
                      {siteData.contact.headquarters.address},{' '}
                      {siteData.contact.headquarters.stateCountry}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Single App Download Card (rendered once launched) */}
            {siteData.appLinks.isLaunched && (
              <div className="footer-app-badges">
                <a
                  href={siteData.appLinks.androidUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-badge-btn"
                  onClick={(e) => {
                    if (!siteData.appLinks.androidUrl) {
                      e.preventDefault();
                      onOpenModal && onOpenModal('passenger');
                    }
                  }}
                >
                  <DeviceMobile size={20} weight="duotone" color="#FFC107" />
                  <div>
                    <span className="app-badge-sub">For Passengers & Drivers</span>
                    <span className="app-badge-name">Download {siteData.appLinks.appName}</span>
                  </div>
                </a>
              </div>
            )}
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
        </div>
      </div>
    </footer>
  );
}
