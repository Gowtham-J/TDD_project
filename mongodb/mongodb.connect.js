const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to manog db");
  } catch (error) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
}

module.exports = { connect };
