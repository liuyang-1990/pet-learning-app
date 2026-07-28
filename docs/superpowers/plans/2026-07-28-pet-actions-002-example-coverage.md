# PET ACTIONS-002 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-002.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses.

**Constraints:** Registry coverage rises from 2768 to 2818; actions coverage rises from 59 to 109; batch range is `catch` through `employ`.

## Tasks

- [x] Add RED tests for the 50 terms from `catch` through `employ`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
