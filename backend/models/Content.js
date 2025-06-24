import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,       // ensure it's provided
    trim: true,           // auto-trim whitespace
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: String,         // e.g. "About", "Mission", etc.
    required: true,
    enum: ['About', 'Mission', 'Vision', 'History'], // example constraint
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
}, {
  timestamps: true,       // adds createdAt & updatedAt automatically
});

// you can add instance or static methods if needed:
// contentSchema.methods.doSomething = function() { ... };

export default model('Content', contentSchema);
