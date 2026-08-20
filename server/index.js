import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import geminiRoutes from './routes/gemini.js';
import speechRoutes from './routes/speech.js';
import agentRoutes from './routes/agent.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Rate Limiting Middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all /api routes
app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mockMode: !process.env.GEMINI_API_KEY || process.env.MOCK_MODE === 'true',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api', geminiRoutes);
app.use('/api', speechRoutes);
app.use('/api/agent', agentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`\n🎓 HindiLab API Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);

  if (!process.env.GEMINI_API_KEY) {
    console.log('   ⚠️  GEMINI_API_KEY not set — running in mock mode');
  }
  if (!process.env.SARVAM_API_KEY) {
    console.log('   ⚠️  SARVAM_API_KEY not set — STT/TTS running in mock mode');
  }
  console.log('');
});
