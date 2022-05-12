//load mangoose
const mongoose = require("mongoose");
//loading the config
const config = require("config");
//getting the URI attribute from that json file
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};


module.exports =connectDB;
