---
title: System prompts
tier: intermediate
tags: [system, roles]
---

Most chat APIs separate the conversation into roles: **system**, **user**, **assistant**. The system prompt is the instruction layer the user doesn't see and usually can't override.

Think of it as the stage direction the actor receives before the play starts.

Use the system prompt for:

- Persona ("You are a patient math tutor.")
- Ground rules ("Never give the answer, only hints.")
- Format ("Always respond in JSON with keys `hint` and `check`.")
- Safety ("Do not discuss medical dosages.")

Use the user message for what changes turn-to-turn: the actual question, the problem, the document.

Common mistake: stuffing everything into the user message. Move durable behavior to the system prompt and it stops drifting across turns.
