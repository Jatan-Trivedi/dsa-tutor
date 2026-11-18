# DSA Tutor (MVP)

Students solve a fixed set of DSA problems. An AI tutor gives hints and asks guiding questions, but never the solution.

## Run it
You need Node 18+ and a MongoDB instance. An Anthropic API key is optional: without one the tutor runs in demo mode and replays the stored hints, so you can test everything for free.

```bash
# 1. API
cd server
cp .env.example .env      # then fill in MONGODB_URI and ANTHROPIC_API_KEY
npm install
npm run seed              # loads the 3 questions
npm run dev               # http://localhost:5000

# 2. Web app (new terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

## How it fits together
- `server/src/models`: the Question schema. `solution` and `hints` are `select: false`, so the API never returns them. The tutor follows the hint ladder in `seed/questions.js`.
- `server/src/routes`: maps URLs to controllers. `controllers`: handle the request and validate input. `services/tutorService.js`: builds the tutor prompt and calls the AI.
- `client/src/api`: all backend calls. `pages`: one file per screen. `components/ChatPanel.jsx`: the chat.

## API
- `GET /api/questions`: list (title, difficulty)
- `GET /api/questions/:id`: one question (no solution)
- `POST /api/tutor/:questionId` with `{ messages, code }`: returns `{ reply }`

## Next steps (not in the MVP)
Login and saved progress, running code against test cases, rate limiting on the tutor route, and an automatic check that blocks replies containing the solution.
