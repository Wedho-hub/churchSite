/**
 * Middleware to verify JWT and check admin access
 * Uses ES module syntax.
 */

import jwt from "jsonwebtoken";

/**
 * Verify JWT token and attach user/admin info to the request.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach all token data (e.g. adminId, isAdmin)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

/**
 * Check if the authenticated user is an admin.
 */
export const isAdmin = (req, res, next) => {
  // Assumes the token includes isAdmin: true
  if (!req.admin?.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
