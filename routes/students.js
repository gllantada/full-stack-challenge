const express = require("express");
const router = express.Router();
const Student = require("./../models/Student");

router.get("/", async function (req, res) {
  const students = await Student.find({});
  res.send(students);
});

router.post("/", async function (req, res) {
  const { first_name, last_name, courses } = req.body;
  const newStudent = new Student({ first_name, last_name, courses });
  await newStudent
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send({ error: err.message }));
});

router.patch("/:id/edit", async function (req, res) {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (student) res.send({ message: "Course updated" });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/:id/full-data", async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id }).populate(
      "courses"
    );

    res.send(student);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { first_name, last_name, limit } = req.query;
  const searchResults = await Student.find({
    $and: [
      {
        first_name: {
          $regex: new RegExp(first_name, "i"),
        },
      },
      {
        last_name: { $regex: new RegExp(last_name, "i") },
      },
    ],
  })
    .limit(limit || 5)
    .populate("courses");
  res.send({ results: { ...searchResults } });
});

module.exports = router;
