import express from 'express';
import districtController from '../controllers/districtController.js';

const router = express.Router();

// Get all states
router.get('/states', districtController.getAllStates.bind(districtController));

// Get districts by state
router.get('/states/:stateId/districts', districtController.getDistrictsByState.bind(districtController));

// Get district by ID
router.get('/:districtId', districtController.getDistrictById.bind(districtController));

// Search districts
router.get('/search', districtController.searchDistricts.bind(districtController));

export default router;
