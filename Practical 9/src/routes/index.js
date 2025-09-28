import { Router } from 'express';

const router = Router();

// Home route
router.get('/', (req, res) => {
  res.type('text/plain').send('Welcome to our site');
});

export default router;
