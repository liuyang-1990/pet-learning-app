# PET Objects 013 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the thirteenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-013.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `practice`, `presenter`, `progress`, `promise`, `pump`, `range`, `rap`, `regards`, `rent`, and `report`.

**Constraints:** Registry coverage rises from 1994 to 2044; accessible official rows from 1999 to 2049; objects coverage from 654/972 to 704/972.

## Tasks

- [ ] Add RED tests for the 50 terms from `postcard` through `report`.
- [ ] Add `data/example-candidates/objects-013.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
