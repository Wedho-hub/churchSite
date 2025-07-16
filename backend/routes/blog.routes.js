/**
 * Routes for blog post management (CRUD).
 * Public can read; admin can create, update, delete.
 */

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';

import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// 🌍 Public Routes
router.get('/', getBlogs); // Get all blogs
router.get('/:slug', getBlogBySlug); // Get blog by slug

// 🔐 Admin Routes (protected)
router.post('/', verifyToken, isAdmin, createBlog); // Create blog
router.put('/:slug', verifyToken, isAdmin, updateBlog); // Update blog
router.delete('/:slug', verifyToken, isAdmin, deleteBlog); // Delete blog

export default router;
