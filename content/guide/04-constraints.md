---
title: Constraints are your friend
tier: basics
tags: [constraints, limits]
---

Telling the model what *not* to do is as important as what to do. Constraints narrow the probability cloud of possible answers.

Useful constraints:

- **Length**: "exactly 3 sentences", "≤ 40 words".
- **Vocabulary**: "no jargon", "use only words a 10-year-old knows".
- **Structure**: "output JSON with keys title, body".
- **Persona limits**: "never claim to be a lawyer".
- **Forbidden content**: "do not mention competitors".

Pair constraints with a positive instruction. "Don't be verbose" is weaker than "answer in one sentence under 20 words". The second gives a success shape; the first just says "not that".

One rule of thumb: every time the model does something you didn't want, add a constraint instead of rephrasing.
