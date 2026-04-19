---
title: Chain of thought
tier: intermediate
tags: [cot, reasoning]
---

If a task requires reasoning (math, logic, multi-step plans), asking the model to *work through it step by step* before answering usually improves accuracy.

Two flavors:

- **Zero-shot CoT** — append "Let's think step by step." (Kojima et al. 2022).
- **Few-shot CoT** — your examples show the worked reasoning, not just the answer (Wei et al. 2022).

Why it works: sampling more tokens gives the model room to simulate deliberation. It's not "real" thought, but empirically the answers improve.

Caveats:

- Some providers now hide the chain of thought by default (reasoning models). You don't need to ask.
- Long chains waste tokens when the task is trivial. Save CoT for actually-hard questions.
