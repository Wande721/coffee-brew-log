const express = require('express');
const cors = require('cors');
const brewsRouter = require('./routes/brews');

function createApp() {
  const app = express();

  app.use(express.json());

  const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim());
  app.use(cors({ origin: allowedOrigins }));

  app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

  app.use('/api/brews', brewsRouter);

  app.use('/api', (req, res) => {
    res.status(404).json({ errors: ['Not found'] });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ errors: ['Internal server error'] });
  });

  return app;
}

module.exports = { createApp };