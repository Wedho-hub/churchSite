/**
 * Bulletin schema for storing church bulletins (PDFs, docs, etc.).
 * Each bulletin can have a title, description, and file URL.
 */

import mongoose from "mongoose";

const bulletinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  file: String, // URL to uploaded PDF/doc
  createdAt: { type: Date, default: Date.now },
});

const Bulletin = mongoose.model("Bulletin", bulletinSchema);
export default Bulletin;