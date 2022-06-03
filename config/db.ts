//load mangoose
import  mongoose from 'mongoose';
//loading the config
import config from 'config';
//getting the URI attribute from that json file
const db = config.get("mongoURI");

const connectDB = () => {
  try {
     mongoose.connect(db);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};


export default {
  connectDB
};
