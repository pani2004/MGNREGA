import express from 'express';
import syncController from '../controllers/syncController.js';

const router = express.Router();


router.post('/trigger', syncController.syncState.bind(syncController));

export default router;
