import Bulletin from '../models/Bulletin.js';

export const getBulletins = async (req, res) => {
  try {
    const bulletins = await Bulletin.find().sort({ createdAt: -1 });
    res.json(bulletins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load bulletins' });
  }
};

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
