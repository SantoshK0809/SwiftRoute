const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully")
    // mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   serverSelectionTimeoutMS: 5000,
    //   socketTimeoutMS: 45000,
    // });
  } catch (err) {
    console.log(`DB connection failed - ${err.message}`);
  }
}

module.exports = connectToDb;
