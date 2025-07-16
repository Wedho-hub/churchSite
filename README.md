# Inkosiyeza SDA Church Website

A modern, full-stack church management website built with React.js and Node.js. This comprehensive platform provides both public-facing content and administrative functionality for church management.

## 🌟 Features

### Public Features
- **Home Page**: Welcome section with latest news, events, and daily verse
- **About Us**: Church history, mission, vision, and core values
- **Ministries**: Information about church departments and activities
- **Blog**: Latest articles and spiritual content
- **Gallery**: Photo gallery of church events and activities
- **Resources**: Downloadable documents and external links
- **Bulletins**: Church announcements and weekly bulletins
- **Contact**: Contact form and church information
- **Weather Widget**: Local weather information

### Admin Features
- **Secure Authentication**: JWT-based admin login system
- **Content Management**: Edit page content dynamically
- **Blog Management**: Create, edit, and delete blog posts
- **Ministry Management**: Manage church ministries and departments
- **Message Management**: View and manage contact form submissions
- **File Upload**: Secure image and document upload system
- **Dashboard**: Overview of site statistics and quick actions

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern UI library
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Font Awesome** - Icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for external APIs

## 📁 Project Structure

```
churchSite/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── uploads/           # File upload directory
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/              # React frontend
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── assets/       # Styles and static files
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # React contexts
│   │   ├── layouts/      # Layout components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html        # HTML template
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd churchSite
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/church_db
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Weather API (Optional)
   WEATHER_API_KEY=your_openweathermap_api_key
   
   # Server Port
   PORT=5000
   ```

5. **Database Setup**
   
   Seed the database with initial data:
   ```bash
   cd backend
   node seed.js
   ```

6. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔐 Admin Access

### Default Admin Credentials
- **Username**: admin
- **Password**: admin123

**⚠️ Important**: Change these credentials immediately after first login!

### Creating New Admin
```bash
# In backend directory
node -e "
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin.js');
const mongoose = require('mongoose');

mongoose.connect('your_mongodb_uri');
const admin = new Admin({
  username: 'newadmin',
  password: bcrypt.hashSync('newpassword', 10)
});
admin.save().then(() => console.log('Admin created'));
"
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login

### Content Management
- `GET /api/content` - Get all content sections
- `GET /api/content/:section` - Get specific section
- `PUT /api/content/:section` - Update section (Admin)

### Blog Management
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/slug/:slug` - Get blog by slug
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:slug` - Update blog (Admin)
- `DELETE /api/blogs/:slug` - Delete blog (Admin)

### Ministry Management
- `GET /api/ministries` - Get all ministries
- `POST /api/ministries` - Create ministry (Admin)
- `PUT /api/ministries/:id` - Update ministry (Admin)
- `DELETE /api/ministries/:id` - Delete ministry (Admin)

### Message Management
- `POST /api/messages` - Send contact message
- `GET /api/messages` - Get all messages (Admin)
- `PUT /api/messages/:id/read` - Mark as read (Admin)
- `DELETE /api/messages/:id` - Delete message (Admin)

### File Upload
- `POST /api/upload` - Upload single image (Admin)
- `POST /api/upload/multiple` - Upload multiple images (Admin)
- `DELETE /api/upload/:filename` - Delete file (Admin)

### Weather
- `GET /api/weather` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast

## 🎨 Customization

### Styling
The project uses CSS custom properties for easy theming. Edit `frontend/src/assets/styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #059669;
  --accent-gold: #f59e0b;
  /* ... other variables */
}
```

### Church Information
Update church-specific information in:
- `frontend/src/components/Navbar.jsx` - Church name
- `frontend/src/pages/AboutUs.jsx` - About content
- `frontend/index.html` - Meta tags and title

### Logo and Images
- Replace `/public/hero.jpg` with your church image
- Update favicon in `/public/vite.svg`
- Add church logo to navbar

## 🔧 Configuration

### Database Models
- **Admin**: Admin user accounts
- **Blog**: Blog posts with slug-based URLs
- **Content**: Dynamic page content
- **Ministry**: Church ministries and departments
- **Message**: Contact form submissions
- **Bulletin**: Church bulletins and announcements
- **Resource**: Downloadable resources and links
- **Gallery**: Image gallery items

### File Upload Configuration
- **Allowed Types**: Images (JPEG, PNG, GIF, WebP), Documents (PDF, DOC, DOCX, etc.)
- **Size Limits**: 5MB for images, 10MB for documents
- **Storage**: Local filesystem (`backend/uploads/`)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to Heroku, DigitalOcean, or your preferred platform
4. Ensure uploads directory is writable

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to Netlify, Vercel, or your preferred platform
3. Configure API base URL for production

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
WEATHER_API_KEY=your_weather_api_key
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Content management (CRUD operations)
- [ ] File upload functionality
- [ ] Contact form submission
- [ ] Responsive design on mobile devices
- [ ] Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Database Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

**File Upload Issues**
- Check file permissions on uploads directory
- Verify file size limits
- Ensure proper MIME types

**Authentication Problems**
- Verify JWT secret is set
- Check token expiration
- Clear browser localStorage

### Getting Help
- Create an issue on GitHub
- Check existing documentation
- Review error logs in browser console and server terminal

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Font Awesome for the comprehensive icon library
- MongoDB team for the flexible database solution
- React team for the powerful UI library
- All contributors and testers

## 📊 Project Status

- ✅ Core functionality complete
- ✅ Admin panel implemented
- ✅ Responsive design
- ✅ Security measures in place
- 🔄 Ongoing improvements and bug fixes

---

**Built with ❤️ for the Inkosiyeza SDA Church community**
