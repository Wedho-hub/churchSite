import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: { type: String, required: true }, // either a URL or a file path
  type: { type: String, enum: ['file', 'link'], required: true }, // distinguish file vs. external
  createdAt: { type: Date, default: Date.now },
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
