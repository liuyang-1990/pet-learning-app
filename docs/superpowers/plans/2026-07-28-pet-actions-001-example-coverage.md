# PET ACTIONS-001 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-001.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses.

**Constraints:** Registry coverage rises from 2718 to 2768; actions coverage rises from 9 to 59; batch range is `accept` through `carry out`.

## Tasks

- [x] Add RED tests for the 50 terms from `accept` through `carry out`.
- [ ] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, and coverage.
