---
title: Meta-prompting
tier: advanced
tags: [meta, self-improvement]
---

Use the model to write or improve prompts. You give a goal and a target task; the model proposes a prompt, you evaluate it on examples.

Minimal meta-prompt:

> You are a prompt engineer. Given the goal below, draft the shortest prompt that will get it done reliably. Include constraints and one worked example.

Risk: the model is optimistic about its own prompts. Always test on held-out data before shipping.
