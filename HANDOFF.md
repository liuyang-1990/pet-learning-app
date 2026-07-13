# Handoff

## Project And Current Request

Workspace: `/Users/luis/project/pet-learning-app`

This is a PET/B1 English learning app for a child learner and guardian. The user is highly sensitive to vocabulary-content quality, especially mismatches between English examples and Chinese meanings.

The immediate open task is to decide and implement a safe rollout for **full vocabulary-example coverage**. The user just asked for a global audit after noticing that `cloudy` has no example.

## Current Truth About Examples

- Official vocabulary: `3099` rows in `src/lib/generated/pet-vocabulary.json`.
- Learner-facing, manually reviewed examples: `85` rows.
- Words currently without an example sentence: `3014` rows, so coverage is about `2.7%`.
- `cloudy` is one of the missing rows. Its Chinese gloss is `多云的；有愁容的；云的` and `getWordExample` returns `sentence: null` for it.
- This is not an isolated accidental deletion. Previously the app had an unreviewed generated pool (the old handoff reported `3087` generated keys). That pool caused semantic and grammar errors such as adjective templates yielding `the cloudy`. To prevent bad learner content, the current system intentionally hides every non-reviewed example.
- The old generated pool was untracked and has been overwritten, so the exact former `cloudy` sentence cannot be recovered from Git. Do not claim that it was correct.

Current example behavior is in [src/lib/pet-learning-app.ts](/Users/luis/project/pet-learning-app/src/lib/pet-learning-app.ts):

1. `getReviewedWordExamples()` holds hand-authored content.
2. `getWordExample()` returns that content only when it exists.
3. All other entries return their Chinese gloss with `sentence: null`.
4. The UI hides the spoken-example block when `sentence` is null.

## Work Completed In This Session

### Content Safety And Google Audit

- Replaced the unsafe automatic-example behavior with reviewed-only learner-facing examples.
- [scripts/generate-pet-word-examples.mjs](/Users/luis/project/pet-learning-app/scripts/generate-pet-word-examples.mjs) now deliberately writes an empty `generatedWordExamples` object. It does **not** create safe full-bank examples.
- Added [scripts/audit-reviewed-pet-examples.ts](/Users/luis/project/pet-learning-app/scripts/audit-reviewed-pet-examples.ts), which audits reviewed English examples with Google Translate in both directions and writes [src/lib/generated/pet-word-example-audit.ts](/Users/luis/project/pet-learning-app/src/lib/generated/pet-word-example-audit.ts).
- Latest audit: `85` reviewed examples, `0` marked `needs_review`.
- The test suite enforces that every learner-facing reviewed example has a matching audit entry and none currently need review.

### Examples Corrected / Added

- Corrected manual examples for `ability` and `able` after the user found clear English-Chinese mismatches.
- Restored/reviewed examples for `weather forecast` and `natural`.
- Added reviewed examples:
  - `climate`: `The climate here is warm and wet for most of the year.`
  - `climate change`: `Climate change is making some summers hotter.`

### Daily New-Word Scheduling

- `climate` and `climate change` remain distinct Cambridge/PET lexical entries, but are treated as **one learning unit** in daily new-word scheduling.
- The app prioritizes the longer phrase (`climate change`) when both exist; it will not later schedule `climate` as another new word after either one has been seen or becomes a weak word.
- This mapping is deliberately explicit and conservative. Do not generalize it to all phrases by simply using the first word; that would incorrectly merge unrelated vocabulary.

### Test Stability

- Added regression tests for the `climate` learning unit and both new examples.
- Stabilized three component tests that accidentally depended on the current date's seeded random word selection. They now use small controlled word banks while still testing real theme-sync and guardian-content behavior.

## Verification Last Run

All commands below passed after the changes:

```bash
npm run audit:examples
# Audited 85 reviewed PET examples; 0 need review.

npm test
# 2 test files, 29 tests passed.

npm run build
# Passed.
```

The dev server was restarted after the production build and was verified with HTTP 200:

```text
http://localhost:3000
```

`next build` overwrites `.next`; it can corrupt a running `next dev` process. If the site returns 500 after a build, stop the old server and run `npm run dev` again.

