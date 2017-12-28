---
layout: default
noindex: true
comments: false
title: "Random math problem"
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

<p>To generate JSON, click Random Problem/Generate Data menu in the <a href="https://docs.google.com/spreadsheets/d/1UTDs-HvaSevMtZl4CBGut9_Jg-jGsiYaHQlxzhX8S6Y/edit?usp=sharing">data spreadsheet</a>.</p>

<script src="/js/2017/random_exercise.js"></script>

<script>


var data = {"bookTitle":"Calculus, Early Transcendentals, 8E by James Stewart","chapters":[{"title":"13. Vector Functions","exercises":[{"type":"Concept check","page":953,"answerPage":1443,"first":1,"last":9,"showEvenProblems":true},{"type":"True-false quiz","page":953,"answerPage":1370,"first":1,"last":14,"showEvenProblems":false},{"type":"Exercises","page":954,"answerPage":1370,"first":1,"last":24,"showEvenProblems":false}]},{"title":"14. Partial Derivatives","exercises":[{"type":"Concept check","page":1053,"answerPage":1445,"first":1,"last":19,"showEvenProblems":true},{"type":"True-false quiz","page":1054,"answerPage":1375,"first":1,"last":12,"showEvenProblems":false},{"type":"Exercises","page":1054,"answerPage":1375,"first":1,"last":65,"showEvenProblems":false}]},{"title":"15. Multiple Integrals","exercises":[{"type":"Concept check","page":1133,"answerPage":1449,"first":1,"last":10,"showEvenProblems":true},{"type":"True-false quiz","page":1133,"answerPage":1378,"first":1,"last":9,"showEvenProblems":false},{"type":"Exercises","page":1134,"answerPage":1378,"first":1,"last":60,"showEvenProblems":false}]},{"title":"16. Vector Calculus","exercises":[{"type":"Concept check","page":1220,"answerPage":1453,"first":1,"last":16,"showEvenProblems":true},{"type":"True-false quiz","page":1220,"answerPage":1381,"first":1,"last":13,"showEvenProblems":false},{"type":"Exercises","page":1221,"answerPage":1381,"first":1,"last":41,"showEvenProblems":false}]}]}

randomExercise.init(data);

</script>
