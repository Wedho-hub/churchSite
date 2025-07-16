/**
 * Comprehensive fix script for login and weather issues
 * This script will:
 * 1. Verify and fix admin account creation
 * 2. Test login functionality
 * 3. Check weather API configuration
 * 4. Provide detailed diagnostics
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './backend/.env' });

// Import models (adjust path as needed)
import Admin from './backend/models/Admin.js';

const runDiagnostics = async () => {
  console.log('🔧 Church Website Issue Diagnostics & Fix');
  console.log('==========================================');
  
  try {
    // 1. Test MongoDB Connection
    console.log('\n1️⃣ Testing MongoDB Connection...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/church_db');
    console.log('✅ MongoDB connected successfully');

    // 2. Check/Fix Admin Account
    console.log('\n2️⃣ Checking Admin Account...');
    let admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('❌ Admin account not found - Creating new admin...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      admin = new Admin({
        username: 'admin',
        password: hashedPassword,
        createdAt: new Date()
      });
      await admin.save();
      console.log('✅ Admin account created successfully');
    } else {
      console.log('✅ Admin account found');
    }

    // 3. Test Password Verification
    console.log('\n3️⃣ Testing Password Verification...');
    const isPasswordValid = await bcrypt.compare('admin123', admin.password);
    
    if (!isPasswordValid) {
      console.log('❌ Password verification failed - Fixing password...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await Admin.findOneAndUpdate(
        { username: 'admin' },
        { password: hashedPassword }
      );
      console.log('✅ Admin password fixed');
    } else {
      console.log('✅ Password verification successful');
    }

    // 4. Test JWT Generation
    console.log('\n4️⃣ Testing JWT Generation...');
    if (!process.env.JWT_SECRET) {
      console.log('❌ JWT_SECRET not found in environment variables');
    } else {
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ JWT generation and verification successful');
      console.log('   Admin ID:', decoded.adminId);
    }

    // 5. Test Weather API
    console.log('\n5️⃣ Testing Weather API...');
    const weatherApiKey = process.env.WEATHER_API_KEY;
    
    if (!weatherApiKey || weatherApiKey === 'your_openweathermap_api_key_here') {
      console.log('❌ Weather API key not configured');
      console.log('💡 To fix weather:');
      console.log('   1. Get API key from https://openweathermap.org/api');
      console.log('   2. Update WEATHER_API_KEY in backend/.env file');
    } else {
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=${weatherApiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        console.log('✅ Weather API working correctly');
        console.log('   Location:', weatherResponse.data.name);
        console.log('   Temperature:', Math.round(weatherResponse.data.main.temp) + '°C');
      } catch (weatherError) {
        console.log('❌ Weather API test failed:', weatherError.response?.data?.message || weatherError.message);
      }
    }

    // 6. Environment Variables Summary
    console.log('\n6️⃣ Environment Variables Check:');
    console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Missing');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
    console.log('   WEATHER_API_KEY:', (process.env.WEATHER_API_KEY && process.env.WEATHER_API_KEY !== 'your_openweathermap_api_key_here') ? '✅ Set' : '❌ Missing/Default');
    console.log('   PORT:', process.env.PORT || '5000 (default)');

    // 7. Final Summary
    console.log('\n🎉 Diagnostics Complete!');
    console.log('========================');
    console.log('\n🔐 Admin Login Credentials:');
    console.log('   URL: http://localhost:5173/login');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
    console.log('\n🌤️ Weather Status:');
    if (!weatherApiKey || weatherApiKey === 'your_openweathermap_api_key_here') {
      console.log('   Status: ❌ Not configured');
      console.log('   Action: Get API key from openweathermap.org');
    } else {
      console.log('   Status: ✅ Configured');
    }

    console.log('\n🚀 Next Steps:');
    console.log('   1. Start backend: cd backend && node server.js');
    console.log('   2. Start frontend: cd frontend && npm run dev');
    console.log('   3. Test login at: http://localhost:5173/login');
    
    if (!weatherApiKey || weatherApiKey === 'your_openweathermap_api_key_here') {
      console.log('   4. Configure weather API key for weather widget');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Diagnostics failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

runDiagnostics();
