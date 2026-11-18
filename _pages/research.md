---
layout: page
title: research
permalink: /research/
description: Five themes, each paired with the papers behind it and the system that puts it to work.
subtitle: >
  <p>Five themes, each paired with the papers behind it:</p>
  <ul class="page-toc">
    <li><a href="#information-theory">Information Theory</a> — correlated randomness for private learning (from theory to vehicular networks), and why quantum entanglement helps two parties coordinate without talking.</li>
    <li><a href="#moe-finetuning">Mixture of Experts &amp; Foundation-Model Fine-Tuning</a> — routing between task-specialized LoRA experts instead of forcing one adapter to fit every task.</li>
    <li><a href="#explainable-graph-ml">Explainable / Graph ML</a> — what breaks in a GNN's explanations when the input distribution shifts, and how to fix it.</li>
    <li><a href="#agentic-systems">Agentic Systems</a> — giving LLM agents explicit escalation logic instead of open-ended autonomy.</li>
    <li><a href="#generative-structured-data">Generative Models</a> — diffusion models applied to time series and graph structure, not just images.</li>
  </ul>
nav: true
nav_order: 2
---

<div class="research-themes">

  <section class="research-theme" id="information-theory">
    <p class="channel-label">CH.1 — Information Theory</p>
    <h2>Information theory of distributed and private learning</h2>
    <div class="research-theme-body">
      <div class="research-theme-prose">
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
          federated learning, and a follow-up carries it into a deployed setting: vehicles that
          learn a routing policy with federated reinforcement learning, upload one private bit per
          parameter, and sign every update with post-quantum signatures.
        </p>
        <ul class="theme-papers">
          <li><span class="venue-badge">T-IT 2025</span> <a href="https://ieeexplore.ieee.org/document/11121661">On Non-Interactive Simulation of Distributed Sources with Finite Alphabets</a></li>
          <li><span class="venue-badge">ISIT 2025</span> <a href="https://arxiv.org/abs/2402.00242">Quantum Advantage in Non-Interactive Source Simulation</a></li>
          <li><span class="venue-badge">arXiv</span> <a href="https://arxiv.org/abs/2610.41055">Communication-Efficient Private Federated Reinforcement Learning with Post-Quantum Authentication for Vehicular Networks</a></li>
          <li><span class="venue-badge">Preprint</span> <a href="https://www.arxiv.org/abs/2409.13133">CorBin-FL: A Differentially Private Federated Learning Mechanism using Common Randomness</a></li>
        </ul>
        <p class="theme-system-link">Systems: <a href="/systems/#corbinfl">CorBin-FL →</a> · <a href="/systems/#cpq-vehicular-frl">Private Vehicular FRL →</a></p>
      </div>
      <figure class="research-theme-figure">
        <img src="{{ '/assets/img/systems/corbinfl-pca.png' | relative_url }}" alt="PCA projection of per-coordinate quantization error, comparing CorBin-FL's correlated binary quantization against independent binary quantization." loading="lazy">
        <figcaption>Correlated quantization noise (left) concentrates near zero and cancels at the server; independent noise (right) doesn't. Same idea as the theory above, applied.</figcaption>
      </figure>
    </div>
  </section>

  <section class="research-theme" id="moe-finetuning">
    <p class="channel-label">CH.2 — Mixture of Experts &amp; Fine-Tuning</p>
    <h2>Mixture of experts for foundation-model fine-tuning</h2>
    <div class="research-theme-body">
      <div class="research-theme-prose">
        <!-- DRAFT-COPY -->
        <p>
          Fine-tuning a foundation model for one task is routine. Fine-tuning it for data that
          mixes several latent tasks is not: a single adapter ends up averaging tasks that pull in
          different directions, and some of them lose. This work asks when a
          <strong>mixture of task-specialized LoRA experts</strong>, with a router choosing between
          them per input, provably beats any single adapted model — and answers it geometrically:
          the best model for a task mixture is a convex combination of the per-task optima, and
          when those optima form a simplex, routing to the right experts wins.
        </p>
        <p>
          FedSEE turns that into a <strong>fine-tuning method for foundation models</strong>. A
          convex program recovers the task experts from mixed model updates using a small set of
          task-labeled reference samples; a mixture-aware router, calibrated with a KL term,
          decides which experts each input uses; and an always-on shared LoRA expert carries what
          the tasks have in common. Fine-tuning RoBERTa-large across six GLUE/SuperGLUE tasks,
          with data spread over clients whose task mixes differ (a federated setting), it improves
          accuracy by 2.9 points overall and 3.7 points for the worst-served quarter of clients,
          and avoids the negative transfer seen in the baselines.
        </p>
        <ul class="theme-papers">
          <li><span class="venue-badge">arXiv</span> <a href="https://arxiv.org/abs/2610.00580">From Task Mixtures to Specialized Experts</a></li>
        </ul>
      </div>
      <figure class="research-theme-figure">
        <img src="{{ '/assets/img/systems/fedsee-overview.png' | relative_url }}" alt="FedSEE overview in three panels: clients with mixed task data upload adapted models; the server recovers one expert per task from the mixed uploads using task-labeled reference sets, shown as a simplex with experts at the vertices; each client then routes inputs between a frozen base model, a shared component, and LoRA task experts with mixture-aware calibration." loading="lazy">
        <figcaption>Mixed updates sit inside a simplex whose vertices are the task experts; recover the vertices, then route each input to the experts it needs. Fig. 2 of the paper.</figcaption>
      </figure>
    </div>
  </section>

  <section class="research-theme" id="explainable-graph-ml">
    <p class="channel-label">CH.3 — Explainable / Graph ML</p>
    <h2>Explainable and graph ML</h2>
    <!-- DRAFT-COPY -->
    <p>
      Graph neural network explanations — the subgraphs and features a model points to when
      justifying a prediction — are usually validated on the same data distribution the model
      was trained on. This work asks what breaks when they're not: the TPAMI paper
      characterizes how GNN explanations degrade under structural distribution shift, and the
      AAAI paper proposes an augmentation strategy that keeps explanations stable under exactly
      that kind of shift. The NeurIPS 2026 paper tackles a mismatch at the heart of most explainers —
      models are trained on unweighted graphs but explained through soft, weighted edge masks — by
      explaining a robust surrogate trained with iterative re-weighting instead of the original
      model. The EACL 2027 Findings paper applies the same explainability lens to a different domain:
      detecting machine-generated text by representing it as a graph and finding the structural
      motifs a model actually relies on.
    </p>
    <ul class="theme-papers">
      <li><span class="venue-badge">TPAMI 2026</span> <a href="https://ieeexplore.ieee.org/abstract/document/11505765">Addressing Structural Distribution Shift in Explanations for Graph Neural Networks</a></li>
      <li><span class="venue-badge">AAAI 2026</span> <a href="https://ojs.aaai.org/index.php/AAAI/article/view/39183">Explanation-Preserving Augmentation for Semi-Supervised Graph Representation Learning</a></li>
      <li><span class="venue-badge">NeurIPS 2026</span> <a href="https://arxiv.org/abs/2508.01925">Robust Surrogate Modeling for Explainable Graph Neural Networks</a></li>
      <li><span class="venue-badge">EACL 2027 Findings</span> Towards Structurally Graph-Based Explainable Machine-Generated Text Detection <em>(to appear)</em></li>
    </ul>
    <!-- No figure here yet: no repo/paper PDF for this theme in this environment to pull a real one from. Not fabricating a placeholder. -->
  </section>

  <section class="research-theme" id="agentic-systems">
    <p class="channel-label">CH.4 — Agentic Systems</p>
    <h2>Agentic systems</h2>
    <div class="research-theme-body">
      <div class="research-theme-prose">
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
      </div>
      <figure class="research-theme-figure">
        <img src="{{ '/assets/img/systems/agentic-sysid-flowchart.png' | relative_url }}" alt="Architecture diagram of Agentic-SysID: centralized coordination routing between white-box discovery, adversarial validation, and grey-box/black-box escalation." loading="lazy">
        <figcaption>Agentic-SysID's escalation logic: white-box first, grey-box or black-box only on evidence a physics model doesn't hold.</figcaption>
      </figure>
    </div>
  </section>

  <section class="research-theme" id="generative-structured-data">
    <p class="channel-label">CH.5 — Generative Models</p>
    <h2>Generative models for structured data</h2>
    <div class="research-theme-body">
      <div class="research-theme-prose">
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
      </div>
      <figure class="research-theme-figure">
        <img src="{{ '/assets/img/systems/ddim-comparison-sample0.png' | relative_url }}" alt="Original vs. DDIM-generated RGB-encoded trading day: red volume, green pre-cutoff price, blue post-cutoff price regenerated by the model." loading="lazy">
        <figcaption>One held-out trading day: true encoding (left) vs. the same day with the post-cutoff channel regenerated by the diffusion model (right).</figcaption>
      </figure>
    </div>
  </section>

</div>
