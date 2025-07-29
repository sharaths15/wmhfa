import { config } from '../config/env';
import mongoose from 'mongoose';

const MONGO_URI = config.DATABASE_URL;

if (!MONGO_URI) {
  console.error(
    'FATAL ERROR: DATABASE_URL is not defined in the environment variables.',
  );
  process.exit(1);
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
