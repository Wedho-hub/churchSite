/**
 * Routes for admin authentication and management.
 * SECURITY WARNING: The /register route should be disabled after initial setup to prevent unauthorized admin creation.
 */

import express from 'express';
import { register, login } from '../controllers/admin.controller.js';

const router = express.Router();

// Public routes (disable /register after first use)
router.post('/register', register); // Create admin (run once, then disable)
router.post('/login', login); // Login admin and get JWT

export default router;
