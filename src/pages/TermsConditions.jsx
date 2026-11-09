import React from 'react';
import termsData from '../data/termsConditions.json';
import { CalendarBlank } from '@phosphor-icons/react';
import '../styles/Legal.css';

export default function TermsConditions() {
  return (
    <div className="legal-page-container">
      {/* Header */}
      <section className="legal-page-header">
        <div className="otox-container legal-header-content">
          <h1 className="legal-page-title">{termsData.title}</h1>

          <div className="legal-meta-row">
            <span>
              <CalendarBlank size={14} weight="bold" style={{ display: 'inline', marginRight: 5, verticalAlign: '-2px' }} />
              Last Revised: {termsData.lastUpdated}
            </span>
          </div>

          <div className="legal-summary-callout">
            <strong>Legal Overview:</strong> {termsData.summary}
          </div>
        </div>
      </section>

      {/* Body with TOC & Articles */}
      <section className="legal-body-section">
        <div className="otox-container">
          <div className="legal-layout-grid">
            {/* Table of Contents */}
            <aside className="legal-toc-sidebar">
              <div className="legal-toc-title">Terms Directory</div>
              <ul className="legal-toc-list">
                {termsData.sections.map((sec) => (
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
              {termsData.sections.map((sec) => (
                <article key={sec.id} id={sec.id} className="legal-article-card">
                  <h2 className="legal-article-heading">{sec.heading}</h2>

                  {sec.content && <p className="legal-paragraph">{sec.content}</p>}

                  {sec.bulletPoints && (
                    <ul className="legal-bullet-list">
                      {sec.bulletPoints.map((bp, i) => (
                        <li key={i} className="legal-bullet-item">
                          {bp}
                        </li>
                      ))}
                    </ul>
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
