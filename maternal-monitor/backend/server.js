require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const { getDb, run, all, get } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite DB
getDb().then(() => {
  console.log("✅ Local SQLite Database initialized");
}).catch((err) => {
  console.error("❌ Database initialization error:", err);
});

// ── Mothers ──────────────────────────────────────────────
app.post("/api/mothers", (req, res) => {
  try {
    const { name, age, lmp_date } = req.body;
    if (!name || !age || !lmp_date) return res.status(400).json({ error: "All fields required" });
    
    const result = run("INSERT INTO mothers (name, age, lmp_date) VALUES (?, ?, ?)", [name, parseInt(age), lmp_date]);
    const mother = get("SELECT * FROM mothers WHERE id = ?", [result.lastInsertRowid]);
    res.json(mother);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/mothers", (req, res) => {
  try {
    const mothers = all("SELECT * FROM mothers ORDER BY created_at DESC");
    res.json(mothers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/mothers/:id", (req, res) => {
  try {
    const mother = get("SELECT * FROM mothers WHERE id = ?", [req.params.id]);
    if (!mother) return res.status(404).json({ error: "Not found" });

    const milestones = all("SELECT * FROM milestones WHERE mother_id = ? ORDER BY week ASC", [req.params.id]);
    const insights   = all("SELECT * FROM ai_insights WHERE mother_id = ? ORDER BY created_at DESC LIMIT 5", [req.params.id]);

    const lmp = new Date(mother.lmp_date);
    const weeksDiff  = Math.floor((new Date() - lmp) / (7 * 24 * 60 * 60 * 1000));
    const currentWeek = Math.min(Math.max(weeksDiff, 1), 40);

    res.json({ ...mother, currentWeek, milestones, insights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Milestones ────────────────────────────────────────────
app.post("/api/milestones", (req, res) => {
  try {
    const { mother_id, week, category, description, status } = req.body;
    const result = run(
      "INSERT INTO milestones (mother_id, week, category, description, status) VALUES (?, ?, ?, ?, ?)",
      [mother_id, parseInt(week), category, description, status || "completed"]
    );
    const milestone = get("SELECT * FROM milestones WHERE id = ?", [result.lastInsertRowid]);
    res.json(milestone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/milestones/:id", (req, res) => {
  try {
    run("UPDATE milestones SET status = ? WHERE id = ?", [req.body.status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── AI Analysis ───────────────────────────────────────────
app.post("/api/ai/analyze", (req, res) => {
  try {
    const { mother_id } = req.body;
    const mother = get("SELECT * FROM mothers WHERE id = ?", [mother_id]);
    if (!mother) return res.status(404).json({ error: "Mother not found" });

    const milestones = all("SELECT * FROM milestones WHERE mother_id = ?", [mother_id]);
    const lmp = new Date(mother.lmp_date);
    const currentWeek    = Math.min(Math.max(Math.floor((new Date() - lmp) / (7 * 24 * 60 * 60 * 1000)), 1), 40);
    const completedCount = milestones.filter((m) => m.status === "completed").length;

    const expectedMilestones = Math.floor(currentWeek / 4);
    const completionRate = expectedMilestones > 0 ? completedCount / expectedMilestones : 1;
    const risk_level = completionRate < 0.4 ? "HIGH" : completionRate < 0.7 ? "MEDIUM" : "LOW";

    const insightMap = {
      LOW:    `Patient ${mother.name} is progressing well at week ${currentWeek}. Milestone completion rate is on track. Continue routine prenatal care.`,
      MEDIUM: `Patient ${mother.name} at week ${currentWeek} has some pending milestones. Closer monitoring is advised.`,
      HIGH:   `Patient ${mother.name} at week ${currentWeek} has a low milestone completion rate. Immediate clinical review is recommended.`,
    };
    const recMap = {
      LOW:    "Maintain current prenatal schedule and ensure next visit is within 2 weeks.",
      MEDIUM: "Review pending milestones and reschedule any missed appointments.",
      HIGH:   "Schedule an urgent consultation and conduct a comprehensive prenatal assessment.",
    };

    const insightText = insightMap[risk_level] + " " + recMap[risk_level];

    run(
      "INSERT INTO ai_insights (mother_id, week, insight, risk_level) VALUES (?, ?, ?, ?)",
      [mother_id, currentWeek, insightText, risk_level]
    );

    const result = { insight: insightMap[risk_level], risk_level, recommendation: recMap[risk_level] };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ── Dashboard Stats ───────────────────────────────────────
app.get("/api/stats", (req, res) => {
  try {
    const totalMothersRow = get("SELECT COUNT(*) as count FROM mothers");
    const highRiskRow     = get("SELECT COUNT(DISTINCT mother_id) as count FROM ai_insights WHERE risk_level = 'HIGH'");
    const completedRow    = get("SELECT COUNT(*) as count FROM milestones WHERE status = 'completed'");
    const recentInsights  = all(
      `SELECT ai_insights.*, mothers.name 
       FROM ai_insights 
       LEFT JOIN mothers ON ai_insights.mother_id = mothers.id 
       ORDER BY ai_insights.created_at DESC 
       LIMIT 5`
    );

    res.json({
      totalMothers: totalMothersRow ? totalMothersRow.count : 0,
      highRisk: highRiskRow ? highRiskRow.count : 0,
      completedMilestones: completedRow ? completedRow.count : 0,
      recentInsights,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
