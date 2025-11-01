import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cronJobs from './cron/jobs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize cron jobs
if (process.env.NODE_ENV === 'production') {
  cronJobs.init();
}

// Routes
import districtRoutes from './routes/districtRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import syncRoutes from './routes/syncRoutes.js';

app.use('/api/districts', districtRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/sync', syncRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MGNREGA Data API',
    endpoints: {
      districts: '/api/districts',
      data: '/api/data',
      sync: '/api/sync',
      health: '/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
