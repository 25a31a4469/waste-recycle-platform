# CIRCUVIA AI (సర్క్యువియా AI)
> **Tagline:** Turn Waste Into Worth  
> **Mission:** India's premier AI-powered Circular Resource Exchange Platform connecting heavy industrial plants, recyclers, MSMEs, and craft workshops.

---

## 🌿 Platform Overview

**CIRCUVIA AI** bridges the industrial gap where by-products and residues from one facility become valuable, cost-effective inputs for another. Instead of dumping fly ash, slag, spent solvents, tire rubber, or packaging scraps into landfills, CIRCUVIA AI facilitates certified industrial symbiosis across Indian economic corridors.

- **Brand Colors:** Deep Forest Green (`#041c14`, `#072a1e`), Emerald (`#10b981`), Warm Ivory (`#fbf9f4`), and Lime accents (`#84cc16`).
- **Target Geography:** Indian manufacturing hubs (Telangana, Andhra Pradesh, Maharashtra, Tamil Nadu, Karnataka, Gujarat).
- **Compliance:** Central Pollution Control Board (CPCB) Hazardous & Other Wastes Rules, 2016, and Bureau of Indian Standards (BIS/IS).

---

## 🚀 Key Modules & Pages

1. **Landing Page (`/`)**:
   - Hero search with category quick pills
   - Live platform impact ticker (Tons Diverted, CO₂e Avoided, Exchanges, Procurement Savings)
   - Interactive 4-stage **Closed-Loop Circular Resource Flow** diagram
   - 3-Step "How CIRCUVIA Works" guide
   - Featured material cards with lab test indicators
   - Live AI Matchmaking preview card
   - Industries served across India
   - Interactive Sustainability Carbon Calculator
   - Sample testimonials and FAQ accordion

2. **Marketplace (`/marketplace`)**:
   - Searchable, debounced inventory with category tabs
   - Faceted filters: Resource classification, physical condition, Indian state/region, max price, max MOQ (MSME friendly), verified sellers only, and lab-tested only
   - Grid and List views with sorting (Newest, Price Low/High, Volume High)
   - Favorites / Saved listings filter tab
   - Resource Detail Modal with MTR lab report badge, specifications, and quotation triggers

3. **Dedicated Raw Materials Hub (`/raw-materials`)**:
   - Specialized sourcing for manufacturing plants and craft workshops
   - Tiered bulk wholesale pricing structure (1-5 MT spot, 5-20 MT semi-bulk, 20-50 MT wholesale, 50+ MT annual contracts)
   - Interactive **Supplier Comparison Matrix** (compares specifications, MOQ, prices, and lead times side-by-side)
   - **Request Material Sample** workflow for lab qualification

4. **List a Resource Wizard (`/list-resource`)**:
   - 5-step guided wizard:
     1. Basic Info & Classification (By-product, surplus, recycled feedstock, waste)
     2. Pricing & Quantities (Unit, price, MOQ, negotiable toggle)
     3. Quality & Chemical Composition (Assay, grade, physical form)
     4. Logistics & Documents (City, state, self-pickup, seller freight delivery, lab test report)
     5. Live Card Preview & Final Publish (with confetti celebration)

5. **AI Resource Matchmaker (`/matchmaker`)**:
   - Deterministic, explainable matching algorithm based on:
     - Technical category & chemical compatibility (35%)
     - Order scale & MOQ intake fit (20%)
     - Geographic proximity & highway freight corridors (20%)
     - Commercial budget alignment (15%)
     - Third-party NABL lab test verification (10%)
   - Circularity fit score (0-98%) with itemized bullet points explaining why the match is recommended

6. **Bilingual AI Resource Assistant (Floating Widget)**:
   - Floating chat-style assistant available across all pages
   - Natural language guidance in **English** and **Telugu (తెలుగు)**
   - Pre-loaded prompt chips for by-product repurposing, listing description polishing, and regional supplier discovery
   - Explicit advisory disclaimer regarding hazardous materials and chemical testing

7. **Multi-Perspective Dashboards (`/dashboard`)**:
   - Dynamic role-switching for:
     - **Factory / Enterprise:** Residue generation tracking, pneumatic silo lots, CPCB manifests
     - **Small Business / MSME:** Low-MOQ orders, local cluster savings, input cost reductions
     - **Recycler:** Secondary plastic/metal washing lines, IV purity ratings
     - **Supplier:** Virgin surplus lots, distribution logistics
     - **Buyer:** Procurement orders, quotation comparisons
     - **Administrator:** Facility document verification (approve/reject GST/NOC), listing moderation, commercial disputes resolution

8. **RFQ Procurement Center (`/rfq-center`)**:
   - Broadcast custom procurement needs across the network
   - Multi-tab tracking: Open RFQs, My Posted Requirements, Received Quotations
   - Side-by-side quotation comparison tool with instant awarding

9. **Sustainability Analytics (`/impact`)**:
   - Central Pollution Control Board (CPCB) and EPA WARM accounting formulas
   - Interactive material volume carbon abatement simulator
   - Scope 3 ESG Audit summary report generation

10. **Regulatory Guidance (`/how-it-works`)**:
    - Detailed 3-step operational guide
    - Hazardous Materials Policy (Schedule I/II restrictions, Form 6 manifest requirements)
    - NABL Accredited Lab Testing Protocols

---

## 🇮🇳 Telugu & English Localization (తెలుగు)

A global language toggle (`EN | తెలుగు`) is present in the navigation bar on every screen:
- Complete natural Telugu script translations across headings, buttons, filters, form fields, role names, and status alerts.
- Preserves user choice across sessions via `localStorage`.
- Proper formatting for Indian currency (₹ INR) and industrial units (MT, kg, Liters, Drums).

---

## 💻 Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom Circuvia forest-green and ivory theme tokens
- **Icons:** Lucide React
- **Animations & Effects:** Custom CSS keyframes, backdrop-filter glassmorphism, and Canvas Confetti
- **State Management:** React Context (`AppContext.tsx`) with localStorage synchronization and seeded realistic Indian enterprise dataset

---

## 🛠️ Local Development & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 Compliance & Safety Advisory

All chemical compositions and safety disclosures are self-reported by facility listings until verified via accredited NABL/CPCB testing documentation. Never trade hazardous Schedule I materials without state PCB manifest approval.
