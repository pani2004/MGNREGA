import syncService from '../services/syncService.js';

class SyncController {
  /**
   * Trigger data sync for a state
   */
  async syncState(req, res) {
    try {
      const { stateName } = req.body;

      if (!stateName) {
        return res.status(400).json({
          success: false,
          error: 'State name is required'
        });
      }

      console.log(`Starting sync for state: ${stateName}`);
      
      // Run sync and wait for completion
      const result = await syncService.syncStateData(stateName);

      res.json({
        success: true,
        message: `Successfully synced data for ${stateName}`,
        recordsProcessed: result.recordsProcessed
      });
    } catch (error) {
      console.error('Sync failed:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new SyncController();
