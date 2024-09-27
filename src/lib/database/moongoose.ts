import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

const  connection: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (connection.conn) return connection.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  if (!connection.promise) {
    connection.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',
      bufferCommands: false,
    });
  }

  connection.conn = await connection.promise;
  return connection.conn;
};
