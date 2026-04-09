const Captain = require("../models/captain.model.js");

async function handleCreateCaptian({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  if (
    !firstname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required.");
  }
  const captain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
}

module.exports = { handleCreateCaptian };
