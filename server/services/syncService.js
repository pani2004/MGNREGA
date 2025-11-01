import prisma from '../config/database.js';
import dataGovService from './dataGovService.js';

class SyncService {
  /**
   * Sync data for a specific state from API to database
   * @param {string} stateName - Name of the state to sync
   */
  async syncStateData(stateName) {
    console.log(`Starting sync for state: ${stateName}`);
    
    // Fetch data from API
    const apiResponse = await dataGovService.fetchStateData(stateName);
    
    if (!apiResponse.success || !apiResponse.data.length) {
      throw new Error('No data received from API');
    }

    let recordCount = 0;

    // Process each record
    for (const record of apiResponse.data) {
      try {
        // Ensure state exists
        let state = await prisma.state.findUnique({
          where: { name: record.state_name }
        });

        if (!state) {
          state = await prisma.state.create({
            data: {
              name: record.state_name,
              code: this.generateStateCode(record.state_name)
            }
          });
        }

        // Ensure district exists
        let district = await prisma.district.findFirst({
          where: {
            name: record.district_name,
            stateId: state.id
          }
        });

        if (!district) {
          district = await prisma.district.create({
            data: {
              name: record.district_name,
              code: this.generateDistrictCode(record.district_name),
              stateId: state.id
            }
          });
        }

        // Upsert district data (using actual API field names)
        await prisma.districtData.upsert({
          where: {
            districtId_financialYear_month: {
              districtId: district.id,
              financialYear: record.fin_year || '2024-2025',
              month: record.month || null
            }
          },
          update: {
            totalJobCardsIssued: parseInt(record.Total_No_of_JobCards_issued) || 0,
            totalWorkers: parseInt(record.Total_No_of_Workers) || 0,
            activeJobCards: parseInt(record.Total_No_of_Active_Job_Cards) || 0,
            activeWorkers: parseInt(record.Total_No_of_Active_Workers) || 0,
            totalHouseholdsWorked: parseInt(record.Total_Households_Worked) || 0,
            totalPersonDaysGenerated: BigInt(parseInt(record.Total_Individuals_Worked) * parseInt(record.Average_days_of_employment_provided_per_Household || 0) || 0),
            womenPersonDaysGenerated: BigInt(parseInt(record.Women_Persondays) || 0),
            scPersonDaysGenerated: BigInt(parseInt(record.SC_persondays) || 0),
            stPersonDaysGenerated: BigInt(parseInt(record.ST_persondays) || 0),
            approvedLabourBudget: parseFloat(record.Approved_Labour_Budget) || 0,
            totalExpenditure: parseFloat(record.Total_Exp) || 0,
            wageExpenditure: parseFloat(record.Wages) || 0,
            materialExpenditure: parseFloat(record.Material_and_skilled_Wages) || 0,
            adminExpenditure: parseFloat(record.Total_Adm_Expenditure) || 0,
            totalWorksCompleted: parseInt(record.Number_of_Completed_Works) || 0,
            totalWorksOngoing: parseInt(record.Number_of_Ongoing_Works) || 0,
            averageWagePerDay: parseFloat(record.Average_Wage_rate_per_day_per_person) || 0,
            ftosGenerated: 0, // Not available in current API
            lastSyncedAt: new Date()
          },
          create: {
            districtId: district.id,
            financialYear: record.fin_year || '2024-2025',
            month: record.month || null,
            totalJobCardsIssued: parseInt(record.Total_No_of_JobCards_issued) || 0,
            totalWorkers: parseInt(record.Total_No_of_Workers) || 0,
            activeJobCards: parseInt(record.Total_No_of_Active_Job_Cards) || 0,
            activeWorkers: parseInt(record.Total_No_of_Active_Workers) || 0,
            totalHouseholdsWorked: parseInt(record.Total_Households_Worked) || 0,
            totalPersonDaysGenerated: BigInt(parseInt(record.Total_Individuals_Worked) * parseInt(record.Average_days_of_employment_provided_per_Household || 0) || 0),
            womenPersonDaysGenerated: BigInt(parseInt(record.Women_Persondays) || 0),
            scPersonDaysGenerated: BigInt(parseInt(record.SC_persondays) || 0),
            stPersonDaysGenerated: BigInt(parseInt(record.ST_persondays) || 0),
            approvedLabourBudget: parseFloat(record.Approved_Labour_Budget) || 0,
            totalExpenditure: parseFloat(record.Total_Exp) || 0,
            wageExpenditure: parseFloat(record.Wages) || 0,
            materialExpenditure: parseFloat(record.Material_and_skilled_Wages) || 0,
            adminExpenditure: parseFloat(record.Total_Adm_Expenditure) || 0,
            totalWorksCompleted: parseInt(record.Number_of_Completed_Works) || 0,
            totalWorksOngoing: parseInt(record.Number_of_Ongoing_Works) || 0,
            averageWagePerDay: parseFloat(record.Average_Wage_rate_per_day_per_person) || 0,
            ftosGenerated: 0,
          }
        });

        recordCount++;
      } catch (error) {
        console.error(`Error processing record for ${record.district_name}:`, error.message);
      }
    }

    console.log(`✅ Sync completed: ${recordCount} records processed`);
    return { 
      success: true, 
      recordsProcessed: recordCount,
      stateName
    };
  }

  generateStateCode(stateName) {
    return stateName.substring(0, 3).toUpperCase().replace(/\s/g, '');
  }

  generateDistrictCode(districtName) {
    return districtName.substring(0, 3).toUpperCase().replace(/\s/g, '');
  }


}

export default new SyncService();
