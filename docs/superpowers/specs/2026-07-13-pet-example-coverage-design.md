# PET Example Coverage Design

## Goal

Fill the missing PET vocabulary examples without exposing unreviewed or low-quality generated sentences to the learner. The first rollout batch covers about 50 `nature` and `weather` terms, including `cloudy`.

## Content Policy

Learner-facing examples must stay reviewed-only. Generated or drafted examples may exist as candidates, but `getWordExample()` must only expose examples that have been promoted into the reviewed set.

Each reviewed example must include:

- `focusWord`: the exact learner-facing term, cleaned only when the existing vocabulary normalization already does so.
- `sentence`: a natural B1/PET-level English sentence, usually 8-14 words.
- `chinese`: `term = gloss；sentence translation` format.

Examples must avoid:

- Meta sentences such as `I learned the word cloudy.`
- Generic filler such as `reading homework`, `in my bag`, or `Let's talk about...`.
- Grammar templates that misuse word class, such as `the cloudy`.
- English sentences that demonstrate a different sense from the Chinese gloss.

## Batch Workflow

1. Select a focused batch of about 50 missing official vocabulary rows from `src/lib/generated/pet-vocabulary.json`.
2. For the first batch, prioritize `nature` and `weather` terms so `cloudy` and related words are covered early.
3. Draft examples into a candidate file under `data/example-candidates/`.
4. Review candidates and promote only accepted examples into `getReviewedWordExamples()`.
5. Run `npm run audit:examples` to refresh `src/lib/generated/pet-word-example-audit.ts`.
6. Fix every `needs_review` result before the batch is considered complete.
7. Run `npm test` and `npm run build`.

Candidate files are not learner-facing. They are working material for review and may contain notes or rejected drafts.

## Product Behavior During Rollout

Until full coverage is reached, missing examples should remain hidden or be shown as a neutral pending state. The app must not use candidate examples as fallback learner content.

Daily new-word selection can be tightened later to prefer reviewed-example terms, but that is a separate product decision because it reduces available themed vocabulary while coverage is still low.

## Test Strategy

The current tests already guarantee that every reviewed learner-facing example has an audit entry and no reviewed example is marked `needs_review`.

Add or update tests during implementation to:

- Keep generated example fallback disabled.
- Lock a minimum reviewed-example count after each accepted batch.
- Assert that `cloudy` returns a reviewed sentence once the first batch lands.
- Guard against known bad fallback/meta sentence patterns.

## First Batch Acceptance Criteria

The first batch is complete when:

- About 50 missing `nature` or `weather` vocabulary terms have reviewed examples.
- `cloudy` has a natural reviewed example.
- `npm run audit:examples` reports zero examples needing review.
- `npm test` passes.
- `npm run build` passes.
