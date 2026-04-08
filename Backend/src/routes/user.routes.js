const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  handleRegisterUser,
  handleLoginUser,
} = require("../controllers/user.controller.js");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password length must be of 6 characters"),
  ],
  handleRegisterUser,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password length must be of 6 characters"),
  ],
  handleLoginUser,
);

module.exports = router;
