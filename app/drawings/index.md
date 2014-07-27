---
layout: default
title: See how Evgnii is not afraid of learning to draw
layout_class: layout-wider isTextCentered
---

<h1>Learning to draw</h1>

<div class='Drawings'>

  {% for post in site.categories.drawings %}
    <a class='Drawings-link' href='{{ post.url }}' title='{{post.title}}'>
      <img class='Drawings-image' src='/image/drawings/thumbnails/{{ post.path | replace: 'drawings/_posts/', '' | replace: '.md', '.jpg'  }}' alt='{{post.title}}'/>
    </a>
  {% endfor %}

</div>

<br>
