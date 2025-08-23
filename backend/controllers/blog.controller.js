/**
 * Controller for blog post management.
 * Handles CRUD operations for blog posts.
 */

import Blog from '../models/Blog.js';
import slugify from 'slugify';

/**
 * Create a new blog post.
 * @route POST /api/blogs
 * @param {string} title - Blog title
 * @param {string} content - Blog content
 * @param {string} author - Author name
 * @returns {Object} Created blog or error message
 */
export const createBlog = async (req, res) => {
  try {
    const { title, content, author,image } = req.body;
    // Generate slug for SEO-friendly URLs
    const slug = slugify(title, { lower: true, strict: true });

    const blog = new Blog({ title, slug, content, author, image });
    await blog.save();

    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ message: "Create blog failed", error: err.message });
  }
};

/**
 * Get all blog posts, sorted by creation date (newest first).
 * @route GET /api/blogs
 * @returns {Array} List of blogs
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
 * Get a single blog post by slug.
 * @route GET /api/blogs/:slug
 * @returns {Object} Blog post or error message
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
 * Update a blog post by slug.
 * @route PUT /api/blogs/:slug
 * @returns {Object} Updated blog or error message
 */
export const updateBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { title, slug, content, author, image },
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
