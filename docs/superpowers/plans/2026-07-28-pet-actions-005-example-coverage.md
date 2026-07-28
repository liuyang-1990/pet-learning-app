# PET ACTIONS-005 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-005.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify contextual verb and phrasal-verb senses.

**Constraints:** Registry coverage rises from 2918 to 2968; actions coverage rises from 209/384 to 259/384; batch range is `knit` through `practise`.

## Tasks

- [x] Add RED tests for the 50 terms from `knit` through `practise`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
