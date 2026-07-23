# PET Qualities 002 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the second 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-002.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses such as `close`, `closed`, `cream`, `daily`, `dead`, `dear`, `direct`, `downstairs`, `due`, `duty-free`, `engaged`, `electric`, and `electrical`.

**Constraints:** Registry coverage rises from 2362 to 2412; accessible official rows from 2368 to at least 2418; qualities coverage from 50/406 to 100/406.

## Tasks

- [x] Add RED tests for the 50 terms from `close` through `excellent`.
- [ ] Add `data/example-candidates/qualities-002.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
