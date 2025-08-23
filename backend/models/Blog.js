/**
 * Blog post schema for the church website.
 * Stores title, slug, content, and author for each blog post.
 */

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    image: { type: String },
  },
  { timestamps: true }
);


const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
