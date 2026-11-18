import 'dotenv/config'; // must stay first so env vars are loaded before anything else runs
import app from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 5000;

await connectDB();
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
