const Ride = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require('crypto');

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

function generateOtp(num){
  let otp = '';
  for(let i = 0; i < num; i++){
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

