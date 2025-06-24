
/**
 * Routes for blog post management.
 * Uses ES module syntax.
 */

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Admin Protected
router.post('/', auth, createBlog);
router.put('/:slug', auth, updateBlog);
router.delete('/:slug', auth, deleteBlog);

export default router;
