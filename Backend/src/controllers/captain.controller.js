const Captain = require("../models/captain.model.js");
const { handleCreateCaptian } = require("../services/captain.service.js");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js");

async function handleRegisterCaptian(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input",
        erros: errors.array(),
      });
    }

    const { fullname, email, password, vehicle } = req.body;

    const captain = await Captain.findOne({ email });
    if (captain) {
      return res.status(409).json({ message: "Captain already exists." });
    }

    const hashedPassword = await Captain.hashPassword(password);

    const newCaptain = await handleCreateCaptian({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      password: hashedPassword,
      email,
      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    });

    res.status(201).json({
      message: "Captain registered successfully.",
      newCaptain: {
        _id: newCaptain._id,
        fullname: newCaptain.fullname,
        email: newCaptain.email,
        vehicle: newCaptain.vehicle,
      },
    });
  } catch (err) {
    console.log(`Captain Registration failed. Error message - ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleLoginCaptain(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input",
        erros: errors.array(),
      });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await captain.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({
      message: "Captain loggedIn successfully",
    });
  } catch (err) {
    console.log(`Failed in login captian. Error message ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleGetCaptain(req, res) {
  try {
    res.status(200).json({
      message: "Captain profile retrieved successfully.",
      captain: req.captain,
    });
  } catch (err) {
    console.log(`Failed in getting captian. Error message ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleLogoutCaptain(req, res) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const blacklisted = await BlacklistToken.create({ token });

    res.clearCookie("token");

    res
      .status(200)
      .json({ message: "Captain logged out successfully.", blacklisted });
  } catch (err) {
    console.log(`Failed in getting captian. Error message ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  handleRegisterCaptian,
  handleLoginCaptain,
  handleGetCaptain,
  handleLogoutCaptain,
};
