/**
 * Admin Schema - stores admin user login details.
 * Only one admin should exist for security.
 */

import mongoose from 'mongoose';

// Admin schema for authentication
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true, // Only one admin username allowed
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6, // Enforce minimum password length
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
