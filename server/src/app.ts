import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error-handler.js';
import scanRoutes from './routes/scan.routes.js';
import reportRoutes from './routes/report.routes.js';
import glossaryRoutes from './routes/glossary.routes.js';
import criterionRoutes from './routes/criterion.routes.js';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Body parser
app.use(express.json({ limit: '1mb' }));

// Rate limiter (disabled in test mode)
if (process.env.NODE_ENV !== 'test') {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '10', 10),
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Limite de requisicoes excedido. Tente novamente mais tarde.' },
  });
  app.use('/api/', limiter);
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/scans', scanRoutes);
app.use('/api/scans', reportRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/criteria', criterionRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;

// Start server only when run directly
const PORT = parseInt(process.env.PORT || '3000', 10);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
