# PET Objects 016 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the sixteenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-016.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun or contextual senses such as `solve`, `sound`, `speaker`, `spite`, `spot`, `squash`, `stall`, `step`, `stick`, `stream`, `strike`, `stuff`, `style`, `support`, and `switch`.

**Constraints:** Registry coverage rises from 2144 to 2194; accessible official rows from 2149 to 2199; objects coverage from 804/972 to 854/972.

## Tasks

- [x] Add RED tests for the 50 terms from `social media` through `system`.
- [ ] Add `data/example-candidates/objects-016.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
