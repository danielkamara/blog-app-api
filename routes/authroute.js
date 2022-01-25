const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const authenticateToken = require("../middleware/jwt");

const authRouter = express.Router();

authRouter.get("/", authenticateToken, (req, res) => {
  User.find((error, result) => {
    if (error) {
      res.status(400).json({ message: error.message });
    }
    if (result === null || result === undefined || result === []) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ data: result });
  });
});

authRouter.post("/register", async (req, res) => {
  let user = req.body;
  let password = user.password;
  let salt = Number(process.env.SALT);
  if (!password || !user.username) {
    res.status(400).json({ message: "Please have a username AND password" });
  }
  let hashPassword = await bcrypt.hash(password, salt);
  user.password = hashPassword;
  User.create(user, (error, result) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    if (result === undefined || result === null) {
      return res.status(400).json({ message: "Please make a unique user" });
    }
    res.status(200).json({ data: result });
  });
});

authRouter.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!password || !username) {
    res.status(400).json({ message: "Please have a username AND password" });
  }
  User.findOne({ username: username }, (error, result) => {
    if (error) {
      res.status(400).json({ message: error.message });
    }
    if (result === null || result === undefined) {
      res.status(404).json({ message: "User Not Found" });
    }
    bcrypt.compare(password, result.password, (error, matching) => {
      if (matching === false) {
        res
          .status(403)
          .json({ message: "Either username or password is incorrect" });
      }

      res.setHeader("Authorization", generateAccessToken);
      res.status(200).json({ data: result });
    });
  });
});

module.exports = authRouter;
