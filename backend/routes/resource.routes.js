/**
 * Routes for resource management (documents, links, downloads).
 * Public routes: View resources
 * Admin routes: Create, update, delete resources
 */

import express from "express";
import multer from "multer";
import path from "path";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure multer for document file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, "-")
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, ''); // Remove special characters
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// File filter for document uploads - allow various document types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain"
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and TXT files are allowed"), false);
  }
};

// Configure multer with file size limits
const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for documents
  }
});

// 📚 GET: Get all resources (public access)
router.get("/", getResources);

// 📝 POST: Create new resource (admin only)
router.post("/", verifyToken, isAdmin, upload.single("file"), createResource);

// ✏️ PUT: Update existing resource (admin only)
router.put("/:id", verifyToken, isAdmin, upload.single("file"), updateResource);

// 🗑️ DELETE: Delete resource (admin only)
router.delete("/:id", verifyToken, isAdmin, deleteResource);

export default router;
