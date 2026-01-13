import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    const connectionStatus = await mongoose.connect(config.mongoDBurl);

    console.log(`MongoDb Connected :${connectionStatus.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
