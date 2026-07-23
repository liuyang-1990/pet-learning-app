# PET Objects 014 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the fourteenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-014.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `request`, `rest`, `ride`, `roll`, `roundabout`, `row`, `rubber`, `ruin`, `sail`, `scene`, and `search`.

**Constraints:** Registry coverage rises from 2044 to 2094; accessible official rows from 2049 to 2099; objects coverage from 704/972 to 754/972.

## Tasks

- [x] Add RED tests for the 50 terms from `reporter` through `seat`.
- [x] Add `data/example-candidates/objects-014.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
