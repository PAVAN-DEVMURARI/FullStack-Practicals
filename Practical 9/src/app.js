import express from 'express';
import homeRouter from './routes/index.js';

function createApp() {
  const app = express();

  // Basic security/health middlewares placeholder (easy to extend later)
  app.disable('x-powered-by');

  // JSON and URL-encoded parsers (future-ready)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/', homeRouter);

  // 404 handler
  app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error('[Error]', err);
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
  });

  return app;
}

export default createApp;
