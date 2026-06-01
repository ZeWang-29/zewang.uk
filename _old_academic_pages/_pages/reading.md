---
layout: single
title: " "
permalink: /reading/
author_profile: true
---

<style>
/* ── Filter Pills ── */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--global-border-color, #eee);
}

.filter-btn {
  padding: 4px 14px;
  border: 1px solid var(--global-border-color, #ddd);
  border-radius: 20px;
  background: transparent;
  color: var(--global-muted-text-color, #888);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.filter-btn:hover {
  border-color: var(--global-link-color, #119955);
  color: var(--global-link-color, #119955);
}

.filter-btn.active {
  background: var(--global-link-color, #119955);
  border-color: var(--global-link-color, #119955);
  color: #fff;
}

/* ── Year Group ── */
.year-group summary {
  cursor: pointer;
  list-style: none;
  padding: 8px 0;
}

.year-group summary::-webkit-details-marker {
  display: none;
}

.year-group summary h2 {
  display: inline;
  font-size: 1.2rem;
  margin: 0;
}

.year-group summary .year-count {
  font-size: 0.82rem;
  color: var(--global-muted-text-color, #999);
  margin-left: 8px;
  font-weight: normal;
}

.year-group summary .year-arrow {
  display: inline-block;
  margin-right: 6px;
  font-size: 0.7rem;
  transition: transform 0.2s;
  color: var(--global-muted-text-color, #aaa);
}

.year-group[open] summary .year-arrow {
  transform: rotate(90deg);
}

/* ── Reading Entry ── */
.reading-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.reading-entry {
  border-left: 3px solid var(--global-border-color, #e0e0e0);
  margin-bottom: 8px;
  transition: opacity 0.2s;
}

.reading-entry.hidden {
  display: none;
}

.reading-entry details summary {
  padding: 10px 14px;
  cursor: pointer;
  list-style: none;
  transition: background 0.15s;
}

.reading-entry details summary::-webkit-details-marker {
  display: none;
}

.reading-entry details summary:hover {
  background: var(--global-code-bg-color, #f6f6f6);
}

.reading-entry details[open] {
  border-left-color: var(--global-link-color, #119955);
}

.reading-entry details[open] summary {
  border-bottom: 1px solid var(--global-border-color, #eee);
}

.entry-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--global-text-color, #1a1a1a);
  display: block;
  margin-bottom: 3px;
}

.entry-meta {
  font-size: 0.82rem;
  color: var(--global-muted-text-color, #888);
}

.entry-topic {
  display: inline-block;
  background: var(--global-code-bg-color, #f0f0f0);
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
  margin-left: 6px;
}

.entry-expand {
  float: right;
  font-size: 0.7rem;
  color: var(--global-muted-text-color, #aaa);
  transition: transform 0.2s;
}

details[open] .entry-expand {
  transform: rotate(90deg);
}

.entry-content {
  padding: 16px;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--global-text-color, #333);
  max-height: 500px;
  overflow-y: auto;
}

.entry-content h1 { font-size: 1.15rem; margin-top: 1.2em; }
.entry-content h2 { font-size: 1.05rem; margin-top: 1.1em; }
.entry-content h3 { font-size: 0.95rem; margin-top: 1em; }
.entry-content table { font-size: 0.82rem; margin: 1em 0; }
.entry-content hr { margin: 1.5em 0; border-color: var(--global-border-color, #eee); }

.section-note {
  font-size: 0.88rem;
  color: var(--global-muted-text-color, #888);
  margin-bottom: 16px;
}
</style>

## Papers

<p class="section-note">Structured summaries of research papers I read, organized by subject area.</p>

{% assign papers = site.reading_papers | sort: "date_read" | reverse %}
{% assign all_topics = "" %}
{% for paper in papers %}
  {% unless all_topics contains paper.topic %}
    {% if all_topics == "" %}
      {% assign all_topics = paper.topic %}
    {% else %}
      {% assign all_topics = all_topics | append: "," | append: paper.topic %}
    {% endif %}
  {% endunless %}
{% endfor %}
{% assign topic_list = all_topics | split: "," %}

{% if topic_list.size > 1 %}
<div class="filter-bar" id="paper-filters">
  <button class="filter-btn active" data-tag="all">All</button>
  {% for topic in topic_list %}
  <button class="filter-btn" data-tag="{{ topic }}">{{ topic }}</button>
  {% endfor %}
</div>
{% endif %}

{% assign years = "" %}
{% for paper in papers %}
  {% assign y = paper.date_read | slice: 0, 4 %}
  {% unless years contains y %}
    {% if years == "" %}{% assign years = y %}{% else %}{% assign years = years | append: "," | append: y %}{% endif %}
  {% endunless %}
{% endfor %}
{% assign year_list = years | split: "," %}

{% for year in year_list %}
{% assign year_papers = "" %}
{% assign count = 0 %}
{% for paper in papers %}
  {% assign py = paper.date_read | slice: 0, 4 %}
  {% if py == year %}{% assign count = count | plus: 1 %}{% endif %}
{% endfor %}

<details class="year-group" {% if forloop.first %}open{% endif %}>
<summary><span class="year-arrow">&#9654;</span><h2>{{ year }}</h2><span class="year-count">{{ count }} papers</span></summary>

<ul class="reading-list">
{% for paper in papers %}
{% assign py = paper.date_read | slice: 0, 4 %}
{% if py == year %}
<li class="reading-entry" data-topic="{{ paper.topic }}">
<details>
<summary>
<span class="entry-expand">&#9654;</span>
<span class="entry-title">{{ paper.title }}</span>
<span class="entry-meta">{{ paper.authors }} ({{ paper.year }}) · <i>{{ paper.venue }}</i><span class="entry-topic">{{ paper.topic }}</span></span>
</summary>
<div class="entry-content">{{ paper.content }}</div>
</details>
</li>
{% endif %}
{% endfor %}
</ul>

</details>
{% endfor %}

{% if papers.size == 0 %}
<p class="section-note">Coming soon.</p>
{% endif %}

---

## Books

{% assign books = site.reading_books | sort: "date_read" | reverse %}
{% if books.size > 0 %}

{% assign book_years = "" %}
{% for book in books %}
  {% assign y = book.date_read | slice: 0, 4 %}
  {% unless book_years contains y %}
    {% if book_years == "" %}{% assign book_years = y %}{% else %}{% assign book_years = book_years | append: "," | append: y %}{% endif %}
  {% endunless %}
{% endfor %}
{% assign book_year_list = book_years | split: "," %}

{% for year in book_year_list %}
{% assign count = 0 %}
{% for book in books %}
  {% assign by = book.date_read | slice: 0, 4 %}
  {% if by == year %}{% assign count = count | plus: 1 %}{% endif %}
{% endfor %}

<details class="year-group" {% if forloop.first %}open{% endif %}>
<summary><span class="year-arrow">&#9654;</span><h2>{{ year }}</h2><span class="year-count">{{ count }} books</span></summary>

<ul class="reading-list">
{% for book in books %}
{% assign by = book.date_read | slice: 0, 4 %}
{% if by == year %}
<li class="reading-entry" data-topic="{{ book.topic }}">
<details>
<summary>
<span class="entry-expand">&#9654;</span>
<span class="entry-title">{{ book.title }}</span>
<span class="entry-meta">{{ book.authors }} ({{ book.year }})<span class="entry-topic">{{ book.topic }}</span></span>
</summary>
<div class="entry-content">{{ book.content }}</div>
</details>
</li>
{% endif %}
{% endfor %}
</ul>

</details>
{% endfor %}

{% else %}
<p class="section-note">Coming soon.</p>
{% endif %}

<script>
document.addEventListener('DOMContentLoaded', function() {
  var filters = document.getElementById('paper-filters');
  if (!filters) return;

  filters.addEventListener('click', function(e) {
    if (!e.target.classList.contains('filter-btn')) return;

    filters.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    e.target.classList.add('active');

    var tag = e.target.getAttribute('data-tag');
    document.querySelectorAll('.reading-entry').forEach(function(entry) {
      if (tag === 'all' || entry.getAttribute('data-topic') === tag) {
        entry.classList.remove('hidden');
      } else {
        entry.classList.add('hidden');
      }
    });
  });
});
</script>
