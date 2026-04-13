const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");
const mapRoutes = require("./routes/maps.routes.js");

connectToDb();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);
app.use("/api/map", mapRoutes);

module.exports = app;
