// models/Blog.js
/**
 * Blog post schema for the church website
 * Uses ES module syntax.
 */

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true }, // For SEO-friendly URLs
    content: { type: String, required: true },
    author: { type: String, default: 'Admin' },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
