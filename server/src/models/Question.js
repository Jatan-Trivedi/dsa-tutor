import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  description: { type: String, required: true },
  examples: { type: String, default: '' },
  // select: false means queries skip this field unless we ask for it with
  // .select('+solution'). That keeps the answer from ever reaching the browser.
  // Ordered from a gentle nudge to a near-reveal. Also hidden from the browser.
  hints: { type: [String], default: [], select: false },
  solution: { type: String, required: true, select: false },
});

export default mongoose.model('Question', questionSchema);
