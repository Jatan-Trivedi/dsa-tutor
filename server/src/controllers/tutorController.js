import Question from '../models/Question.js';
import { HttpError } from '../middleware/errorHandler.js';
import { getTutorReply } from '../services/tutorService.js';
import { LANGUAGES } from '../config/languages.js';

const MAX_MESSAGES = 20;

// Never trust the browser: keep only valid, reasonably short chat messages.
function cleanMessages(raw) {
  if (!Array.isArray(raw)) return [];
  const messages = raw
    .filter((m) => ['user', 'assistant'].includes(m?.role) && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  while (messages.length && messages[0].role !== 'user') messages.shift(); // the API needs a user message first
  return messages;
}

export async function askTutor(req, res) {
  const { messages: rawMessages, code = '', language } = req.body ?? {};
  const messages = cleanMessages(rawMessages);
  if (messages.at(-1)?.role !== 'user') {
    throw new HttpError(400, 'Send a message from the student.');
  }

  const question = await Question.findById(req.params.questionId).select('+solution +hints');
  if (!question) throw new HttpError(404, 'Question not found');

  // Only accept languages we know about; anything else falls back to JavaScript.
  const languageName = Object.hasOwn(LANGUAGES, language) ? LANGUAGES[language] : LANGUAGES.javascript;

  const reply = await getTutorReply(question, messages, String(code).slice(0, 5000), languageName);
  res.json({ reply });
}
