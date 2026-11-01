import React, { useState } from 'react';
import driversData from '../data/driversData.json';
import statsData from '../data/statsData.json';
import {
  Award,
  FileText,
  Smile,
  Network,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import '../styles/Drivers.css';

export default function Drivers({ onOpenModal }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleNo: '',
    city: 'Bengaluru'
  });

  const getPillarIcon = (name) => {
    switch (name) {
      case 'Award':
        return <Award size={24} />;
      case 'FileText':
        return <FileText size={24} />;
      case 'Smile':
        return <Smile size={24} />;
      case 'Network':
        return <Network size={24} />;
      default:
        return <ShieldCheck size={24} />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicleNo) return;
    setFormSubmitted(true);
  };

  return (
    <div className="drivers-page-container">
      {/* 1. HERO WITH REGISTRATION CARD */}
      <section className="drivers-hero">
        <div className="otox-container">
          <div className="drivers-hero-grid">
            <div>
              <span className="badge-pill badge-yellow">
                <Sparkles size={13} />
                {driversData.hero.badge}
              </span>

              <h1 className="drivers-headline">{driversData.hero.headline}</h1>

              <p className="drivers-subheadline">{driversData.hero.subheadline}</p>

              <div className="driver-hero-stats-row">
                <div className="driver-stat-pill">
                  <strong>12,450+</strong>
                  <span>Active Verified Drivers</span>
                </div>
                <div className="driver-stat-pill">
                  <strong>0%</strong>
                  <span>Fare Commission Deducted</span>
                </div>
                <div className="driver-stat-pill">
                  <strong>24 Hours</strong>
                  <span>Fast Verification Turnaround</span>
                </div>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="driver-form-card">
              <h3 className="driver-form-card-title">Apply for OTOX Verification Kit</h3>
              <p className="driver-form-card-sub">
                Free onboard. Get your official QR sticker and verified driver ID badge.
              </p>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                  <CheckCircle size={44} color="#10B981" style={{ margin: '0 auto 14px' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                    Application Successfully Sent!
                  </h4>
                  <p style={{ color: '#A1A1AA', fontSize: '0.88rem' }}>
                    Welcome aboard, {formData.name}! Our representative in {formData.city} will call you at {formData.phone} within 24 hours to hand over your weatherproof QR kit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="page-driver-form">
                  <input
                    type="text"
                    className="page-driver-input"
                    placeholder="Driver Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <input
                    type="tel"
                    className="page-driver-input"
                    placeholder="Mobile Phone Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  <input
                    type="text"
                    className="page-driver-input"
                    placeholder="Auto Registration No. (e.g. KA 01 AH 5420) *"
                    required
                    value={formData.vehicleNo}
                    onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value.toUpperCase() })}
                  />

                  <select
                    className="page-driver-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Other">Other City</option>
                  </select>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 6 }}
                  >
                    <span>Request Free OTOX QR Kit</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#71717A' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <span>Zero upfront fees. Free sticker replacement guarantee.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY DRIVERS JOIN (4 PILLARS) */}
      <section className="driver-pillars-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">Driver Benefits</span>
            <h2 className="section-title">{driversData.whyJoin.title}</h2>
            <p className="section-lead">{driversData.whyJoin.subtitle}</p>
          </div>

          <div className="driver-pillars-grid">
            {driversData.whyJoin.pillars.map((item, idx) => (
              <div key={idx} className="driver-pillar-box">
                <div className="driver-pillar-icon">{getPillarIcon(item.icon)}</div>
                <h4 className="driver-pillar-title">{item.title}</h4>
                <p className="driver-pillar-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW TO JOIN 4-STEP TIMELINE */}
      <section className="driver-steps-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">Simple Process</span>
            <h2 className="section-title">{driversData.howToJoin.title}</h2>
            <p className="section-lead">{driversData.howToJoin.subtitle}</p>
          </div>

          <div className="driver-steps-grid">
            {driversData.howToJoin.steps.map((st) => (
              <div key={st.step} className="driver-step-tile">
                <div className="driver-step-badge">{st.step}</div>
                <h4 className="driver-step-title">{st.title}</h4>
                <p className="driver-step-desc">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERKS & GUARANTEES */}
      <section className="driver-perks-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="badge-pill badge-yellow" style={{ marginBottom: 12 }}>
              The OTOX Driver Charter
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Built With Respect for Auto Drivers
            </h2>
            <p style={{ color: '#A1A1AA' }}>
              We believe technology should empower you, not penalize you.
            </p>
          </div>

          <div className="perks-checklist-grid">
            {driversData.driverPerks.map((perk, i) => (
              <div key={i} className="perk-pill-card">
                <CheckCircle size={20} color="#FFC107" style={{ flexShrink: 0 }} />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DRIVER FAQS */}
      <section className="faq-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">Driver FAQs</span>
            <h2 className="section-title">Common Driver Inquiries</h2>
            <p className="section-lead">Clear answers on verification, earnings, and stickers.</p>
          </div>

          <div className="faq-accordion-list">
            {driversData.driverFaq.map((faq, idx) => (
              <div key={idx} className={`faq-item-card ${openFaqIndex === idx ? 'open' : ''}`}>
                <button
                  className="faq-trigger-btn"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaqIndex === idx ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="faq-answer-pane">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
