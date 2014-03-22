---
layout: default
title: See how Evgnii is not afraid of learning to draw
images:
  - file: '2014-03-22-branch-and-leaf.jpg'
    title: Branch and a leaf

  - file: '2014-03-22-branch-and-leaf.jpg'
    title: Branch and a leaf

  - file: '2014-03-22-branch-and-leaf.jpg'
    title: Branch and a leaf


---

# Learning to draw

{% for post in site.categories.drawings %}
  <a href='{{ post.url }}' title='{{post.title}}'>
    <img class='Drawing-image' src='/image/drawings/thumbnails/{{post.image}}' alt='{{post.title}}'/>
  </a>
{% endfor %}