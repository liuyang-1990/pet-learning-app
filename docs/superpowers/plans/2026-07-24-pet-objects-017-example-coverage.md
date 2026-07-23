# PET Objects 017 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the seventeenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-017.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun or contextual senses such as `takeaway`, `tap`, `taste`, `tear`, `tense`, `term`, `text`, `thought`, `tick`, `tip`, `title`, `toast`, `torch`, `track`, `trainer`, `trouble`, `trunk`, and `tube`.

**Constraints:** Registry coverage rises from 2194 to 2244; accessible official rows from 2199 to 2249; objects coverage from 854/972 to 904/972.

## Tasks

- [x] Add RED tests for the 50 terms from `takeaway` through `tuna`.
- [x] Add `data/example-candidates/objects-017.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
