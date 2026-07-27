---
layout: page
permalink: /publications/
title: publications
description: Generated from one file — _bibliography/papers.bib. Grouped Journal / Conference / Under Review & Preprints, per publication type.
nav: true
nav_order: 5
---
<div class="publications">

<h2 class="pub-group">Journal</h2>
{% bibliography -f papers -q @article %}

<h2 class="pub-group">Conference</h2>
{% bibliography -f papers -q @inproceedings %}

<h2 class="pub-group">Under Review &amp; Preprints</h2>
{% bibliography -f papers -q @unpublished %}

</div>
