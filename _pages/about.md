---
layout: about
title: Home
permalink: /
subtitle: "Ph.D. Candidate in Computer Science — Bridging Information Theory, Machine Learning, Agentic AI, and Industrial Automation"

profile:
  align: right
  image: profile.jpg
  image_circular: false
  address: >
    <p>Currently finishing my Ph.D. at Florida International University (Expected 2026). My work pairs rigorous theoretical results with working, deployable systems.</p>
    <div class="home-cta">
      <a href="/cv/" class="home-cta-btn home-cta-btn--primary">View Full CV</a>
      <a href="mailto:hsalehi@fiu.edu" id="home-cta-email" class="home-cta-btn" aria-live="polite">Get in Touch</a>
    </div>

news: false
selected_papers: false
site_guide: true
social: true
---

<!-- DRAFT-COPY -->
Before my Ph.D., I worked as a research fellow developing second-order gradient-based optimization methods for control problems in hybrid dynamical systems and legged robots, then built an ML pipeline for stock-market time-series prediction using LSTMs, with a stretch of industrial control engineering in between. That work gave me both the theoretical grounding and the hands-on implementation skill I've carried into every project since: proving a result on paper, then shipping the system that has to hold up in practice.

<!-- DRAFT-COPY -->
My current research focuses on four areas, always pairing a theoretical result with a working system:

* **[Agentic AI & System Identification](/research/#agentic-systems):** multi-agent LLM systems — including retrieval-augmented (RAG) pipelines — for real-time decision-making and physical plant identification (e.g., Agentic-SysID, Game Analyst).
* **[Explainable Graph Machine Learning](/research/#explainable-graph-ml):** addressing structural distribution shifts and creating explanation-preserving augmentations for semi-supervised learning.
* **[Privacy-Preserving Distributed Learning](/research/#information-theory):** applying information theory to build differentially private federated learning mechanisms using common randomness (e.g., CorBin-FL).
* **[Generative Models for Structured Data](/research/#generative-structured-data):** mathematically grounded approaches to synthetic data generation.

<!-- DRAFT-COPY -->
<p class="home-authorization">I am currently authorized to work in the US through OPT (eligible for STEM extension) and require no employer sponsorship.</p>

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

<div class="home-showcase">
  <div class="home-showcase-papers">
    <h2><a href="{{ '/publications/' | relative_url }}" style="color: inherit;">selected publications</a></h2>
    <div class="publications">
      {% bibliography -f papers -q @*[selected=true]* %}
    </div>
  </div>
  <div class="home-showcase-video">
    <p class="channel-label">REAL RUN — AGENTIC-SYSID</p>
    <!-- DRAFT-COPY -->
    <p>A multi-agent LLM system identifying a white-box model of a pendulum plant, tracking closely under composite excitation — actual plant vs. identified model, below.</p>
    {% include hero.html %}
  </div>
</div>
