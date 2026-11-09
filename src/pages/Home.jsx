import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeData from '../data/homeData.json';
import statsData from '../data/statsData.json';
import {
  QrCode,
  ShieldCheck,
  Compass,
  MapPin,
  UserCheck,
  History,
  ShieldAlert,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import '../styles/Home.css';

export default function Home({ onOpenModal }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [simulatedScanned, setSimulatedScanned] = useState(false);

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
      default:
        return <ShieldCheck size={24} />;
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const sampleDriver = homeData.interactiveDemo.sampleDriver;
  const activeStats = statsData.summary.filter((stat) => stat.number > 0);
  const showStatsSection = statsData.isLaunched && activeStats.length > 0;

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="otox-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
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

                <button
                  onClick={() => onOpenModal && onOpenModal('driver')}
                  className="btn-secondary"
                >
                  <UserCheck size={18} />
                  <span>{homeData.hero.secondaryCta}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Card (QR Preview) */}
            <div className="hero-visual-card">
              <div className="hero-card-header">
                <span className="hero-card-title">Ride Verification</span>
                <span className={`hero-card-status ${simulatedScanned ? 'verified' : ''}`}>
                  {simulatedScanned ? '✓ Verified Session' : 'Sample Preview'}
                </span>
              </div>

              <div className="hero-qr-identity-row">
                <div className="hero-qr-tile" aria-hidden="true">
                  <QrCode size={48} color="#000000" />
                </div>

                <div className="driver-info-meta">
                  <div className="driver-name-title">
                    <span>{sampleDriver.name}</span>
                    <ShieldCheck size={17} className="verified-icon-check" />
                  </div>
                  <div className="driver-plate-badge">{sampleDriver.vehicleNo}</div>
                  <div className="driver-id-meta">ID: {sampleDriver.id}</div>
                </div>
              </div>

              <div className="ride-spec-list">
                <div className="ride-spec-row">
                  <span className="ride-spec-label">Driver & Vehicle</span>
                  <span className="ride-spec-value">{sampleDriver.status}</span>
                </div>
                <div className="ride-spec-row">
                  <span className="ride-spec-label">Session Status</span>
                  <span className={`ride-spec-value ${simulatedScanned ? 'text-emerald' : ''}`}>
                    {simulatedScanned ? 'Linked & Tracked' : 'Scan QR inside auto'}
                  </span>
                </div>
                <div className="ride-spec-row">
                  <span className="ride-spec-label">Commute Record</span>
                  <span className={`ride-spec-value ${simulatedScanned ? 'text-gold' : ''}`}>
                    {simulatedScanned ? 'Saved to Ride History' : 'Available after scan'}
                  </span>
                </div>
              </div>

              <button
                className={`hero-interactive-demo-btn ${simulatedScanned ? 'reset-mode' : ''}`}
                onClick={() => setSimulatedScanned(!simulatedScanned)}
              >
                <QrCode size={18} />
                <span>{simulatedScanned ? 'Reset Preview' : 'Simulate QR Ride Scan'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATS SECTION (Only rendered once app is launched & real counts > 0) */}
      {showStatsSection && (
        <section className="stats-section">
          <div className="otox-container">
            <div className="stats-grid">
              {activeStats.map((stat) => (
                <div key={stat.id} className="stat-card">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-sublabel">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. WHY WE BUILT THIS SECTION */}
      <section className="why-section">
        <div className="otox-container">
          <div className="why-grid">
            <div>
              <h2 className="section-title">{homeData.whyWeBuiltThis.title}</h2>
              <p className="section-lead">{homeData.whyWeBuiltThis.headline}</p>
              <p className="section-text">{homeData.whyWeBuiltThis.paragraph1}</p>
              <p className="section-text">
                <strong>{homeData.whyWeBuiltThis.paragraph2}</strong>{' '}
                {homeData.whyWeBuiltThis.paragraph3}
              </p>
            </div>

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
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="how-section" id="how-it-works">
        <div className="otox-container">
          <div className="section-header-center">
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
            <h2 className="section-title">{homeData.features.title}</h2>
            <p className="section-lead">{homeData.features.subtitle}</p>
          </div>

          <div className="features-grid">
            {homeData.features.items.map((feat) => (
              <div key={feat.id} className="feature-box">
                <div className="feature-icon-wrapper">{getIcon(feat.icon)}</div>
                <h4 className="feature-item-title">{feat.title}</h4>
                <p className="feature-item-desc">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT SETS US APART */}
      <section className="difference-section">
        <div className="otox-container">
          <div className="section-header-center">
            <h2 className="section-title">{homeData.whatSetsUsApart.title}</h2>
            <p className="section-lead">{homeData.whatSetsUsApart.subtitle}</p>
          </div>

          <div className="difference-grid">
            {homeData.whatSetsUsApart.columns.map((col, idx) => (
              <div
                key={col.id}
                className={`difference-card ${idx === 1 ? 'highlight-card' : ''}`}
              >
                <h3 className="difference-title">{col.title}</h3>
                <p className="difference-desc">{col.description}</p>
                <ul className="difference-list">
                  {col.points.map((point, pIdx) => (
                    <li key={pIdx} className="difference-list-item">
                      <CheckCircle2
                        size={18}
                        color={idx === 1 ? '#10B981' : '#52525B'}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DESIGNED FOR EVERYONE: PASSENGERS & DRIVERS */}
      <section className="dual-ecosystem-section">
        <div className="otox-container">
          <div className="section-header-center">
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
              <h3 className="ecosystem-title">{homeData.forBothSides.passengers.badge}</h3>
              <p className="ecosystem-lead">{homeData.forBothSides.passengers.headline}</p>
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
              <h3 className="ecosystem-title">{homeData.forBothSides.drivers.badge}</h3>
              <p className="ecosystem-lead">{homeData.forBothSides.drivers.headline}</p>
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
                  {openFaqIndex === index ? (
                    <ChevronUp size={20} style={{ flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={20} style={{ flexShrink: 0 }} />
                  )}
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

              <button
                onClick={() => onOpenModal && onOpenModal('driver')}
                className="btn-secondary"
              >
                <UserCheck size={18} />
                <span>{homeData.closing.secondaryCta}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
