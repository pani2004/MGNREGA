import cron from 'node-cron';
import syncService from '../services/syncService.js';

// List of major states to sync (focus on one large state for the project)
const STATES_TO_SYNC = [
  'Uttar Pradesh', // Largest state by population
  'Maharashtra',
  'Bihar',
  'West Bengal',
  'Madhya Pradesh'
];

class CronJobs {
  /**
   * Schedule daily data sync at 2 AM
   */
  scheduleDailySync() {
    cron.schedule('0 2 * * *', async () => {
      console.log('🕐 Starting scheduled daily sync...');
      
      for (const stateName of STATES_TO_SYNC) {
        try {
          console.log(`Syncing ${stateName}...`);
          const result = await syncService.syncStateData(stateName);
          console.log(`✅ ${stateName}: ${result.recordCount} records synced`);
        } catch (error) {
          console.error(`❌ ${stateName} sync failed:`, error.message);
        }
        
        // Wait 5 seconds between states to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
      console.log('✅ Daily sync completed');
    });
    
    console.log('📅 Scheduled daily sync at 2:00 AM');
  }

  /**
   * Schedule weekly full sync (Sunday at 3 AM)
   */
  scheduleWeeklyFullSync() {
    cron.schedule('0 3 * * 0', async () => {
      console.log('🕐 Starting weekly full sync...');
      
      for (const stateName of STATES_TO_SYNC) {
        try {
          const result = await syncService.syncStateData(stateName);
          console.log(`✅ ${stateName}: ${result.recordCount} records synced`);
        } catch (error) {
          console.error(`❌ ${stateName} sync failed:`, error.message);
        }
        
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
      
      console.log('✅ Weekly sync completed');
    });
    
    console.log('📅 Scheduled weekly full sync on Sundays at 3:00 AM');
  }

  /**
   * Initialize all cron jobs
   */
  init() {
    this.scheduleDailySync();
    this.scheduleWeeklyFullSync();
    console.log('⏰ Cron jobs initialized');
  }
}

export default new CronJobs();
