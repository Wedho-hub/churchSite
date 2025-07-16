/**
 * Controller for gallery image management.
 * Handles fetching, uploading, and deleting gallery images.
 */

import Gallery from '../models/Gallery.js';

/**
 * Get all gallery images, sorted by creation date (newest first).
 * @route GET /api/gallery
 * @returns {Array} List of gallery images
 */
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

/**
 * Upload a new image to the gallery (admin only).
 * @route POST /api/gallery
 * @param {string} caption - Image caption
 * @param {file} image - Uploaded image file
 * @returns {Object} Created image or error message
 */
export const uploadImageToGallery = async (req, res) => {
  try {
    const { caption } = req.body;
    const url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!url) return res.status(400).json({ error: 'No image uploaded' });

    const image = new Gallery({ url, caption });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

/**
 * Delete an image from the gallery (admin only).
 * @route DELETE /api/gallery/:id
 * @returns {Object} Success or error message
 */
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};
