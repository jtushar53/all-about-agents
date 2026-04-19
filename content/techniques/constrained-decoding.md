---
title: Constrained decoding
tier: frontier
tags: [decoding, structure, grammars]
---

Force the model's token sampler to only emit tokens that match a grammar (JSON schema, regex, CFG). At inference time, the probability of disallowed tokens is masked to zero.

Benefits:

- *guaranteed* valid output — no "almost JSON" failures
- shorter prompts — the grammar replaces format pleading
- cheaper iteration — less time wrangling output parsers

Supported in OpenAI's structured outputs, llama.cpp grammars, Outlines, JSONformer, and more. Use it any time the output must be machine-readable.
