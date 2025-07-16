# 🚨 URGENT FIX: 404 Error and Login/Weather Issues

## 🔍 Problem Analysis

The **404 error** you're seeing means the **backend server is not running**. This is why:
- `POST http://localhost:5173/api/admin/login 404 (Not Found)`
- The frontend is trying to reach the backend, but there's no server listening

## 🛠️ COMPLETE FIX (Step by Step)

### Step 1: Fix the Backend Server

**Run this command to fix all issues and start a working server:**

```bash
cd backend
node fix-all-issues.js
```

This will:
- ✅ Fix MongoDB connection
- ✅ Create/fix admin account
- ✅ Verify password hashing
- ✅ Test JWT generation
- ✅ Check environment variables

### Step 2: Start the Backend Server

After running the fix script, start the actual server:

```bash
cd backend
node server.js
```

**You should see:**
```
🔄 Connecting to MongoDB...
📍 Connection type: Local
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Step 3: Test the Backend (Optional but Recommended)

In a new terminal, test if the backend is working:

```bash
# Test basic connectivity
curl http://localhost:5000/api/admin/login

# Test login (should work after fix)
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test weather endpoint
curl http://localhost:5000/api/weather
```

### Step 4: Start the Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Test Login

1. Go to: `http://localhost:5173/login`
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. Click "Sign In"
4. Should redirect to admin dashboard

## 🌤️ Weather Widget Fix

The weather widget has been updated to handle missing API keys gracefully:

### Option A: Use Without API Key (Immediate Fix)
- Weather widget will show: "Weather service not configured"
- Rest of site works perfectly
- No errors or crashes

### Option B: Get Real Weather Data
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Get API key
4. Add to `backend/.env`:
   ```env
   WEATHER_API_KEY=your_actual_api_key_here
   ```
5. Restart backend server

## 🔧 Alternative: Use Test Server

If the main server still has issues, use the test server:

```bash
cd backend
node test-server.js
```

This provides a simplified server that definitely works for testing login and weather.

## 🚨 Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID_NUMBER> /F

# Or use different port
PORT=5001 node server.js
```

### Issue: "Admin not found" after fix
**Solution:**
```bash
cd backend
node fix-all-issues.js
# This will recreate the admin account
```

## 📋 Verification Checklist

After following the steps, verify:

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] No 404 errors in browser console
- [ ] Login page loads at `/login`
- [ ] Login with admin/admin123 works
- [ ] Redirects to admin dashboard
- [ ] Weather widget shows data or config message
- [ ] No JavaScript errors in console

## 🎯 Expected Results

### ✅ Login Working:
- Login form submits successfully
- JWT token received and stored
- Redirect to `/admin/dashboard`
- Admin panel fully accessible

### ✅ Weather Working:
- Shows current weather for Cape Town, OR
- Shows "Weather service not configured" message
- No errors or crashes

### ✅ Complete Site:
- All public pages load
- Admin functions work
- Sample data displays
- Professional UI throughout

## 🆘 If Still Not Working

1. **Check both servers are running:**
   ```bash
   # Should show backend on 5000 and frontend on 5173
   netstat -ano | findstr :5000
   netstat -ano | findstr :5173
   ```

2. **Check browser network tab:**
   - Open DevTools → Network
   - Try login
   - Look for failed requests

3. **Check backend terminal for errors:**
   - Look for MongoDB connection errors
   - Look for route registration errors
   - Look for port binding errors

4. **Use the test server:**
   ```bash
   cd backend
   node test-server.js
   ```

## 🎉 Success Indicators

You'll know everything is fixed when:
- ✅ No 404 errors in browser console
- ✅ Login with admin/admin123 succeeds
- ✅ Admin dashboard loads after login
- ✅ Weather widget shows data or config message
- ✅ All admin functions work properly

The main issue is that your **backend server isn't running**. Follow Step 1 and Step 2 above to fix this immediately!
