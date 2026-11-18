import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { askTutor } from '../controllers/tutorController.js';

const router = Router();

// Each tutor message costs real money, so cap how often one visitor can ask.
const tutorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many hint requests. Please wait a few minutes and try again.' },
});

router.post('/:questionId', tutorLimiter, askTutor);

export default router;
