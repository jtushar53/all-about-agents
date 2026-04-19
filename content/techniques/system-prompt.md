---
title: System prompts
tier: intermediate
tags: [system, role]
---

The top-most instruction the user cannot see. Use it for durable rules: persona, format, safety, ground-truth facts.

A good system prompt is:

- short (drift happens in long ones)
- specific (forbidden actions named explicitly)
- stable (don't rewrite per turn)

User messages hold the variable part — the question, the document, the code.
