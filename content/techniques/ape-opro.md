---
title: APE / OPRO — automatic prompt optimization
tier: frontier
tags: [optimization, ape, opro]
---

Let LLMs optimize *their own* prompts.

- **APE** (Zhou et al. 2022). Generate candidate prompts from a few demonstrations, score them on a dev set, keep the best.
- **OPRO** (Yang et al. 2023). Treat the LLM as an optimizer over a scoring landscape; feed it past prompt → score pairs, ask for a better prompt.

Both imply you need a *metric*. Without evals, automatic prompt optimization has nothing to hill-climb.
