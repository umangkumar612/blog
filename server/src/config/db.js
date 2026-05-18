import { Resolver } from "node:dns/promises";
import mongoose from "mongoose";

const verifySrvRecord = async (uri) => {
  if (!uri.startsWith("mongodb+srv://")) return;

  const { hostname } = new URL(uri);
  const resolver = new Resolver();
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      resolver.cancel();
      reject(new Error(`DNS lookup timed out for MongoDB Atlas host: ${hostname}`));
    }, 10000);
  });

  await Promise.race([resolver.resolveSrv(`_mongodb._tcp.${hostname}`), timeout]);
};

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Create server/.env and add your MongoDB connection string.");
    }

    console.log("Connecting to MongoDB...");
    await verifySrvRecord(process.env.MONGO_URI);

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log(`MongoDB is connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};
