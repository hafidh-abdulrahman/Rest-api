const mongoose = require("mongoose");
//const config = require("config")
//const db = config.get("db")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully...");
  } catch (error) {
    console.log("database connected error...");
  }
};

module.exports = connectDB;
