---
layout: default
noindex: true
comments: false
title: "Random math problem"
---

# Random math problem

From Calculus, 8th ed. by Stewart.

<p>
  <button class="RandomExercise-runButton Button">Get random problem</button>
</p>

<p>
  <span class="RandomExercise-chapterNumber"></span> <span class="RandomExercise-chapterTitle"></span><br>
  <span></span> <span class="RandomExercise-pageNumber"></span><br>
  <span></span> <span class="RandomExercise-problemNumber"></span>
</p>

<h3>Settings</h3>

<div>
  <p>
    <label><input type="checkbox" class="RandomExercise-useLastChapter" name="sameChapter" value="1"
      onchange="randomExercise.saveUserSetting()"> Same chapter</label>
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

<script src="/js/2017/random_exercise.js"></script>

<script>

var chapters = [
  { chapter: "14",  page: 1054, answer_page: 1375,  last: 65,  title: "Partial Derivatives" },
  { chapter: "15",  page: 1134, answer_page: 1378,  last: 60,  title: "Multiple Integrals" },
  { chapter: "16",  page: 1221, answer_page: 1381,  last: 41,  title: "Vector Calculus" }
];

randomExercise.init("calculus_stewart", chapters);

</script>
