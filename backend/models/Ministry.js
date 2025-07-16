import mongoose from "mongoose";

const ministrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ministry = mongoose.model("Ministry", ministrySchema);
export default Ministry;
