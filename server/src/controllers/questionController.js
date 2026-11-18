import Question from '../models/Question.js';
import { HttpError } from '../middleware/errorHandler.js';

export async function listQuestions(req, res) {
  const questions = await Question.find().select('title difficulty').sort('_id');
  res.json(questions);
}

export async function getQuestion(req, res) {
  const question = await Question.findById(req.params.id); // solution is excluded by default
  if (!question) throw new HttpError(404, 'Question not found');
  res.json(question);
}
