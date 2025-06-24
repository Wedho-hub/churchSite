import mongoose from 'mongoose';

const ministrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: String, required: true },
  description: String,
  functions: [String],
});

const Ministry = mongoose.model('Ministry', ministrySchema);
export default Ministry;
