---
layout: default
noindex: true
comments: false
title: "Differential equations"
---

<h1 class="RandomExercise-bookTitle"></h1>

<p>
  <button class="RandomExercise-runButton Button">Get random problem</button>
</p>

<p>
    <label><input type="checkbox" class="RandomExercise-useLastChapter" name="sameChapter" value="1"
      onchange="randomExercise.saveUserSetting()"> Show same chapter</label>
</p>

<p>
  <span class="RandomExercise-chapterTitle"></span><br>
  <span class="RandomExercise-pageNumber"></span><br>
  <span class="RandomExercise-answerPageNumber"></span><br>
  <span class="RandomExercise-problemNumber"></span>
</p>

<h3>Exercise types</h3>

<div>
  <p class='RandomExercise-execriceTypes'>
  </p>
</div>

<h3>Chapters</h3>

<div>
  <p class='RandomExercise-chapters'>
    <label><input type="checkbox" name="chapter[]" value="1"> 1. Concepts of Motion</label><br>
    <label><input type="checkbox" name="chapter[]" value="2"> 2. Kinematics in One Dimension</label><br>
    <label><input type="checkbox" name="chapter[]" value="3"> 3. Vectors and Coordinate Systems</label>
  </p>

  <button class="RandomExercise-clearChapters Button">Set/clear all</button>
</div>

<br><br>



<p>To generate JSON, click Random Problem/Generate Data menu in the <a href="https://docs.google.com/spreadsheets/d/18jYbIuczOPKb3O3ZkQVedSEjkwtjZVXZZzSxgbb5XJI/edit?usp=sharing">data spreadsheet</a>.</p>


<script src="/js/2017/random_exercise.js"></script>

<script>


var data = {"bookTitle":"Differential equation problems from MTH2032","chapters":[{"title":"1. Separable, linear, exact, homogeneous ODEs","exercises":[{"type":"Normal","page":1,"answerPage":31,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b","c"],"2":["a","b"],"3":["a","b"],"4":["a","b","c"]}},{"type":"Extension","page":1,"answerPage":33,"first":5,"last":6,"showEvenProblems":true,"sections":null}]},{"title":"2. Modelling with first order ODEs, first order scalar IVPs and systems of IVPs ","exercises":[{"type":"Normal","page":3,"answerPage":36,"first":1,"last":4,"showEvenProblems":true,"sections":{"2":["a","b"],"4":["a","b"]}},{"type":"Extension","page":3,"answerPage":38,"first":5,"last":5,"showEvenProblems":true,"sections":{"5":["a","b","c"]}}]},{"title":"3. Euler and Heunn numerical methods, second order linear ODEs and IVPs: general theory","exercises":[{"type":"Normal","page":5,"answerPage":40,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b"],"2":["a","b"],"3":["a","b","c","d"]}},{"type":"Extension","page":6,"answerPage":44,"first":5,"last":6,"showEvenProblems":true,"sections":{"5":["a","b"],"6":["a","b","c"]}}]},{"title":"4. Homogeneous ODEs with constant coefficients, method of undetermined coefficients and variation of parameter","exercises":[{"type":"Normal","page":8,"answerPage":47,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b","c","d"],"2":["a","b"],"4":["a","b"]}},{"type":"Extension","page":9,"answerPage":50,"first":5,"last":5,"showEvenProblems":true,"sections":null}]},{"title":"5. Boundary Value Problems, reduction of order: 2nd solution for a linear homogeneous ODE","exercises":[{"type":"Normal","page":10,"answerPage":52,"first":1,"last":3,"showEvenProblems":true,"sections":{"3":["a","b","c","d"]}},{"type":"Extension","page":10,"answerPage":56,"first":5,"last":5,"showEvenProblems":true,"sections":null}]},{"title":"7. Basic concepts of PDEs, modelling with first order PDEs","exercises":[{"type":"Normal","page":13,"answerPage":60,"first":1,"last":7,"showEvenProblems":true,"sections":{"2":["a","b","c","d"],"3":["a","b"],"6":["a","b","c","d"],"7":["a","b"]}}]},{"title":"8. Semilinear and Quasilinear first order PDEs","exercises":[{"type":"Normal","page":16,"answerPage":69,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b","c","d"],"2":["a","b","c","d"],"3":["a","b","c","d","e"],"4":["a","b","c","d"]}}]},{"title":"9. Separation of variables: the wave and heat equations","exercises":[{"type":"Normal","page":19,"answerPage":87,"first":1,"last":5,"showEvenProblems":true,"sections":{"2":["a","b","c"],"4":["a","b"],"5":["a","b"]}},{"type":"Extension","page":20,"answerPage":94,"first":6,"last":8,"showEvenProblems":true,"sections":null}]},{"title":"10. Fourier series","exercises":[{"type":"Normal","page":22,"answerPage":96,"first":1,"last":7,"showEvenProblems":true,"sections":{"1":["a","b","c","d","e","f"],"2":["a","b","c","d","e","f"],"3":["a","b","c","d"],"4":["a","b","c","d"],"5":["a","b","c","d"],"6":["a","b","c","d"],"7":["a","b","c","d","e"]}},{"type":"Extension","page":20,"answerPage":112,"first":8,"last":11,"showEvenProblems":true,"sections":null}]},{"title":"11. The wave, heat and laplace equations revisited","exercises":[{"type":"Normal","page":26,"answerPage":120,"first":1,"last":8,"showEvenProblems":true,"sections":null},{"type":"Extension","page":27,"answerPage":130,"first":9,"last":10,"showEvenProblems":true,"sections":null}]},{"title":"12. 2nd order semilinear PDEs","exercises":[{"type":"Normal","page":29,"answerPage":134,"first":1,"last":2,"showEvenProblems":true,"sections":{"1":["a","b","c","d"]}},{"type":"Extension","page":29,"answerPage":139,"first":3,"last":5,"showEvenProblems":true,"sections":null}]}]}

randomExercise.init(data);


</script>
