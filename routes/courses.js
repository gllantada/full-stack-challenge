const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { courses } = require(".");

router.get("/", async function (req, res) {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post("/", async function (req, res) {
  const { title, description, students, code } = req.body;
  const newCourse = new Course({ title, description, students, code });
  await newCourse
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send({ error: err.message }));
});

router.patch("/:id/edit", async function (req, res) {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (course) res.send({ message: "Course updated" });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/:id/full-data", async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id }).populate(
      "students"
    );

    res.send(course);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { title, description, limit } = req.query;
  const searchResults = await Course.find({
    $and: [
      {
        title: {
          $regex: new RegExp(title, "i"),
        },
      },
      {
        description: { $regex: new RegExp(description, "i") },
      },
    ],
  })
    .limit(limit || 5)
    .populate("students");
  res.send({ results: { ...searchResults } });
});

module.exports = router;
