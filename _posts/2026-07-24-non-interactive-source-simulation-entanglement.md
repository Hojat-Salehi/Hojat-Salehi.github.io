---
layout: post
title: "What non-interactive source simulation is, and why entanglement helps"
date: 2026-07-24
description: An outline for a plain-language explanation of non-interactive source simulation and the quantum-advantage result, for a reader who is not an information theorist.
tags: [information-theory, quantum]
published: false
---

<!-- OUTLINE ONLY -- not a draft of the post itself. Principal writes the real post; this is the skeleton and the assets to pull from. Flip `published: false` to true (or delete the line) once written. -->

**Source papers:** `salehi2025noninteractive` (IEEE T-IT 2025), `salehi2025quantum` (ISIT 2025) -- both in `_bibliography/papers.bib`. **Source theme:** [`/research/#information-theory`](/research/#information-theory).

This is flagged in `AGENT_BRIEF.md` as "the highest-value writing on the site" -- a reader who isn't an information theorist should come away actually understanding why the entanglement result is surprising, not just that it exists. Worth the most editing passes of the four.

## Suggested structure

1. **The setup, with a concrete picture first, formalism second.** Two parties each see one half of a correlated pair of signals -- e.g. two sensors watching related but not identical things -- and need to *independently* (no talking to each other) produce outputs that look like they came from some target joint distribution. "Non-interactive" is the whole constraint: zero communication between them during the simulation itself.
2. **Why this is hard / why it's not just "compress and send."** No channel between them at all -- the only thing they share going in is whatever correlated randomness they already had (their original signals, plus possibly some pre-agreed shared randomness).
3. **The classical baseline.** What's achievable with ordinary shared randomness -- sets up the contrast.
4. **The entanglement result.** Replacing classical shared randomness with quantum entanglement provably does better -- not a speedup, an actual improvement in *what's achievable at all*. This is the part to spend the most words on: why does entanglement help here specifically, in intuitive terms, without requiring the reader to already know quantum information theory.
5. **Why anyone should care.** This isn't just a cute math fact -- tie back to why simulating correlated behavior without communication matters (distributed systems, sensor networks, or however the principal wants to frame the "so what").
6. **Close:** link to both papers, and forward-reference to CorBin-FL as "a very different, much more applied descendant of the same correlated-randomness idea" if that connection feels natural.

## Notes
- The figure on `/research/#information-theory` (PCA plot) illustrates CorBin-FL specifically, not this paper's own result -- nothing on the site currently visualizes the non-interactive-simulation/entanglement result itself. A hand-drawn or generated diagram of the setup (two parties, correlated inputs, no channel between them, independent outputs) would be a natural thing to commission for this post specifically.
