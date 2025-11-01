import express from 'express';
import dataController from '../controllers/dataController.js';

const router = express.Router();

// Get current data for a district
router.get('/district/:districtId/current', dataController.getCurrentData.bind(dataController));

// Get historical data for a district
router.get('/district/:districtId/historical', dataController.getHistoricalData.bind(dataController));

// Compare multiple districts
router.get('/compare', dataController.compareDistricts.bind(dataController));

// Get state-level aggregated data
router.get('/state/:stateId/aggregate', dataController.getStateAggregatedData.bind(dataController));

// Get district rankings within a state
router.get('/state/:stateId/rankings', dataController.getDistrictRankings.bind(dataController));

export default router;
