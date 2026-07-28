# PET ACTIONS-008 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 25 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-008.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify contextual verb and phrasal-verb senses.

**Constraints:** Registry coverage rises from 3068 to 3093; actions coverage rises from 359/384 to 384/384; batch range is `transfer` through `wrap`.

## Tasks

- [x] Add RED tests for the 25 terms from `transfer` through `wrap`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
