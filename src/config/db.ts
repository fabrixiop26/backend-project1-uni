import mongoose from "mongoose";
import { config } from "dotenv";
//assume its a .env file by default
config();

const connectdb = async () => {
  const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@backendproyects.max0n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URI);
    console.log("Connected to database");
  } catch (e: any) {
    console.error(e);
    process.exit(1);
  }
};

export default connectdb;
