# OTOX — Official Website

> **Safe rides. Verified drivers. Smarter local travel.**  
> A modern mobility platform designed to make everyday auto travel safer, simpler, and more accountable through QR-based ride verification.

---

## 🚀 Overview

OTOX bridges the gap between traditional street-hailing and modern digital platforms. Instead of waiting for cab allocations or paying high surge prices, passengers hail any local auto, scan the QR code affixed inside, and establish an instant 3-second verified ride handshake linking passenger, driver, vehicle records, and real-time safety monitoring.

This repository contains the complete frontend web application for **OTOX**, built with **React.js**, **Vite**, and **React Router DOM**.

---

## 🛠️ Tech Stack

* **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
* **Routing:** [React Router DOM v6](https://reactrouter.com/)
* **Icons:** [Lucide React](https://lucide.dev/) + Custom SVG Brand Glyphs
* **Styling:** Modular CSS architecture (separated per page and component) with CSS Variables
* **Typography:** `Plus Jakarta Sans` & `Space Grotesk` (Google Fonts)

---

## 🎨 Design System (Rapido + Uber Aesthetic)

* **Rapido Inspiration:** Signature auto-rickshaw yellow (`#FFC107`, `#FFF8E1`), high-visibility badges, energetic community vibe.
* **Uber Inspiration:** Obsidian black (`#000000`, `#0B0B0E`), clean high-contrast cards, sharp pill badges, and dark-mode simulation interfaces.
* **Trust & Safety Accent:** Emerald green (`#10B981`) for verified badges, vehicle KYC checks, and live network status indicators.

---

## 📁 Project Structure

```text
otox_web/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Shared components across all pages
│   │   ├── Header.jsx      # Navigation, logo & responsive mobile drawer
│   │   ├── Footer.jsx      # Shared footer with social links & legal directory
│   │   └── AppModal.jsx    # QR scan simulator, app download & driver registration modal
│   │
│   ├── data/               # ⚡ DATA-DRIVEN JSON REPOSITORY (Easy editing)
│   │   ├── siteData.json        # Brand info, contact info, social links, app URLs, navigation
│   │   ├── statsData.json       # Live metrics: active drivers, rides verified, cities (API ready)
│   │   ├── homeData.json        # Hero, Why We Built This, How It Works, Features, FAQs
│   │   ├── aboutData.json       # Story, mission, vision, differentiators, looking ahead focus
│   │   ├── driversData.json     # Driver onboarding steps, benefits & FAQs
│   │   ├── contactData.json     # Departments & closing messages
│   │   ├── privacyPolicy.json   # Full legal privacy policy clauses
│   │   └── termsConditions.json # Full legal terms and conditions clauses
│   │
│   ├── pages/              # Dedicated page components
│   │   ├── Home.jsx             # Landing page with interactive QR simulator
│   │   ├── About.jsx            # About Us, Vision, Mission & Looking Ahead
│   │   ├── Drivers.jsx          # Dedicated Driver Partner page & quick apply form
│   │   ├── Contact.jsx          # Contact page with 4 departments & message form
│   │   ├── PrivacyPolicy.jsx    # Structured Privacy Policy with TOC navigation
│   │   └── TermsConditions.jsx  # Structured Terms of Service with TOC navigation
│   │
│   ├── styles/             # Modular CSS stylesheets (one per page/component)
│   │   ├── variables.css   # Color tokens, buttons, resets & typography
│   │   ├── Header.css      # Header & mobile drawer styles
│   │   ├── Footer.css      # Footer styles
│   │   ├── Home.css        # Home page specific layout & animations
│   │   ├── About.css       # About page layout & roadmap styles
│   │   ├── Drivers.css     # Driver partner layout & form styles
│   │   ├── Contact.css     # Contact layout & form styles
│   │   ├── Legal.css       # Clean legal typography & TOC sidebar
│   │   └── Modal.css       # Modal overlay & QR scan simulator styles
│   │
│   ├── App.jsx             # Main router & modal state manager
│   ├── main.jsx            # React root mount
│   └── index.css           # Global fallback
│
├── index.html              # HTML shell & font preconnects
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
└── README.md               # Developer guide
```

---

## ⚡ Developer Guide: Customizing Content & Data

All website copy and links are isolated in `/src/data/` so any developer can modify them without modifying JSX templates:

### 1. Social Media Links & Handles
Edit [`src/data/siteData.json`](src/data/siteData.json):
```json
"socialLinks": [
  { "name": "Twitter / X", "id": "twitter", "url": "https://x.com/your_handle", "handle": "@your_handle" },
  { "name": "LinkedIn", "id": "linkedin", "url": "https://linkedin.com/company/your_company", "handle": "OTOX Mobility" },
  { "name": "Instagram", "id": "instagram", "url": "https://instagram.com/your_handle", "handle": "@your_handle" }
]
```

### 2. Live Platform Counters & App Launch Toggle
Stats counters and App Store download cards are hidden automatically while pre-launch (`"isLaunched": false` / `0` counts). When the app launches or connects to your backend:

- Edit [`src/data/statsData.json`](src/data/statsData.json) and set `"isLaunched": true` with positive `"number"` values (cards with `number: 0` remain filtered out):
```json
{
  "isLaunched": true,
  "summary": [
    { "id": "drivers", "value": "500+", "number": 500, "label": "Verified Auto Drivers" }
  ]
}
```
- Edit `"appLinks"` in [`src/data/siteData.json`](src/data/siteData.json) and set `"isLaunched": true` with your single unified app's `"androidUrl"` and `"iosUrl"`.
- Edit `"contact.headquarters"` in [`src/data/siteData.json`](src/data/siteData.json) (`"isEstablished": true` + address fields) once your physical office and legal entity are established.
> **Backend Integration Tip:** When connecting to a live database or REST API, replace the `statsData` import in `Home.jsx` and `Drivers.jsx` with a `useEffect` fetch call returning this identical JSON structure.

### 3. Privacy Policy & Terms and Conditions
Edit [`src/data/privacyPolicy.json`](src/data/privacyPolicy.json) or [`src/data/termsConditions.json`](src/data/termsConditions.json). The UI dynamically renders headings, clauses, sub-bullets, and the sticky Table of Contents automatically.

---

## 🚦 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (v9 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kamalotox/org_website.git
   cd org_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🔗 Available Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Hero, Why OTOX, 3-step guide, features, interactive QR demo, FAQs |
| `/about` | **About Us** | Story, vision, mission, differentiators, looking ahead |
| `/drivers` | **For Drivers** | Benefits, 4-step onboarding, driver FAQs & application form |
| `/contact` | **Contact Us** | 4 departments, contact info, interactive inquiry form |
| `/privacy-policy` | **Privacy Policy** | Comprehensive data privacy & security clauses |
| `/terms-and-conditions` | **Terms & Conditions** | Comprehensive platform rules, QR rules, liability |

---

## 📄 License
© 2026 OTOX. All Rights Reserved.
