# 🤱 MaternalAI - AI-Powered Maternal Development Milestone Monitor

A full-stack web application for monitoring maternal health milestones during pregnancy using AI-powered insights.

## Features
- 📋 Register and track pregnant mothers
- 📅 Log development milestones by pregnancy week
- 🤖 AI-powered health insights and risk assessment (GPT-3.5)
- 📊 Visual progress charts and trimester distribution
- 📌 Pre-built milestone templates for all 40 weeks
- 🚨 Risk level classification (LOW / MEDIUM / HIGH)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React + Recharts |
| Backend | Node.js + Express |
| Database | SQLite (better-sqlite3) |
| AI | OpenAI GPT-3.5 |

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
# Edit .env and add your OpenAI API key (optional - works without it)
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## Usage
1. Open http://localhost:3000
2. Click **+ Register** to add a mother with her LMP date
3. Go to **Templates** tab to quickly add standard milestones
4. Use **+ Add Milestone** to log custom milestones
5. Click **🤖 Run AI Analysis** to get AI health insights
6. View **📈 Progress** chart for milestone history

## OpenAI API Key (Optional)
- Without API key: System uses smart fallback insights
- With API key: Full GPT-3.5 powered personalized analysis
- Add key to `backend/.env`: `OPENAI_API_KEY=sk-...`

## Project Structure
```
maternal-monitor/
├── backend/
│   ├── server.js      # Express API + all routes
│   ├── db.js          # SQLite schema setup
│   ├── .env           # API keys config
│   └── package.json
└── frontend/
    └── src/
        ├── App.js              # Router + Navbar
        ├── App.css             # Global styles
        └── pages/
            ├── Dashboard.js    # Stats + mothers list
            ├── RegisterMother.js
            └── MotherProfile.js # Milestones + AI
```
