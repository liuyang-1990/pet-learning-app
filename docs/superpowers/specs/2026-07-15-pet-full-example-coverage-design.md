# PET Full Example Coverage Design

## Goal

Complete reviewed learner-facing example coverage for the remaining PET vocabulary without reintroducing unsafe automatic examples.

## Current Baseline

- Official vocabulary rows: 3099.
- Reviewed examples: 185.
- Remaining rows without reviewed examples: 2914.
- Delivery estimate: 59 batches, normally 50 terms per batch; the final batch may contain fewer terms.

## Batch Selection

Select terms by practical theme clusters, not strict source-theme boundaries. Source themes such as `home`, `family`, and `people` may be combined only when they describe one natural learner context and a single source theme has fewer than 50 missing terms.

The first continuation batch is `home-family-001`: 46 missing `home` terms plus four immediate-family terms. Later batch names should describe their shared learner context, for example `health-body-001` or `food-drink-001`.

Before drafting a batch, normalize each official term using the same path as `getWordExample()`. A term that resolves to an existing reviewed key is not a missing entry and must be replaced before writing examples. This prevents slash alternatives such as `examination / exam` from producing inaccessible duplicate records.

## Content And Data Flow

Each batch must use a candidate ledger at `data/example-candidates/<batch-id>.json` with `batchId`, `status`, and one entry per selected term. Candidate data remains unimported by application code.

Only accepted entries are promoted to `getReviewedWordExamples()` in `src/lib/pet-learning-app.ts`. Each entry contains the learner-facing term, a natural B1/PET sentence, and Chinese text in `term = gloss；sentence translation` form. Do not use meta-learning filler, generic templates, or an unrelated sense of a polysemous word.

`getWordExample()` remains reviewed-only. Missing entries continue to return `sentence: null` until their batch is reviewed.

## Per-Batch Quality Gates

Each batch must add a regression contract that:

- Requires all selected terms to return non-null reviewed sentences.
- Raises the reviewed-example count by the batch size.
- Verifies candidate-ledger entries exactly match what `getWordExample()` returns.
- Includes exact sense assertions for any selected polysemous or slash-alternative terms.

Run `npm run audit:examples` after promotion. Fix real content problems in the candidate ledger and reviewed registry. For a translation-audit false positive caused by an official polysemous gloss, add the normalized key to `manuallyConfirmedTerms` with a comment naming the demonstrated sense.

Every batch must pass `npm test` and `npm run build` before integration.

## Integration Cadence

Work on one batch in an isolated `codex/` branch and worktree. After all gates pass, merge the batch into `main`, remove the temporary worktree, rerun tests from the normal repository root, and push `main`.

Do not leave a project-local worktree in place while running root-level Vitest: Vitest discovers tests beneath `.worktrees/`, and a second `node_modules` tree can create duplicate React instances. Remove the merged worktree before root-level verification.
