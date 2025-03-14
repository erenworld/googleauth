import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "./env.js";

const { MONGO_DB_URI } = config;

// Pour mongoose connection
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("Failed to connect to MongoDB with Mongoose:", error);
    process.exit(1);
  }
};

export const connectMongoDB = async () => {
  const client = new MongoClient(MONGO_DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB with MongoDB client");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB with MongoDB client:", error);
    await client.close();
    throw error;
  }
};
