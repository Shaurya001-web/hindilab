import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root or server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

import geminiRoutes from './routes/gemini.js';
import speechRoutes from './routes/speech.js';
import agentRoutes from './routes/agent.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  process.env.CORS_ORIGIN,
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
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

export default app;

if (!process.env.VERCEL) {
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
}
