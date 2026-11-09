import React, { useState, useEffect } from 'react';
import siteData from '../data/siteData.json';
import homeData from '../data/homeData.json';
import statsData from '../data/statsData.json';
import {
  X,
  QrCode,
  CheckCircle,
  Smartphone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import '../styles/Modal.css';

export default function AppModal({ isOpen, onClose, initialTab = 'passenger' }) {
  const [driverSubmitted, setDriverSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    vehicleNo: '',
    city: ''
  });

  useEffect(() => {
    setDriverSubmitted(false);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDriverMode = initialTab === 'driver';
  const sampleDriver = homeData.interactiveDemo.sampleDriver;
  const driverStatObj = statsData.summary.find((item) => item.id === 'drivers');
  const hasActiveDrivers = statsData.isLaunched && driverStatObj && driverStatObj.number > 0;

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.vehicleNo) return;
    setDriverSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body">
          <h3 className="modal-title">
            {isDriverMode ? 'Register as an OTOX Driver' : 'Scan & Verify Your Ride'}
          </h3>
          <p className="modal-subtitle">
            {isDriverMode
              ? hasActiveDrivers
                ? `Join ${driverStatObj.value} verified auto drivers building greater passenger trust.`
                : 'Register your auto early to receive your OTOX QR sticker and join our verified driver network.'
              : 'Preview how QR-based ride verification works inside the OTOX app.'}
          </p>

          {!isDriverMode ? (
            <div>
              {/* Interactive QR Simulation */}
              <div className="qr-sim-box">
                <div className="qr-sim-header">
                  <span className="qr-sim-status">
                    <CheckCircle size={15} />
                    QR Verification Preview
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#71717A' }}>Sample Trip</span>
                </div>

                <div className="qr-scanner-card">
                  <div className="qr-graphic">
                    <QrCode size={56} color="#000000" />
                  </div>

                  <div className="driver-verified-preview">
                    <span className="driver-preview-name">{sampleDriver.name}</span>
                    <span className="driver-preview-vehicle">{sampleDriver.vehicleNo}</span>
                    <span className="driver-preview-meta">ID: {sampleDriver.id}</span>
                    <span style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600 }}>
                      ✓ {sampleDriver.status}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#52525B', marginBottom: 16 }}>
                Scan the QR code placed inside any participating auto using the OTOX app to connect
                your ride, view verified driver details, and record your journey.
              </p>

              {/* Show App Store buttons only when app is launched; otherwise show single-app pre-launch notice */}
              {siteData.appLinks.isLaunched ? (
                <div className="modal-download-grid">
                  {siteData.appLinks.androidUrl && (
                    <a
                      href={siteData.appLinks.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-store-button"
                    >
                      <Smartphone size={22} color="#FFC107" />
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>GET IT ON</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Google Play</div>
                      </div>
                    </a>
                  )}
                  {siteData.appLinks.iosUrl && (
                    <a
                      href={siteData.appLinks.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-store-button"
                    >
                      <Smartphone size={22} color="#FFFFFF" />
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>DOWNLOAD ON</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>App Store</div>
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    background: '#F8F9FA',
                    border: '1px solid #E4E4E7',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <Smartphone size={20} color="#000000" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.86rem', color: '#27272A', lineHeight: 1.45 }}>
                    <strong>{siteData.appLinks.appName} — Launching Soon</strong>
                    <div style={{ color: '#52525B', marginTop: 2 }}>
                      {siteData.appLinks.launchMessage}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {driverSubmitted ? (
                <div className="reg-success-card">
                  <div className="reg-success-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>
                    Registration Recorded!
                  </h4>
                  <p style={{ color: '#52525B', fontSize: '0.9rem', marginBottom: 16 }}>
                    Thank you, <strong>{formData.fullName}</strong>. Our onboarding team for{' '}
                    <strong>{formData.city}</strong> will reach out at{' '}
                    <strong>{formData.phone}</strong> as onboarding opens in your area.
                  </p>
                  <button
                    onClick={() => {
                      setDriverSubmitted(false);
                      setFormData({ fullName: '', phone: '', vehicleNo: '', city: '' });
                    }}
                    className="btn-outline"
                    style={{ fontSize: '0.88rem' }}
                  >
                    Register Another Vehicle
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDriverSubmit} className="driver-reg-form">
                  <div className="form-group-driver">
                    <label className="form-label-driver">Full Name *</label>
                    <input
                      type="text"
                      className="form-input-driver"
                      placeholder="e.g. Ramesh Kumar"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group-driver">
                    <label className="form-label-driver">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input-driver"
                      placeholder="+91 98765 XXXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group-driver">
                    <label className="form-label-driver">Vehical Registration Number *</label>
                    <input
                      type="text"
                      className="form-input-driver"
                      placeholder="e.g. KA 01 AH 5420"
                      required
                      value={formData.vehicleNo}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicleNo: e.target.value.toUpperCase() })
                      }
                    />
                  </div>

                  <div className="form-group-driver">
                    <label className="form-label-driver">City *</label>
                    <input
                      type="text"
                      className="form-input-driver"
                      placeholder="Enter your city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 8 }}
                  >
                    <span>Submit Verification Request</span>
                    <ArrowRight size={18} />
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: '0.78rem',
                      color: '#71717A',
                      marginTop: 4
                    }}
                  >
                    <ShieldCheck size={14} color="#10B981" />
                    <span>Free registration. No commission taken from meter fares.</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
