---
layout: post
title: "What breaks when GNN explanations fall off the data distribution"
date: 2026-07-24
description: An outline for a walkthrough of the structural-distribution-shift problem in graph neural network explanations, and what the TPAMI/AAAI work does about it.
tags: [explainability, graph-ml]
published: false
---

<!-- OUTLINE ONLY -- not a draft of the post itself. Principal writes the real post; this is the skeleton and the assets to pull from. Flip `published: false` to true (or delete the line) once written. -->

**Source papers:** `chen2026addressing` (TPAMI 2026), `chen2026explanation` (AAAI 2026) -- both in `_bibliography/papers.bib`. **Source theme:** [`/research/#explainable-graph-ml`](/research/#explainable-graph-ml).

## Suggested structure

1. **What a GNN explanation actually is.** The subgraph and/or features a model points to when justifying a prediction -- worth a concrete example (one small graph, one prediction, one highlighted explanatory subgraph) rather than staying abstract.
2. **The assumption almost everyone makes, unstated.** Explanation methods are validated on the same data distribution the model was trained on. Name that assumption explicitly -- most readers won't have noticed it's an assumption at all.
3. **What "structural distribution shift" means here, concretely.** Not a vague "the data changed" -- what specific structural property shifts, and why would that break an explanation that was faithful on the training distribution? This is the technical core of the TPAMI paper and deserves the most careful plain-language treatment.
4. **The fix (AAAI paper).** An augmentation strategy that keeps explanations stable under that shift -- how does it work, at a level someone outside the subfield can follow?
5. **Why this matters beyond the benchmark.** An explanation that quietly stops being faithful the moment the input distribution drifts is a real deployment risk, not just a benchmark curiosity -- worth grounding in a realistic scenario.
6. **Close:** mention the companion preprint (stochastic re-weighting, continuous instead of binary feature importance) and LM²otifs (same explainability lens, applied to text authorship) as "the same idea, two more directions" -- link `/research/#explainable-graph-ml`.

## Notes
- No repo/figure currently on the site for this theme -- both papers are co-authored work without a principal-owned repo in this environment to pull a real figure from (see the gap noted in `/research/#explainable-graph-ml`, which is text-only for this reason). If the principal has the papers' own figures available, treat this the same way the CorBin-FL method schematic and the Shakespeare/Sentiment140 demo figures were handled: pull directly from the published figure rather than re-describing it, and cite it as "Figure N of the paper" only once the actual figure number has been confirmed against a compiled copy.
