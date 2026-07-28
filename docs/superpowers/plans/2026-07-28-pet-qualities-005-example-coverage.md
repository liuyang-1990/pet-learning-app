# PET QUALITIES 005 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the fifth 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-005.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual adjective senses such as `OK / OK / okay`, `navy blue`, `nearby`, `next`, `opposite`, `orange`, `past`, `particular`, `permitted`, `plain`, `poor`, and `present`.

**Constraints:** Registry coverage rises from 2512 to 2562; accessible official rows from 2518 to at least 2568; qualities coverage from 244/450 to 294/450.

## Tasks

- [x] Add RED tests for the 50 terms from `mild` through `present`.
- [x] Add `data/example-candidates/qualities-005.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
