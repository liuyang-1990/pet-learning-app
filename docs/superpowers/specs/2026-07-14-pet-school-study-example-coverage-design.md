# PET School and Study Example Coverage Design

## Goal

Add 50 reviewed PET/B1 vocabulary examples for school and study contexts while preserving the rule that only reviewed examples can appear to learners.

## Scope

The official vocabulary data has too few entries tagged `school` to form a 50-word batch. This batch therefore uses a tightly related `school and study` context across source themes. It covers exactly these missing official entries:

```text
answer, article, bookcase, bookshelf, chapter, college, course, dictionary,
education, essay, examination / exam, exercise, explain, grammar, learn, mark,
maths / mathematics, mistake, note, notebook, paper, pencil, pencil case,
pupil, read, reading, research, revise, science, spelling, study, teach,
teaching, test, textbook, university, write, write down, calculator, computer,
desk, document, file, keyboard, language, message, question, record, skill,
translate
```

The batch does not change daily word scheduling or expose candidate content as a fallback.

## Content Policy

Every learner-facing entry must remain reviewed-only and include:

- The exact learner-facing term as `focusWord`.
- A natural B1/PET English sentence, normally 8-14 words.
- A Chinese value in `term = gloss；sentence translation` form.

Each example must demonstrate the intended school or study sense. In particular, polysemous terms such as `course`, `mark`, `record`, `file`, and `translate` must not use unrelated senses. Examples must not use meta-learning filler such as `I learned the word ...` or malformed word-class templates.

## Data Flow

1. Draft all 50 entries in `data/example-candidates/school-study-001.json` with `status: "promoted"` only after review.
2. Promote the same accepted entries into `getReviewedWordExamples()` in `src/lib/pet-learning-app.ts`.
3. `getWordExample()` continues to use reviewed entries only. Candidate files remain unimported by application code.
4. Run `npm run audit:examples` to regenerate the reviewed-example audit file.
5. Resolve every audit flag before the batch is accepted.

## Testing And Acceptance Criteria

Add test coverage that requires all 50 batch terms to return learner-facing sentences and raises the reviewed example minimum from 135 to 185. Include exact regression assertions for selected ambiguous terms: `course`, `mark`, and `translate`.

The batch is complete only when:

- All 50 selected terms have reviewed examples.
- The candidate ledger and reviewed registry agree on the selected terms.
- `npm run audit:examples` reports zero `needs_review` entries.
- `npm test` passes.
- `npm run build` passes.
