const { currentDateTime, log } = require("../utils");
const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

  try {
    mongoose.Promise = global.Promise;

    await mongoose.connect(MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    log(`MongoDB connected`);
  } catch (err) {
    log(err);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
