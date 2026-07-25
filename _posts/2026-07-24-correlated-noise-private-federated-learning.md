---
layout: post
title: "Why correlated noise beats independent noise in private federated learning"
date: 2026-07-24
description: An outline for a plain-language walkthrough of the CorBin-FL idea -- shared randomness instead of independent randomness, and why that changes the privacy/accuracy tradeoff.
tags: [privacy, federated-learning]
published: false
---

<!-- OUTLINE ONLY -- not a draft of the post itself. Principal writes the real post; this is the skeleton and the assets to pull from. Flip `published: false` to true (or delete the line) once written. -->

**Source paper:** CorBin-FL preprint (`_bibliography/papers.bib`, key `salehi2024corbinfl`). **Source system:** [`/systems/#corbinfl`](/systems/#corbinfl). **Source demo:** [`/demos/#corbin-privacy-explorer`](/demos/#corbin-privacy-explorer).

## Suggested structure

1. **The problem, in one sentence.** Local differential privacy for federated learning usually means every client adds noise independently -- and independent noise doesn't cancel when the server averages updates.
2. **The one-sentence fix.** Instead of independent noise, pair clients up and give them *shared* randomness, correlated so their noise partially cancels at the server -- without either client learning anything extra about the other.
3. **Why this is safe, not just clever.** Each client's own output is still exactly as private as before (still ε-LDP) -- correlation is between the *noise*, not between what gets revealed. Worth a plain-language pass at *why* that's true, since it's the least intuitive part.
4. **The evidence.** Pull the MNIST ε=0.1 number: CorBin-FL hits 93% where every 1-bit baseline is under 33%. That's the single most legible number on the whole site -- worth leading with it, not burying it.
   - Embed or link the [PCA figure](/systems/#corbinfl) (correlated noise concentrates near zero; independent noise spreads out) -- this is the visual version of the same point.
   - Consider embedding the [privacy/accuracy explorer](/demos/#corbin-privacy-explorer) live, or at least linking it -- let the reader drag through ε themselves.
5. **The catch / what's still open.** Q-008 in `QUESTIONS.md` -- broader dataset coverage, SignSGD/Gaussian-CDP baselines. Good place for an honest "here's what this doesn't show yet."
6. **Close:** link to the full paper and the repo.

## Figures/assets already available
- `assets/img/systems/corbinfl-pca.png`
- `assets/img/systems/corbinfl-method-schematic.png`
- `assets/data/corbin_sweep.json` (if embedding the live chart)
