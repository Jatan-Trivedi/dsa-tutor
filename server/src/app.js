import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import questionRoutes from './routes/questionRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) app.set('trust proxy', 1); // the host's proxy sits in front, so read the real client IP

app.use(express.json({ limit: '50kb' }));
app.use('/api/questions', questionRoutes);
app.use('/api/tutor', tutorRoutes);

// In production one server does everything: it also serves the built React app.
if (isProduction) {
  const clientDist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');
  app.use(express.static(clientDist));
  app.get('/{*splat}', (req, res) => res.sendFile(path.join(clientDist, 'index.html'))); // lets React Router handle page URLs
}

app.use(errorHandler); // must be registered last

export default app;
