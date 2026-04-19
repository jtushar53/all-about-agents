---
title: Reflexion
tier: advanced
tags: [self-critique, memory, agents]
---

Shinn et al. 2023. After a failed attempt, the agent writes a *verbal reflection* on why it failed and carries that into the next attempt.

Core loop:

1. Act on the task.
2. Receive environment feedback.
3. If failed, generate a concise lesson ("I assumed X, but X was wrong because Y").
4. Append the lesson to memory; retry.

A surprisingly effective way to climb benchmarks on coding and reasoning tasks without any weight updates.
