
/**
 * Routes for site content management.
 * Uses ES module syntax.
 */

import express from 'express';
import {
  getAllSections,
  getSection,
  upsertSection,
} from '../controllers/content.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.get('/', getAllSections);
router.get('/:section', getSection);

// Admin Protected
router.put('/:section', auth, upsertSection);

export default router;
