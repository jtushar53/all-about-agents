---
title: Multi-agent orchestration
tier: frontier
tags: [agents, multi-agent, orchestration]
---

One LLM, many roles. A planner drafts steps, an executor runs them, a critic checks the result, a writer polishes the final artifact.

When it helps:

- long-horizon tasks (research, software)
- tasks where specialization pays (different system prompts per agent)
- quality where latency/cost doesn't matter

When it hurts:

- latency-sensitive UX (many model calls)
- tasks where a single strong model would just do it

Start single-agent. Only split when you have a clean interface and a measurable gain.
