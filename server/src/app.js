import express from 'express';
import questionRoutes from './routes/questionRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json({ limit: '50kb' }));
app.use('/api/questions', questionRoutes);
app.use('/api/tutor', tutorRoutes);
app.use(errorHandler); // must be registered last

export default app;
