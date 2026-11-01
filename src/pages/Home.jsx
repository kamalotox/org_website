import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeData from '../data/homeData.json';
import statsData from '../data/statsData.json';
import siteData from '../data/siteData.json';
import {
  QrCode,
  ShieldCheck,
  Compass,
  MapPin,
  UserCheck,
  History,
  ShieldAlert,
  Zap,
  Headphones,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Award,
  Smartphone,
  Star,
  Users
} from 'lucide-react';
import '../styles/Home.css';

export default function Home({ onOpenModal }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [simulatedScanned, setSimulatedScanned] = useState(false);

  // Map icon strings to Lucide components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode size={26} />;
      case 'ShieldCheck':
        return <ShieldCheck size={26} />;
      case 'Compass':
        return <Compass size={26} />;
      case 'MapPin':
        return <MapPin size={24} />;
      case 'UserCheck':
        return <UserCheck size={24} />;
      case 'History':
        return <History size={24} />;
      case 'ShieldAlert':
        return <ShieldAlert size={24} />;
      case 'Zap':
        return <Zap size={24} />;
      case 'Headphones':
        return <Headphones size={24} />;
      default:
        return <ShieldCheck size={24} />;
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="otox-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge-container">
                <span className="badge-pill badge-yellow">
                  <Sparkles size={13} />
                  {homeData.hero.badge}
                </span>
                <span className="badge-pill badge-green">
                  <ShieldCheck size={13} />
                  QR 2.0 Security
                </span>
              </div>

              <h1 className="hero-headline">
                Safe rides. <span className="highlight-yellow">Verified drivers.</span> Smarter local travel.
              </h1>

              <p className="hero-subheadline">
                {homeData.hero.subheadline}
              </p>

              <div className="hero-cta-group">
                <button
                  onClick={() => onOpenModal && onOpenModal('passenger')}
                  className="btn-primary"
                >
                  <QrCode size={18} />
                  <span>{homeData.hero.primaryCta}</span>
                </button>

                <Link to="/drivers" className="btn-secondary">
                  <UserCheck size={18} />
                  <span>{homeData.hero.secondaryCta}</span>
                </Link>
              </div>

              <div className="hero-trust-bar">
                <div className="trust-avatar-group">
                  <div className="trust-avatar">⭐</div>
                  <div className="trust-avatar">✓</div>
                  <div className="trust-avatar">⚡</div>
                </div>
                <span>
                  <strong>4.9/5 Rating</strong> • {homeData.hero.statsHighlight}
                </span>
              </div>
            </div>

            {/* Right Visual Card (Uber Dark Mode + Rapido Taxi Glow) */}
            <div className="hero-visual-card">
              <div className="hero-card-glow"></div>

              <div className="hero-card-header">
                <div className="hero-card-brand">
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFC107' }}>
                    OTOX VERIFY
                  </span>
                  <span className="hero-auto-pill">Auto Fleet #8921</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#10B981' }}>
                  <span className="beacon-dot"></span>
                  Active Handshake
                </div>
              </div>

              <div className="hero-ride-mockup">
                <div className="mockup-driver-row">
                  <div className="driver-avatar-circle">
                    RK
                  </div>
                  <div className="driver-info-meta">
                    <div className="driver-name-title">
                      {homeData.interactiveDemo.sampleDriver.name}
                      <ShieldCheck size={18} className="verified-icon-check" />
                    </div>
                    <div className="driver-vehicle-tag">
                      {homeData.interactiveDemo.sampleDriver.vehicleNo}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#A1A1AA', marginTop: 2 }}>
                      Badge: {homeData.interactiveDemo.sampleDriver.id} • ⭐ {homeData.interactiveDemo.sampleDriver.rating} ({homeData.interactiveDemo.sampleDriver.ridesCompleted} rides)
                    </div>
                  </div>
                </div>

                <div className="ride-status-tracker">
                  <div className="status-step-row">
                    <span style={{ color: '#D4D4D8' }}>Passenger Verification:</span>
                    <span className="status-badge-active">
                      {simulatedScanned ? '✓ Linked & Tracked' : 'Ready to Scan'}
                    </span>
                  </div>
                  <div className="status-step-row">
                    <span style={{ color: '#71717A' }}>Government ID / RC:</span>
                    <span style={{ color: '#E4E4E7', fontWeight: 600 }}>100% Verified</span>
                  </div>
                  <div className="status-step-row">
                    <span style={{ color: '#71717A' }}>Handshake Speed:</span>
                    <span style={{ color: '#FFC107', fontWeight: 600 }}>{statsData.quickMetrics.verificationSpeed}</span>
                  </div>
                </div>
              </div>

              <button
                className="hero-interactive-demo-btn"
                onClick={() => setSimulatedScanned(!simulatedScanned)}
              >
                <QrCode size={18} />
                <span>
                  {simulatedScanned ? 'Reset Ride Simulation' : 'Tap to Simulate QR Ride Scan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC LIVE STATS COUNTER SECTION (Data from JSON / ready for real DB) */}
      <section className="stats-section">
        <div className="otox-container">
          <div className="stats-grid">
            {statsData.summary.map((stat) => (
              <div key={stat.id} className="stat-card">
                <span className="stat-badge">{stat.badge}</span>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sublabel">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY WE BUILT THIS SECTION */}
      <section className="why-section">
        <div className="otox-container">
          <div className="why-grid">
            <div>
              <span className="section-tag">{homeData.whyWeBuiltThis.tag}</span>
              <h2 className="section-title">{homeData.whyWeBuiltThis.title}</h2>
              <p className="section-lead">{homeData.whyWeBuiltThis.headline}</p>
              <p className="section-text">{homeData.whyWeBuiltThis.paragraph1}</p>
              <p className="section-text">
                <strong>{homeData.whyWeBuiltThis.paragraph2}</strong> {homeData.whyWeBuiltThis.paragraph3}
              </p>

              <div className="why-takeaways-list">
                {homeData.whyWeBuiltThis.keyTakeaways.map((item, idx) => (
                  <div key={idx} className="takeaway-item">
                    <div>
                      <h4 className="takeaway-title">{item.title}</h4>
                      <p className="takeaway-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Panel */}
            <div className="why-visual-panel">
              <span className="why-panel-badge">
                <Award size={16} />
                Reinventing Street Hailing
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>
                Street Hailing + Digital Accountability
              </h3>
              <p style={{ color: '#A1A1AA', lineHeight: 1.6, fontSize: '0.98rem' }}>
                You don't need to change where you catch an auto. You don't need to wait 15 minutes for a cab driver to accept your ride. Just hail any passing auto, scan the QR code on the partition screen, and your journey is instantly recorded, mapped, and protected.
              </p>

              <div className="why-metric-showcase">
                <div className="why-metric-box">
                  <div className="why-metric-val">{statsData.quickMetrics.verificationSpeed}</div>
                  <div className="why-metric-title">Average QR handshake</div>
                </div>
                <div className="why-metric-box">
                  <div className="why-metric-val">{statsData.quickMetrics.safetyRating}</div>
                  <div className="why-metric-title">Passenger safety score</div>
                </div>
                <div className="why-metric-box">
                  <div className="why-metric-val">{statsData.quickMetrics.verifiedVehicleCoverage}</div>
                  <div className="why-metric-title">Verified vehicle match</div>
                </div>
                <div className="why-metric-box">
                  <div className="why-metric-val">{statsData.quickMetrics.supportResponse}</div>
                  <div className="why-metric-title">Emergency helpdesk response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="how-section" id="how-it-works">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">{homeData.howItWorks.tag}</span>
            <h2 className="section-title">{homeData.howItWorks.title}</h2>
            <p className="section-lead">{homeData.howItWorks.subtitle}</p>
          </div>

          <div className="steps-cards-grid">
            {homeData.howItWorks.steps.map((st) => (
              <div key={st.step} className="step-card">
                <div className="step-header-row">
                  <div className="step-number-pill">{st.step}</div>
                  <div className="step-icon-box">{getIcon(st.icon)}</div>
                </div>

                <h3 className="step-card-title">{st.title}</h3>
                <p className="step-card-desc">{st.description}</p>

                <div className="step-card-detail">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>{st.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLATFORM FEATURES GRID */}
      <section className="features-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">{homeData.features.tag}</span>
            <h2 className="section-title">{homeData.features.title}</h2>
            <p className="section-lead">{homeData.features.subtitle}</p>
          </div>

          <div className="features-grid">
            {homeData.features.items.map((feat) => (
              <div key={feat.id} className="feature-box">
                <div className="feature-icon-wrapper">
                  {getIcon(feat.icon)}
                </div>
                <h4 className="feature-item-title">{feat.title}</h4>
                <p className="feature-item-desc">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DESIGNED FOR EVERYONE: PASSENGERS & DRIVERS */}
      <section className="dual-ecosystem-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="badge-pill badge-yellow" style={{ marginBottom: 12 }}>
              {homeData.forBothSides.tag}
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              {homeData.forBothSides.title}
            </h2>
            <p style={{ color: '#A1A1AA', fontSize: '1.1rem' }}>
              {homeData.forBothSides.subtitle}
            </p>
          </div>

          <div className="dual-grid">
            {/* For Passengers */}
            <div className="ecosystem-panel">
              <div className="ecosystem-badge-row">
                <span className="badge-pill badge-green">
                  {homeData.forBothSides.passengers.badge}
                </span>
              </div>
              <h3 className="ecosystem-title">{homeData.forBothSides.passengers.headline}</h3>
              <p className="ecosystem-desc">{homeData.forBothSides.passengers.description}</p>

              <ul className="ecosystem-checklist">
                {homeData.forBothSides.passengers.benefits.map((benefit, i) => (
                  <li key={i} className="ecosystem-check-item">
                    <CheckCircle2 size={18} className="check-pill-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenModal && onOpenModal('passenger')}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>{homeData.forBothSides.passengers.cta}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* For Drivers */}
            <div className="ecosystem-panel driver-theme">
              <div className="ecosystem-badge-row">
                <span className="badge-pill badge-yellow">
                  {homeData.forBothSides.drivers.badge}
                </span>
              </div>
              <h3 className="ecosystem-title">{homeData.forBothSides.drivers.headline}</h3>
              <p className="ecosystem-desc">{homeData.forBothSides.drivers.description}</p>

              <ul className="ecosystem-checklist">
                {homeData.forBothSides.drivers.benefits.map((benefit, i) => (
                  <li key={i} className="ecosystem-check-item">
                    <CheckCircle2 size={18} className="check-pill-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/drivers"
                className="btn-outline-white"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{homeData.forBothSides.drivers.cta}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="faq-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">{homeData.faq.tag}</span>
            <h2 className="section-title">{homeData.faq.title}</h2>
            <p className="section-lead">{homeData.faq.subtitle}</p>
          </div>

          <div className="faq-accordion-list">
            {homeData.faq.items.map((item, index) => (
              <div
                key={index}
                className={`faq-item-card ${openFaqIndex === index ? 'open' : ''}`}
              >
                <button
                  className="faq-trigger-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaqIndex === index ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {openFaqIndex === index && (
                  <div className="faq-answer-pane">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLOSING SECTION */}
      <section className="closing-banner-section">
        <div className="otox-container">
          <div className="closing-inner-box">
            <span className="badge-pill badge-yellow">
              OTOX Movement
            </span>
            <h2 className="closing-title">{homeData.closing.headline}</h2>
            <p className="closing-sub">
              {homeData.closing.tagline} {homeData.closing.subheadline}
            </p>

            <div className="closing-buttons">
              <button
                onClick={() => onOpenModal && onOpenModal('passenger')}
                className="btn-primary"
              >
                <QrCode size={18} />
                <span>{homeData.closing.primaryCta}</span>
              </button>

              <Link to="/drivers" className="btn-outline-white">
                <UserCheck size={18} />
                <span>{homeData.closing.secondaryCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
