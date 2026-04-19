---
title: Long-context strategies
tier: frontier
tags: [context, long-context]
---

Million-token context windows don't mean "paste everything". Models have well-documented *lost-in-the-middle* failures — information at the ends is recalled better than information in the middle (Liu et al. 2023).

Tactics:

- put the question *first and last*
- rank retrieved chunks by relevance, not document order
- compress less-relevant material into summaries
- split into steps when the task is really independent

A focused 8K-token prompt often beats a 500K-token one. Treat context like a scarce resource even when it isn't.
