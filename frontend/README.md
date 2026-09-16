# 🏛️ Government Scheme Eligibility Navigator — Frontend

This directory contains the complete **React 19 + Vite 8 + TypeScript** client application for the Government Scheme Eligibility Navigator.

---

## 📂 Frontend Directory Structure & File Paths

```text
frontend/
├── .gitignore                     # Git ignore file for Vite and Node modules
├── .oxlintrc.json                 # Oxlint configuration for fast linter checks
├── index.html                     # HTML5 template with Google Fonts (Playfair + Plus Jakarta)
├── package.json                   # NPM manifest with dependencies and run scripts
├── package-lock.json              # Exact dependency versions lockfile
├── README.md                      # Frontend documentation
├── tsconfig.app.json              # TypeScript compilation config for app source files
├── tsconfig.json                  # Root TypeScript reference file
├── tsconfig.node.json             # TypeScript compilation config for Vite node tools
├── vite.config.ts                 # Vite bundler configuration with @tailwindcss/vite
│
├── public/                        # Static public assets
│   ├── favicon.svg                # Portal SVG favicon emblem
│   └── icons.svg                  # Vector icons sprite sheet
│
└── src/                           # Frontend application source
    ├── App.css                    # Global application CSS resets
    ├── App.tsx                    # Top-level Router configuration & layout wrapper
    ├── index.css                  # Tailwind CSS v4 directives & color theme definitions
    ├── main.tsx                   # React 19 root bootstrap
    │
    ├── assets/                    # Static image and SVG assets
    │   ├── hero.png               # Hero banner illustration
    │   ├── react.svg              # React logo
    │   └── vite.svg               # Vite logo
    │
    ├── components/                # UI Component library
    │   ├── category/              # Category components
    │   │   └── CategoryCard.tsx   # Card component rendering category info & count
    │   │
    │   ├── common/                # Shared foundational UI components
    │   │   ├── Badge.tsx          # Tag badge for categories and match levels
    │   │   ├── Button.tsx         # Standardized button variants (primary, secondary, outline)
    │   │   ├── Footer.tsx         # Portal footer with quick links & helpline
    │   │   ├── Navbar.tsx         # Header navigation bar with bookmarks counter & auth
    │   │   └── ProgressBar.tsx    # Multi-step progress bar for questionnaire
    │   │
    │   ├── scheme/                # Scheme components
    │   │   └── SchemeCard.tsx     # Card with scheme details, match badge, and save button
    │   │
    │   ├── EligibilityWizard.tsx  # Standalone interactive questionnaire wizard
    │   ├── FilterSidebar.tsx      # Filter sidebar for schemes list
    │   ├── HeroBanner.tsx         # Homepage hero section
    │   └── SchemeDetailModal.tsx  # Quick preview modal dialog
    │
    ├── context/                   # Global React contexts
    │   ├── AuthContext.tsx        # User authentication state (login, logout, session)
    │   └── SavedSchemesContext.tsx# Saved / bookmarked schemes state with localStorage
    │
    ├── data/                      # Scheme databases
    │   └── schemes.json           # 101 structured Indian government schemes dataset
    │
    ├── pages/                     # Application routed pages
    │   ├── Categories.tsx         # Directory of all scheme categories
    │   ├── CategoryDetail.tsx     # Schemes filtered by category
    │   ├── Dashboard.tsx          # Citizen dashboard with bookmarked schemes
    │   ├── Home.tsx               # Homepage with hero, categories, and guide
    │   ├── Login.tsx              # Sign-in page
    │   ├── Questionnaire.tsx      # 4-step eligibility questionnaire with progress bar
    │   ├── Register.tsx           # Registration page
    │   ├── Results.tsx            # Eligibility results (🟢 Strong / 🟡 Possible matches)
    │   └── SchemeDetails.tsx      # Deep dive scheme details, benefits, and documents
    │
    ├── services/                  # Business logic and external communication
    │   ├── api.ts                 # Service boundary for fetching schemes and eligibility
    │   └── mockEngine.ts          # Deterministic eligibility evaluation engine
    │
    ├── types/                     # TypeScript types and interfaces
    │   ├── index.ts               # Scheme, MatchResult, User, and Question types
    │   └── scheme.ts              # Legacy scheme schema support
    │
    └── utils/                     # Utilities and helpers
        └── formatText.ts          # HTML tag sanitization & numbered list renumbering
```

---

## 🎨 Theme & Typography

- **Navy Blue**: `#1E3A5F` (Primary)
- **Warm Greige**: `#CFC8BE` (Accent / Neutral)
- **Crisp White**: `#FFFFFF` (Surface)
- **Light Gray**: `#E5E7EB` (Borders)
- **Charcoal**: `#374151` (Body typography)
- **Serif Font**: `Playfair Display` (Headings)
- **Sans-Serif Font**: `Plus Jakarta Sans` (Body & UI)

---

## 🛠️ Commands

```bash
# Start development server
npm run dev

# Compile TypeScript and create production bundle
npm run build

# Preview production build locally
npm run preview

# Lint codebase with Oxlint
npm run lint
```
