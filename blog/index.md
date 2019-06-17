---
layout: default
layout_class: isTextCentered
title: Blog of Evgenii Neumerzhitckii
---

# A tiny blog-like thing

{% for post in site.categories.blog %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}
