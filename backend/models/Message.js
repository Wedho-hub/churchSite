import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * Contact message schema
 */
const messageSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    subject: { 
      type: String, 
      trim: true 
    },
    message: { 
      type: String, 
      required: true, 
      trim: true 
    },
    read: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

// Optional: Add instance or static methods as needed
// messageSchema.methods.markAsRead = function() {
//   this.read = true;
//   return this.save();
// };

export default model('Message', messageSchema);

