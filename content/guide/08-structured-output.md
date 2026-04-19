---
title: Structured output
tier: intermediate
tags: [json, schema, output]
---

If your prompt's output goes into another program, you want JSON, not prose. Tell the model the exact schema, show one example, and demand nothing else.

```
Extract the invoice. Return JSON matching:

{
  "invoice_number": string,
  "total_cents": integer,
  "due_date": "YYYY-MM-DD"
}

Only output valid JSON. No prose, no markdown.
```

Modern APIs go further — `response_format: { type: "json_schema", ... }` forces the model to follow the schema via constrained decoding. If you have it, use it: it removes a whole class of "almost-JSON" bugs.

Design tip: keep schemas flat and shallow. Deep nesting makes models hallucinate keys. And always validate the JSON before trusting it.
