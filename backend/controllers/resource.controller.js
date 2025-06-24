import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const list = await Resource.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch resources' });
  }
};

export const createResource = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    const finalLink = type === 'file' && req.file
      ? `/uploads/${req.file.filename}`
      : link;

    const resource = new Resource({
      title,
      description,
      link: finalLink,
      type,
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
};
