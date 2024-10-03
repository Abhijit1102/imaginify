import mongoose from 'mongoose';

console.log(process.env.MONGODB_URL)
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function connectToDatabase(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || '', {});
    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

