const mongoose = require("mongoose");

const aiInsightSchema = new mongoose.Schema({
  mother_id:  { type: mongoose.Schema.Types.ObjectId, ref: "Mother", required: true },
  week:       { type: Number },
  insight:    { type: String },
  risk_level: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
}, { timestamps: true });

module.exports = mongoose.model("AiInsight", aiInsightSchema);
