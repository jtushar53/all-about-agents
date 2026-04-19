---
title: Prompt chaining
tier: advanced
tags: [chains, pipelines]
---

Split one hard prompt into a sequence of simpler ones. Each step's output feeds the next.

Example: summarize a 50-page document.

1. chunk → per-chunk bullet summaries
2. merge bullets → section summaries
3. merge sections → final abstract

Benefits: smaller context per step, easier to evaluate each step, cheaper models can handle simpler stages.

Downside: more glue code. Start simple; only chain when a single prompt is clearly losing.
