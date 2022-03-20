require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const accountRoutes = require("./routes/account");
app.use(accountRoutes);

const prRoutes = require("./routes/pr");
app.use(prRoutes);

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
