import express from 'express';
import { getAllStates, getDistrictsByState, getDistrictById, searchDistricts } from '../controllers/districtController.js';

const router = express.Router();

// Get all states
router.get('/states', getAllStates);

// Get districts by state
router.get('/states/:stateId/districts', getDistrictsByState);

// Get district by ID
router.get('/:districtId', getDistrictById);

// Search districts
router.get('/search', searchDistricts);

export default router;
