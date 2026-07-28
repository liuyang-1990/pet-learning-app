# PET ACTIONS-003 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-003.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses.

**Constraints:** Registry coverage rises from 2818 to 2868; actions coverage rises from 109 to 159; batch range is `encourage` through `give out`.

## Tasks

- [x] Add RED tests for the 50 terms from `encourage` through `give out`.
- [ ] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, and coverage.
