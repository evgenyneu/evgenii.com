---
layout: default
layout_class: isTextCentered
title: My Software Projects
---

# My Software Projects

{% for post in site.categories.projects %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}

<br>
<br>

See my [GitHub](//github.com/{{ site.author.github }}) projects.

<br>