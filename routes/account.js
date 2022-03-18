const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
router.use(formidable());
const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  console.log("route : /signup");
  console.log(req.fields);

  try {
    const usernameAlreadyExists = await User.findOne({
      username: req.fields.username,
    });

    const emailAlreadyExists = await User.findOne({
      email: req.fields.email,
    });

    if (usernameAlreadyExists) {
      console.log(usernameAlreadyExists);
      res.status(400).json({
        message: "This username is already in use",
      });
    } else if (emailAlreadyExists) {
      res.status(400).json({
        message: "This email address is already linked to an account",
      });
    } else {
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        username: req.fields.username,
        email: req.fields.email,
        account: {
          firstName: req.fields.firstName,
          lastName: req.fields.lastName,
        },
        token: token,
        hash: hash,
        salt: salt,
      });

      await newUser.save();
      res.json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.fields.username,
    });

    if (user) {
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );

      if (user.hash === newHash) {
        res.json({
          message: "Successfully logged in",
          _id: user._id,
          token: user.token,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
