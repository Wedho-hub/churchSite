import express from 'express';
import {
  sendMessage,
  getMessages,
  markAsRead,
} from '../controllers/message.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.post('/', sendMessage);

// Admin
router.get('/', auth, getMessages);
router.put('/:id/read', auth, markAsRead);

export default router;
