# PET QUALITIES 007 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the seventh 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-007.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual adjective senses such as `silk`, `situated`, `smart`, `social`, `sorry`, `so-so`, `spare`, `sparkling`, `steep`, `straight`, `strict`, `strong`, `sure`, `suprising`, and `sweet`.

**Constraints:** Registry coverage rises from 2612 to 2662; accessible official rows from 2618 to at least 2668; qualities coverage from 344/450 to 394/450.

## Tasks

- [x] Add RED tests for the 50 terms from `shy` through `terrific`.
- [x] Add `data/example-candidates/qualities-007.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
