---
title: Examples and few-shot
tier: basics
tags: [few-shot, examples]
---

The fastest way to show a model what you want is to show it. A prompt with 2-4 worked examples ("few-shot") usually beats long written instructions.

```
Convert the sentence to past tense.

Input: I walk to school.
Output: I walked to school.

Input: She writes a letter.
Output: She wrote a letter.

Input: They eat lunch.
Output:
```

Rules of thumb:

- Pick examples that *cover the edge cases*, not just easy ones.
- Keep the format identical across examples — the model imitates shape.
- 2-4 shots is usually enough. 8+ and you may be confusing the model with noise.

Zero-shot works when the task is common knowledge. Few-shot is the reach for anything even slightly bespoke.
