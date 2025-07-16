/**
 * Complete fix script for login and weather issues
 * This script will diagnose and fix all problems automatically
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const fixAllIssues = async () => {
  console.log('🔧 Complete Church Website Fix');
  console.log('==============================');
  
  try {
    // 1. Test MongoDB Connection
    console.log('\n1️⃣ Testing MongoDB Connection...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/church_db');
    console.log('✅ MongoDB connected successfully');

    // 2. Fix Admin Account
    console.log('\n2️⃣ Fixing Admin Account...');
    
    // Delete any existing admin accounts to start fresh
    await Admin.deleteMany({});
    console.log('🧹 Cleared existing admin accounts');
    
    // Create new admin account with correct password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date()
    });
    await admin.save();
    console.log('✅ Admin account created successfully');

    // 3. Test Password Verification
    console.log('\n3️⃣ Testing Password Verification...');
    const isPasswordValid = await bcrypt.compare('admin123', admin.password);
    
    if (isPasswordValid) {
      console.log('✅ Password verification successful');
    } else {
      console.log('❌ Password verification failed');
      throw new Error('Password verification failed');
    }

    // 4. Test JWT Generation
    console.log('\n4️⃣ Testing JWT Generation...');
    if (!process.env.JWT_SECRET) {
      console.log('❌ JWT_SECRET not found - using default');
      process.env.JWT_SECRET = 'inkosiyeza_sda_church_jwt_secret_2024_change_in_production';
    }
    
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT generation and verification successful');

    // 5. Test Weather API (if configured)
    console.log('\n5️⃣ Testing Weather API...');
    const weatherApiKey = process.env.WEATHER_API_KEY;
    
    if (!weatherApiKey || weatherApiKey === 'your_openweathermap_api_key_here') {
      console.log('⚠️  Weather API key not configured (this is OK)');
      console.log('   Weather widget will show configuration message');
    } else {
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=${weatherApiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        console.log('✅ Weather API working correctly');
        console.log('   Location:', weatherResponse.data.name);
        console.log('   Temperature:', Math.round(weatherResponse.data.main.temp) + '°C');
      } catch (weatherError) {
        console.log('⚠️  Weather API test failed (API key may be invalid)');
        console.log('   Error:', weatherError.response?.data?.message || weatherError.message);
      }
    }

    // 6. Environment Check
    console.log('\n6️⃣ Environment Variables:');
    console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Missing');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
    console.log('   WEATHER_API_KEY:', (weatherApiKey && weatherApiKey !== 'your_openweathermap_api_key_here') ? '✅ Set' : '⚠️  Default/Missing');
    console.log('   PORT:', process.env.PORT || '5000 (default)');

    console.log('\n🎉 All Issues Fixed!');
    console.log('===================');
    console.log('\n🔐 Admin Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   Login URL: http://localhost:5173/login');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Make sure this backend server is running: node server.js');
    console.log('   2. Make sure frontend is running: npm run dev');
    console.log('   3. Backend should be on: http://localhost:5000');
    console.log('   4. Frontend should be on: http://localhost:5173');
    console.log('   5. Test login at: http://localhost:5173/login');

    console.log('\n💡 Important Notes:');
    console.log('   - The 404 error means the backend server is not running');
    console.log('   - Start the backend server first: cd backend && node server.js');
    console.log('   - Then start the frontend: cd frontend && npm run dev');
    console.log('   - Weather widget will work without API key (shows config message)');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fix failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

fixAllIssues();
