/**
 * MongoDB Connection Diagnostic Script
 * Run this to diagnose and fix MongoDB connection issues
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const diagnoseConnection = async () => {
  console.log('🔍 MongoDB Connection Diagnostics');
  console.log('================================');
  
  // Check environment variables
  console.log('\n📋 Environment Variables:');
  console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Found' : '❌ Missing');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');
  
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.log('\n❌ No MongoDB connection string found!');
    console.log('\n💡 Solutions:');
    console.log('1. Check if .env file exists in backend directory');
    console.log('2. Add this line to your .env file:');
    console.log('   MONGO_URI=mongodb://localhost:27017/church_db');
    console.log('3. If using MongoDB Atlas, use your Atlas connection string');
    return;
  }
  
  console.log('\n🔗 Connection String Analysis:');
  const isLocal = mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1');
  const isAtlas = mongoUri.includes('mongodb+srv://');
  
  console.log('Type:', isLocal ? 'Local MongoDB' : isAtlas ? 'MongoDB Atlas' : 'Other');
  console.log('URI (masked):', mongoUri.replace(/\/\/.*@/, '//***:***@'));
  
  // Test connection with different options
  console.log('\n🔄 Testing Connection...');
  
  const connectionOptions = [
    // Option 1: Minimal options (for local MongoDB)
    {
      name: 'Minimal (Local MongoDB)',
      options: {}
    },
    // Option 2: Standard options
    {
      name: 'Standard',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    // Option 3: With TLS (for Atlas)
    {
      name: 'With TLS (Atlas)',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true,
        tlsAllowInvalidCertificates: true
      }
    }
  ];
  
  for (const config of connectionOptions) {
    try {
      console.log(`\n🧪 Testing: ${config.name}`);
      
      // Close any existing connection
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      
      await mongoose.connect(mongoUri, config.options);
      
      console.log(`✅ SUCCESS with ${config.name}!`);
      console.log(`📊 Connected to database: ${mongoose.connection.name}`);
      console.log(`🏠 Host: ${mongoose.connection.host}`);
      console.log(`🔌 Port: ${mongoose.connection.port}`);
      
      // Test a simple operation
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`📁 Collections found: ${collections.length}`);
      
      await mongoose.disconnect();
      console.log('\n🎉 Connection test completed successfully!');
      console.log(`💡 Use "${config.name}" configuration in your db.js file`);
      return;
      
    } catch (error) {
      console.log(`❌ FAILED with ${config.name}: ${error.message}`);
    }
  }
  
  console.log('\n❌ All connection attempts failed!');
  console.log('\n🔧 Troubleshooting Steps:');
  console.log('1. For Local MongoDB:');
  console.log('   - Ensure MongoDB is installed and running');
  console.log('   - Check if MongoDB service is started');
  console.log('   - Try: net start MongoDB (Windows) or brew services start mongodb-community (Mac)');
  console.log('');
  console.log('2. For MongoDB Atlas:');
  console.log('   - Check your connection string is correct');
  console.log('   - Verify your IP address is whitelisted');
  console.log('   - Ensure username/password are correct');
  console.log('');
  console.log('3. General:');
  console.log('   - Check firewall settings');
  console.log('   - Verify network connectivity');
  console.log('   - Try connecting with MongoDB Compass');
};

// Run diagnostics
diagnoseConnection().catch(console.error);
