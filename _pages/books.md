---
layout: page
title: reading
permalink: /reading/
nav: false
nav_order: 2
---

<style>
.post-header .post-title {
  display: none;
}

.reading-heading {
  font-family: serif;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 2rem 0 3rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.book-card {
  padding-bottom: 1rem;
}

.book-cover {
  aspect-ratio: 2/3;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: #f0ebe3;
  margin-bottom: 0.6rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-cover:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.book-title {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
}

.book-author {
  font-size: 0.78rem;
  color: var(--global-theme-color, #888);
  margin-top: 2px;
}

.book-status {
  display: inline-block;
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 3px;
  background: #e8e0d5;
  color: #8b7355;
  margin-top: 4px;
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1.2rem;
  }
}
</style>

<p class="reading-heading">What I've been reading</p>

<ul class="books-grid">
{% assign sorted_books = site.books | sort: "date" | reverse %}
{% for book in sorted_books %}
<li class="book-card">
  {% if book.status == "Currently Reading" %}
  <div class="book-cover">
  {% else %}
  <a href="{{ book.url | relative_url }}" class="book-cover">
  {% endif %}
    {% if book.cover %}
      <img src="{{ book.cover | relative_url }}" alt="{{ book.title }}">
    {% elsif book.isbn %}
      <img src="https://covers.openlibrary.org/b/isbn/{{ book.isbn }}-L.jpg" alt="{{ book.title }}">
    {% elsif book.olid %}
      <img src="https://covers.openlibrary.org/b/olid/{{ book.olid }}-L.jpg" alt="{{ book.title }}">
    {% endif %}
  {% if book.status == "Currently Reading" %}
  </div>
  {% else %}
  </a>
  {% endif %}
  <h3 class="book-title">{{ book.title }}</h3>
  <div class="book-author">{{ book.author }}</div>
  {% if book.status == "Currently Reading" %}
    <span class="book-status">📖 reading</span>
  {% endif %}
</li>
{% endfor %}
</ul>
