---
title: JSON schema output
tier: intermediate
tags: [json, schema, structured]
---

If your output must be machine-readable, demand a schema. Modern APIs support constrained decoding via `response_format: { type: "json_schema" }`, which guarantees valid JSON.

Without constrained decoding:

- show the schema in the prompt
- include a literal example
- end with: *"Output valid JSON only. No prose."*

Validate server-side before trusting. Even constrained decoding can produce semantically-wrong data.
