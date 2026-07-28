# PET ACTIONS-004 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for 50 remaining actions-theme terms.

**Architecture:** Store approved content in `data/example-candidates/actions-004.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses.

**Constraints:** Registry coverage rises from 2868 to 2918; actions coverage rises from 159 to 209; batch range is `give up` through `kill`.

## Tasks

- [x] Add RED tests for the 50 terms from `give up` through `kill`.
- [x] Promote the candidate ledger into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
