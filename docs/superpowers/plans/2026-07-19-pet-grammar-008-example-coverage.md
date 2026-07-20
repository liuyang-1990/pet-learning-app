# PET Grammar 008 Final Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the final nine missing grammar-theme terms.

**Architecture:** Store approved content in `data/example-candidates/grammar-008.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly the final 9 missing official grammar terms, from `wow` through `yourself` in remaining vocabulary order.
- Reviewed registry coverage rises from 1385 to 1394; accessible official rows rise from 1390 to 1399.
- Grammar accessible coverage reaches 338/338 with no remaining grammar terms.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarEighthBatch` using the 9 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1394, and grammar coverage exactly 338/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "final grammar"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require final grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-008.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-008`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| wow | wow | Wow, this view is amazing! | wow = 哇；哇，这里的景色太棒了！ |
| yeah | yeah | Yeah, I can help you tomorrow. | yeah = 是的；是的，我明天可以帮你。 |
| yes | yes | Yes, I have finished my homework. | yes = 是的；是的，我已经完成家庭作业了。 |
| yet | yet | Have you finished your homework yet? | yet = 还；你完成家庭作业了吗？ |
| you | you | You can sit here. | you = 你；你可以坐在这里。 |
| you know | you know | You know, this is a difficult decision. | you know = 你知道的；你知道的，这是一个艰难的决定。 |
| your | your | Is this your jacket? | your = 你的；这是你的夹克吗？ |
| yours | yours | This umbrella is yours. | yours = 你的；这把伞是你的。 |
| yourself | yourself | Did you make this cake yourself? | yourself = 你亲自；这个蛋糕是你亲自做的吗？ |

- [ ] Create the ledger from all 9 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: complete reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1394 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify 109 tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit final grammar example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1399/3099 with grammar at 338/338, and verify the production service returns HTTP 200.
