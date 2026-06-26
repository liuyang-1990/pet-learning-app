# PET Learning App

Mobile-first PET speaking and vocabulary practice app for one learner and one guardian.

## What Is Real Now

- SQLite persistence through the Next.js server.
- Browser recording upload with 7-day Recent Recording retention.
- OpenAI transcription when `OPENAI_API_KEY` is configured.
- OpenAI TTS endpoint for British English model audio when configured.
- OpenAI-backed Speaking Part 1 examiner follow-ups and feedback when configured.
- Local fallback logic when OpenAI is not configured, so the app remains usable in development.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

To enable real AI features, set `OPENAI_API_KEY` in `.env.local`.

## Production With Docker

```bash
cp .env.example .env
docker compose up --build
```

The compose file mounts persistent volumes for:

- SQLite database: `/app/data`
- uploaded recordings: `/app/public/uploads`

## Environment

```bash
DATABASE_PATH="./data/pet-learning.sqlite"
OPENAI_API_KEY=""
OPENAI_TEXT_MODEL="gpt-4.1-mini"
OPENAI_TRANSCRIBE_MODEL="gpt-4o-mini-transcribe"
OPENAI_TTS_MODEL="gpt-4o-mini-tts"
OPENAI_TTS_VOICE="alloy"
APP_UPLOAD_DIR="./public/uploads"
GUARDIAN_PIN="123456"
LEARNER_ENTRY_CODE="123456"
```

## Validation

```bash
npm test
npm run build
```
