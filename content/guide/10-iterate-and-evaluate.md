---
title: Iterate and evaluate
tier: intermediate
tags: [evals, iteration]
---

You will not get the prompt right on the first try. Real prompt engineering is a tight loop: **edit → run on N inputs → measure → edit**.

Build the smallest possible eval:

1. Collect 5-20 real inputs that cover good cases, edge cases, and known failures.
2. Define a pass criterion per case (exact match, ≥ threshold, human thumbs-up).
3. Run your prompt against all of them after every change.

Most prompt "improvements" are actually regressions for someone. Without an eval you won't notice.

Gotchas:

- A 1-example eval lies to you. Aim for at least a dozen.
- Hold out a test set you *don't* tune against.
- Track model *and* temperature with every run — both change the outputs.
