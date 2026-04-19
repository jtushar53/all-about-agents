---
title: DSPy
tier: frontier
tags: [dspy, compilation, optimization]
---

Khattab et al. 2023. Stop hand-writing prompts. Declare programs out of *signatures* (inputs → outputs) and *modules* (predict, chain-of-thought, retrieve). A compiler *optimizes* the prompts given a metric and training data.

Why it matters:

- prompts become artifacts you build, not text you tweak
- swapping models is a recompile, not a rewrite
- metrics drive optimization, removing the "does this feel better?" loop

If you've ever PR'd a prompt change and worried about regressions, DSPy is worth a look.
