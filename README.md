# Pollution AI

Pollution AI is a real-time environmental health monitoring platform with predictive analytics, clean-air route planning, and immersive 3D volumetric visualizations.

## System Architecture

The project is structured as an npm workspaces monorepo:
* **`backend/`**: Express.js server providing geocoding lookup (via OpenStreetMap's free Nominatim API), current conditions (OpenWeatherMap and falling back to a dry-cycle simulation engine), 24-hour forecasting, clean-air route solvers, and database logs.
* **`frontend/`**: Vite + React, Tailwind CSS, Three.js (for volumetric particle layers), and Leaflet (for GIS map overlays).

```
                  ┌──────────────────────┐
                  │   React Dashboard    │
                  └──────────┬───────────┘
                             │ (API requests)
                             ▼
                  ┌──────────────────────┐
                  │ Express.js API Server│
                  └──────────┬───────────┘
                             ├──────────────────────┐
                             ▼                      ▼
                     ┌──────────────┐       ┌──────────────┐
                     │  JSON Cache  │       │ Live APIs &  │
                     │  Database    │       │ Simulations  │
                     └──────────────┘       └──────────────┘
```

## Features

1. **Personal Health Risk Score**: Calculates an exposure hazard category (Low, Moderate, High, Severe) custom-matched to a user profile (Asthma, Allergies, Heart Disease, Elderly, Pregnancy) against localized AQI, pollen counts, and thermal anomalies.
2. **Pollen & UV Index Tracker**: Maps grass, tree, weed pollen (grains/m³) and UV radiation indices (0-11+) with dynamic sun safety recommendations.
3. **Wildfire Smoke Plume Overlay**: Simulates active fire spots using wind speed vectors to project gray smoke plume polygons directly downwind.
4. **Smart Alerts & Thresholds**: Allows custom triggers (e.g., notify if AQI > 120, or Noise > 75 dB). Connects to a notification center log and triggers HTML5 push alerts.
5. **Historical Trends Comparison**: A dedicated panel tab graphing current weekly/monthly AQI averages against prior cycles, coupled with a listing of the "Worst Recorded Days" logged by the database.
6. **Interactive Visualizers**:
   * **3D Volumetric View (Three.js)**: Displays a wireframe city model with three translucent height planes, floating pollution particles, and wind flow vectors scaling with speeds.
   * **2D GIS Map (Leaflet)**: Renders green sanctuary zones, heat islands, active fire zones, and smoke polygons.

## Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (v9 or higher)

### Setup Instructions

1. **Install all dependencies (workspace-wide):**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Rename or create a `.env` file in the `backend/` directory:
   ```bash
   PORT=5000
   
   # OpenWeatherMap Key (used for live weather and UV metrics)
   WEATHER_API_KEY=your_openweathermap_api_key_here
   
   # Optional NASA FIRMS API key (for wildfire detection; falls back to simulation if blank)
   FIRMS_API_KEY=your_nasa_firms_key_here
   ```

3. **Start the Development Servers:**
   Concurrently launch both the Express backend and React frontend:
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser to `http://localhost:5173`.
