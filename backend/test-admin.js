/**
 * Test script to verify admin login functionality
 * Run this script to test if the admin account was created correctly
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const testAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin account
    console.log('🔍 Looking for admin account...');
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('❌ Admin account not found!');
      console.log('💡 Run "node seed.js" to create the admin account');
      process.exit(1);
    }

    console.log('✅ Admin account found:');
    console.log('   Username:', admin.username);
    console.log('   Created:', admin.createdAt);

    // Test password verification
    console.log('🔐 Testing password verification...');
    const isPasswordValid = await bcrypt.compare('admin123', admin.password);
    
    if (isPasswordValid) {
      console.log('✅ Password verification successful!');
      console.log('\n🎉 Admin login should work with:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
    } else {
      console.log('❌ Password verification failed!');
      console.log('💡 The password hash might be corrupted');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

testAdmin();
