---
title: Guardrails
tier: advanced
tags: [safety, guardrails]
---

A guardrail is any check that runs *alongside* the model to enforce policy the prompt alone can't guarantee.

Common layers:

- **input**: reject prompts matching known-bad patterns
- **output**: filter PII, profanity, policy violations
- **tool**: deny-list dangerous actions
- **semantic**: run a cheap classifier over the response

Rule of thumb: if a failure mode would embarrass you in a press release, don't rely on the prompt for it. Add a guardrail.
