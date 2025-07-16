# 🚀 Church Website Setup Guide

## Quick Fix for Admin Login Issue

The admin login issue has been identified and fixed. Follow these steps to get your admin login working:

### Step 1: Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies  
cd ../frontend
npm install
```

### Step 2: Environment Setup

The `.env` file has been created in the `backend` directory with default values:

```env
MONGO_URI=mongodb://localhost:27017/church_db
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=5000
NODE_ENV=development
```

**Important**: If you're using MongoDB Atlas (cloud), update the `MONGO_URI` with your connection string.

### Step 3: Database Setup

1. **Start MongoDB** (if using local MongoDB):
   ```bash
   # On Windows (if MongoDB is installed)
   net start MongoDB
   
   # On macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

2. **Seed the Database**:
   ```bash
   cd backend
   node seed.js
   ```

   You should see output like:
   ```
   ✅ MongoDB connected successfully
   🧹 Clearing existing data...
   📋 Seeding ministries...
   📢 Seeding bulletins...
   📚 Seeding resources...
   🖼️ Seeding gallery...
   ✍️ Seeding blogs...
   👤 Creating admin account...
   ✅ Database seeded successfully!
   
   🔐 Admin Login Credentials:
      Username: admin
      Password: admin123
   ```

### Step 4: Test Admin Account

Run the test script to verify the admin account was created correctly:

```bash
cd backend
node test-admin.js
```

Expected output:
```
✅ Connected to MongoDB
✅ Admin account found:
   Username: admin
   Created: [timestamp]
✅ Password verification successful!

🎉 Admin login should work with:
   Username: admin
   Password: admin123
```

### Step 5: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# or
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Test Login

1. Open your browser to `http://localhost:5173`
2. Click "Admin Login" or go to `http://localhost:5173/login`
3. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
4. Click "Sign In"

## 🔧 Troubleshooting

### Issue: "Admin not found" error

**Solution**: The admin account wasn't created properly.
```bash
cd backend
node seed.js
```

### Issue: "Invalid credentials" error

**Solution**: Test the admin account:
```bash
cd backend
node test-admin.js
```

### Issue: Database connection error

**Solutions**:
1. **Local MongoDB**: Ensure MongoDB is running
2. **MongoDB Atlas**: Check your connection string in `.env`
3. **Network**: Check firewall/network settings

### Issue: Frontend can't connect to backend

**Solutions**:
1. Ensure backend is running on port 5000
2. Check for CORS issues in browser console
3. Verify API endpoints are correct

### Issue: "Cannot find module" errors

**Solution**: Install missing dependencies:
```bash
# Backend
cd backend
npm install bcryptjs jsonwebtoken mongoose express cors dotenv multer axios slugify

# Frontend  
cd frontend
npm install axios react-router-dom react-bootstrap bootstrap react-toastify
```

## 🔐 Security Notes

1. **Change Default Password**: After first login, change the admin password
2. **JWT Secret**: Update the JWT_SECRET in `.env` to a secure random string
3. **Environment Variables**: Never commit `.env` files to version control

## 📱 Testing the Complete System

### Public Pages (No login required):
- Home: `http://localhost:5173/`
- About: `http://localhost:5173/about`
- Ministries: `http://localhost:5173/ministries`
- Blog: `http://localhost:5173/blogs`
- Contact: `http://localhost:5173/contact`

### Admin Pages (Login required):
- Login: `http://localhost:5173/login`
- Dashboard: `http://localhost:5173/admin/dashboard`
- Manage Blogs: `http://localhost:5173/admin/blogs`
- Manage Content: `http://localhost:5173/admin/content`
- Messages: `http://localhost:5173/admin/messages`

## 🎯 Next Steps After Login Works

1. **Customize Content**: Update church information in the admin panel
2. **Add Your Logo**: Replace the church icon with your logo
3. **Upload Images**: Add your church photos to the gallery
4. **Create Blog Posts**: Share news and spiritual content
5. **Update Contact Info**: Add your church's contact details

## 📞 Still Having Issues?

If you're still experiencing problems:

1. Check the browser console for JavaScript errors
2. Check the backend terminal for server errors
3. Verify all dependencies are installed
4. Ensure MongoDB is running and accessible
5. Try clearing browser cache and localStorage

The admin login should now work perfectly with the credentials:
- **Username**: `admin`
- **Password**: `admin123`

Remember to change these credentials after your first successful login!
