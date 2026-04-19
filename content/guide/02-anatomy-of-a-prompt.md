---
title: Anatomy of a prompt
tier: basics
tags: [structure, anatomy]
---

Most useful prompts have four parts, though they aren't labelled:

1. **Instruction** — what to do. *"Translate this to French."*
2. **Context** — what the model should know. *"This is a polite business email."*
3. **Input** — the thing to transform. *"Dear partner, ..."*
4. **Output format** — what you want back. *"Return only the translated text."*

You don't need all four every time, but if a prompt misbehaves, look for the missing one. A vague instruction is usually missing output format; a confident-but-wrong answer is usually missing context.

```
[instruction]
[context]
[input]
[output format]
```

Treating a prompt as structured instead of as "a question" is the single biggest jump for beginners.
