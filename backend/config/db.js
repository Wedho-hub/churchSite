/**
 * Database connection setup using Mongoose.
 * Connects to MongoDB using the connection string from environment variables.
 * Logs success or error and exits process on failure.
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Mongo Error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
