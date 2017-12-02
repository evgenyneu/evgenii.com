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

<h3>Chapters</h3>

<div>
  <p class='RandomExercise-chapters'>
    <label><input type="checkbox" name="chapter[]" value="1"> 1. Concepts of Motion</label><br>
    <label><input type="checkbox" name="chapter[]" value="2"> 2. Kinematics in One Dimension</label><br>
    <label><input type="checkbox" name="chapter[]" value="3"> 3. Vectors and Coordinate Systems</label>
  </p>

  <button class="RandomExercise-clearChapters Button">Set/clear all</button>
</div>

<script src="/js/2017/random_exercise.js"></script>

<script>

var chapters = [
  { title: "14. Partial Derivatives: Concept check", page: 1053, answer_page: 1449, first: 1, last: 19 },
  { title: "14. Partial Derivatives: True-false quiz", page: 1054, answer_page: 1375, first: 1, last: 12 },
  { title: "14. Partial Derivatives: Exercises", page: 1054, answer_page: 1375, first: 1, last: 65 },
  { title: "15. Multiple Integrals: Concept check", page: 1133, answer_page: 1449, first: 1, last: 10 },
  { title: "15. Multiple Integrals: True-false quiz", page: 1133, answer_page: 1378, first: 1, last: 9 },
  { title: "15. Multiple Integrals: Exercises",  page: 1134, answer_page: 1378, first: 1, last: 60 },
  { title: "16. Vector Calculus: Concept check", page: 1220, answer_page: 1453, first: 1, last: 16 },
  { title: "16. Vector Calculus: True-false quiz", page: 1220, answer_page: 1381, first: 1, last: 13 },
  { title: "16. Vector Calculus: Exercises", page: 1221, answer_page: 1381, first: 1, last: 41 }
];

randomExercise.init("calculus_stewart", chapters, "Calculus, Early Transcendentals, 8E by James Stewart");

</script>
