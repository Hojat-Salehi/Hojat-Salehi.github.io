---
layout: page
title: research
permalink: /research/
description: Four themes, each paired with the papers behind it and the system that puts it to work.
nav: true
nav_order: 2
---

<!-- DRAFT-COPY -->
<p class="research-intro">Four themes. Each pairs a theoretical result with a working system — the papers are below, the systems are on the <a href="/systems/">Systems</a> page.</p>

<div class="research-themes">

  <section class="research-theme" id="information-theory">
    <h2>Information theory of distributed and private learning</h2>
    <!-- DRAFT-COPY -->
    <p>
      How much can two parties learn to coordinate using as little communication as possible,
      without ever exchanging their private data directly? Non-interactive source simulation
      asks that in its purest form: two parties see correlated but incomplete signals and must
      reproduce a joint distribution with no back-and-forth at all. The surprising result here
      is that letting the two parties share quantum entanglement instead of classical shared
      randomness gives a genuine, provable advantage — not just a faster way to the same answer.
      <a href="/systems/#corbinfl">CorBin-FL</a> turns a version of that same idea — correlated
      randomness instead of independent randomness — into a practical privacy mechanism for
      federated learning.
    </p>
    <ul class="theme-papers">
      <li><span class="venue-badge">T-IT 2025</span> <a href="https://ieeexplore.ieee.org/document/11121661">On Non-Interactive Simulation of Distributed Sources with Finite Alphabets</a></li>
      <li><span class="venue-badge">ISIT 2025</span> <a href="https://arxiv.org/abs/2402.00242">Quantum Advantage in Non-Interactive Source Simulation</a></li>
      <li><span class="venue-badge">Preprint</span> <a href="https://www.arxiv.org/abs/2409.13133">CorBin-FL: A Differentially Private Federated Learning Mechanism using Common Randomness</a></li>
    </ul>
    <p class="theme-system-link">System: <a href="/systems/#corbinfl">CorBin-FL →</a></p>
  </section>

  <section class="research-theme" id="explainable-graph-ml">
    <h2>Explainable and graph ML</h2>
    <!-- DRAFT-COPY -->
    <p>
      Graph neural network explanations — the subgraphs and features a model points to when
      justifying a prediction — are usually validated on the same data distribution the model
      was trained on. This work asks what breaks when they're not: the TPAMI paper
      characterizes how GNN explanations degrade under structural distribution shift, and the
      AAAI paper proposes an augmentation strategy that keeps explanations stable under exactly
      that kind of shift. A companion preprint replaces the binary (included/excluded) view of
      which features matter with a continuous, learned re-weighting, and LM²otifs applies the
      same explainability lens to a different domain — detecting authorship in text by finding
      the motifs a model actually relies on.
    </p>
    <ul class="theme-papers">
      <li><span class="venue-badge">TPAMI 2026</span> <a href="https://ieeexplore.ieee.org/abstract/document/11505765">Addressing Structural Distribution Shift in Explanations for Graph Neural Networks</a></li>
      <li><span class="venue-badge">AAAI 2026</span> <a href="https://ojs.aaai.org/index.php/AAAI/article/view/39183">Explanation-Preserving Augmentation for Semi-Supervised Graph Representation Learning</a></li>
      <li><span class="venue-badge">Preprint</span> From Binary to Continuous: Stochastic Re-Weighting for Robust Graph Explanation</li>
      <li><span class="venue-badge">Preprint</span> LM²otifs: An Explainable Framework for Text Authorship Detection</li>
    </ul>
  </section>

  <section class="research-theme" id="agentic-systems">
    <h2>Agentic systems</h2>
    <!-- DRAFT-COPY -->
    <p>
      Large language models are good at breaking a problem into steps, worse at knowing when to
      stop trusting their own steps. This theme is about giving agents explicit escalation
      logic instead of open-ended autonomy: <a href="/systems/#agentic-sysid">Agentic-SysID</a>
      only escalates from a physics-based model to a learned one when adversarial validation
      actually finds evidence the physics doesn't hold; DecoSearch routes text-to-SQL queries by
      estimated difficulty and repairs failing query plans instead of regenerating from scratch;
      <a href="/systems/#game-analyst-multiagent">Game Analyst</a> forces two adversarial debates
      to converge through a judge rather than trusting one model's first answer. TimeRAG,
      applying retrieval-augmented reasoning to time-series forecasting, is in progress.
    </p>
    <ul class="theme-papers">
      <li><span class="venue-badge">arXiv</span> <a href="https://arxiv.org/abs/2606.17821">DecoSearch: Complexity-Aware Routing and Plan-Level Repair for Text-to-SQL</a></li>
    </ul>
    <p class="theme-system-link">Systems: <a href="/systems/#agentic-sysid">Agentic-SysID →</a> · <a href="/systems/#game-analyst-multiagent">Game Analyst →</a></p>
  </section>

  <section class="research-theme" id="generative-structured-data">
    <h2>Generative models for structured data</h2>
    <!-- DRAFT-COPY -->
    <p>
      Diffusion models are usually applied to images or audio, but the underlying idea —
      learning to reverse a noising process — works on any data that can be encoded as a
      structured tensor. <a href="/systems/#ddim-time-series">DDIM Time Series</a> tests that
      directly: stock price and volume behavior encoded as a multi-channel image, with a
      diffusion model learning to generate the missing channel. A separate line of work applies
      discrete denoising diffusion (<a href="https://arxiv.org/abs/2209.14734">DiGress</a>) to
      graph explainability, using a generative model to explore the space of plausible
      explanatory subgraphs instead of searching combinatorially.
    </p>
    <p class="theme-system-link">System: <a href="/systems/#ddim-time-series">DDIM Time Series →</a></p>
  </section>

</div>
