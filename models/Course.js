const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: { type: Number, unique: true,required: true},
  title: { type: String, required: true },
  description: { type: String },

  students: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Course", courseSchema);
