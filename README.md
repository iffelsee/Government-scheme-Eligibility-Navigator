# 🏛️ Government Scheme Eligibility Navigator (योजना पात्रता मार्गदर्शक)

A production-grade, citizen-centric web application built with **React 19**, **Vite 8**, **TypeScript**, **Tailwind CSS v4**, and **React Router v7**. The platform guides Indian citizens through an intuitive questionnaire to discover government welfare schemes, subsidies, educational grants, and agricultural incentives for which they qualify.

---

## 📑 Table of Contents
1. [Core Architectural Principle](#-core-architectural-principle)
2. [Complete Frontend Folder Tree](#-complete-frontend-folder-tree)
3. [File & Directory Breakdown](#-file--directory-breakdown)
4. [Design System & UI Theme](#-design-system--ui-theme)
5. [Page Flows & Application Routes](#-page-flows--application-routes)
6. [Key Features & Fixes](#-key-features--fixes)
7. [Installation & Setup Guide](#-installation--setup-guide)
8. [Available Scripts](#-available-scripts)
9. [Eligibility Engine API Contract](#-eligibility-engine-api-contract)

---

## ⚡ Core Architectural Principle

> **Rule: The frontend never decides eligibility directly.**

- **Separation of Concerns**: All eligibility logic is delegated to the API service layer (`src/services/api.ts` backed by `src/services/mockEngine.ts` / NestJS backend).
- The frontend UI collects user answers through a multi-step questionnaire, presents progress bars, and sends the profile to the engine.
- The engine calculates whether a scheme is a:
  - 🟢 **Strong Match** (`STRONG_MATCH`) — Meets primary criteria with high confidence.
  - 🟡 **Possible Match** (`POSSIBLE_MATCH`) — Partially qualifies or requires minimal secondary verification.
  - ⚪ **No Match** — Excluded from recommendations.
- The engine returns explicit `matchReasons` (e.g., *"Citizen is an active farmer with < 2 hectares land"*), which are rendered directly on results and scheme detail pages under **"Why this matches you"**.

---

## 📂 Complete Frontend Folder Tree

```text
frontend/
├── .gitignore                     # Git ignore rules for Vite & Node
├── .oxlintrc.json                 # Oxlint high-performance linter configuration
├── index.html                     # HTML entry point with Google Fonts preloads
├── package.json                   # Frontend dependencies, scripts, and metadata
├── package-lock.json              # Locked dependency tree
├── README.md                      # Frontend-specific documentation
├── tsconfig.app.json              # TypeScript configuration for application code
├── tsconfig.json                  # Root TypeScript reference config
├── tsconfig.node.json             # TypeScript config for Vite configuration files
├── vite.config.ts                 # Vite bundler configuration with Tailwind plugin
│
├── public/                        # Static public assets
│   ├── favicon.svg                # Government Ashoka/Emblem-style SVG favicon
│   └── icons.svg                  # SVG sprite sheet
│
└── src/                           # Application source code
    ├── App.css                    # Global application styles
    ├── App.tsx                    # Main App router and layout wrapper
    ├── index.css                  # Tailwind CSS v4 setup and custom @theme tokens
    ├── main.tsx                   # React 19 DOM bootstrap & entry point
    │
    ├── assets/                    # Static image & vector assets
    │   ├── hero.png               # Hero banner background graphic
    │   ├── react.svg              # React logo
    │   └── vite.svg               # Vite logo
    │
    ├── components/                # Reusable UI component library
    │   ├── category/              # Category-specific components
    │   │   └── CategoryCard.tsx   # Category presentation card with icon & scheme counter
    │   │
    │   ├── common/                # Shared atomic & structural components
    │   │   ├── Badge.tsx          # Status, category, and match-level badges
    │   │   ├── Button.tsx         # Primary, secondary, outline, and text button variants
    │   │   ├── Footer.tsx         # Comprehensive government-style footer
    │   │   ├── Navbar.tsx         # Sticky navigation bar with search & user actions
    │   │   └── ProgressBar.tsx    # Multi-step progress indicator for questionnaires
    │   │
    │   ├── scheme/                # Scheme-specific UI components
    │   │   └── SchemeCard.tsx     # Scheme preview card (Match level, tags, details link)
    │   │
    │   ├── EligibilityWizard.tsx  # Interactive inline eligibility assessment wizard
    │   ├── FilterSidebar.tsx      # Sidebar for filtering schemes (State, beneficiary, etc.)
    │   ├── HeroBanner.tsx         # Homepage hero banner with quick call-to-action
    │   └── SchemeDetailModal.tsx  # Quick-view modal dialog for scheme details
    │
    ├── context/                   # React Context Providers for global state
    │   ├── AuthContext.tsx        # Authentication state (user session, login, logout)
    │   └── SavedSchemesContext.tsx# Bookmarked schemes state with localStorage sync
    │
    ├── data/                      # Local datasets
    │   └── schemes.json           # 101 structured schemes parsed & cleaned from master CSV
    │
    ├── pages/                     # Routed view pages
    │   ├── Categories.tsx         # Browse all scheme categories with search & filter
    │   ├── CategoryDetail.tsx     # Schemes filtered by selected category
    │   ├── Dashboard.tsx          # User profile dashboard with saved schemes & activity
    │   ├── Home.tsx               # Homepage (Hero, Category grid, How it works, Stats)
    │   ├── Login.tsx              # User login authentication page
    │   ├── Questionnaire.tsx      # 4-step eligibility questionnaire with progress bar
    │   ├── Register.tsx           # User registration page
    │   ├── Results.tsx            # Matched results (Strong / Possible matches + reasons)
    │   └── SchemeDetails.tsx      # Deep-dive scheme view (Benefits, docs, process, apply)
    │
    ├── services/                  # Business logic & API communication layer
    │   ├── api.ts                 # Service layer delegating questions, schemes & evaluation
    │   └── mockEngine.ts          # Deterministic eligibility evaluation engine
    │
    ├── types/                     # TypeScript type definitions & interfaces
    │   ├── index.ts               # Core types (Scheme, MatchResult, Answers, User, etc.)
    │   └── scheme.ts              # Extended legacy scheme interface compatibility
    │
    └── utils/                     # Helper functions & utility libraries
        └── formatText.ts          # HTML tag cleaner & sequential list renumbering
```

---

## 🔍 File & Directory Breakdown

### 1. `src/pages/` (View Layer)
| File | Description |
| :--- | :--- |
| `Home.tsx` | Landing page featuring the hero section, quick search, categorized scheme grids, "How it Works" guide, and official trust badges. |
| `Categories.tsx` | Comprehensive category directory displaying scheme counts, search filtering, and quick navigation. |
| `CategoryDetail.tsx` | Filtered scheme listing for a specific category (e.g., Agriculture, Education, Healthcare). |
| `Questionnaire.tsx` | 4-step interactive citizen profile questionnaire (Demographics, Location & Income, Occupation & Status, Needs). Includes back/forward navigation and live progress tracking. |
| `Results.tsx` | Displays calculated scheme recommendations segmented into **Strong Matches** and **Possible Matches**, showing exact reasons why each scheme fits. |
| `SchemeDetails.tsx` | Complete scheme dossier: summary, eligibility criteria, benefits, step-by-step application instructions, required documentation, and direct official portal links. |
| `Dashboard.tsx` | Citizen dashboard displaying bookmarked schemes, completed assessments, and saved profile criteria. |
| `Login.tsx` / `Register.tsx` | Clean authentication screens for user account creation and session sign-in. |

### 2. `src/components/` (Component Library)
- **`common/Navbar.tsx`**: Header navigation featuring national emblem branding, route navigation links, saved schemes count badge, and user authentication toggle.
- **`common/Footer.tsx`**: Official-style portal footer with emergency helplines, Quick Links, Categories, and government disclaimer.
- **`common/Button.tsx`**: Accessible button component supporting `primary`, `secondary`, `outline`, and `ghost` variants with loading states.
- **`common/Badge.tsx`**: Semantic tag component for Central/State labels, Strong Match (green), Possible Match (yellow), and categories.
- **`common/ProgressBar.tsx`**: Step-based progress tracker indicating current step, step labels, and percent completed.
- **`scheme/SchemeCard.tsx`**: High-information scheme card displaying scheme title, ministry/state, brief summary, match badge, tags, and bookmark toggle.
- **`category/CategoryCard.tsx`**: Grid card for scheme domains with icon, title, description, and badge indicator.

### 3. `src/services/` (Service & Evaluation Layer)
- **`api.ts`**: The abstracted API boundary. All components communicate through this module. It handles fetching scheme catalogs, retrieving specific schemes, loading questions, and submitting citizen profiles for evaluation.
- **`mockEngine.ts`**: Standalone evaluation engine simulating server-side eligibility determination. It evaluates income limits, age bounds, occupation matching (farmer, student, worker), disability status, and state residence to produce match scores and explanation statements.

### 4. `src/context/` (Application State)
- **`AuthContext.tsx`**: Manages current user session (`currentUser`), login/register mock methods, and state persistence in `localStorage`.
- **`SavedSchemesContext.tsx`**: Manages citizen scheme bookmarks (add, remove, check status) synchronized with browser `localStorage`.

### 5. `src/utils/` (Sanitization & Formatting)
- **`formatText.ts`**: 
  - `cleanHtml(text)`: Eliminates raw HTML tags (such as `<br>`, `&nbsp;`, `<span>`) scraped from government data sources.
  - `renumberLists(text)`: Converts broken government document lists that repeat `1.` on every row into clean, sequential numbers (`1.`, `2.`, `3.`, ...) while preserving section headers.

---

## 🎨 Design System & UI Theme

The UI follows a professional, trustworthy government portal design system.

### Color Palette
| Token | Hex Code | Purpose | Preview |
| :--- | :--- | :--- | :--- |
| **Navy Blue** | `#1E3A5F` | Primary brand color, headers, primary buttons, active tabs | `rgb(30, 58, 95)` |
| **Warm Greige** | `#CFC8BE` | Accents, card borders, subtle backgrounds, hero tints | `rgb(207, 200, 190)` |
| **Crisp White** | `#FFFFFF` | Card backgrounds, main canvas, high-contrast text | `rgb(255, 255, 255)` |
| **Light Gray** | `#E5E7EB` | Dividers, border lines, inactive button states | `rgb(229, 231, 235)` |
| **Charcoal** | `#374151` | Primary body typography, subheadings, descriptive text | `rgb(55, 65, 81)` |

### Typography Pairing
- **Headings & Emphasized Titles**: `'Playfair Display', Georgia, serif`
  - Conveys authority, clarity, and institutional dignity.
- **Body & UI Elements**: `'Plus Jakarta Sans', system-ui, sans-serif`
  - High legibility on mobile and desktop screens across all font sizes.

---

## 🗺️ Page Flows & Application Routes

```text
[ Home (/) ]
     │
     ├──► [ All Categories (/categories) ] ──► [ Category Detail (/categories/:id) ]
     │                                                     │
     ├──► [ Start Questionnaire (/questionnaire) ]        ▼
     │            │                               [ Scheme Details (/scheme/:id) ]
     │            ▼                                        ▲
     │    [ Results (/results) ] ──────────────────────────┤
     │       (🟢 Strong Matches / 🟡 Possible Matches)     │
     │                                                     │
     ├──► [ Bookmarks (/dashboard) ] ──────────────────────┘
     │
     └──► [ Login (/login) ] / [ Register (/register) ]
```

---

## ✨ Key Features & Fixes

1. **Strict Eligibility Separation**: Frontend UI never performs inline eligibility decisions; all assessment is performed via `services/api.ts`.
2. **"Why this matches you" Explanation**: Every result includes custom rationale pills explaining the specific profile rules that matched.
3. **Data Sanitization**: Scraped government data containing raw `<br>` tags and broken markdown is sanitized automatically via `cleanHtml()`.
4. **Sequential List Renumbering**: Government CSV document lists formatted with repeated `1.` are dynamically renumbered to `1.`, `2.`, `3.` per section.
5. **Bookmark Persistence**: Saved schemes persist across browser reloads via `localStorage`.
6. **Responsive Layout**: Designed for mobile smartphones, tablets, and wide desktop displays.

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or `v24.x` (LTS recommended)
- **npm**: `v10.x` or `v11.x`
- **Operating System**: Windows / macOS / Linux

> **Windows PowerShell PATH note**: If `node` or `npm` is not recognized after installation, refresh your environment PATH:
> ```powershell
> $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
> ```

### 2. Install Dependencies
From the repository root or inside `frontend/`:
```bash
# Navigate to frontend folder
cd frontend

# Install all npm dependencies
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open your browser and visit: **`http://localhost:5173`**

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready static assets will be output to `frontend/dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Lint Codebase
```bash
npm run lint
```

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `vite` | Starts local hot-reloading development server on port 5173 |
| `build` | `tsc -b && vite build` | Type-checks TypeScript files and bundles static assets |
| `preview` | `vite preview` | Previews the production build locally |
| `lint` | `oxlint` | Runs fast Oxlint code quality and React hook checks |

---

## 📡 Eligibility Engine API Contract

### Request: `POST /api/eligibility/evaluate`
```json
{
  "age": 28,
  "gender": "Female",
  "state": "Maharashtra",
  "caste": "OBC",
  "maritalStatus": "Married",
  "annualIncome": 180000,
  "isBpl": true,
  "employmentStatus": "Self-Employed",
  "occupation": "Farmer",
  "isStudent": false,
  "isFarmer": true,
  "isDisability": false,
  "needs": ["financial_assistance", "farming_support"]
}
```

### Response: `MatchResult[]`
```json
[
  {
    "scheme": {
      "id": "pm-kisan-samman-nidhi",
      "title": "PM Kisan Samman Nidhi",
      "category": "Agriculture",
      "level": "Central",
      "brief": "Income support of ₹6,000 per year in three equal installments to all landholding farmer families."
    },
    "matchLevel": "STRONG_MATCH",
    "score": 95,
    "matchReasons": [
      "Targeted for active farmers",
      "Annual income within eligible limit",
      "Valid state residency"
    ],
    "missingCriteria": []
  },
  {
    "scheme": {
      "id": "pm-awas-yojana-gramin",
      "title": "Pradhan Mantri Awas Yojana - Gramin",
      "category": "Housing",
      "level": "Central",
      "brief": "Financial assistance for construction of pucca houses for homeless and households living in dilapidated houses."
    },
    "matchLevel": "POSSIBLE_MATCH",
    "score": 75,
    "matchReasons": [
      "BPL cardholder criterion satisfied",
      "Income falls in low-income bracket"
    ],
    "missingCriteria": [
      "Verification of house ownership status required"
    ]
  }
]
```

---

## 🏛️ License & Disclaimer
This platform is developed for citizen welfare facilitation. Official scheme rules, funding disbursements, and policy terms remain subject to respective Ministry guidelines and verification.
