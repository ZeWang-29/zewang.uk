---
layout: single
title: "Reading"
permalink: /reading/
author_profile: true
---

<style>
.reading-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reading-item {
  border-left: 3px solid var(--global-border-color, #e0e0e0);
  margin-bottom: 12px;
  padding: 0;
}

.reading-item details {
  padding: 0;
  margin: 0;
}

.reading-item summary {
  padding: 12px 16px;
  cursor: pointer;
  list-style: none;
  transition: background 0.2s;
}

.reading-item summary::-webkit-details-marker {
  display: none;
}

.reading-item summary:hover {
  background: var(--global-code-bg-color, #f6f6f6);
}

.reading-item[open] {
  border-left-color: var(--global-link-color, #119955);
}

.reading-item details[open] summary {
  border-bottom: 1px solid var(--global-border-color, #eee);
}

.reading-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--global-text-color, #1a1a1a);
  display: block;
  margin-bottom: 4px;
}

.reading-meta {
  font-size: 0.85rem;
  color: var(--global-muted-text-color, #888);
}

.reading-meta .topic {
  display: inline-block;
  background: var(--global-code-bg-color, #f0f0f0);
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 0.78rem;
  margin-left: 4px;
}

.reading-summary {
  padding: 14px 16px;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--global-text-color, #333);
}

.reading-expand-icon {
  float: right;
  font-size: 0.8rem;
  color: var(--global-muted-text-color, #aaa);
  transition: transform 0.2s;
}

details[open] .reading-expand-icon {
  transform: rotate(90deg);
}

.section-note {
  font-size: 0.9rem;
  color: var(--global-muted-text-color, #888);
  margin-bottom: 20px;
}
</style>

## Papers

<p class="section-note">I keep structured summaries of research papers I read, organized by subject area.</p>

<ul class="reading-list">
{% for paper in site.data.reading_papers %}
<li class="reading-item">
<details>
<summary>
<span class="reading-expand-icon">&#9654;</span>
<span class="reading-title">{{ paper.title }}</span>
<span class="reading-meta">{{ paper.authors }} ({{ paper.year }}) · <i>{{ paper.venue }}</i><span class="topic">{{ paper.topic }}</span></span>
</summary>
<div class="reading-summary">{{ paper.summary | markdownify }}</div>
</details>
</li>
{% endfor %}
</ul>

{% if site.data.reading_papers.size == 0 %}
<p class="section-note">Coming soon.</p>
{% endif %}

---

## Books

<p class="section-note">A collection of books I have read or am currently reading.</p>

{% if site.data.reading_books.size > 0 %}
<ul class="reading-list">
{% for book in site.data.reading_books %}
<li class="reading-item">
<details>
<summary>
<span class="reading-expand-icon">&#9654;</span>
<span class="reading-title">{{ book.title }}</span>
<span class="reading-meta">{{ book.authors }} ({{ book.year }})<span class="topic">{{ book.topic }}</span></span>
</summary>
<div class="reading-summary">{{ book.summary | markdownify }}</div>
</details>
</li>
{% endfor %}
</ul>
{% else %}
<p class="section-note">Coming soon.</p>
{% endif %}
