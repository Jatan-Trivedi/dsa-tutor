import { Router } from 'express';
import { askTutor } from '../controllers/tutorController.js';

const router = Router();

router.post('/:questionId', askTutor);

export default router;
