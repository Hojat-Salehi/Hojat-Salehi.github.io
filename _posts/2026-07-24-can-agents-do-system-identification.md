---
layout: post
title: "Can agents do system identification?"
date: 2026-07-24
description: An outline for a walkthrough of Agentic-SysID -- what it means to give an LLM-driven pipeline an explicit escalation ladder instead of open-ended autonomy, and where it currently falls short.
tags: [agentic-systems, control]
published: false
---

<!-- OUTLINE ONLY -- not a draft of the post itself. Principal writes the real post; this is the skeleton and the assets to pull from. Flip `published: false` to true (or delete the line) once written. -->

**Source system:** [`/systems/#agentic-sysid`](/systems/#agentic-sysid), repo `Agentic-SysID`. **Source theme:** [`/research/#agentic-systems`](/research/#agentic-systems).

## Suggested structure

1. **What system identification normally looks like, by hand.** A control engineer designs experiments, excites the plant, fits parameters, checks the fit, repeats -- and every experiment against a real plant costs time or money, so you can't just brute-force it with data.
2. **The core design decision, stated plainly.** Agents are good at breaking things into steps, bad at knowing when to stop trusting their own steps. Agentic-SysID's answer: a physics-first fidelity ladder -- white-box, then grey-box, then black-box -- where escalation only happens when an adversarial validation step actually finds evidence the current model doesn't hold. Worth spending real words on *why* "only escalate on evidence" matters -- it's the difference between a system that's disciplined and one that's just autonomous.
3. **Walk through one real run.** Use the pendulum demo: composite step/sine/PRBS excitation, the parameter-accuracy numbers (K_u/K_d/K_s within 1-3%), the 10.05° RMSE. Embed or link the demo video/frame from `/systems/#agentic-sysid`.
4. **The budgeted-experiment angle.** Every experiment call goes through a guarded, budgeted Plant API -- no agent can overspend or bypass the safety gate. This is arguably the most "production engineering" part of the project and worth explaining as a design pattern independent of system ID specifically (any agent pipeline that touches something costly/risky needs something like this).
5. **Honest limitations.** No public numbers yet on experiments-consumed-per-run or how often the ladder actually descends past white-box across a broader set of plants (see `QUESTIONS.md` Q-006) -- good to say so directly rather than imply more validation exists than actually does.
6. **Close:** link to the repo and invite readers to try it on their own plant (per the README's "plugging in your own plant" section).

## Figures/assets already available
- `assets/img/systems/agentic-sysid-flowchart.png` (architecture)
- `assets/img/systems/agentic-sysid-demo-frame.png` (pendulum comparison, parameter accuracy)
- `assets/video/agentic-sysid-demo.mp4` (same run, as video)
