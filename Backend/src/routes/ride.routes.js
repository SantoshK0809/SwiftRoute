const express = require("express");
const router = express.Router();
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");

router.post(
  "/create",
  authUser,
  [
    body("pickup").notEmpty().withMessage("Pickup location is required"),
    body("destination")
      .notEmpty()
      .withMessage("Destination location is required"),
    body("vehicleType").notEmpty().withMessage("Vehicle type is required"),
    // body('rideType').notEmpty().withMessage('Ride type is required'),
    // body('paymentMethod').notEmpty().withMessage('Payment method is required'),
    // body('fare').notEmpty().withMessage('Fare is required'),
    // body('distance').notEmpty().withMessage('Distance is required'),
    // body('duration').notEmpty().withMessage('Duration is required'),
    // body('eta').notEmpty().withMessage('ETA is required'),
    // body('vehicleId').notEmpty().withMessage('Vehicle ID is required'),
    // body('driverId').notEmpty().withMessage('Driver ID is required'),
    // body('status').notEmpty().withMessage('Status is required'),
    // body('createdAt').notEmpty().withMessage('Created at is required'),
    // body('updatedAt').notEmpty().withMessage('Updated at is required'),
  ],
  rideController.handleCreateRide,
);

router.get(
  "/fares",
  authUser,
  query("pickup").notEmpty().withMessage("Pickup location is required"),
  query("destination")
    .notEmpty()
    .withMessage("Destination location is required"),
  rideController.handleGetFares,
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id."),
  rideController.confirmRide,
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id."),
  query("otp").notEmpty().withMessage("OTP is required"),
  rideController.startRide,
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id."),
  rideController.endRide,
);

module.exports = router;
