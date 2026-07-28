# PET QUALITIES 006 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the sixth 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-006.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual adjective senses such as `pretty`, `principal`, `private`, `proper`, `qualified`, `rare`, `raw`, `realistic`, `reduced`, `regular`, `right`, `roast`, `rough`, `round`, `secondary`, `sharp`, and `shut`.

**Constraints:** Registry coverage rises from 2562 to 2612; accessible official rows from 2568 to at least 2618; qualities coverage from 294/450 to 344/450.

## Tasks

- [x] Add RED tests for the 50 terms from `pretty` through `shut`.
- [x] Add `data/example-candidates/qualities-006.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
