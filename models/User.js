const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  account: {
    firstName: String,
    lastName: String,
  },
  prData: {
    frontSquat: { type: Number, min: 0, max: 500, default: 0 },
    overheadSquat: { type: Number, min: 0, max: 500, default: 0 },
    backSquat: { type: Number, min: 0, max: 500, default: 0 },
    strictPress: { type: Number, min: 0, max: 500, default: 0 },
    pushPress: { type: Number, min: 0, max: 500, default: 0 },
    pushJerk: { type: Number, min: 0, max: 500, default: 0 },
    deadLift: { type: Number, min: 0, max: 500, default: 0 },
    clean: { type: Number, min: 0, max: 500, default: 0 },
    powerClean: { type: Number, min: 0, max: 500, default: 0 },
    cleanJerk: { type: Number, min: 0, max: 500, default: 0 },
    hangPowerSnatch: { type: Number, min: 0, max: 500, default: 0 },
    powerSnatch: { type: Number, min: 0, max: 500, default: 0 },
    squatSnatch: { type: Number, min: 0, max: 500, default: 0 },
    maxPullups: { type: Number, min: 0, max: 500, default: 0 },
    notes: { type: String, default: "", maxLength: 300 },
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
