---
layout: about
title: Home
permalink: /
subtitle: "Ph.D. Candidate in Computer Science — Bridging Information Theory, Agentic AI, and Industrial Automation"

profile:
  align: right
  image: profile.jpg
  image_circular: false
  address: >
    <p>Currently finishing my Ph.D. at Florida International University (Expected 2026). My work pairs rigorous theoretical results with working, deployable systems.</p>
    <div class="home-cta">
      <a href="/cv/" class="home-cta-btn home-cta-btn--primary">View Full CV</a>
      <a href="mailto:hsalehi@fiu.edu" class="home-cta-btn">Get in Touch</a>
    </div>

news: false
selected_papers: true
social: true
---

<!-- DRAFT-COPY -->
<p class="home-tagline">I build systems that reason, and then I prove they actually do what they claim.</p>

<!-- DRAFT-COPY -->
<p class="home-authorization">Note for industry roles: I am currently authorized to work in the US through OPT (eligible for STEM extension) and require no employer sponsorship.</p>

<!-- DRAFT-COPY -->
Before my Ph.D., I spent a decade working in industrial control engineering and automation. That hands-on experience is where my instinct for verifiable, robust AI comes from — when you build systems for the physical world, theoretical guarantees matter.

<!-- DRAFT-COPY -->
My current research focuses on four areas, always pairing a theoretical result with a working system:

* **[Information theory of distributed and private learning](/research/#information-theory):** applying information theory to build differentially private federated learning mechanisms using common randomness (e.g., CorBin-FL).
* **[Explainable graph machine learning](/research/#explainable-graph-ml):** addressing structural distribution shifts and creating explanation-preserving augmentations for semi-supervised learning.
* **[Agentic systems](/research/#agentic-systems):** multi-agent decision-making systems for real-time physical plant identification (e.g., Agentic-SysID).
* **[Generative models for structured data](/research/#generative-structured-data):** mathematically grounded approaches to synthetic data generation.

<p class="channel-label">REAL RUN — AGENTIC-SYSID</p>

<!-- DRAFT-COPY -->
A multi-agent LLM system identifying a white-box model of a pendulum plant, tracking closely under composite excitation — actual plant vs. identified model, below.

{% include hero.html %}

<!-- DRAFT-COPY -->
Three systems, with real figures and results:

<div class="home-systems-grid">
  <div class="home-system-card">
    <img src="{{ '/assets/img/systems/corbinfl-pca.png' | relative_url }}" alt="PCA error-concentration figure from the CorBin-FL paper.">
    <h3>CorBin-FL</h3>
    <p>Differentially private federated learning, one bit per weight.</p>
    <div class="home-system-links">
      <a href="/systems/#corbinfl">View System</a>
      <a href="https://github.com/Hojat-Salehi/CorBin-FL">GitHub</a>
    </div>
  </div>
  <div class="home-system-card">
    <img src="{{ '/assets/img/systems/agentic-sysid-flowchart.png' | relative_url }}" alt="Architecture diagram of the Agentic-SysID fidelity-ladder pipeline.">
    <h3>Agentic-SysID</h3>
    <p>A multi-agent pipeline that identifies control-ready models under an experiment budget.</p>
    <div class="home-system-links">
      <a href="/systems/#agentic-sysid">View System</a>
      <a href="https://github.com/Hojat-Salehi/Agentic-SysID">GitHub</a>
    </div>
  </div>
  <div class="home-system-card">
    <img src="{{ '/assets/img/systems/game-analyst-architecture.png' | relative_url }}" alt="Architecture diagram of the Game Analyst multi-agent debate pipeline.">
    <h3>Game Analyst</h3>
    <p>Adversarial multi-agent debate for NBA/MLB game analysis, graded against real outcomes.</p>
    <div class="home-system-links">
      <a href="/systems/#game-analyst-multiagent">View System</a>
      <a href="https://github.com/Hojat-Salehi/game-analyst-multiagent">GitHub</a>
    </div>
  </div>
</div>

<!-- DRAFT-COPY -->
Exploring the site:

<ul class="page-toc">
  <li><a href="/research/">Research</a> — the plain-English framing behind the theory.</li>
  <li><a href="/publications/">Publications</a> — the peer-reviewed papers.</li>
  <li><a href="/systems/">Systems</a> — real figures and code.</li>
  <li><a href="/demos/">Demos</a> — interact with live deployments of the work.</li>
</ul>
