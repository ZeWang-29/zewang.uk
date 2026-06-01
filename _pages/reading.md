---
layout: single
title: " "
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

.reading-item details[open] {
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
  max-height: 600px;
  overflow-y: auto;
}

.reading-summary h1, .reading-summary h2, .reading-summary h3 {
  margin-top: 1.2em;
  margin-bottom: 0.5em;
}

.reading-summary h1 { font-size: 1.2rem; }
.reading-summary h2 { font-size: 1.1rem; }
.reading-summary h3 { font-size: 1rem; }

.reading-summary table {
  font-size: 0.85rem;
  margin: 1em 0;
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
{% assign papers = site.reading_papers | sort: "date_read" | reverse %}
{% for paper in papers %}
<li class="reading-item">
<details>
<summary>
<span class="reading-expand-icon">&#9654;</span>
<span class="reading-title">{{ paper.title }}</span>
<span class="reading-meta">{{ paper.authors }} ({{ paper.year }}) · <i>{{ paper.venue }}</i><span class="topic">{{ paper.topic }}</span></span>
</summary>
<div class="reading-summary">{{ paper.content }}</div>
</details>
</li>
{% endfor %}
{% if site.reading_papers.size == 0 %}
<p class="section-note">Coming soon.</p>
{% endif %}
</ul>

---

## Books

{% assign books = site.reading_books | sort: "date_read" | reverse %}
{% if books.size > 0 %}
<ul class="reading-list">
{% for book in books %}
<li class="reading-item">
<details>
<summary>
<span class="reading-expand-icon">&#9654;</span>
<span class="reading-title">{{ book.title }}</span>
<span class="reading-meta">{{ book.authors }} ({{ book.year }})<span class="topic">{{ book.topic }}</span></span>
</summary>
<div class="reading-summary">{{ book.content }}</div>
</details>
</li>
{% endfor %}
</ul>
{% else %}
<p class="section-note">Coming soon.</p>
{% endif %}
