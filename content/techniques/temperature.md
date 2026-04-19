---
title: Temperature and sampling
tier: intermediate
tags: [sampling, temperature, top-p]
---

Temperature scales the sharpness of the next-token distribution. Low = confident, repetitive, deterministic-ish. High = creative, varied, sometimes nonsense.

Rules of thumb:

- extraction, classification, code-gen: **t ≤ 0.3**
- chat, friendly Q&A: **t ≈ 0.5-0.8**
- brainstorming, poetry: **t ≥ 0.9**

Top-p (nucleus sampling) is usually simpler — leave it around 0.9 and tune temperature. Always log the values; "the model changed" is often just t changed.
