import prisma from '../config/database.js';

class DistrictController {
  /**
   * Get all states
   */
  async getAllStates(req, res) {
    try {
      const states = await prisma.state.findMany({
        include: {
          _count: {
            select: { districts: true }
          }
        },
        orderBy: { name: 'asc' }
      });

      res.json({
        success: true,
        count: states.length,
        data: states
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get districts by state
   */
  async getDistrictsByState(req, res) {
    try {
      const { stateId } = req.params;

      const districts = await prisma.district.findMany({
        where: { stateId },
        include: {
          state: true,
          _count: {
            select: { data: true }
          }
        },
        orderBy: { name: 'asc' }
      });

      res.json({
        success: true,
        count: districts.length,
        data: districts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get district by ID with latest data
   */
  async getDistrictById(req, res) {
    try {
      const { districtId } = req.params;

      const district = await prisma.district.findUnique({
        where: { id: districtId },
        include: {
          state: true,
          data: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        }
      });

      if (!district) {
        return res.status(404).json({
          success: false,
          error: 'District not found'
        });
      }

      res.json({
        success: true,
        data: district
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Search districts by name
   */
  async searchDistricts(req, res) {
    try {
      const { query } = req.query;

      const districts = await prisma.district.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        include: {
          state: true
        },
        take: 10
      });

      res.json({
        success: true,
        count: districts.length,
        data: districts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new DistrictController();
