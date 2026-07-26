---
layout: page
title: systems
permalink: /systems/
description: Working systems, each framed as Problem, Approach, Result, Artifact — with a real figure and a sourced number.
nav: true
nav_order: 3
---

<div class="systems-list">
  {%- for system in site.data.systems %}
    {%- include system_card.html system=system index=forloop.index %}
  {%- endfor %}
</div>
