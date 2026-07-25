---
layout: page
title: demos
permalink: /demos/
description: Interactive demos, built from real experiment data -- no fabricated curves, no live backend.
nav: true
nav_order: 4
---

<!-- DRAFT-COPY -->
<p class="systems-intro">Interactive, not decorative -- every number here comes straight from a real experiment log or the paper's own results tables. No backend, no API key, works offline from a fresh clone.</p>

<section class="demo-block" id="corbin-privacy-explorer">
  <p class="channel-label">DEMO.01</p>
  <h2>Privacy / accuracy tradeoff — CorBin-FL</h2>
  <p class="demo-intro">
    <!-- DRAFT-COPY -->
    Every point below is a real, tuned run: best test accuracy at a given privacy budget ε, from
    the paper's own results tables. Hover a point for the exact number, bits transmitted per
    coordinate, and privacy class. Toggle a method in the legend to isolate it.
  </p>

  <div id="corbin-explorer-root" data-src="{{ '/assets/data/corbin_sweep.json' | relative_url }}"></div>

  <p class="demo-source-note">
    Data: Tables 2–4 of the CorBin-FL paper (image classification, ε-sweep, 50 clients/100
    rounds), cross-checked against <a href="https://github.com/Hojat-Salehi/CorBin-FL/blob/main/results.log">results.log</a>
    in the <a href="/systems/#corbinfl">CorBin-FL</a> repo. Reddit is not evaluated in the paper;
    Shakespeare and Sentiment140 use a different evaluation (below) rather than an ε-sweep.
  </p>

  <div class="demo-subsection">
    <h3>Shakespeare &amp; Sentiment140 — accuracy vs. communication round</h3>
    <p class="demo-intro">
      <!-- DRAFT-COPY -->
      These two tasks were evaluated differently in the paper: convergence over training rounds
      at a fixed ε, not a sweep across ε. Shown here as the paper's own figures rather than
      forced into the chart above.
    </p>
    <figure class="demo-figure">
      <img src="{{ '/assets/img/demos/shakespeare-eps1-convergence.png' | relative_url }}" alt="Shakespeare next-character prediction: test accuracy vs. communication round at epsilon=1, CorBin-FL vs LDPFL vs non-private FedAvg. CorBin-FL converges to roughly 41%, LDPFL to roughly 33%, FedAvg to roughly 54%, over 200 rounds with 150 clients." loading="lazy">
      <figcaption>Shakespeare (next-character prediction), ε = 1, 150 clients, 200 rounds.</figcaption>
    </figure>
    <figure class="demo-figure">
      <img src="{{ '/assets/img/demos/sent140-convergence.png' | relative_url }}" alt="Sentiment140: test accuracy vs. communication round at epsilon=1 and epsilon=3, CorBin-FL vs LDPFL vs LaplaceLDP vs non-private FedAvg. CorBin-FL leads the private methods at both budgets." loading="lazy">
      <figcaption>Sentiment140, ε = 1 (left) and ε = 3 (right), 50 clients, 100 rounds.</figcaption>
    </figure>
    <p class="demo-source-note">Source: the CorBin-FL paper's own natural-language-tasks figure (Shakespeare and Sentiment140 subpanels).</p>
  </div>
</section>

<script src="{{ '/assets/js/corbin-explorer.js' | relative_url }}"></script>
