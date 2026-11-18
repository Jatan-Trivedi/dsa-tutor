import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Question from '../models/Question.js';
import { questions } from './questions.js';

await connectDB();
await Question.deleteMany({});
await Question.insertMany(questions);
console.log(`Seeded ${questions.length} questions`);
await mongoose.disconnect();
