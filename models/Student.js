const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Student", studentSchema);
