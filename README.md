# Government Scheme Eligibility Navigator (योजना पात्रता मार्गदर्शक)

A fullstack platform enabling citizens to discover and evaluate eligibility for Central and State government welfare schemes, subsidies, educational grants, agricultural incentives, and social programs across India.

---

## 🏛️ Features

- **Interactive Eligibility Assessment Wizard**: 3-step citizen profiling evaluating residency, demographic category, age, income range, BPL status, student status, farming, and PwD criteria.
- **Dynamic Scheme Matcher**: Instant matching algorithm filtering Central and State schemes according to candidate profiles.
- **Deep Search & Multi-Tier Filtering**: Filter across 100+ schemes by state, beneficiary group (Farmer, Student, Women, Senior Citizen, Worker), and category (Agriculture, Education, Health, Skills, Housing, Banking).
- **Scheme Details Modal**: Complete breakdowns of eligibility requirements, financial aid & benefits, required documentation (Aadhaar, income certificates, etc.), application procedure, and official portal links.
- **Bookmarking / Saved Schemes**: Save eligible schemes for future reference with local persistence.

---

## 📁 Repository Structure

```
├── frontend/               # React 19 + Vite + TypeScript + Tailwind CSS (Frontend)
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, HeroBanner, EligibilityWizard, SchemeCard, etc.)
│   │   ├── data/           # Extracted structured schemes JSON
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Eligibility matching logic
│   └── package.json
│
├── backend/                # NestJS TypeScript Backend (API Service)
│   ├── src/
│   ├── test/
│   └── package.json
│
├── structured.csv          # Master dataset of government schemes (250,000+ records)
└── package.json            # Root workspace orchestration scripts
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v20.x or v24.x (LTS recommended)
- **npm**: v10.x or v11.x

### 2. Frontend Development (React + Vite)
```bash
# From root directory:
npm run dev

# Or directly in frontend/:
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Frontend Production Build
```bash
# From root directory:
npm run build
```

### 4. Backend Development (NestJS)
```bash
# From root directory:
npm run dev:backend

# Or directly in backend/:
cd backend
npm install
npm run start:dev
```

---

## 📜 License
Unlicensed / Open Source

