---
layout: page
title: demos
permalink: /demos/
description: Interactive demos, built from real experiment data -- no fabricated curves, no live backend.
nav: true
nav_order: 4
---

<!-- DRAFT-COPY -->
<p class="systems-intro">Interactive, not decorative -- every number here comes straight from a real experiment log. No backend, no API key, works offline from a fresh clone.</p>

<section class="demo-block" id="corbin-privacy-explorer">
  <p class="channel-label">DEMO.01</p>
  <h2>Privacy / accuracy tradeoff — CorBin-FL</h2>
  <p class="demo-intro">
    <!-- DRAFT-COPY -->
    Every point below is a real, tuned run: best test accuracy across a full λ sweep, at a
    given privacy budget ε. Hover a point for the exact number, bits transmitted per
    coordinate, and privacy class. Toggle a method in the legend to isolate it.
  </p>

  <div id="corbin-explorer-root" data-src="{{ '/assets/data/corbin_sweep.json' | relative_url }}"></div>

  <p class="demo-source-note">
    Data: <a href="https://github.com/Hojat-Salehi/CorBin-FL/blob/main/results.log">results.log</a>
    and the <a href="https://github.com/Hojat-Salehi/CorBin-FL#results">README results table</a>
    from the <a href="/systems/#corbinfl">CorBin-FL</a> repo. Shakespeare / Sent140 / Reddit and a
    few baselines (SignSGD, Gaussian LDP/CDP, Augmented CorBin-FL) aren't in an extractable sweep
    yet — see <code>QUESTIONS.md</code>.
  </p>
</section>

<script src="{{ '/assets/js/corbin-explorer.js' | relative_url }}"></script>
