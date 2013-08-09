---
layout: default
title: My Software Projects
---

# My Software Projects

{% for post in site.categories.projects %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}