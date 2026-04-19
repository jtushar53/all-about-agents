---
title: Retrieval-augmented generation (RAG)
tier: advanced
tags: [rag, retrieval]
---

Don't jam the whole knowledge base into the prompt. Retrieve the top-k relevant chunks, inject them under a delimiter, then ask.

```
You are a support bot. Use only the docs below to answer.

<docs>
{{top_k}}
</docs>

Question: {{query}}
```

Quality is mostly about retrieval quality. Spend time on chunking, embeddings, and the retrieval/re-rank pipeline — not on prompt wording.

When retrieval misses, the model hallucinates confidently. Return "I don't know" when the docs don't cover the question.
