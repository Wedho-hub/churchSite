/**
 * Routes for message management (contact form and admin message viewing).
 * Public routes: Send messages via contact form
 * Admin routes: View, mark as read, and delete messages
 */

import express from 'express';
import {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/message.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// 📧 POST: Send a message from contact form (public access)
router.post('/', sendMessage);

// 📬 GET: Get all messages with statistics (admin only)
router.get('/', verifyToken, isAdmin, getMessages);

// ✅ PUT: Mark a specific message as read (admin only)
router.put('/:id/read', verifyToken, isAdmin, markAsRead);

// 🗑️ DELETE: Delete a specific message (admin only)
router.delete('/:id', verifyToken, isAdmin, deleteMessage);

export default router;
