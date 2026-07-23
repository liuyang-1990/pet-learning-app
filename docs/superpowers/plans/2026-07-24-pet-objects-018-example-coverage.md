# PET Objects 018 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the eighteenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-018.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses such as `turning`, `type`, `view`, `volume`, `vote`, `vowel`, `wash`, `wave`, `way`, `web`, and `welcome`.

**Constraints:** Registry coverage rises from 2244 to 2294; accessible official rows from 2250 to at least 2300; objects coverage from 904/972 to 954/972.

## Tasks

- [x] Add RED tests for the 50 terms from `tune` through `welcome`.
- [ ] Add `data/example-candidates/objects-018.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
