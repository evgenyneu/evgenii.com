---
layout: blog_post
comments: false
title: "Coding a stellar structure model in JavaScript"
meta_description: "We code a stellar structure mofr in JavaScript by adopting the StatStar code from Carroll & Ostlie's textbook."
tags: programming science
---

<p class='StellarModel-debugOutput'></p>

<script src="/js/2019/stellar_model/constants.js"></script>
<script src="/js/2019/stellar_model/composition.js"></script>
<script src="/js/2019/stellar_model/initialModel.js"></script>
<script src="/js/2019/stellar_model/main.js"></script>

<script>
  window.stellar.main.start();
  console.log(window.stellar.initialModel.data);
</script>


<br>

## References

* [The unit tests](/files/2019/01/stellar_model/test/) of the stellar model code.


