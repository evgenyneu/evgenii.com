---
layout: default
title: Blog of @{{ site.author.twitter }}
---

# My blog

{% for post in site.categories.blogs %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}