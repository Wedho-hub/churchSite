/**
 * Routes for admin authentication and management.
 * Note: The /register route should be secured or disabled after initial setup.
 */

import express from 'express';
import { register, login } from '../controllers/admin.controller.js';

const router = express.Router();

// Public routes (secure /register later)
router.post('/register', register);
router.post('/login', login);

export default router;
