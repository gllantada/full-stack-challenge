const express = require("express");
const { students, courses } = require("./routes");
const app = express();
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

connectDB();
app.use(express.json());

app.use("/api/students", students);
app.use("/api/courses", courses);

app.listen(PORT, async () => {
  
  console.log(`app listening on port  ${PORT}`);
});
