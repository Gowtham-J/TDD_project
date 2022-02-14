const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://Gowtham:9986677227@cluster0.qroug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log("connected to manog db");
  } catch (error) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
}

module.exports = { connect };
