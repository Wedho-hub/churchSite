import mongoose from "mongoose";

const bulletinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  file: String, // can be a URL to a PDF/doc
  createdAt: { type: Date, default: Date.now },
});

const Bulletin = mongoose.model("Bulletin", bulletinSchema);
export default Bulletin;