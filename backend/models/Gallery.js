/**
 * Gallery schema for storing image URLs and captions.
 * Used for the church photo gallery.
 */

import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true }, // Path to uploaded image
  caption: String,
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
