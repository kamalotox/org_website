import React from 'react';
import { Link } from 'react-router-dom';
import aboutData from '../data/aboutData.json';
import { Eye, Target, ArrowRight } from 'lucide-react';
import '../styles/About.css';

export default function About({ onOpenModal }) {
  return (
    <div className="about-page-container">
      {/* 1. HERO */}
      <section className="about-hero">
        <div className="otox-container about-hero-content">
          <h1 className="about-headline">{aboutData.hero.headline}</h1>

          <p className="about-lead">{aboutData.hero.subheadline}</p>

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
              <h2 className="story-heading">{aboutData.story.title}</h2>
              {aboutData.story.paragraphs.map((p, index) => (
                <p key={index} className="story-paragraph">
                  {p}
                </p>
              ))}
            </div>

            <div className="story-badge-card">
              <div className="quote-lead">"{aboutData.story.manifesto}"</div>
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
              <div className="vm-header-row">
                <Eye size={20} color="#B45309" />
                <h2 className="vm-title">{aboutData.visionMission.vision.tag}</h2>
              </div>
              <p className="vm-statement">{aboutData.visionMission.vision.statement}</p>
              <p className="vm-description">{aboutData.visionMission.vision.description}</p>
            </div>

            {/* Mission */}
            <div className="vm-card">
              <div className="vm-header-row">
                <Target size={20} color="#065F46" />
                <h2 className="vm-title">{aboutData.visionMission.mission.tag}</h2>
              </div>
              <p className="vm-statement">{aboutData.visionMission.mission.statement}</p>
              <p className="vm-description">{aboutData.visionMission.mission.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT MAKES US DIFFERENT */}
      <section className="different-section">
        <div className="otox-container">
          <div className="section-header-center">
            <h2 className="section-title">{aboutData.whatMakesUsDifferent.title}</h2>
            <p className="section-lead">{aboutData.whatMakesUsDifferent.subtitle}</p>
          </div>

          <div className="diff-grid">
            {aboutData.whatMakesUsDifferent.pillars.map((pillar) => (
              <div key={pillar.id} className="diff-card">
                <h4 className="diff-title">{pillar.title}</h4>
                <p className="diff-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOOKING AHEAD */}
      <section className="roadmap-section">
        <div className="otox-container">
          <div className="section-header-center">
            <h2 className="section-title">
              {aboutData.lookingAhead.title}
            </h2>
            <p className="section-lead">
              {aboutData.lookingAhead.headline}
            </p>
            <p style={{ color: '#52525B', fontSize: '1.02rem', lineHeight: 1.65 }}>
              {aboutData.lookingAhead.description}
            </p>
          </div>

          <div className="roadmap-timeline-grid">
            {aboutData.lookingAhead.focusAreas.map((area, idx) => (
              <div key={idx} className="roadmap-card">
                <h4 className="roadmap-phase-title">{area.label}</h4>
                <p className="roadmap-desc">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
