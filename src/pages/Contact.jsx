import React, { useState } from 'react';
import contactData from '../data/contactData.json';
import siteData from '../data/siteData.json';
import {
  ChatCircleText,
  ShieldCheck,
  Briefcase,
  Lifebuoy,
  Envelope,
  Phone,
  Clock,
  MapPin,
  PaperPlaneTilt,
  CheckCircle
} from '@phosphor-icons/react';
import '../styles/Contact.css';

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'general',
    message: ''
  });

  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case 'MessageSquare':
        return <ChatCircleText size={20} weight="duotone" />;
      case 'ShieldCheck':
        return <ShieldCheck size={20} weight="duotone" />;
      case 'Briefcase':
        return <Briefcase size={20} weight="duotone" />;
      case 'LifeBuoy':
        return <Lifebuoy size={20} weight="duotone" />;
      default:
        return <Envelope size={20} weight="duotone" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
  };

  return (
    <div className="contact-page-container">
      {/* 1. HERO & DEPARTMENTS SECTION */}
      <section className="contact-top-band">
        <div className="contact-hero">
          <div className="otox-container contact-hero-content">
            <h1 className="contact-headline">{contactData.hero.headline}</h1>

            <p className="contact-lead">{contactData.hero.subheadline}</p>
          </div>
        </div>

        <div className="dept-section">
          <div className="otox-container">
            <div className="dept-grid">
              {contactData.departments.map((dept) => (
                <div key={dept.id} className="dept-card">
                  <div className="dept-card-header">
                    <div className="dept-icon-wrapper" aria-hidden="true">{getDeptIcon(dept.icon)}</div>
                    <h3 className="dept-title">{dept.name}</h3>
                  </div>
                  <p className="dept-desc">{dept.description}</p>
                  <a href={`mailto:${dept.email}`} className="dept-email-link">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CONTACT FORM & SIDEBAR */}
      <section className="contact-layout-section">
        <div className="otox-container">
          <div className="contact-layout-grid">
            {/* Left: Message Form */}
            <div className="contact-form-box">
              <h3 className="contact-form-title">Send a Direct Message</h3>
              <p className="contact-form-subtitle">
                Our support and partnership teams respond within 2 to 4 business hours.
              </p>

              {formSent ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      background: '#ECFDF5',
                      color: '#10B981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px'
                    }}
                  >
                    <CheckCircle size={32} weight="fill" />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>
                    Message Received!
                  </h4>
                  <p style={{ color: '#52525B', fontSize: '0.95rem', marginBottom: 20 }}>
                    Thank you, <strong>{formData.name}</strong>. Your enquiry has been routed to our{' '}
                    <strong>
                      {contactData.departments.find((d) => d.id === formData.department)?.name ||
                        'Support'}{' '}
                      team
                    </strong>
                    . We have emailed a confirmation to {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        department: 'general',
                        message: ''
                      });
                    }}
                    className="btn-outline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-main-form">
                  <div className="form-row-dual">
                    <div className="form-group-contact">
                      <label className="form-label-contact">Full Name *</label>
                      <input
                        type="text"
                        className="form-input-contact"
                        placeholder="e.g. Ananya Sharma"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group-contact">
                      <label className="form-label-contact">Email Address *</label>
                      <input
                        type="email"
                        className="form-input-contact"
                        placeholder="ananya@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-dual">
                    <div className="form-group-contact">
                      <label className="form-label-contact">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        className="form-input-contact"
                        placeholder="+91 98765 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group-contact">
                      <label className="form-label-contact">Inquiry Category *</label>
                      <select
                        className="form-input-contact"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="general">General Enquiries</option>
                        <option value="driver">Driver Support & Onboarding</option>
                        <option value="partnerships">Partnerships & Collaborations</option>
                        <option value="technical">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-contact">
                    <label className="form-label-contact">Your Message / Feedback *</label>
                    <textarea
                      rows={3}
                      className="form-input-contact contact-textarea"
                      placeholder="Tell us how we can assist you..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary contact-submit-btn"
                  >
                    <span>Submit Message</span>
                    <PaperPlaneTilt size={16} weight="bold" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Information Sidebar (sourced from siteData.json) */}
            <div className="contact-sidebar-card">
              <div>
                <h4 className="side-block-title">
                  <Phone size={20} weight="duotone" color="#FFC107" />
                  Phone & Helpdesk
                </h4>
                <div className="side-detail-row">
                  <span className="side-detail-label">Phone:</span>
                  <a href={`tel:${siteData.contact.phone}`}>{siteData.contact.displayPhone}</a>
                </div>
                <div className="side-detail-row">
                  <span className="side-detail-label">Support:</span>
                  <a href={`mailto:${siteData.contact.supportEmail}`}>
                    {siteData.contact.supportEmail}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="side-block-title">
                  <Clock size={20} weight="duotone" color="#FFC107" />
                  Office Hours
                </h4>
                <div className="hours-badge-box">
                  <p style={{ color: '#F4F4F5', fontWeight: 700, fontSize: '0.95rem' }}>
                    {siteData.contact.officeHours}
                  </p>
                  <p style={{ color: '#A1A1AA', fontSize: '0.82rem', marginTop: 4 }}>
                    We review general enquiries, driver applications, and support messages during working hours.
                  </p>
                </div>
              </div>

              {siteData.contact.headquarters.isEstablished && siteData.contact.headquarters.address && (
                <div>
                  <h4 className="side-block-title">
                    <MapPin size={20} weight="duotone" color="#FFC107" />
                    Office Location
                  </h4>
                  <p style={{ color: '#E4E4E7', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {siteData.contact.headquarters.facility}
                    <br />
                    {siteData.contact.headquarters.address}
                    <br />
                    {siteData.contact.headquarters.stateCountry}
                  </p>
                </div>
              )}

              <div className="partnership-alert-card">
                <h5 style={{ fontWeight: 800, color: '#FFC107', marginBottom: 6 }}>
                  {contactData.closing.headline}
                </h5>
                <p style={{ fontSize: '0.86rem', color: '#E4E4E7', lineHeight: 1.55 }}>
                  {contactData.closing.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
