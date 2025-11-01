import express from 'express';
import { syncState } from '../controllers/syncController.js';

const router = express.Router();

// Trigger sync
router.post('/trigger', syncState);

export default router;
