# PET Objects 019 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the final 18 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-019.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses such as `wetsuit / wet suit`, `workout`, `worry`, `writing`, `yard`, `zero`, and `zone`.

**Constraints:** Registry coverage rises from 2294 to 2312; accessible official rows from 2300 to at least 2318; objects coverage from 954/972 to 972/972.

## Tasks

- [x] Add RED tests for the 18 terms from `wetsuit / wet suit` through `zoo`.
- [ ] Add `data/example-candidates/objects-019.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
