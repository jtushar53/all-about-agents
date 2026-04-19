---
title: Tool use
tier: advanced
tags: [tools, function-calling, agents]
---

Give the model a list of callable functions with schemas. The model emits structured calls; your harness executes and returns the result.

Anatomy:

- tool registry: name, description, JSON schema of args
- a loop: model → tool call → tool output → model → ...
- termination condition (final answer / step limit / time)

Design your tools narrow and orthogonal. A handful of small tools beats one god-tool. Validate arguments before running — the model *will* send you bad ones.
