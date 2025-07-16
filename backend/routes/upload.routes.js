/**
 * Routes for file upload management.
 * Handles single and multiple image uploads with proper validation.
 * All routes require admin authentication for security.
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  uploadImage, 
  uploadMultipleImages, 
  deleteUploadedFile 
} from '../controllers/upload.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to uploads directory
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, ''); // Remove special characters
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// File filter for security - only allow specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'image/webp'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

// Configure multer with size limits and file validation
const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 10 // Maximum 10 files for multiple upload
  }
});

// 📤 POST: Upload single image (admin only)
router.post('/', verifyToken, isAdmin, upload.single('image'), uploadImage);

// 📤 POST: Upload multiple images at once (admin only)
router.post('/multiple', verifyToken, isAdmin, upload.array('images', 10), uploadMultipleImages);

// 🗑️ DELETE: Delete uploaded file (admin only)
router.delete('/:filename', verifyToken, isAdmin, deleteUploadedFile);

export default router;
