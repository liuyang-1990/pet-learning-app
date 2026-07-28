# PET ACTIONS-007 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-007.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify contextual verb and phrasal-verb senses.

**Constraints:** Registry coverage rises from 3018 to 3068; actions coverage rises from 309/384 to 359/384; batch range is `run out` through `touch`.

## Tasks

- [x] Add RED tests for the 50 terms from `run out` through `touch`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
