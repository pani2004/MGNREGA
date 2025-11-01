import dotenv from 'dotenv';
import syncService from './services/syncService.js';

dotenv.config();

async function syncAllData() {
  console.log('🚀 Starting MGNREGA Data Sync using existing syncService...\n');
  
  // Major states to sync (focusing on large states as per project requirement)
  const states = [
    'UTTAR PRADESH',
    'MAHARASHTRA', 
    'BIHAR',
    'WEST BENGAL',
    'MADHYA PRADESH',
    'RAJASTHAN',
    'TAMIL NADU',
    'KARNATAKA',
    'ANDHRA PRADESH',
    'ODISHA'
  ];
  
  for (const stateName of states) {
    console.log(`\n📍 Syncing ${stateName}...`);
    const result = await syncService.syncStateData(stateName);
    
    if (result.success) {
      console.log(`✅ ${stateName}: ${result.recordCount} records synced`);
    } else {
      console.log(`❌ ${stateName}: ${result.error}`);
    }
    
    // Wait 2 seconds between states to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎉 All syncs complete!');
  process.exit(0);
}

syncAllData();
