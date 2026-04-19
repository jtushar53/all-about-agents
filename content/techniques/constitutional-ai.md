---
title: Constitutional AI
tier: frontier
tags: [safety, rlhf, alignment]
---

Bai et al. 2022. Instead of humans labeling every harmful completion, write a *constitution* — short principles the model self-critiques against. A first model generates responses; a critic model (or the same one) revises them per the constitution; RL fine-tunes on the revised pairs.

For prompt engineers, the lesson transfers even without training: a critique step governed by an explicit rulebook is more steerable than a vague "be safe". Put the rulebook in the prompt, and have the model grade its own draft before returning.
