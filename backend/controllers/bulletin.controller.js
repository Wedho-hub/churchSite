/**
 * Controller for church bulletins (PDFs, docs, etc.)
 * Handles fetching and uploading bulletins.
 */

import Bulletin from '../models/Bulletin.js';

/**
 * Get all bulletins, sorted by creation date (newest first).
 * @route GET /api/bulletins
 * @returns {Array} List of bulletins
 */
export const getBulletins = async (req, res) => {
  try {
    const bulletins = await Bulletin.find().sort({ createdAt: -1 });
    res.json(bulletins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load bulletins' });
  }
};

/**
 * Upload a new bulletin (admin only).
 * @route POST /api/bulletins
 * @param {string} title - Bulletin title
 * @param {string} description - Bulletin description
 * @param {file} file - Uploaded file (PDF, doc, etc.)
 * @returns {Object} Created bulletin or error message
 */
export const createBulletin = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    const bulletin = new Bulletin({ title, description, file });
    await bulletin.save();
    res.status(201).json(bulletin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload bulletin' });
  }
};
