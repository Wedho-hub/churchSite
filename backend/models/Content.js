/**
 * Content schema for static site sections (about, mission, etc.).
 * Each section is unique and stores a title and body.
 */

import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true, // Only one entry per section name
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
