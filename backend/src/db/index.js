import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      "Databse Connected Succesfully",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("Mongo DB connection Failed !!!", error);
    process.exit(1);
  }
};

export default connectDB;
