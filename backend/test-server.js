/**
 * Server test script to verify backend is running and routes are working
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Import models
import Admin from './models/Admin.js';

const testServer = async () => {
  console.log('🧪 Testing Backend Server Setup');
  console.log('===============================');

  try {
    // 1. Test MongoDB Connection
    console.log('\n1️⃣ Testing MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/church_db');
    console.log('✅ MongoDB connected');

    // 2. Ensure admin exists
    console.log('\n2️⃣ Checking Admin Account...');
    let admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('Creating admin account...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      admin = new Admin({
        username: 'admin',
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Admin account created');
    } else {
      console.log('✅ Admin account exists');
    }

    // 3. Test Express Server
    console.log('\n3️⃣ Starting Test Server...');
    const app = express();
    
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Test route
    app.get('/api/test', (req, res) => {
      res.json({ message: 'Backend server is working!', timestamp: new Date() });
    });

    // Admin login route (simplified for testing)
    app.post('/api/admin/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password: '***' });

        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
          console.log('Admin not found');
          return res.status(404).json({ message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          console.log('Password mismatch');
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
          { adminId: admin._id }, 
          process.env.JWT_SECRET || 'default_secret', 
          { expiresIn: "2d" }
        );

        console.log('Login successful');
        res.json({
          message: "Login successful",
          token,
          admin: { id: admin._id, username: admin.username }
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Login error", error: error.message });
      }
    });

    // Weather route (simplified)
    app.get('/api/weather', async (req, res) => {
      const apiKey = process.env.WEATHER_API_KEY;
      
      if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
        return res.json({
          success: true,
          data: {
            city: 'Cape Town',
            country: 'ZA',
            temperature: 22,
            description: 'partly cloudy',
            humidity: 65,
            lastUpdated: new Date().toISOString()
          },
          note: 'Using mock data - configure WEATHER_API_KEY for real data'
        });
      }

      try {
        const axios = (await import('axios')).default;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        res.json({
          success: true,
          data: {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            lastUpdated: new Date().toISOString()
          }
        });
      } catch (error) {
        res.status(500).json({
          message: "Weather service error",
          error: error.message
        });
      }
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`✅ Test server running on port ${PORT}`);
      console.log(`🌐 Test URL: http://localhost:${PORT}/api/test`);
      console.log(`🔐 Login URL: http://localhost:${PORT}/api/admin/login`);
      console.log(`🌤️ Weather URL: http://localhost:${PORT}/api/weather`);
      
      console.log('\n🎯 Test the endpoints:');
      console.log(`curl http://localhost:${PORT}/api/test`);
      console.log(`curl -X POST http://localhost:${PORT}/api/admin/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`);
      console.log(`curl http://localhost:${PORT}/api/weather`);
      
      console.log('\n✅ Backend server is ready!');
      console.log('Now start your frontend with: npm run dev');
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down test server...');
      server.close(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Server test failed:', error.message);
    process.exit(1);
  }
};

testServer();
