import express from "express";
import multer from "multer";
import path from "path";
import {
  createBulletin,
  getBulletins,
} from "../controllers/bulletin.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔧 Configure file uploads (PDFs, docs)
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

// 📥 Admin upload route
router.post("/", auth, upload.single("file"), createBulletin);

// 📤 Public route
router.get("/", getBulletins);

export default router;
