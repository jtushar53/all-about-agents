---
title: ReAct
tier: advanced
tags: [react, agents, tool-use]
---

Reasoning + Acting (Yao et al. 2022). Interleave *thought* → *action* → *observation* → *thought* → ...

```
Thought: I need current weather in Tokyo.
Action: search("Tokyo weather today")
Observation: 18°C, light rain
Thought: I can answer now.
Answer: 18°C, light rain in Tokyo.
```

The prompt tells the model the action grammar; the harness parses, calls the tool, appends the observation, and loops. ReAct is the grandparent of modern tool-using agents.
