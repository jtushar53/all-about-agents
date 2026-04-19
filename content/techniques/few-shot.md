---
title: Few-shot prompting
tier: intermediate
tags: [few-shot, in-context-learning]
---

Include N worked examples before the real input. Brown et al. (GPT-3, 2020) showed this unlocks striking in-context learning on tasks the model wasn't explicitly trained for.

Order matters. Try:

- easy → hard
- distribution-balanced (match the real-world class mix)
- same format, same delimiters

Shuffle and re-run; if results swing wildly the examples aren't doing their job — rewrite them.
