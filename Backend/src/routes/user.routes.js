const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  handleRegisterUser,
  handleLoginUser,
  handleGetUserProfile,
  handleUserLogout,
  handleUpdateUser,
} = require("../controllers/user.controller.js");
const { authUser } = require("../middlewares/auth.middleware.js");

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

router.get("/profile", authUser, handleGetUserProfile);

router.get("/logout", authUser, handleUserLogout);

router.patch("/update-profile", authUser, handleUpdateUser);

module.exports = router;
