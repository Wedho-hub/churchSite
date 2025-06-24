import express from "express";
import multer from "multer";
import path from "path";
import {
  getResources,
  createResource,
} from "../controllers/resource.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
});

const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "application/msword"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only document files allowed"), false);
};

const upload = multer({ storage, fileFilter });

// Public fetch
router.get("/", getResources);

// Admin upload (if type is file)
router.post("/", auth, upload.single("file"), createResource);

export default router;
