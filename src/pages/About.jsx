import React from 'react';
import { Link } from 'react-router-dom';
import aboutData from '../data/aboutData.json';
import siteData from '../data/siteData.json';
import {
  Eye,
  Target,
  Sparkles,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import '../styles/About.css';

export default function About({ onOpenModal }) {
  return (
    <div className="about-page-container">
      {/* 1. HERO */}
      <section className="about-hero">
        <div className="otox-container about-hero-content">
          <span className="badge-pill badge-yellow">
            <Sparkles size={13} />
            {aboutData.hero.badge}
          </span>

          <h1 className="about-headline">
            {aboutData.hero.headline}
          </h1>

          <p className="about-lead">
            {aboutData.hero.subheadline}
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-secondary">
              <span>Partner With Us</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => onOpenModal && onOpenModal('passenger')}
              className="btn-outline"
            >
              <span>Scan QR Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE STORY */}
      <section className="about-story-section">
        <div className="otox-container">
          <div className="about-story-grid">
            <div>
              <span className="section-tag">Origin & Purpose</span>
              <h2 className="story-heading">{aboutData.story.title}</h2>
              {aboutData.story.paragraphs.map((p, index) => (
                <p key={index} className="story-paragraph">
                  {p}
                </p>
              ))}
            </div>

            <div className="story-badge-card">
              <div className="quote-lead">
                "Our goal is simple — create a trusted connection between passengers and drivers through technology that feels easy to use in real-world situations."
              </div>
              <div className="quote-author">
                OTOX Product Manifesto
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="vision-mission-section">
        <div className="otox-container">
          <div className="vm-grid">
            {/* Vision */}
            <div className="vm-card">
              <div className="vm-header-pill">
                <span className="badge-pill badge-yellow">
                  <Eye size={14} />
                  {aboutData.visionMission.vision.tag}
                </span>
              </div>
              <h3 className="vm-statement">
                {aboutData.visionMission.vision.statement}
              </h3>
              <p className="vm-description">
                {aboutData.visionMission.vision.description}
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card">
              <div className="vm-header-pill">
                <span className="badge-pill badge-green">
                  <Target size={14} />
                  {aboutData.visionMission.mission.tag}
                </span>
              </div>
              <h3 className="vm-statement">
                {aboutData.visionMission.mission.statement}
              </h3>
              <p className="vm-description">
                {aboutData.visionMission.mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT MAKES US DIFFERENT */}
      <section className="different-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">Competitive Edge</span>
            <h2 className="section-title">{aboutData.whatMakesUsDifferent.title}</h2>
            <p className="section-lead">{aboutData.whatMakesUsDifferent.subtitle}</p>
          </div>

          <div className="diff-grid">
            {aboutData.whatMakesUsDifferent.pillars.map((pillar) => (
              <div key={pillar.id} className="diff-card">
                <span className="diff-highlight-badge">{pillar.highlight}</span>
                <h4 className="diff-title">{pillar.title}</h4>
                <p className="diff-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="values-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="badge-pill badge-yellow" style={{ marginBottom: 12 }}>
              Our Foundations
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              How We Build & Operate
            </h2>
            <p style={{ color: '#A1A1AA' }}>
              Guided by principles that put safety, grassroots drivers, and commuters first.
            </p>
          </div>

          <div className="values-grid">
            {aboutData.coreValues.map((v, i) => (
              <div key={i} className="value-card">
                <h4 className="value-title">{v.title}</h4>
                <p className="value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOOKING AHEAD ROADMAP */}
      <section className="roadmap-section">
        <div className="otox-container">
          <div className="section-header-center">
            <span className="section-tag">{aboutData.lookingAhead.title}</span>
            <h2 className="section-title">{aboutData.lookingAhead.headline}</h2>
            <p className="section-lead">{aboutData.lookingAhead.description}</p>
          </div>

          <div className="roadmap-timeline-grid">
            {aboutData.lookingAhead.milestones.map((m, idx) => (
              <div key={idx} className="roadmap-card">
                <div className="roadmap-year-tag">{m.year}</div>
                <h4 className="roadmap-phase-title">{m.label}</h4>
                <p className="roadmap-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
