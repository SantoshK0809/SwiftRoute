const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.handleCreateRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const ride = await rideService.createRide(req.body);
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup: req.body.pickup,
      destination: req.body.destination,
      vehicleType: req.body.vehicleType,
    });

    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: ride,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.handleGetFares = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const fares = await rideService.getFare(
      req.query.pickup,
      req.query.destination,
    );
    return res.status(200).json({ success: true, data: fares });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
