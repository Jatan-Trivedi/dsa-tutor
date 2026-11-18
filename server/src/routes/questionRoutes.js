import { Router } from 'express';
import { listQuestions, getQuestion } from '../controllers/questionController.js';

const router = Router();

router.get('/', listQuestions);
router.get('/:id', getQuestion);

export default router;
