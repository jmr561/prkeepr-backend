require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/PRkeePR");

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hi" });
// });

// app.get("/hello", (req, res) => {
//   res.status(200).json({ message: "Hello" });
// });

const accountRoutes = require("./routes/account");
app.use(accountRoutes);

const prRoutes = require("./routes/pr");
app.use(prRoutes);

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3100, () => {
  console.log("Server has started");
});
