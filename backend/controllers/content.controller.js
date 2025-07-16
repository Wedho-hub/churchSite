/**
 * Controller for site content management (about, mission, etc.)
 * Handles CRUD for static site sections.
 */

import Content from '../models/Content.js';

/**
 * Get all site content sections.
 * @route GET /api/content
 * @returns {Array} List of content sections
 */
export const getAllSections = async (req, res) => {
  try {
    const data = await Content.find();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load sections", error: err.message });
  }
};

/**
 * Get content for a specific section (e.g., about, mission).
 * @route GET /api/content/:section
 * @returns {Object} Section content or error message
 */
export const getSection = async (req, res) => {
  try {
    const section = await Content.findOne({ section: req.params.section });
    if (!section) return res.status(404).json({ message: "Section not found" });

    res.json(section);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get section", error: err.message });
  }
};

/**
 * Create or update a section's content (admin only).
 * @route PUT /api/content/:section
 * @param {string} section - Section name
 * @param {string} title - Section title
 * @param {string} body - Section body/content
 * @returns {Object} Updated/created section or error message
 */
export const upsertSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { title, body } = req.body;

    const updated = await Content.findOneAndUpdate(
      { section },
      { title, body },
      { new: true, upsert: true }
    );

    res.json({ message: "Section saved", content: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
