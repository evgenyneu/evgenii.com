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


var data = {"bookTitle":"Differential equation problems from MTH2032","chapters":[{"title":"1. Separable, linear, exact, homogeneous ODEs","exercises":[{"type":"Normal","page":1,"answerPage":31,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b","c"],"2":["a","b"],"3":["a","b"],"4":["a","b","c"]}},{"type":"Extension","page":1,"answerPage":33,"first":5,"last":6,"showEvenProblems":true,"sections":null}]},{"title":"2. Modelling with first order ODEs, first order scalar IVPs and systems of IVPs ","exercises":[{"type":"Normal","page":3,"answerPage":36,"first":1,"last":4,"showEvenProblems":true,"sections":{"2":["a","b"],"4":["a","b"]}},{"type":"Extension","page":3,"answerPage":38,"first":5,"last":5,"showEvenProblems":true,"sections":{"5":["a","b","c"]}}]},{"title":"3. Euler and Heunn numerical methods, second order linear ODEs and IVPs: general theory","exercises":[{"type":"Normal","page":5,"answerPage":40,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b"],"2":["a","b"],"3":["a","b","c","d"]}},{"type":"Extension","page":6,"answerPage":44,"first":5,"last":6,"showEvenProblems":true,"sections":{"5":["a","b"],"6":["a","b","c"]}}]},{"title":"4. Homogeneous ODEs with constant coefficients, method of undetermined coefficients and variation of parameter","exercises":[{"type":"Normal","page":8,"answerPage":47,"first":1,"last":4,"showEvenProblems":true,"sections":{"1":["a","b","c","d"],"2":["a","b"],"4":["a","b"]}},{"type":"Extension","page":9,"answerPage":50,"first":5,"last":5,"showEvenProblems":true,"sections":null}]}]}

randomExercise.init(data);


</script>
