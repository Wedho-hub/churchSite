import express from "express";
import {
  getAllSections,
  getSection,
  upsertSection,
} from "../controllers/content.controller.js";

import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET all sections (public)
router.get("/", getAllSections);

// GET single section by name (e.g., /about, /mission)
router.get("/:section", getSection);

// PUT or POST to update section (admin only)
router.put("/:section", verifyToken, isAdmin, upsertSection);

export default router;
