/**
 * Database connection setup using Mongoose.
 * Simplified connection that works with both local and cloud MongoDB.
 * Removes deprecated options and handles connection errors gracefully.
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/church_db';
    
    console.log('🔄 Connecting to MongoDB...');
    
    // Determine connection type for logging
    const isLocalMongo = mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1');
    console.log(`📍 Connection type: ${isLocalMongo ? 'Local' : 'Cloud'}`);
    
    // Simple connection without deprecated options
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);
    
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    
    // Provide specific help based on error type
    if (err.message.includes('ENOTFOUND') || err.message.includes('querySrv')) {
      console.error('🔍 DNS Resolution Error - This usually means:');
      console.error('   1. Invalid MongoDB Atlas connection string');
      console.error('   2. Network connectivity issues');
      console.error('   3. Incorrect cluster name in connection string');
      console.error('');
      console.error('💡 Solutions:');
      console.error('   - Switch to local MongoDB: MONGO_URI=mongodb://localhost:27017/church_db');
      console.error('   - Or fix your Atlas connection string in .env file');
      console.error('   - Check if your Atlas cluster is running');
    } else if (err.message.includes('authentication failed')) {
      console.error('🔐 Authentication Error:');
      console.error('   - Check username and password in connection string');
      console.error('   - Verify database user permissions in Atlas');
    } else if (err.message.includes('timeout')) {
      console.error('⏱️ Connection Timeout:');
      console.error('   - Check network connectivity');
      console.error('   - Verify IP whitelist in Atlas');
    }
    
    console.error('');
    console.error('🚀 Quick Fix: Use local MongoDB for development');
    console.error('   Update your .env file with: MONGO_URI=mongodb://localhost:27017/church_db');
    
    // Don't exit in development, allow server to start
    if (process.env.NODE_ENV !== 'production') {
      console.error('⚠️  Server starting without database connection (development mode)');
      return;
    }
    
    process.exit(1);
  }
};

export default connectDB;