## Recommended Next Plan

Do not regenerate 3014 automatic sentences and present them as correct. That recreates the exact quality failure the user has complained about.

First, agree on a coverage policy with the user. Recommended implementation:

1. Keep unreviewed examples hidden, but show a neutral `例句审核中` state rather than a blank gap.
2. Build reviewed examples in themed batches and run `npm run audit:examples` on each batch.
3. Add a CI coverage budget: the number of reviewed official-word examples may never decrease.
4. If every scheduled daily new word must have an example, select daily new words only from reviewed entries until coverage is sufficiently high. This reduces available words by theme, so it is a product decision and needs explicit approval.

The current test only guarantees audit coverage for examples that exist. It intentionally permits `sentence: null`, which is why the global gap was not caught as a failure.

## Important Files

- [src/lib/pet-learning-app.ts](/Users/luis/project/pet-learning-app/src/lib/pet-learning-app.ts): vocabulary model, manual examples, daily selection, learning-unit map.
- [src/lib/pet-learning-app.test.ts](/Users/luis/project/pet-learning-app/src/lib/pet-learning-app.test.ts): content, audit, and selection tests.
- [src/components/pet-prototype.tsx](/Users/luis/project/pet-learning-app/src/components/pet-prototype.tsx): hides absent example blocks.
- [src/components/pet-prototype.test.tsx](/Users/luis/project/pet-learning-app/src/components/pet-prototype.test.tsx): use controlled word banks for assertions about daily word lists.
- [scripts/audit-reviewed-pet-examples.ts](/Users/luis/project/pet-learning-app/scripts/audit-reviewed-pet-examples.ts): Google Translate audit command.
- [scripts/generate-pet-word-examples.mjs](/Users/luis/project/pet-learning-app/scripts/generate-pet-word-examples.mjs): clears unreviewed generated examples.
- [src/lib/generated/pet-word-example-audit.ts](/Users/luis/project/pet-learning-app/src/lib/generated/pet-word-example-audit.ts): generated audit status, currently 85 pass entries.
- [src/lib/generated/pet-vocabulary.json](/Users/luis/project/pet-learning-app/src/lib/generated/pet-vocabulary.json): 3099 official vocabulary rows.

## Repository State

The worktree is intentionally dirty with many prior user/agent changes. Do not reset, checkout, or revert unrelated work.

Relevant current/untracked work includes `HANDOFF.md`, `scripts/audit-reviewed-pet-examples.ts`, `scripts/generate-pet-word-examples.mjs`, and `src/lib/generated/`. The generated audit/cache may be ignored by Git; inspect `git status --short` before staging anything.

## Pitfalls: Do Not Repeat

- Do not re-enable template-generated examples for all official words merely to make the UI look complete. The user already found severe semantic errors (`ability`, `able`) and malformed adjective examples in that approach.
- Do not use generic fallback/meta sentences such as `I heard the word ...`, `reading homework`, or `vocabulary notebook` for learner-facing PET content.
- Do not treat Google Translate as authoritative semantic validation of isolated, polysemous Chinese glosses. It is useful as a bilingual example-sentence signal, then humans still review flagged or suspicious cases.
- Do not remove a reviewed example without updating its audit entry; tests intentionally fail on mismatched reviewed/audit key sets.
- Do not infer phrase learning groups from shared tokens. Only add an explicit mapping after checking the vocabulary semantics.
- Do not assert a specific word from a large daily word bank in UI tests without controlled test data. Daily selection is deterministically seeded by date, so natural-date tests become flaky.
- Do not run `npm run seed:pet` expecting it to repopulate safe examples. The generator currently clears the unreviewed example module by design.
- Do not leave a dev server running through `npm run build`; restart it after the build before reporting the local URL.
- Do not use destructive Git commands in this dirty worktree.

## Suggested Skills

- `superpowers:test-driven-development`: write regression tests before changing selection or example behavior.
- `diagnosing-bugs`: use if examples disappear unexpectedly, the API sync fails, or the dev server returns 500.
- `browser:control-in-app-browser`: verify the actual learner vocabulary screen after a UI-state change.
- `handoff`: refresh this file at the end of the next substantial session.
