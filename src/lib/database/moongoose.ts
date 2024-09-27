import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare a global type to avoid using `any`
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Initialize cached connection as a global variable
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: "imaginifiy",
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
};
