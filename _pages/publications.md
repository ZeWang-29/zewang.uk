---
layout: page
permalink: /publications/
title: research
description: Publications and work in progress.
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<style>
.publications .abbr {
  display: none !important;
}
.publications h2,
.publications h3 {
  display: none !important;
}
</style>

<div class="publications">

{% bibliography %}

</div>
