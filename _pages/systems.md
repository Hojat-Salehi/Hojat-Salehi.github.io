---
layout: page
title: systems
permalink: /systems/
description: Working systems, each framed as Problem, Approach, Result, Artifact — with a real figure and a sourced number.
subtitle: >
  <p>Four systems, each with a real figure and a sourced result:</p>
  <ul class="page-toc">
    <li><a href="#corbinfl">CorBin-FL</a> — differentially private federated learning, one bit per weight.</li>
    <li><a href="#agentic-sysid">Agentic-SysID</a> — a multi-agent pipeline that identifies control-ready models under an experiment budget.</li>
    <li><a href="#game-analyst-multiagent">Game Analyst</a> — adversarial multi-agent debate for NBA/MLB game analysis, graded against real outcomes.</li>
    <li><a href="#ddim-time-series">DDIM Time Series</a> — treating tomorrow's price movement as an image-inpainting problem.</li>
  </ul>
nav: true
nav_order: 3
---

<div class="systems-list">
  {%- for system in site.data.systems %}
    {%- include system_card.html system=system index=forloop.index %}
  {%- endfor %}
</div>
