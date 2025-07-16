/**
 * Controller for admin authentication and management.
 * Handles admin registration and login using JWT.
 * SECURITY NOTE: The /register route should be disabled after initial setup to prevent unauthorized admin creation.
 */

import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new admin (should be run only once, then route disabled for security).
 * @route POST /api/admin/register
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @returns {Object} Success or error message
 */
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const exists = await Admin.findOne({ username });
    if (exists)
      return res.status(409).json({ message: "Admin already exists" });

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new admin
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Server error during registration",
        error: err.message,
      });
  }
};

/**
 * Login Admin and return JWT for authentication.
 * @route POST /api/admin/login
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @returns {Object} JWT token or error message
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
