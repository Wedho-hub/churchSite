/**
 * Main server file for the backend application.
 * Sets up Express server, middleware, routes, and database connection.
 */

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import route modules
import adminRoutes from './routes/admin.routes.js';
import blogRoutes from './routes/blog.routes.js';
import contentRoutes from './routes/content.routes.js';
import weatherRoutes from './routes/weather.routes.js';
import messageRoutes from './routes/message.routes.js';
import uploadRoutes from './routes/upload.routes.js';

import ministryRoutes from './routes/ministry.routes.js';
import bulletinRoutes from './routes/bulletin.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import galleryRoutes from './routes/gallery.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB database
connectDB();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Route handlers
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/messages', messageRoutes);

app.use('/api/ministries', ministryRoutes);
app.use('/api/bulletins', bulletinRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/gallery', galleryRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/upload', uploadRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
