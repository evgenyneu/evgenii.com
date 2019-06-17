---
layout: default
layout_class: isTextCentered
title: A tiny blog-like thing
---

# A tiny blog-like thing

{% for post in site.categories.blog %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}
