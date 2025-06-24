import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
