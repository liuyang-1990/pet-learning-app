# PET Qualities 001 Example Batch Implementation Plan

**Goal:** Add reviewed PET/B1 examples for the first 50 remaining qualities-theme terms.

**Architecture:** Store approved content in `data/example-candidates/qualities-001.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous or contextual senses such as `all right / alright`, `alive`, `asleep`, `available`, `awake`, `bald`, `blind`, `bottom`, `capital`, `cardboard`, and `challenging`.

**Constraints:** Registry coverage rises from 2312 to 2362; accessible official rows from 2318 to at least 2368; qualities coverage from 44/450 to 94/450.

## Tasks

- [x] Add RED tests for the 50 terms from `absent` through `clever`.
- [x] Add `data/example-candidates/qualities-001.json` with promoted entries.
- [x] Promote identical entries into `src/lib/pet-learning-app.ts`.
- [x] Verify targeted tests, bilingual audit, full tests, build, and coverage.
