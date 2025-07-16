import express from 'express';
import {
  getMinistries,
  createMinistry,
  updateMinistry,
  deleteMinistry,
} from '../controllers/ministry.controller.js';

import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// 📖 GET all ministries (public)
router.get('/', getMinistries);

// ➕ POST a new ministry (admin only)
router.post('/', verifyToken, isAdmin, createMinistry);

// ✏️ PUT update a ministry by ID (admin only)
router.put('/:id', verifyToken, isAdmin, updateMinistry);

// ❌ DELETE a ministry by ID (admin only)
router.delete('/:id', verifyToken, isAdmin, deleteMinistry);

export default router;
