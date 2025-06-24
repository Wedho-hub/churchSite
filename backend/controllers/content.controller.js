/**
 * Controller for site content management.
 * Uses ES module syntax.
 */

import Content from '../models/Content.js';

/**
 * Get all site sections (about, mission, etc.)
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
 * Get content by section
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
 * Create or update section content
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
