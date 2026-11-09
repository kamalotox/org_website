import React, { useState } from 'react';
import driversData from '../data/driversData.json';
import statsData from '../data/statsData.json';
import {
  Medal,
  FileText,
  ShieldCheck,
  UsersThree,
  CheckCircle,
  ArrowRight,
  CaretDown,
  CaretUp,
  WarningCircle
} from '@phosphor-icons/react';
import { submitWebsiteForm } from '../utils/submitForm';
import '../styles/Drivers.css';

export default function Drivers() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleNo: '',
    city: ''
  });

  const driverStatObj = statsData.summary.find((item) => item.id === 'drivers');
  const showDriverStat = statsData.isLaunched && driverStatObj && driverStatObj.number > 0;

  const getPillarIcon = (name) => {
    switch (name) {
      case 'Award':
        return <Medal size={22} weight="duotone" />;
      case 'FileText':
        return <FileText size={22} weight="duotone" />;
      case 'Smile':
        return <ShieldCheck size={22} weight="duotone" />;
      case 'Network':
        return <UsersThree size={22} weight="duotone" />;
      default:
        return <ShieldCheck size={22} weight="duotone" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedVehicle = formData.vehicleNo.trim().toUpperCase();
    const trimmedCity = formData.city.trim();

    if (!trimmedName || !trimmedPhone || !trimmedVehicle || !trimmedCity) {
      setSubmitError('Please fill in all required fields before submitting.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      await submitWebsiteForm({
        formSource: 'drivers-page',
        pagePath: '/drivers',
        triggerSource: 'For Drivers Page — Verification Kit Form',
        data: {
          name: trimmedName,
          phone: trimmedPhone,
          vehicleNo: trimmedVehicle,
          city: trimmedCity
        }
      });
      setFormSubmitted(true);
    } catch (err) {
      setSubmitError(
        err?.message || 'Unable to submit your application right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="drivers-page-container">
      {/* 1. HERO WITH REGISTRATION CARD */}
      <section className="drivers-hero">
        <div className="otox-container">
          <div className="drivers-hero-grid">
            <div>
              <h1 className="drivers-headline">{driversData.hero.headline}</h1>

              <p className="drivers-subheadline">{driversData.hero.subheadline}</p>

              <div className="driver-hero-stats-row">
                {showDriverStat && (
                  <div className="driver-stat-pill">
                    <strong>{driverStatObj.value}</strong>
                    <span>Verified Drivers</span>
                  </div>
                )}
                <div className="driver-stat-pill">
                  <strong>0%</strong>
                  <span>Fare Commission</span>
                </div>
                <div className="driver-stat-pill">
                  <strong>Single App</strong>
                  <span>Unified for Drivers & Riders</span>
                </div>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="driver-form-card">
              <h3 className="driver-form-card-title">Apply for OTOX Verification Kit</h3>
              <p className="driver-form-card-sub">
                Free onboarding. Register early to receive your official QR sticker and verified Driver ID.
              </p>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                  <CheckCircle size={44} weight="fill" color="#10B981" style={{ margin: '0 auto 14px' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                    Registration Recorded!
                  </h4>
                  <p style={{ color: '#A1A1AA', fontSize: '0.88rem', marginBottom: 16 }}>
                    Thank you, {formData.name}! Our team in {formData.city} will call you at{' '}
                    {formData.phone} when driver onboarding opens in your area.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmitError('');
                      setFormData({ name: '', phone: '', vehicleNo: '', city: '' });
                    }}
                    className="btn-outline-white"
                    style={{ fontSize: '0.86rem' }}
                  >
                    Register Another Vehicle
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="page-driver-form">
                  <input
                    type="text"
                    className="page-driver-input"
                    placeholder="Driver Full Name *"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <input
                    type="tel"
                    className="page-driver-input"
                    placeholder="Mobile Phone Number *"
                    required
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  <input
                    type="text"
                    className="page-driver-input"
                    placeholder="Auto Registration No. (e.g. KA 01 AH 5420) *"
                    required
                    disabled={isSubmitting}
                    value={formData.vehicleNo}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleNo: e.target.value.toUpperCase() })
                    }
                  />

                  <input
                    type="text"
                    className="page-driver-input"
                    placeholder="City *"
                    required
                    disabled={isSubmitting}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />

                  {submitError && (
                    <div className="form-error-alert form-error-alert--dark" role="alert">
                      <WarningCircle size={18} weight="bold" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 6 }}
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? 'Submitting Application...' : 'Submit Driver Application'}
                    </span>
                    <ArrowRight size={18} weight="bold" />
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.78rem',
                      color: '#71717A'
                    }}
                  >
                    <ShieldCheck size={15} weight="fill" color="#10B981" style={{ flexShrink: 0 }} />
                    <span>Zero upfront fees. Keep 100% of your fare.</span>
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
            <h2 className="section-title">{driversData.whyJoin.title}</h2>
            <p className="section-lead">{driversData.whyJoin.subtitle}</p>
          </div>

          <div className="driver-pillars-grid">
            {driversData.whyJoin.pillars.map((item, idx) => (
              <div key={idx} className="driver-pillar-box">
                <div className="driver-pillar-header">
                  <div className="driver-pillar-icon" aria-hidden="true">{getPillarIcon(item.icon)}</div>
                  <h4 className="driver-pillar-title">{item.title}</h4>
                </div>
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
            <h2 className="section-title">{driversData.howToJoin.title}</h2>
            <p className="section-lead">{driversData.howToJoin.subtitle}</p>
          </div>

          <div className="driver-steps-grid">
            {driversData.howToJoin.steps.map((st) => (
              <div key={st.step} className="driver-step-tile">
                <div className="driver-step-header">
                  <div className="driver-step-badge">{st.step}</div>
                  <h4 className="driver-step-title">{st.title}</h4>
                </div>
                <p className="driver-step-desc">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DRIVER FAQS */}
      <section className="faq-section">
        <div className="otox-container">
          <div className="section-header-center">
            <h2 className="section-title">Common Driver Inquiries</h2>
            <p className="section-lead">Clear answers on verification, fares, and QR kits.</p>
          </div>

          <div className="faq-accordion-list">
            {driversData.driverFaq.map((faq, idx) => (
              <div key={idx} className={`faq-item-card ${openFaqIndex === idx ? 'open' : ''}`}>
                <button
                  className="faq-trigger-btn"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <CaretUp size={18} weight="bold" style={{ flexShrink: 0 }} />
                  ) : (
                    <CaretDown size={18} weight="bold" style={{ flexShrink: 0 }} />
                  )}
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
