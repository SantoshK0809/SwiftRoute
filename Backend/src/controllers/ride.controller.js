const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");
const { getIo } = require("../../socket");

module.exports.handleCreateRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup: req.body.pickup,
      destination: req.body.destination,
      vehicleType: req.body.vehicleType,
    });

    // Send response to client immediately
    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: ride,
    });

    // Execute socket notifications asynchronously (don't await)
    (async () => {
      try {
        const pickupCoordinates = await mapsService.getAddressCoordinate(req.body.pickup);
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5);
        console.log("Captains in radius:", captainsInRadius);

       // console.log(`Ride is requested by ${ride.userId} from ${req.body.pickup} to ${req.body.destination}. Notifying captains in radius...`);

       // Populate user data to get fullname
       const userRide = await ride.populate("userId");
      //  console.log("Populated ride data:", userRide);

        const distanceTime = await mapsService.getDistanceAndTime(req.body.pickup, req.body.destination);

        const io = getIo();
        if (io && captainsInRadius.length > 0) {
          captainsInRadius.forEach(captain => {
            if (captain.socketId) {
              io.to(captain.socketId).emit("new-ride", {
                rideId: ride._id,
                userId: req.user._id,
                userName: `${userRide.userId.fullname.firstname} ${userRide.userId.fullname.lastname}`,
                pickup: req.body.pickup,
                destination: req.body.destination,
                fare: ride.fare,
                distance: (distanceTime.distance.value / 1000).toFixed(1) + " km",
                duration: Math.round(distanceTime.duration.value / 60) + " mins",
                vehicleType: req.body.vehicleType,
              });
              console.log(`Sent ride request to captain ${captain._id} on socket ${captain.socketId}`);
            }
          });
        }
      } catch (error) {
        console.error("Error notifying captains:", error);
      }
    })();

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
