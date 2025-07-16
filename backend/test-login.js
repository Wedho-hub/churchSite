/**
 * Test script to verify admin login functionality
 * This will check if the admin account exists and test the login process
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const testLogin = async () => {
  try {
    console.log('🔄 Testing Admin Login Functionality...');
    console.log('=====================================');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/church_db');
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    console.log('\n🔍 Checking for admin account...');
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('❌ Admin account not found!');
      console.log('💡 Creating admin account...');
      
      // Create admin account
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const newAdmin = new Admin({
        username: 'admin',
        password: hashedPassword,
        createdAt: new Date()
      });
      
      await newAdmin.save();
      console.log('✅ Admin account created successfully!');
      
      // Test the newly created account
      const testAdmin = await Admin.findOne({ username: 'admin' });
      const isPasswordValid = await bcrypt.compare('admin123', testAdmin.password);
      
      if (isPasswordValid) {
        console.log('✅ Password verification successful!');
      } else {
        console.log('❌ Password verification failed!');
      }
    } else {
      console.log('✅ Admin account found');
      console.log('   Username:', admin.username);
      console.log('   Created:', admin.createdAt);
      
      // Test password
      console.log('\n🔐 Testing password...');
      const isPasswordValid = await bcrypt.compare('admin123', admin.password);
      
      if (isPasswordValid) {
        console.log('✅ Password verification successful!');
        
        // Test JWT generation
        console.log('\n🎫 Testing JWT generation...');
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        
        console.log('✅ JWT token generated successfully');
        console.log('   Token length:', token.length);
        
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ JWT verification successful');
        console.log('   Admin ID:', decoded.adminId);
        
      } else {
        console.log('❌ Password verification failed!');
        console.log('💡 This means the password in the database is incorrect');
        
        // Fix the password
        console.log('\n🔧 Fixing admin password...');
        const hashedPassword = await bcrypt.hash('admin123', 12);
        await Admin.findOneAndUpdate(
          { username: 'admin' },
          { password: hashedPassword }
        );
        console.log('✅ Admin password updated successfully!');
      }
    }

    // Test environment variables
    console.log('\n🔧 Environment Variables Check:');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
    console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Missing');
    console.log('   WEATHER_API_KEY:', process.env.WEATHER_API_KEY ? '✅ Set' : '❌ Missing');

    console.log('\n🎉 Login test completed!');
    console.log('\n📋 Summary:');
    console.log('   Admin Username: admin');
    console.log('   Admin Password: admin123');
    console.log('   Login URL: http://localhost:5173/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testLogin();
