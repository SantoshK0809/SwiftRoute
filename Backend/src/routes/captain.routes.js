const express = require("express");
const router = express.Router();
const {
  handleRegisterCaptian,
  handleLoginCaptain,
  handleGetCaptain,
  handleLogoutCaptain,
} = require("../controllers/captain.controller.js");
const { body } = require("express-validator");
const { authCaptain } = require("../middlewares/auth.middleware.js");

console.log(authCaptain);

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password length must be of 6 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Invalid vehicle number plate."),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Invalid vehicle capacity"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Invalid vehicle"),
  ],
  handleRegisterCaptian,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password length must be of 6 characters"),
  ],
  handleLoginCaptain,
);

router.get("/profile", authCaptain, handleGetCaptain);

router.post("/logout", authCaptain, handleLogoutCaptain);

module.exports = router;
