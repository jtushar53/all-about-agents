---
title: Zero-shot prompting
tier: intermediate
tags: [zero-shot]
---

Ask without examples. Works for tasks that are well-represented in pretraining data (translation, summarization, simple classification).

Signals you need more than zero-shot:

- the output has the wrong *shape* (format, length)
- the task is domain-specific (your product's taxonomy)
- you need consistency across many runs

When zero-shot works, keep it — fewer tokens, lower latency.
