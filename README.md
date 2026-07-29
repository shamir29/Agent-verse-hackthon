# NeuraGrid.ai — Phase 1 Smart City Operations Console

NeuraGrid.ai is an integrated smart city operations platform built for local urban deployment. Phase 1 delivers a single-organization console for real-time grid monitoring, water basin management, cross-modular alert resolution, and interactive AI copilot telemetry.

---

## Technical Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS + custom design tokens
- **State & Data Fetching**: TanStack Query (`@tanstack/react-query`)
- **Forms & Validation**: React Hook Form + Zod
- **Charts**: Recharts
- **Map Engine**: MapLibre GL JS (OpenStreetMap tiles) + Styled Vector SVG fallback engine
- **Database & ORM**: SQLite via Prisma ORM (`prisma/schema.prisma`)
- **AI Assistant**: Persistent side panel streaming responses from `/api/assistant` using OpenAI `gpt-4o-mini` with live SQLite context

---

## Design System Tokens

```
Background:      #F5F6F8
Surface:          #FFFFFF
Border:           #E6E8EC
Text primary:     #0F172A
Text secondary:   #5B6472
Text tertiary:    #96A0AC
Blue (primary):   #2563EB
Emerald (good):   #059669
Amber (warning):  #B45309
Red (critical):   #DC2626
Radius:           18px (cards), 12px (inputs/buttons), 8px (chips)
Font:             Inter (UI), IBM Plex Mono (data/metrics)
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup SQLite Database Schema & Seed Data
```bash
npx prisma db push
npx prisma db seed
```
*Seeds 12 substations across 4 Chennai zones (Anna Nagar, Adyar, T. Nagar, Velachery), 6 water reservoirs, and 20 multi-category alerts timestamped over the past 7 days.*

### 3. Environment Variables (Optional for OpenAI API Key)
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
*Note: If `OPENAI_API_KEY` is omitted, `/api/assistant` operates in a local streaming fallback mode using live SQLite context.*

### 4. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Map Implementation & Fallback Architecture

NeuraGrid.ai utilizes **MapLibre GL JS** to render interactive maps with free OpenStreetMap raster tiles (centered on Chennai Metro Region `13.04° N, 80.22° E`).

If WebGL acceleration or map tile servers are blocked in local sandbox environments, the component automatically falls back to an interactive **Styled Vector SVG Map Engine**. The vector map renders district boundaries (Anna Nagar, Adyar, T. Nagar, Velachery), arterial roads, the Bay of Bengal coastline, and interactive asset pins (⚡ Substations and 💧 Reservoirs) with hovering telemetry tooltips.

---

## Phase 1 Deliverables (All 5 Pages Functional)

1. **City Operations Center (`/`)**: Dynamic city health KPIs, AI operations briefing, interactive map, critical alerts list, and recent incidents table with live search and column sorting.
2. **Smart Grid Module (`/infrastructure/smart-grid`)**: Substation list with zone/status filters, detailed substation inspection modal, and 24-hour load trend Recharts chart.
3. **Water Module (`/urban-services/water`)**: Reservoir storage levels (% & capacity ML), and active leak alerts list with functional **Resolve** actions persisting to SQLite.
4. **Alerts Log (`/alerts`)**: Full system alert log filterable by severity and status, with team assignment modals and inline resolution persisting to SQLite.
5. **AI Assistant Panel**: Persistent right-side panel on every page, streaming real responses from `/api/assistant` with 4 suggested prompt chips and live database context.

---

## Phase 2 Roadmap (Deferred Out-of-Scope Features)

- Multi-tenant Organization & RBAC / User Permissions
- Auth provider integration (Clerk / NextAuth / OAuth 2.FA)
- Digital Twin 3D / Layered Grid Visualization
- Solar Energy & Renewable Predictive Maintenance Modules
- Waste, Air Quality & Healthcare Dispatch Modules
- PDF/CSV Report Exports & Audit Log Trail
- Dark mode toggle & Voice command input
- Real-time WebSocket subscriptions & Redis/BullMQ queue worker architecture
- Vector database RAG pipeline for documentation retrieval
