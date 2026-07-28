# PET QUALITIES 008 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the eighth 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-008.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual adjective senses such as `top`, `true`, `typical`, `upper`, `upset`, `upstairs`, `well`, `well-dressed`, `well-known`, `western`, `wide`, `willing`, and `working`.

**Constraints:** Registry coverage rises from 2662 to 2712; accessible official rows from 2668 to at least 2718; qualities coverage from 394/450 to 444/450.

## Tasks

- [x] Add RED tests for the 50 terms from `terrified` through `working`.
- [ ] Add `data/example-candidates/qualities-008.json` with promoted entries.
- [ ] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
