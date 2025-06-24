import express from 'express';
import { getMinistries } from '../controllers/ministry.controller.js';

const router = express.Router();

router.get('/', getMinistries);

export default router;
