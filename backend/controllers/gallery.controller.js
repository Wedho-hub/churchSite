import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

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

export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};
