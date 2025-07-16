
/**
 * Routes for church bulletins (PDFs, docs, etc.).
 * Public can view; admin can upload.
 */
import express from "express";
import multer from "multer";
import path from "path";
import {
  createBulletin,
  getBulletins,
} from "../controllers/bulletin.controller.js";
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure file uploads (PDFs, docs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF or Word files allowed"), false);
};

const upload = multer({ storage, fileFilter });


// Admin upload route (protected)
router.post("/", verifyToken, isAdmin, upload.single("file"), createBulletin); // Upload bulletin

// Public route
router.get("/", getBulletins); // Get all bulletins

export default router;
