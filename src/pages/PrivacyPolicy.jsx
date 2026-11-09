import React from 'react';
import privacyData from '../data/privacyPolicy.json';
import { Calendar } from 'lucide-react';
import '../styles/Legal.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page-container">
      {/* Header */}
      <section className="legal-page-header">
        <div className="otox-container legal-header-content">
          <h1 className="legal-page-title">{privacyData.title}</h1>

          <div className="legal-meta-row">
            <span>
              <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
              Last Updated: {privacyData.lastUpdated}
            </span>
          </div>

          <div className="legal-summary-callout">
            <strong>Summary:</strong> {privacyData.summary}
          </div>
        </div>
      </section>

      {/* Body with Table of Contents & Sections */}
      <section className="legal-body-section">
        <div className="otox-container">
          <div className="legal-layout-grid">
            {/* Table of Contents */}
            <aside className="legal-toc-sidebar">
              <div className="legal-toc-title">Table of Contents</div>
              <ul className="legal-toc-list">
                {privacyData.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="legal-toc-link">
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Articles */}
            <div className="legal-articles-container">
              {privacyData.sections.map((sec) => (
                <article key={sec.id} id={sec.id} className="legal-article-card">
                  <h2 className="legal-article-heading">{sec.heading}</h2>

                  {sec.content && <p className="legal-paragraph">{sec.content}</p>}

                  {sec.subsections &&
                    sec.subsections.map((sub, i) => (
                      <div key={i} className="legal-subsection-box">
                        <h3 className="legal-subheading">{sub.subtitle}</h3>
                        <ul className="legal-bullet-list">
                          {sub.details.map((d, idx) => (
                            <li key={idx} className="legal-bullet-item">
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                  {sec.bulletPoints && (
                    <ul className="legal-bullet-list">
                      {sec.bulletPoints.map((bp, i) => (
                        <li key={i} className="legal-bullet-item">
                          {bp}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.contactDetails && (
                    <div className="legal-contact-callout">
                      <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${sec.contactDetails.email}`}>
                          {sec.contactDetails.email}
                        </a>
                      </p>
                      {sec.contactDetails.address && (
                        <p style={{ marginTop: 6, color: '#A1A1AA', fontSize: '0.9rem' }}>
                          <strong>Office:</strong> {sec.contactDetails.address}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
