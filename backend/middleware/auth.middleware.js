/**
 * Middleware to authenticate JWT tokens and restrict access to admin users.
 * @file This middleware verifies a valid JWT and optionally checks for admin privileges.
 */

import jwt from 'jsonwebtoken';

/**
 * Middleware to verify a JWT from the Authorization header.
 * If valid, attaches the decoded payload to `req.admin`.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback to move to the next middleware
 *
 * @returns {Object} 401 if token missing, 403 if token invalid/expired
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or format incorrect" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to request object
    // This can include fields like adminId, isAdmin, email, etc.
    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

/**
 * Middleware to allow access only to authenticated admins.
 * Should be used after `verifyToken`.
 *
 * @param {Object} req - Express request object (expects req.admin to be populated)
 * @param {Object} res - Express response object
 * @param {Function} next - Callback to move to the next middleware
 *
 * @returns {Object} 403 if not an admin
 */
export const isAdmin = (req, res, next) => {
  if (!req.admin || req.admin.isAdmin !== true) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
