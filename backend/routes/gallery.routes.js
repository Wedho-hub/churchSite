import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  getGallery,
  uploadImageToGallery,
  deleteImage,
} from "../controllers/gallery.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// Setup multer for local file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadFolder = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Save files in /uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 📸 Public - Get all images
router.get("/", getGallery);

// 🔒 Admin - Upload image
router.post("/", auth, upload.single("image"), uploadImageToGallery);

// 🔒 Admin - Delete image
router.delete("/:id", auth, deleteImage);

export default router;
