import express from 'express';
import { getCurrentData, getHistoricalData, compareDistricts, getStateAggregatedData, getDistrictRankings } from '../controllers/dataController.js';

const router = express.Router();

// Get current data for a district
router.get('/district/:districtId/current', getCurrentData);

// Get historical data for a district
router.get('/district/:districtId/historical', getHistoricalData);

// Compare multiple districts
router.get('/compare', compareDistricts);

// Get state-level aggregated data
router.get('/state/:stateId/aggregate', getStateAggregatedData);

// Get district rankings within a state
router.get('/state/:stateId/rankings', getDistrictRankings);

export default router;
