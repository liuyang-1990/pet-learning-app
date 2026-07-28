# PET QUALITIES-009 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 6 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-009.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses.

**Constraints:** Registry coverage rises from 2712 to 2718; qualities coverage rises from 444 to 450; batch range is `worse` through `young`.

## Tasks

- [x] Add RED tests for the 6 terms from `worse` through `young`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
