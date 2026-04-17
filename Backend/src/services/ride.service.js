const Ride = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

  // mapService returns distance in meters and duration in seconds
  const distanceInKm = distanceTime.distance.value / 1000;
  const durationInMins = distanceTime.duration.value / 60;

  // Define standard rate cards
  // Base fare + (per km rate * distance) + (per min rate * duration)
  const fareRates = {
    auto: {
      base: 30,
      perKm: 10,
      perMin: 2,
    },
    car: {
      base: 50,
      perKm: 15,
      perMin: 3,
    },
    motorcycle: {
      base: 20,
      perKm: 5,
      perMin: 1.5,
    },
  };

  const calculatedFares = {
    auto: Math.round(
      fareRates.auto.base +
        fareRates.auto.perKm * distanceInKm +
        fareRates.auto.perMin * durationInMins,
    ),
    car: Math.round(
      fareRates.car.base +
        fareRates.car.perKm * distanceInKm +
        fareRates.car.perMin * durationInMins,
    ),
    motorcycle: Math.round(
      fareRates.motorcycle.base +
        fareRates.motorcycle.perKm * distanceInKm +
        fareRates.motorcycle.perMin * durationInMins,
    ),
  };

  return calculatedFares;
}

module.exports.getFare = getFare;

function generateOtp(num) {
  let otp = "";
  for (let i = 0; i < num; i++) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
}

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  try {
    const fare = await getFare(pickup, destination);
    const ride = await Ride.create({
      userId,
      pickup,
      destination,
      vehicleType,
      otp: generateOtp(6),
      fare: fare[vehicleType],
    });
    return ride;
  } catch (error) {
    throw error;
  }
};

module.exports.confirmRide = async (rideId, captainId) => {
  try {
    if (!rideId || !captainId) {
      throw new Error("Ride id and captain id are required");
    }

    await Ride.findOneAndUpdate(
      { _id: rideId },
      {
        status: "accepted",
        captainId: captainId,
      },
    );

    const ride = await Ride.findById({ _id: rideId })
      .populate("userId")
      .populate("captainId")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  } catch (error) {
    throw error;
  }
};

module.exports.startRide = async (rideId, otp) => {
  try {
    if (!rideId || !otp) {
      throw new Error("Ride id and otp are required");
    }

    const ride = await Ride.findById({ _id: rideId })
      .populate("userId")
      .populate("captainId")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.otp !== otp) {
      throw new Error("Invalid otp");
    }

    ride.status = "ongoing";
    await ride.save();

    return ride;
  } catch (error) {
    throw error;
  }
};

module.exports.endRide = async ({ rideId, captainId }) => {
  try {
    if (!rideId || !captainId) {
      throw new Error("Ride id and captain id are required");
    }

    const ride = await Ride.findOne({ _id: rideId, captainId: captainId });

    if (!ride || ride.status !== "ongoing") {
      throw new Error("Ride not found or not ongoing");
    }

    const updatedRide = await Ride.findOneAndUpdate(
      { _id: rideId },
      { status: "completed" },
      { new: true },
    )
      .populate("userId")
      .populate("captainId");

    return updatedRide;
  } catch (error) {
    throw error;
  }
};
