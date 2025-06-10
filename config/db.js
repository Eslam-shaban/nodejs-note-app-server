import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
