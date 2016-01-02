---
layout: default
title: My Software Projects
layout_class: isTextCentered
---

# My Software Projects

{% for post in site.categories.projects %}
  [{{ post.title }}]({{ post.url }})
{% endfor %}

<br>
<br>

See my [GitHub](//github.com/evgenyneu) projects.

<br>