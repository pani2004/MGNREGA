import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// States
export const getAllStates = async () => {
  const response = await api.get('/districts/states');
  return response.data;
};

// Districts
export const getDistrictsByState = async (stateId) => {
  const response = await api.get(`/districts/states/${stateId}/districts`);
  return response.data;
};

export const getDistrictById = async (districtId) => {
  const response = await api.get(`/districts/${districtId}`);
  return response.data;
};

export const searchDistricts = async (query) => {
  const response = await api.get(`/districts/search?query=${query}`);
  return response.data;
};

// Data
export const getCurrentData = async (districtId, financialYear) => {
  const url = financialYear 
    ? `/data/district/${districtId}/current?financialYear=${financialYear}`
    : `/data/district/${districtId}/current`;
  const response = await api.get(url);
  return response.data;
};

export const getHistoricalData = async (districtId, limit = 12) => {
  const response = await api.get(`/data/district/${districtId}/historical?limit=${limit}`);
  return response.data;
};

export const compareDistricts = async (districtIds, financialYear) => {
  const ids = Array.isArray(districtIds) ? districtIds.join(',') : districtIds;
  const url = financialYear
    ? `/data/compare?districtIds=${ids}&financialYear=${financialYear}`
    : `/data/compare?districtIds=${ids}`;
  const response = await api.get(url);
  return response.data;
};

export const getStateAggregatedData = async (stateId, financialYear) => {
  const url = financialYear
    ? `/data/state/${stateId}/aggregate?financialYear=${financialYear}`
    : `/data/state/${stateId}/aggregate`;
  const response = await api.get(url);
  return response.data;
};

export const getDistrictRankings = async (stateId, metric = 'totalPersonDaysGenerated') => {
  const response = await api.get(`/data/state/${stateId}/rankings?metric=${metric}`);
  return response.data;
};

// Sync
export const triggerSync = async (stateName) => {
  const response = await api.post('/sync/trigger', { stateName });
  return response.data;
};

export default api;
