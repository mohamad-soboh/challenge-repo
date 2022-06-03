//load mangoose
import  mongoose from 'mongoose';
//loading the config
import config from 'config';
//getting the URI attribute from that json file
const db = config.get("mongoURI");

const connectDB = () => {
  try {
     mongoose.connect(db as string);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    //exit process with failure
    process.exit(1);
  }
};


export default {
  connectDB
};
