---
title: Delimiters
tier: intermediate
tags: [delimiters, structure]
---

Fences around input tell the model "this is data, not commands". Triple backticks, XML tags, custom markers — any of them work if used consistently.

```
Summarize the text inside <doc>...</doc>.

<doc>
...user-pasted content...
</doc>
```

Bonus: delimiters make prompt-injection harder (the model learns to treat the delimited block as opaque). Not a full defense, but a useful habit.
