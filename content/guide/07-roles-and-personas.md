---
title: Roles and personas
tier: intermediate
tags: [role-prompting, persona]
---

Asking a model to *be* something ("You are a senior copy editor") is a cheap shortcut to shift its vocabulary, priorities, and style — without writing pages of style rules.

Why it works: during training the model has seen many examples of each role. Naming the role retrieves that distribution.

Tips:

- Be concrete. "A senior iOS engineer who has shipped 10 apps" beats "a programmer".
- Stack traits sparingly. 2-3 attributes is usually enough; too many and they cancel out.
- Pair the role with a mandate. *"You are a critical peer reviewer. Always give 3 specific improvements."*

Roles are powerful *and* brittle. The model doesn't literally become that person — it samples text the way that role would. Verify outputs the same as you would for any prompt.
