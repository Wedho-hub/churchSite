/**
 * Controller for blog post management.
 * Uses ES module syntax.
 */

import Blog from '../models/Blog.js';
import slugify from 'slugify';

/**
 * Create new blog post
 */
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const blog = new Blog({ title, slug, content, author });
    await blog.save();

    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ message: "Create blog failed", error: err.message });
  }
};

/**
 * Get all blog posts
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fetching blogs failed", error: err.message });
  }
};

/**
 * Get single blog by slug
 */
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};

/**
 * Update blog post
 */
export const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { title, slug, content, author },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog updated", blog: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

/**
 * Delete a blog post
 */
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
