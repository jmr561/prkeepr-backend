const express = require("express");
const router = express.Router();

router.get("/pr/test", (req, res) => {
  res.json({ message: "test" });
});

// router.post("/student/create", (req, res) => {
//   res.json({ message: "Create Student" });
// });

module.exports = router;
