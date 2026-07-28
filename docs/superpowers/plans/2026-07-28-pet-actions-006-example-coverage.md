# PET ACTIONS-006 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-006.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify contextual verb and phrasal-verb senses.

**Constraints:** Registry coverage rises from 2968 to 3018; actions coverage rises from 259/384 to 309/384; batch range is `pray` through `run`.

## Tasks

- [x] Add RED tests for the 50 terms from `pray` through `run`.
- [ ] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, and coverage.
