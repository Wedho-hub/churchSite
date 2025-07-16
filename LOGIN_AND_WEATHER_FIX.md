# 🔧 Login and Weather Issues - Complete Fix Guide

## 🚨 Issues Identified:

### 1. **Admin Login Issue**
- **Problem**: Admin account may not exist or password hash is incorrect
- **Symptoms**: "Admin not found" or "Invalid credentials" errors

### 2. **Weather Widget Issue**
- **Problem**: Weather API key not configured or incorrect response handling
- **Symptoms**: Weather widget shows "Failed to load weather info"

## 🛠️ Complete Fix Instructions:

### Step 1: Fix Admin Login

Run the login test script to diagnose and fix the admin account:

```bash
cd backend
node test-login.js
```

This script will:
- ✅ Check if admin account exists
- ✅ Create admin account if missing
- ✅ Verify password hash is correct
- ✅ Test JWT token generation
- ✅ Fix any issues automatically

**Expected Output:**
```
✅ Admin account found
✅ Password verification successful!
✅ JWT token generated successfully

🎉 Login test completed!
📋 Summary:
   Admin Username: admin
   Admin Password: admin123
   Login URL: http://localhost:5173/login
```

### Step 2: Fix Weather Widget

The weather widget has been updated to handle API key issues gracefully. You have two options:

#### Option A: Get a Free Weather API Key (Recommended)
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Update your `backend/.env` file:
   ```env
   WEATHER_API_KEY=your_actual_api_key_here
   ```

#### Option B: Use Without Weather (Temporary)
The updated WeatherWidget will show a friendly message if no API key is configured:
- "Weather service not configured"
- The rest of your site will work perfectly

### Step 3: Verify Your .env File

Your `backend/.env` file should contain:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/church_db

# JWT Secret Key for authentication
JWT_SECRET=inkosiyeza_sda_church_jwt_secret_2024_change_in_production

# Weather API Key (get from openweathermap.org)
WEATHER_API_KEY=your_openweathermap_api_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Step 4: Test Everything

1. **Run the comprehensive fix script:**
   ```bash
   node fix-issues.js
   ```

2. **Start your servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   node server.js

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

3. **Test admin login:**
   - Go to: `http://localhost:5173/login`
   - Username: `admin`
   - Password: `admin123`
   - Should redirect to admin dashboard

4. **Check weather widget:**
   - Go to: `http://localhost:5173/`
   - Weather widget should either show weather data or a configuration message

## 🔍 Troubleshooting Common Issues:

### Login Still Not Working?

**Check these:**
1. ✅ Backend server is running on port 5000
2. ✅ Frontend is running on port 5173
3. ✅ MongoDB is connected
4. ✅ No console errors in browser
5. ✅ Network tab shows successful API calls

**Debug steps:**
```bash
# Check if admin exists in database
cd backend
node -e "
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
await mongoose.connect('mongodb://localhost:27017/church_db');
const admin = await Admin.findOne({username: 'admin'});
console.log('Admin found:', !!admin);
process.exit(0);
"
```

### Weather Still Not Working?

**Check these:**
1. ✅ API key is valid (not the placeholder text)
2. ✅ No network restrictions
3. ✅ Backend server can reach external APIs

**Test weather API directly:**
```bash
# Replace YOUR_API_KEY with your actual key
curl "https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=YOUR_API_KEY&units=metric"
```

## 🎯 Quick Verification Checklist:

- [ ] MongoDB is running and connected
- [ ] Backend server starts without errors
- [ ] Frontend builds and serves without errors
- [ ] Admin account exists in database
- [ ] JWT_SECRET is set in .env
- [ ] Login page loads at /login
- [ ] Login form submits to /api/admin/login
- [ ] Weather API key is configured (optional)
- [ ] All sample data is seeded

## 🚀 Expected Results After Fix:

### ✅ Admin Login Working:
- Login page loads correctly
- Form validation works
- Successful login redirects to admin dashboard
- Admin can access all protected routes
- JWT token is stored and used correctly

### ✅ Weather Widget Working:
- Shows current weather for Cape Town
- Displays temperature, description, humidity
- Updates timestamp shown
- Graceful error handling if API fails

### ✅ Complete Site Functionality:
- All public pages load correctly
- Admin panel fully functional
- Sample data displays properly
- Professional UI throughout

## 📞 Still Having Issues?

If you're still experiencing problems after following this guide:

1. **Run the diagnostic script:** `node fix-issues.js`
2. **Check browser console** for JavaScript errors
3. **Check backend terminal** for server errors
4. **Verify all dependencies** are installed
5. **Ensure ports 3000, 5000, and 5173** are available

The most common issue is that the admin account wasn't created properly during seeding. The `test-login.js` script will fix this automatically.

## 🎉 Success Indicators:

You'll know everything is working when:
- ✅ Login with admin/admin123 succeeds
- ✅ Redirected to admin dashboard
- ✅ Weather widget shows data or configuration message
- ✅ All admin functions work (create blogs, manage content, etc.)
- ✅ Public site displays sample data correctly

Your church website should now be fully functional with both admin login and weather features working correctly!
