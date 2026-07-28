const mongoose = require("mongoose");

const motherSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  age:      { type: Number, required: true },
  lmp_date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Mother", motherSchema);
