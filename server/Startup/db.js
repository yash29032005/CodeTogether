const mongoose = require("mongoose");
function connectToDB() {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((err) => {
        console.log("MongoDB error", err);
      });
  } catch (error) {
    console.log("Unexpected Error", error);
  }
}

module.exports = connectToDB;
