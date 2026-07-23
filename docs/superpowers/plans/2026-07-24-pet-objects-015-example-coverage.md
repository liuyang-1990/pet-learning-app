# PET Objects 015 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the fifteenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-015.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `sense`, `server`, `service`, `sex`, `shade`, `shame`, `side`, `sight`, `sign`, `signal`, `site`, `sleep`, `slide`, `smell`, and `smoke`.

**Constraints:** Registry coverage rises from 2094 to 2144; accessible official rows from 2099 to 2149; objects coverage from 754/972 to 804/972.

## Tasks

- [x] Add RED tests for the 50 terms from `seat belt` through `soccer`.
- [x] Add `data/example-candidates/objects-015.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
