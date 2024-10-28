import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected To Mongodb Database ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error in Mongodb: ${error}`.red.underline.bold);
  }
};

export default connectDB;
