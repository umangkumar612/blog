import dotenv from "dotenv";
import { Resolver } from "node:dns/promises";
import mongoose from "mongoose";

dotenv.config();

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

if (!process.env.MONGO_URI) {
  console.error("MongoDB connection failed: MONGO_URI is missing in server/.env");
  process.exit(1);
}

try {
  console.log("Checking MongoDB connection...");
  await verifySrvRecord(process.env.MONGO_URI);

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000
  });

  console.log(`MongoDB is connected successfully: ${connection.connection.host}`);
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  process.exit(1);
}
