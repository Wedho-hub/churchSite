/**
 * MongoDB Connection Fix Script
 * This script will help restore your MongoDB connectivity
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixMongoDB = () => {
  console.log('🔧 MongoDB Connection Fix');
  console.log('========================');
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  const envExists = fs.existsSync(envPath);
  
  console.log(`📁 .env file: ${envExists ? '✅ Found' : '❌ Missing'}`);
  
  if (!envExists) {
    console.log('\n📝 Creating .env file...');
    const envContent = `# MongoDB Connection String
# For local MongoDB (recommended for development)
MONGO_URI=mongodb://localhost:27017/church_db

# JWT Secret Key for authentication
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production

# Weather API Key (optional)
WEATHER_API_KEY=your_openweathermap_api_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
`;
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file created successfully!');
    } catch (error) {
      console.error('❌ Failed to create .env file:', error.message);
      return;
    }
  }
  
  // Create a simplified db.js file
  console.log('\n🔄 Creating simplified database connection...');
  
  const dbPath = path.join(__dirname, 'config', 'db.js');
  const simplifiedDbContent = `/**
 * Simplified MongoDB connection for local development
 * This version removes TLS settings that can cause local connection issues
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/church_db';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', mongoUri);
    
    // Simple connection options for local MongoDB
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
    console.log(\`📊 Database: \${mongoose.connection.name}\`);
    
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('💡 Make sure MongoDB is running locally');
    console.error('💡 Try: net start MongoDB (Windows) or brew services start mongodb-community (Mac)');
    process.exit(1);
  }
};

export default connectDB;
`;
  
  try {
    fs.writeFileSync(dbPath, simplifiedDbContent);
    console.log('✅ Simplified db.js created successfully!');
  } catch (error) {
    console.error('❌ Failed to create db.js:', error.message);
    return;
  }
  
  console.log('\n🎉 MongoDB connection fix completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Make sure MongoDB is running on your system');
  console.log('2. Run: node diagnose-db.js (to test connection)');
  console.log('3. Run: node seed.js (to create admin account)');
  console.log('4. Start your server: node server.js');
  console.log('\n💡 If you\'re using MongoDB Atlas (cloud), update MONGO_URI in .env with your Atlas connection string');
};

fixMongoDB();
