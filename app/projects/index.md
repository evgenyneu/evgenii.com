---
layout: default
title: My Past Software Projects
---

# My Past Software Projects

{% for post in site.categories.projects %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}