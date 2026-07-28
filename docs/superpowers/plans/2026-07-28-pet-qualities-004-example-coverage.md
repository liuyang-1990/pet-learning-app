# PET QUALITIES 004 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the fourth 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-004.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual adjective senses such as `historic`, `historical`, `horror`, `human`, `impressed`, `intermediate`, `keen`, `last`, `least`, `limited`, `little`, `long jump`, and `medium`.

**Constraints:** Registry coverage rises from 2462 to 2512; accessible official rows from 2468 to at least 2518; qualities coverage from 194/450 to 244/450.

## Tasks

- [x] Add RED tests for the 50 terms from `historic` through `messy`.
- [x] Add `data/example-candidates/qualities-004.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
