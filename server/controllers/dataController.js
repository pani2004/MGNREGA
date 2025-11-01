import prisma from '../config/database.js';

/**
 * Helper to format data for JSON response (convert BigInt to string)
 */
const formatDataForResponse = (data) => {
  return {
    ...data,
    totalPersonDaysGenerated: data.totalPersonDaysGenerated.toString(),
    womenPersonDaysGenerated: data.womenPersonDaysGenerated.toString(),
    scPersonDaysGenerated: data.scPersonDaysGenerated.toString(),
    stPersonDaysGenerated: data.stPersonDaysGenerated.toString()
  };
};

/**
 * Get current data for a district
 */
export const getCurrentData = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { financialYear } = req.query;

    const latestData = await prisma.districtData.findFirst({
      where: {
        districtId,
        ...(financialYear && { financialYear })
      },
      include: {
        district: {
          include: {
            state: true
          }
        }
      },
      orderBy: { lastSyncedAt: 'desc' }
    });

    if (!latestData) {
      return res.status(404).json({
        success: false,
        error: 'No data found for this district'
      });
    }

    // Convert BigInt to string for JSON serialization
    const formattedData = formatDataForResponse(latestData);

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get historical data for a district
 */
export const getHistoricalData = async (req, res) => {
  try {
    const { districtId } = req.params;
    const { startYear, endYear, limit = 12 } = req.query;

    const whereClause = { districtId };
    
    if (startYear || endYear) {
      whereClause.financialYear = {};
      if (startYear) whereClause.financialYear.gte = startYear;
      if (endYear) whereClause.financialYear.lte = endYear;
    }

    const historicalData = await prisma.districtData.findMany({
      where: whereClause,
      include: {
        district: {
          include: {
            state: true
          }
        }
      },
      orderBy: [
        { financialYear: 'desc' },
        { month: 'desc' }
      ],
      take: parseInt(limit)
    });

    const formattedData = historicalData.map(data => formatDataForResponse(data));

    res.json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Compare multiple districts
 */
export const compareDistricts = async (req, res) => {
  try {
    const { districtIds, financialYear } = req.query;

    if (!districtIds) {
      return res.status(400).json({
        success: false,
        error: 'District IDs are required'
      });
    }

    const idsArray = districtIds.split(',');

    const comparativeData = await Promise.all(
      idsArray.map(async (districtId) => {
        const latestData = await prisma.districtData.findFirst({
          where: {
            districtId: districtId.trim(),
            ...(financialYear && { financialYear })
          },
          include: {
            district: {
              include: {
                state: true
              }
            }
          },
          orderBy: { lastSyncedAt: 'desc' }
        });

        return latestData ? formatDataForResponse(latestData) : null;
      })
    );

    res.json({
      success: true,
      count: comparativeData.filter(d => d !== null).length,
      data: comparativeData.filter(d => d !== null)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get state-level aggregated data
 */
export const getStateAggregatedData = async (req, res) => {
  try {
    const { stateId } = req.params;
    const { financialYear } = req.query;

    const districts = await prisma.district.findMany({
      where: { stateId },
      select: { id: true }
    });

    const districtIds = districts.map(d => d.id);

    const allData = await prisma.districtData.findMany({
      where: {
        districtId: { in: districtIds },
        ...(financialYear && { financialYear })
      },
      orderBy: { lastSyncedAt: 'desc' }
    });

    // Get latest data for each district
    const latestDataMap = new Map();
    allData.forEach(data => {
      if (!latestDataMap.has(data.districtId)) {
        latestDataMap.set(data.districtId, data);
      }
    });

    const latestData = Array.from(latestDataMap.values());

    // Aggregate
    const aggregated = {
      totalJobCardsIssued: 0,
      totalWorkers: 0,
      activeJobCards: 0,
      activeWorkers: 0,
      totalHouseholdsWorked: 0,
      totalPersonDaysGenerated: BigInt(0),
      womenPersonDaysGenerated: BigInt(0),
      scPersonDaysGenerated: BigInt(0),
      stPersonDaysGenerated: BigInt(0),
      totalExpenditure: 0,
      wageExpenditure: 0,
      materialExpenditure: 0,
      totalWorksCompleted: 0,
      totalWorksOngoing: 0,
      districtCount: latestData.length
    };

    latestData.forEach(data => {
      aggregated.totalJobCardsIssued += data.totalJobCardsIssued;
      aggregated.totalWorkers += data.totalWorkers;
      aggregated.activeJobCards += data.activeJobCards;
      aggregated.activeWorkers += data.activeWorkers;
      aggregated.totalHouseholdsWorked += data.totalHouseholdsWorked;
      aggregated.totalPersonDaysGenerated += data.totalPersonDaysGenerated;
      aggregated.womenPersonDaysGenerated += data.womenPersonDaysGenerated;
      aggregated.scPersonDaysGenerated += data.scPersonDaysGenerated;
      aggregated.stPersonDaysGenerated += data.stPersonDaysGenerated;
      aggregated.totalExpenditure += data.totalExpenditure;
      aggregated.wageExpenditure += data.wageExpenditure;
      aggregated.materialExpenditure += data.materialExpenditure;
      aggregated.totalWorksCompleted += data.totalWorksCompleted;
      aggregated.totalWorksOngoing += data.totalWorksOngoing;
    });

    // Format BigInt for JSON
    const formattedAggregated = {
      ...aggregated,
      totalPersonDaysGenerated: aggregated.totalPersonDaysGenerated.toString(),
      womenPersonDaysGenerated: aggregated.womenPersonDaysGenerated.toString(),
      scPersonDaysGenerated: aggregated.scPersonDaysGenerated.toString(),
      stPersonDaysGenerated: aggregated.stPersonDaysGenerated.toString()
    };

    res.json({
      success: true,
      data: formattedAggregated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get district rankings within a state
 */
export const getDistrictRankings = async (req, res) => {
  try {
    const { stateId } = req.params;
    const { metric = 'totalPersonDaysGenerated', financialYear } = req.query;

    const districts = await prisma.district.findMany({
      where: { stateId },
      include: {
        data: {
          where: financialYear ? { financialYear } : {},
          orderBy: { lastSyncedAt: 'desc' },
          take: 1
        }
      }
    });

    const rankings = districts
      .filter(d => d.data.length > 0)
      .map(d => ({
        district: d.name,
        districtId: d.id,
        value: d.data[0][metric]
      }))
      .sort((a, b) => {
        const aVal = typeof a.value === 'bigint' ? Number(a.value) : a.value;
        const bVal = typeof b.value === 'bigint' ? Number(b.value) : b.value;
        return bVal - aVal;
      });

    res.json({
      success: true,
      metric,
      count: rankings.length,
      data: rankings.map((r, index) => ({
        ...r,
        rank: index + 1,
        value: typeof r.value === 'bigint' ? r.value.toString() : r.value
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
