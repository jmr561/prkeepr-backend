const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
router.use(formidable());
const User = require("../models/User");

router.put("/update", async (req, res) => {
  console.log("route : /update/");
  console.log(req.fields);

  try {
    const userID = req.fields.id;
    const frontSquatPR = req.fields.frontSquatPR;
    const overheadSquatPR = req.fields.overheadSquatPR;
    const backSquatPR = req.fields.backSquatPR;
    const strictPressPR = req.fields.strictPressPR;
    const pushPressPR = req.fields.pushPressPR;
    const pushJerkPR = req.fields.pushJerkPR;
    const deadliftPR = req.fields.deadliftPR;
    const cleanPR = req.fields.cleanPR;
    const powerCleanPR = req.fields.powerCleanPR;
    const cleanJerkPR = req.fields.cleanJerkPR;
    const hangPowerSnatchPR = req.fields.hangPowerSnatchPR;
    const powerSnatchPR = req.fields.powerSnatchPR;
    const squatSnatchPR = req.fields.squatSnatchPR;
    const maxPullupsPR = req.fields.maxPullupsPR;
    const notes = req.fields.notes;

    const userToUpdate = await User.findByIdAndUpdate(
      userID,
      {
        prData: {
          frontSquat: frontSquatPR,
          overheadSquat: overheadSquatPR,
          backSquat: backSquatPR,
          strictPress: strictPressPR,
          pushPress: pushPressPR,
          pushJerk: pushJerkPR,
          deadLift: deadliftPR,
          clean: cleanPR,
          powerClean: powerCleanPR,
          cleanJerk: cleanJerkPR,
          hangPowerSnatch: hangPowerSnatchPR,
          powerSnatch: powerSnatchPR,
          squatSnatch: squatSnatchPR,
          maxPullups: maxPullupsPR,
          notes: notes,
        },
      },
      { new: true, runValidators: true }
    );

    if (userToUpdate) {
      res.status(200).json({
        message: "PRs successfully updated",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
