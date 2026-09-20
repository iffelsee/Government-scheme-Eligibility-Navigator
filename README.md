# 🏛️ Government Scheme Eligibility Navigator (योजना पात्रता मार्गदर्शक)

A comprehensive, citizen-centric web platform and API designed to bridge the awareness and accessibility gap in government welfare distribution. The platform empowers Indian citizens to discover welfare schemes, educational scholarships, healthcare subsidies, housing grants, and agricultural incentives tailored specifically to their socio-economic profile.

---

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Complete Project Structure](#-complete-project-structure)
5. [Installation & Setup Guide](#-installation--setup-guide)
6. [Running the Frontend](#-running-the-frontend)
7. [Running the Backend](#-running-the-backend)
8. [Frontend ↔ Backend Architecture](#-frontend--backend-architecture)
9. [Dataset](#-dataset)
10. [Scheme Application Links](#-scheme-application-links)
11. [Project Architecture](#-project-architecture)
12. [Development & Code Quality](#-development--code-quality)
13. [Build & Verification](#-build--verification)
14. [GitHub Repository Structure](#-github-repository-structure)
15. [License & Disclaimer](#-license--disclaimer)

---

## 🌟 Overview

Millions of Indian citizens remain unaware of government welfare programs and subsidies designed for their empowerment. The **Government Scheme Eligibility Navigator** solves this by organizing fragmented welfare information into an intuitive, accessible, and structured digital platform.

Citizens can discover schemes across key sectors:
- **Housing & Shelter** (e.g., pucca house construction subsidies, affordable urban housing loans, sanitation assistance)
- **Education & Learning** (e.g., pre-matric/post-matric scholarships, fee concessions, hostel aid, loan interest subsidies)
- **Agriculture & Rural** (e.g., crop insurance, direct farmer income support, seeds, fertilizers, and irrigation subsidies)
- **Healthcare & Wellness** (e.g., medical insurance, tertiary treatment coverage, maternal care, free generic medicines)
- **Women and Child Welfare** (e.g., direct cash assistance, nutrition programs, motherhood support, girl child education)
- **Skills & Employment** (e.g., vocational training stipends, free toolkits, startup seed funds, job placement assistance)
- **Banking & Finance** (e.g., collateral-free business loans, zero-balance savings, pension plans, accident insurance)
- **Social Welfare & Empowerment** (e.g., disability stipends, senior citizen pensions, community empowerment)

### Eligibility & Discovery Workflow

```text
┌─────────────────────────┐
│     Citizen Profile     │  Demographics: Age, Gender, State, Social Category,
│      Questionnaire      │  Annual Income, Profile/Occupation (Farmer, Student, etc.)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Eligibility Engine    │  Evaluates income ceilings, age bounds, social categories,
│   (Service / Backend)   │  state residency, and occupation rules against catalog
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│     Matched Results     │  🟢 Strong Matches: Meets primary criteria with high confidence
│      & Explanations     │  🟡 Possible Matches: Partially qualifies / secondary review
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Scheme Dossier & Action │  Benefits, required documents, step-by-step application
│  Verified Portals/Links │  process, and validated direct application/portal links
└─────────────────────────┘
```

---

## ✨ Key Features

- **Scheme Discovery & Browsing**: Browse hundreds of central and state government schemes categorized by sector with real-time counters.
- **Fuzzy & Similar Search**: High-performance search utility powered by Levenshtein edit distance and tokenized text matching (`frontend/src/utils/search.ts`) with stop-word filtering to find relevant schemes even with typos or partial keywords.
- **Category Browsing**: Detailed category pages showing all associated schemes, summaries, and eligibility criteria.
- **Multi-Dimensional Scheme Filters**:
  - **Level Filtering**: Central vs. State schemes.
  - **State Filtering**: Dynamic dropdown filtering by individual Indian states and union territories.
  - **Beneficiary & Category Filtering**: Filter by target beneficiaries (e.g., Students, Farmers, Women, Senior Citizens, Artisans).
- **Eligibility Questionnaire**: 4-step guided questionnaire capturing state, age, gender, social category (General, OBC, SC, ST, EWS), annual income band, and special occupational status.
- **Intelligent Scheme Matching**: Multi-criteria matching engine returning match status (`STRONG_MATCH` vs `POSSIBLE_MATCH`), match score, and transparent **"Why this matches you"** explanations alongside missing criteria.
- **Detailed Scheme Dossiers**: Deep-dive pages (`/scheme/:slug`) detailing scheme objectives, quantifiable benefits, eligibility criteria, step-by-step application procedures, and required documentation.
- **Scheme-Specific Application Links**:
  - Distinguishes between direct online forms/applications, official department portals, and procedural guidelines.
  - Validates against known broken/404 URLs.
  - Handles schemes where online applications are unavailable by providing clear offline procedure instructions.
  - Avoids blind redirection to generic aggregate portals (such as MyScheme) when verified department URLs exist.
- **Homepage Scheme Carousel**: Interactive flagship scheme carousel with auto-play, pause-on-hover, next/previous buttons, and indicator dots (`frontend/src/components/scheme/SchemeCarousel.tsx`).
- **Engaging UI Animations & Count-Up Statistics**: Animated numeric counters for citizen counts and scheme metrics (`frontend/src/components/common/CountUp.tsx`).
- **Responsive Government Portal UI Design**: Mobile-first, fully responsive design adhering to official government typography (`Playfair Display` + `Plus Jakarta Sans`) and color palette (`#1E3A5F` Navy Blue, `#CFC8BE` Warm Greige).
- **Bookmarks / Saved Schemes**: Citizen dashboard with local persistence for saving and tracking schemes of interest.
- **Backend & API Layer**: NestJS backend providing extensible modular endpoints, and an abstracted frontend API client (`frontend/src/services/api.ts`).
- **Master Dataset**: Includes structured datasets (`schemes.json` in frontend and `structured.csv` master dataset) representing extensive scheme records.

---

## 🛠️ Technology Stack

### Frontend
- **React**: `19.2.8` — Component-driven user interface library
- **TypeScript**: `~6.0.2` — Strict type safety across components, models, and services
- **Vite**: `^8.3.0` — Next-generation frontend build tooling and development server
- **Tailwind CSS**: `^4.3.3` (with `@tailwindcss/vite`) — Utility-first styling and custom theme variables
- **React Router DOM**: `^7.18.4` — Client-side declarative routing
- **Lucide React**: `^1.46.0` — Clean and consistent iconography
- **Oxlint**: `^1.81.0` — High-performance JavaScript/TypeScript linter

### Backend
- **NestJS**: `^12.0.1` — Progressive Node.js framework for building scalable server applications
- **Node.js**: `v20.x` / `v24.x` (LTS recommended)
- **Express**: Platform Express (`@nestjs/platform-express ^12.0.1`)
- **RxJS**: `^7.8.1` — Reactive programming library
- **Reflect Metadata**: `^0.2.2` — Decorator metadata reflection
- **Jest**: `^30.0.0` & `ts-jest` — Testing framework for unit and e2e testing
- **Oxlint**: `^1.58.0` — Backend linting
- **Prisma**: `^6.19.3` (`@prisma/client` & `prisma` dev dependency at root) — Database ORM configuration

---

## 📁 Complete Project Structure

```text
Government-scheme-Eligibility-Navigator/
├── backend/                              # NestJS backend application
│   ├── src/                              # Backend source code
│   │   ├── app.controller.spec.ts        # Unit test for AppController
│   │   ├── app.controller.ts             # Primary REST controller (root endpoint)
│   │   ├── app.module.ts                 # Root application module
│   │   ├── app.service.ts                # Application service provider
│   │   └── main.ts                       # Backend entry point (NestFactory bootstrap, port 3000)
│   ├── test/                             # End-to-end test suite
│   │   ├── app.e2e-spec.ts               # E2E integration test
│   │   └── jest-e2e.json                 # Jest E2E configuration
│   ├── .oxlintrc.json                    # Backend Oxlint configuration
│   ├── .prettierrc                       # Code formatting rules
│   ├── jest.config.ts                    # Jest unit testing configuration
│   ├── nest-cli.json                     # NestJS CLI project metadata
│   ├── package.json                      # Backend dependencies and scripts
│   ├── package-lock.json                 # Backend locked dependency tree
│   ├── tsconfig.build.json               # TypeScript build configuration
│   └── tsconfig.json                     # Backend TypeScript compiler configuration
│
├── frontend/                             # React + Vite frontend application
│   ├── public/                           # Static public assets
│   │   ├── favicon.svg                   # National emblem SVG favicon
│   │   └── icons.svg                     # SVG sprite definitions
│   ├── src/                              # Frontend source code
│   │   ├── assets/                       # Image assets (hero.png, logos)
│   │   ├── components/                   # Reusable UI component library
│   │   │   ├── category/                 # Category components (CategoryCard.tsx)
│   │   │   ├── common/                   # Shared UI (Navbar, Footer, Button, Badge, ProgressBar, CountUp)
│   │   │   ├── scheme/                   # Scheme UI (SchemeCard, SchemeCarousel, SchemeFilterPanel)
│   │   │   ├── EligibilityWizard.tsx     # Inline eligibility assessment wizard
│   │   │   ├── FilterSidebar.tsx         # Sidebar for filtering schemes
│   │   │   ├── HeroBanner.tsx            # Homepage hero banner
│   │   │   └── SchemeDetailModal.tsx     # Scheme preview modal
│   │   ├── context/                      # Global state context
│   │   │   ├── AuthContext.tsx           # User session and authentication state
│   │   │   └── SavedSchemesContext.tsx   # Saved schemes state with localStorage sync
│   │   ├── data/                         # Local dataset
│   │   │   └── schemes.json              # Cleaned scheme records and metadata (704 KB)
│   │   ├── pages/                        # View pages
│   │   │   ├── Categories.tsx            # All categories directory
│   │   │   ├── CategoryDetail.tsx        # Category-filtered scheme listing
│   │   │   ├── Dashboard.tsx             # User bookmarks and dashboard
│   │   │   ├── Home.tsx                  # Landing page (hero, carousel, categories, stats)
│   │   │   ├── Login.tsx                 # Login page
│   │   │   ├── Questionnaire.tsx         # 4-step eligibility questionnaire
│   │   │   ├── Register.tsx              # Registration page
│   │   │   ├── Results.tsx               # Matched schemes with match reasons
│   │   │   └── SchemeDetails.tsx         # Deep-dive scheme view with verified links
│   │   ├── services/                     # Business logic and API client
│   │   │   ├── api.ts                    # API client layer for schemes, categories, and evaluation
│   │   │   └── mockEngine.ts             # Deterministic eligibility evaluation engine
│   │   ├── types/                        # TypeScript type definitions
│   │   │   ├── index.ts                  # Core types (Scheme, MatchResult, QuestionnaireAnswers, etc.)
│   │   │   └── scheme.ts                 # Extended scheme interface definitions
│   │   ├── utils/                        # Utility functions
│   │   │   ├── formatText.ts             # HTML tag sanitizer and sequential list renumbering
│   │   │   ├── matcher.ts                # Field matching and criteria evaluation helpers
│   │   │   ├── schemeUrls.ts             # Intelligent scheme link and portal resolver
│   │   │   └── search.ts                 # Levenshtein fuzzy search and tokenization
│   │   ├── App.css                       # Global styles
│   │   ├── App.tsx                       # Main application router
│   │   ├── index.css                     # Tailwind CSS v4 setup and theme definitions
│   │   └── main.tsx                      # Frontend React DOM entry point
│   ├── .gitignore                        # Frontend Git ignore rules
│   ├── .oxlintrc.json                    # Frontend Oxlint configuration
│   ├── index.html                        # HTML template
│   ├── package.json                      # Frontend dependencies and scripts
│   ├── package-lock.json                 # Frontend locked dependency tree
│   ├── README.md                         # Frontend-specific documentation
│   ├── tsconfig.app.json                 # TypeScript application configuration
│   ├── tsconfig.json                     # TypeScript reference configuration
│   ├── tsconfig.node.json                # TypeScript Vite configuration
│   └── vite.config.ts                    # Vite build configuration with Tailwind plugin
│
├── structured.csv                        # Master tabular dataset containing government scheme records (~24 MB)
├── package.json                          # Root workspace package.json coordinating frontend & backend
├── package-lock.json                     # Root locked dependency tree
├── .gitignore                            # Root Git ignore rules
└── README.md                             # Complete project documentation
```

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or `v24.x` (LTS recommended)
- **npm**: `v10.x` or `v11.x`
- **Git**: Installed and configured on your path

### 2. Clone the Repository
```bash
git clone https://github.com/iffelsee/Government-scheme-Eligibility-Navigator.git
cd Government-scheme-Eligibility-Navigator
```

### 3. Install Dependencies
You can install dependencies for both frontend and backend directly:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

---

## 💻 Running the Frontend

The frontend is powered by Vite and React 19.

### From the Root Directory:
```bash
npm run dev:frontend
```
*(or simply `npm run dev`)*

### Or from inside `frontend/`:
```bash
cd frontend
npm run dev
```

- **Local URL**: `http://localhost:5173`
- **Available Scripts in `frontend/package.json`**:
  - `npm run dev`: Starts the Vite local development server with hot-module replacement (HMR).
  - `npm run build`: Runs `tsc -b && vite build` to type-check and compile production static assets to `frontend/dist/`.
  - `npm run lint`: Runs `oxlint` to perform code quality checks.
  - `npm run preview`: Previews the compiled production build locally.

---

## ⚙️ Running the Backend

The backend is built with NestJS and runs on Node.js.

### From the Root Directory:
```bash
npm run dev:backend
```
*(runs `npm -C backend run start:dev`)*

### Or from inside `backend/`:
```bash
cd backend
npm run start:dev
```

- **Local Port / URL**: Runs on `http://localhost:3000` (or `process.env.PORT` if set).
- **Available Scripts in `backend/package.json`**:
  - `npm run start`: Starts the NestJS server (`nest start`).
  - `npm run start:dev`: Starts the server in watch mode with automatic reloads (`nest start --watch`).
  - `npm run start:debug`: Starts the server in debug mode with watch (`nest start --debug --watch`).
  - `npm run start:prod`: Runs the compiled production server (`node dist/main`).
  - `npm run build`: Compiles the TypeScript application using `nest build`.
  - `npm run lint`: Runs `oxlint --type-aware src/ test/`.
  - `npm run test`: Runs unit tests via Jest.
  - `npm run test:e2e`: Runs end-to-end integration tests.

---

## 🔄 Frontend ↔ Backend Architecture

The application is structured to ensure a clean separation between UI presentation and business logic:

1. **Frontend API Service Layer (`frontend/src/services/api.ts`)**:
   - Acts as the single entry point for all scheme data, category details, question forms, and eligibility evaluations.
   - Decouples UI components from the underlying data source or backend protocol.
2. **Current Evaluation Engine**:
   - `frontend/src/services/api.ts` delegates questionnaire evaluation to `mockEngine.ts`, which deterministically evaluates user demographic answers against scheme eligibility criteria.
   - Returns match classifications (`STRONG_MATCH`, `POSSIBLE_MATCH`) and explicit reasons explaining why the user qualifies.
3. **Backend Integration**:
   - The NestJS backend provides the foundation for serving API endpoints on `http://localhost:3000`.
   - Root `package.json` includes convenience scripts to run, build, and develop both frontend and backend concurrently or independently.

---

## 📊 Dataset

The project incorporates two levels of scheme data:

1. **`structured.csv` (Project Root)**:
   - The master tabular dataset (~24 MB, over 250,000 lines of data) containing comprehensive records of Indian government schemes, ministries, eligibility conditions, benefit structures, and application guidelines.
2. **`frontend/src/data/schemes.json`**:
   - A structured, cleaned, and normalized JSON dataset (704 KB) derived from the master scheme data.
   - Contains 100+ fully-indexed schemes with slug identifiers, categories, state associations, detailed benefits, criteria, application processes, and external references.
   - Powering fast, zero-latency client-side search, category filtering, and instant questionnaire matching.

---

## 🔗 Scheme Application Links

A critical differentiator of the Government Scheme Eligibility Navigator is its intelligent link resolution engine (`frontend/src/utils/schemeUrls.ts`):

- **No Blind Redirection**: The system **does not** indiscriminately redirect every scheme to generic portals (such as MyScheme).
- **Verified Official Portals**: Extracts and prioritizes verified, scheme-specific portal links and direct application URLs from official ministry references.
- **Classification of Link Types**:
  - `online`: Direct digital application portals or registration pages.
  - `form`: Official downloadable application forms (PDF / Word).
  - `portal`: Department or ministry information portals.
  - `offline`: Explicitly marks schemes requiring offline application (e.g., at Gram Panchayat, Taluk office, or District Magistrate office) and details the required steps.
- **Broken URL Filtering**: Validates URLs against a curated blacklist of known broken/404 government endpoints (`KNOWN_BROKEN_URLS`), falling back to official departmental sites when an exact form URL is unavailable.
- **Guidelines URLs**: Keeps official operational guideline documents and standard operating procedures (SOPs) distinct from direct application links.

---

## 🏗️ Project Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│  (Pages: Home, Questionnaire, Categories, Details)     │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   API Client Layer                     │
│  (frontend/src/services/api.ts + schemeUrls.ts)        │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  Eligibility Engine      │  │  NestJS Backend Server   │
│  (mockEngine.ts)         │  │  (Port 3000 REST API)    │
└─────────────┬────────────┘  └────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   frontend/schemes.json  │  │   structured.csv         │
│   (Normalized JSON)      │  │   (Master Scheme Dataset)│
└──────────────────────────┘  └──────────────────────────┘
```

---

## 🛠️ Development & Code Quality

### Linting
Both frontend and backend utilize `oxlint` for fast code linting:

```bash
# Lint frontend
npm run lint

# Lint backend
npm -C backend run lint
```

### Testing
Backend unit and end-to-end tests:

```bash
cd backend
npm run test
npm run test:e2e
```

---

## 📦 Build & Verification

### Building Frontend
```bash
npm run build:frontend
# or: cd frontend && npm run build
```
Executes `tsc -b && vite build`. Output is written to `frontend/dist/`.

### Building Backend
```bash
npm run build:backend
# or: cd backend && npm run build
```
Executes `nest build`. Output is written to `backend/dist/`.

---

## 🌐 GitHub Repository Structure

The complete repository at [https://github.com/iffelsee/Government-scheme-Eligibility-Navigator](https://github.com/iffelsee/Government-scheme-Eligibility-Navigator) contains:
- Complete **`frontend/`** application source code, assets, configuration, and dependencies.
- Complete **`backend/`** application source code, controller, services, tests, and configuration.
- Master dataset **`structured.csv`** and parsed **`schemes.json`**.
- Root build, lint, and orchestration scripts in **`package.json`** and **`package-lock.json`**.
- Fully updated **`README.md`** reflecting the complete multi-tier architecture.
- Clean **`.gitignore`** excluding only `node_modules/`, `.env` files, build output, and local runtime artifacts.

---

## ⚖️ License & Disclaimer

This platform is developed for citizen welfare facilitation and educational purposes. Official scheme rules, funding disbursements, criteria revisions, and policy terms remain subject to respective Central and State Ministry guidelines and verification.
