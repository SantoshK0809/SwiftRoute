const express = require("express");
const router = express.Router();
const {
  handleGetAddressCoordinate,
  handleGetDistanceAndTime,
  handleGetSuggestion
} = require("../controllers/map.controller");
const { authUser } = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

router.get(
  "/get-coordinate",
  [query("address").notEmpty().withMessage("Address is required")],
  authUser,
  handleGetAddressCoordinate,
);

router.get(
  "/get-distance",
  [
    query("pickup").notEmpty().withMessage("Pickup is required"),
    query("destination").notEmpty().withMessage("Destination is required"),
  ],
  authUser,
  handleGetDistanceAndTime,
);

router.get(
  "/get-suggestions",
  [query("address").notEmpty().withMessage("Address is required")],
  authUser,
  handleGetSuggestion,
);

module.exports = router;
