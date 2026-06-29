---
layout: about
title: about
permalink: /
subtitle: PhD Candidate at <a href='https://www.ucl.ac.uk/'>University College London</a>

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info:

selected_papers: false
social: true

announcements:
  enabled: false
  scrollable: false

latest_posts:
  enabled: false
---

I am a PhD candidate at **University College London** and a PhD Scholar at the **Stone Centre**. I am also a Research Fellow at the **Institute for the Future of Work** and a Research Affiliate at **Holistic AI**.

My research studies the interplay between AI and society, with a focus on governance and policy implications. One strand examines how AI systems perpetuate or amplify bias in high-stakes settings such as hiring. The other uses experimental economics to study how AI reshapes human decision-making and beliefs, such as political preferences.

<div style="clear: both; margin-top: 2rem; border-top: 1px solid #ddd; padding-top: 2rem;"></div>

<style>
.research-section h2,
.research-section h3,
.research-section hr {
  display: none !important;
}
.research-section .section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.research-section .subsection-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  color: #555;
}
</style>

<div class="publications research-section">
<p class="section-title">Research</p>

<p class="subsection-title">Working Papers</p>

{% bibliography --query @misc %}

{% bibliography --query @unpublished %}

<p class="subsection-title">Published</p>

{% bibliography --query @inproceedings %}

</div>
