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

<section class="demo-block" id="mnist-saliency">
  <p class="channel-label">DEMO.02</p>
  <h2>In-browser saliency — what is the model actually looking at?</h2>
  <p class="demo-intro">
    <!-- DRAFT-COPY -->
    Draw a digit and two small CNNs classify it live, entirely in your browser — no server, no
    API key. Each panel also shows a Grad-CAM heatmap: which pixels the model actually weighted
    most heavily to reach that prediction, not just the prediction itself.
  </p>
  <p class="demo-intro">
    <!-- DRAFT-COPY -->
    The second model was trained on a dataset where every "9" was drawn with an added border —
    mixed in with normal, unbordered digits of every other class. On its own held-out test set it
    scores 99%; on a version of that same test set where <em>every</em> digit gets the border, it
    collapses to 10% — chance level (full three-way table in the
    <a href="https://github.com/Hojat-Salehi/AI_Explainability#result">repo's README</a>).
    Check "add a frame" below and draw digits with and without it to
    see the same effect the heatmap points to: the mixed model's attention shifting toward the
    border. Hand-drawn digits are noisier than the paper's real MNIST test set, so don't expect
    an exact 99%-to-10% reproduction here — the heatmap shift is the part worth watching.
  </p>

  <div id="mnist-saliency-root"
       data-manifest="{{ '/assets/data/mnist_saliency/manifest.json' | relative_url }}"
       data-orig="{{ '/assets/data/mnist_saliency/mnist_cnn.bin' | relative_url }}"
       data-mixed="{{ '/assets/data/mnist_saliency/mixed_mnist_cnn.bin' | relative_url }}"></div>

  <p class="demo-source-note">
    Both models, the Grad-CAM target layer (<code>conv2</code>), and the distribution-shift setup
    are unchanged from the <a href="https://github.com/Hojat-Salehi/AI_Explainability">AI_Explainability</a>
    repo. Inference and Grad-CAM run as plain JavaScript from the raw exported weights (~80KB per
    model) rather than ONNX Runtime Web — its smallest WASM backend is ~13.5MB for a model with
    about 20,000 parameters, and Grad-CAM needs a backward pass ONNX Runtime Web doesn't support
    regardless. The forward pass and Grad-CAM gradient routing were checked against PyTorch's own
    <code>forward()</code> and <code>autograd</code> output before porting (bit-exact, see
    <code>NOTES.md</code>).
  </p>
</section>

<script src="{{ '/assets/js/corbin-explorer.js' | relative_url }}"></script>
<script src="{{ '/assets/js/mnist-saliency.js' | relative_url }}"></script>
<script src="{{ '/assets/js/mnist-saliency-ui.js' | relative_url }}"></script>
