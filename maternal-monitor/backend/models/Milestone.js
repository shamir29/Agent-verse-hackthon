const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  mother_id:   { type: mongoose.Schema.Types.ObjectId, ref: "Mother", required: true },
  week:        { type: Number, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  status:      { type: String, enum: ["completed", "pending", "missed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Milestone", milestoneSchema);
