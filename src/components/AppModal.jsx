import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import {
  X,
  QrCode,
  CheckCircle,
  Smartphone,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import '../styles/Modal.css';

export default function AppModal({ isOpen, onClose, initialTab = 'passenger' }) {
  const [tab, setTab] = useState(initialTab);
  const [driverSubmitted, setDriverSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    vehicleNo: '',
    city: 'Bengaluru'
  });

  if (!isOpen) return null;

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
          <div className="modal-badge-wrapper">
            <span className="badge-pill badge-yellow">
              <Sparkles size={12} />
              OTOX Connected Mobility
            </span>
          </div>

          <h3 className="modal-title">
            {tab === 'passenger' ? 'Scan & Verify Your Ride' : 'Register as an OTOX Driver'}
          </h3>
          <p className="modal-subtitle">
            {tab === 'passenger'
              ? 'Experience the simplicity of QR verification or download the commuter app for ride history.'
              : 'Join over 12,450+ verified auto drivers earning greater passenger trust and digital credibility.'}
          </p>

          {/* Tab Selector */}
          <div className="modal-tabs">
            <button
              className={`modal-tab-btn ${tab === 'passenger' ? 'active' : ''}`}
              onClick={() => {
                setTab('passenger');
                setDriverSubmitted(false);
              }}
            >
              Passenger App & Demo
            </button>
            <button
              className={`modal-tab-btn ${tab === 'driver' ? 'active' : ''}`}
              onClick={() => setTab('driver')}
            >
              Driver Registration
            </button>
          </div>

          {tab === 'passenger' ? (
            <div>
              {/* Interactive QR Simulation */}
              <div className="qr-sim-box">
                <div className="qr-sim-header">
                  <span className="qr-sim-status">
                    <CheckCircle size={15} />
                    Live Ride Handshake Simulated
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#71717A' }}>3-Second Scan</span>
                </div>

                <div className="qr-scanner-card">
                  <div className="qr-graphic">
                    <QrCode size={56} color="#000000" />
                    <div className="qr-scan-line"></div>
                  </div>

                  <div className="driver-verified-preview">
                    <span className="driver-preview-name">Ramesh Kumar (Verified)</span>
                    <span className="driver-preview-vehicle">KA 01 AH 5420</span>
                    <span className="driver-preview-meta">Badge ID: OTX-BLR-8921 • ⭐ 4.94</span>
                    <span style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600 }}>
                      ✓ KYC & RC Background Approved
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#52525B', marginBottom: 16 }}>
                Scan the QR code placed inside any participating auto rickshaw using your smartphone
                camera or download our lightweight app to save receipts.
              </p>

              {/* App download buttons */}
              <div className="modal-download-grid">
                <a
                  href={siteData.appLinks.playStorePassenger}
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
                <a
                  href={siteData.appLinks.appStorePassenger}
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
              </div>
            </div>
          ) : (
            <div>
              {driverSubmitted ? (
                <div className="reg-success-card">
                  <div className="reg-success-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>
                    Application Received!
                  </h4>
                  <p style={{ color: '#52525B', fontSize: '0.9rem', marginBottom: 16 }}>
                    Thank you, <strong>{formData.fullName}</strong>. Our city verification team for{' '}
                    <strong>{formData.city}</strong> will call you at{' '}
                    <strong>{formData.phone}</strong> within 24 hours to issue your free OTOX QR kit.
                  </p>
                  <button
                    onClick={() => {
                      setDriverSubmitted(false);
                      setFormData({ fullName: '', phone: '', vehicleNo: '', city: 'Bengaluru' });
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
                    <label className="form-label-driver">Driver Full Name *</label>
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
                    <label className="form-label-driver">Mobile Number (WhatsApp linked) *</label>
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
                    <label className="form-label-driver">Auto Registration Number *</label>
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
                    <select
                      className="form-input-driver"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Other">Other City</option>
                    </select>
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
