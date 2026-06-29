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

<div style="clear: both; margin-top: 2rem;"></div>

<style>
.research-section h2,
.research-section h3,
.research-section hr {
  display: none !important;
}
.research-section .section-title {
  font-size: 2.125rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #ddd;
}
.research-section .abbr {
  display: none !important;
}
</style>

<div class="publications research-section">
<p class="section-title">Working Papers</p>

{% bibliography --query @misc %}

{% bibliography --query @unpublished %}

</div>

<div class="publications research-section" style="margin-top: 2rem;">
<p class="section-title">Published</p>

{% bibliography --query @inproceedings %}

</div>
