# PET Qualities 003 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the third 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-003.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses such as `fair`, `fine`, `first`, `folk`, `following`, `fond`, `foreign`, `free`, `frozen`, `general`, `hard`, and `high jump`.

**Constraints:** Registry coverage rises from 2412 to 2462; accessible official rows from 2418 to at least 2468; qualities coverage from 144/450 to 194/450.

## Tasks

- [x] Add RED tests for the 50 terms from `extra` through `high jump`.
- [x] Add `data/example-candidates/qualities-003.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [ ] Verify targeted tests, bilingual audit, full tests, build, coverage, push, and production HTTP 200.
