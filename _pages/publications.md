---
layout: page
permalink: /publications/
title: research
description:
nav: true
nav_order: 1
---

<style>
.publications .abbr {
  display: none !important;
}
.publications h2,
.publications h3 {
  display: none !important;
}
.section-heading {
  font-size: 2.125rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #ddd;
}
.section-heading:not(:first-child) {
  margin-top: 2.5rem;
}
</style>

<p class="section-heading">Working Papers</p>

<div class="publications">
{% bibliography --query @article %}
{% bibliography --query @unpublished %}
</div>

<p class="section-heading">Published</p>

<div class="publications">
{% bibliography --query @inproceedings %}
</div>
