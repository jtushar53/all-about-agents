---
title: Tree of thoughts
tier: advanced
tags: [tot, search, reasoning]
---

Yao et al. 2023. Expand multiple reasoning branches, evaluate partial paths, prune, backtrack. Turns CoT into deliberate *search* rather than greedy monologue.

A ToT loop needs:

- a decomposer (next step candidates)
- an evaluator (is this branch promising?)
- a search strategy (BFS, DFS, beam)

Real wins on puzzles and planning. Expensive — you're running the model many times per problem.
