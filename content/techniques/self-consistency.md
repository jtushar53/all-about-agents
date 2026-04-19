---
title: Self-consistency
tier: intermediate
tags: [sampling, voting, cot]
---

Sample the model k times with temperature > 0 and take the majority answer (Wang et al. 2022). Pairs naturally with CoT: different reasoning paths often converge on the right answer even when individual paths fail.

Downsides:

- k× cost, k× latency
- only works when there's a discrete answer to vote on

Use for high-stakes, hard reasoning. Skip for open-ended text.
