---
layout: page
title: systems
permalink: /systems/
description: Working systems, each framed as Problem, Approach, Result, Artifact — with a real figure and a sourced number, never a feature list.
nav: false
nav_order: 4
---

<!-- DRAFT-COPY -->
<p class="systems-intro">Four systems, each paired with a real result. Problem, approach, result, artifact — no feature lists.</p>

<div class="systems-list">
  {%- for system in site.data.systems %}
    {%- include system_card.html system=system %}
  {%- endfor %}
</div>
