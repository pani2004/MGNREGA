import axios from 'axios';

class DataGovService {
  constructor() {
    this.baseURL = 'https://api.data.gov.in/resource';
    this.apiKey = process.env.DATA_GOV_API_KEY;
    // Resource ID for MGNREGA district data
    this.resourceId = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  }

  /**
   * Fetch MGNREGA data from data.gov.in API
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response data
   */
  async fetchDistrictData(params = {}) {
    try {
      const queryParams = {
        'api-key': this.apiKey,
        format: 'json',
        limit: params.limit || 1000,
        offset: params.offset || 0
      };

      const response = await axios.get(`${this.baseURL}/${this.resourceId}`, {
        params: queryParams,
        timeout: 30000, // 30 seconds timeout
      });

      return {
        success: true,
        data: response.data.records || [],
        total: response.data.total || 0,
        count: response.data.count || 0,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching from data.gov.in:', error.message);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Fetch ALL data with pagination
   * @param {number} limit - Number of records per request
   * @param {number} offset - Starting offset
   * @returns {Promise<Object>}
   */
  async fetchAllData(limit = 1000, offset = 0) {
    return this.fetchDistrictData({ limit, offset });
  }

  /**
   * Fetch data for a specific state (client-side filtering)
   * @param {string} stateName - Name of the state
   * @returns {Promise<Object>}
   */
  async fetchStateData(stateName) {
    // Fetch all and filter locally since API filters don't work reliably
    const result = await this.fetchAllData(10000, 0); // Fetch large batch
    
    if (result.success) {
      const filtered = result.data.filter(r => 
        r.state_name && r.state_name.toUpperCase() === stateName.toUpperCase()
      );
      return {
        ...result,
        data: filtered,
        count: filtered.length
      };
    }
    
    return result;
  }

  /**
   * Fetch data with pagination
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<Object>}
   */
  async fetchPaginatedData(page = 1, pageSize = 100) {
    const offset = (page - 1) * pageSize;
    return this.fetchDistrictData({
      limit: pageSize,
      offset: offset
    });
  }
}

export default new DataGovService();
