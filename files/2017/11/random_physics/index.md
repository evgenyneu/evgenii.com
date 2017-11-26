---
layout: default
noindex: true
comments: false
title: "Random physics problem"
---

# Random physics problem

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

  <p>
    <label><input type="checkbox" class="RandomExercise-includeExercises" name="includeExercises" value="1"
      onchange="randomExercise.saveUserSetting()"> Include exercises</label>
  </p>

  <p>
    <label><input type="checkbox" class="RandomExercise-includeChallenges" name="includeChappanges" value="1"
      onchange="randomExercise.saveUserSetting()"> Include challenges</label>
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

<h3>About</h3>

<p>Return a random odd-numbered problem from Knight's Physics for Scientists and Engineers 3rd edition textbook.</p>

<script src="/js/2017/random_exercise.js"></script>

<script>

var chapters = [
  { chapter: "1",   page: 66, answer_page: 1325,    problemsStart: 35,                        last: 57,  title: "Concepts of Motion" },
  { chapter: "2",   page: 98, answer_page: 1327,    problemsStart: 27,   challengeStart: 76,  last: 83,  title: "Kinematics in One Dimension" },
  { chapter: "3",   page: 116, answer_page: 1328,    problemsStart: 19,                        last: 44,  title: "Vectors and Coordinate Systems" },
  { chapter: "4",   page: 146, answer_page: 1329,    problemsStart: 36,   challengeStart: 77,  last: 86,  title: "Kinematics in Two Dimensions" },
  { chapter: "5",   page: 168, answer_page: 1330,    problemsStart: 28,   challengeStart: 54,  last: 57,  title: "Force and Motion" },
  { chapter: "6",   page: 198, answer_page: 1331,    problemsStart: 26,   challengeStart: 72,  last: 77,  title: "Dynamics I: Motion Along a Line" },
  { chapter: "7",   page: 222, answer_page: 1331,    problemsStart: 19,   challengeStart: 53,  last: 57,  title: "Newton’s Third Law" },
  { chapter: "8",   page: 246, answer_page: 1332,    problemsStart: 21,   challengeStart: 59,  last: 67,  title: "Dynamics II: Motion in a Plane" },
  { chapter: "9",   page: 274, answer_page: 1333,    problemsStart: 26,   challengeStart: 70,  last: 75,  title: "Impulse and Momentum" },
  { chapter: "10",  page: 306, answer_page: 1333,    problemsStart: 33,   challengeStart: 67,  last: 76,  title: "Energy" },
  { chapter: "11",  page: 338, answer_page: 1333,    problemsStart: 37,   challengeStart: 72,  last: 75,  title: "Work" },
  { chapter: "12",  page: 384, answer_page: 1334,    problemsStart: 49,   challengeStart: 83,  last: 88,  title: "Rotation of a Rigid Body" },
  { chapter: "13",  page: 406, answer_page: 1334,    problemsStart: 25,   challengeStart: 62,  last: 70,  title: "Newton’s Theory of Gravity" },
  { chapter: "14",  page: 436, answer_page: 1335,    problemsStart: 30,   challengeStart: 75,  last: 80,  title: "Oscillations" },
  { chapter: "15",  page: 470, answer_page: 1335,    problemsStart: 31,   challengeStart: 70,  last: 74,  title: "Fluids and Elasticity" },
  { chapter: "16",  page: 500, answer_page: 1336,    problemsStart: 33,   challengeStart: 69,  last: 74,  title: "A Macroscopic Description of Matter" },
  { chapter: "17",  page: 531, answer_page: 1336,    problemsStart: 31,   challengeStart: 77,  last: 82,  title: "Work, Heat, and the First Law of Thermodynamics" },
  { chapter: "18",  page: 556, answer_page: 1337,    problemsStart: 37,   challengeStart: 63,  last: 65,  title: "The Micro/Macro Connection" },
  { chapter: "19",  page: 584, answer_page: 1338,    problemsStart: 31,   challengeStart: 69,  last: 72,  title: "Heat Engines and Refrigerators" },
  { chapter: "20",  page: 620, answer_page: 1338,    problemsStart: 40,   challengeStart: 77,  last: 82,  title: "Traveling Waves" },
  { chapter: "21",  page: 656, answer_page: 1339,    problemsStart: 30,   challengeStart: 74,  last: 80,  title: "Superposition" },
  { chapter: "22",  page: 683, answer_page: 1340,    problemsStart: 30,   challengeStart: 69,  last: 75,  title: "Wave Optics" },
  { chapter: "23",  page: 724, answer_page: 1341,    problemsStart: 38,   challengeStart: 78,  last: 82,  title: "Ray Optics" },
  { chapter: "24",  page: 748, answer_page: 1341,    problemsStart: 23,   challengeStart: 42,  last: 46,  title: "Optical Instruments" },
  { chapter: "25",  page: 780, answer_page: 1341,    problemsStart: 28,   challengeStart: 72,  last: 76,  title: "Electric Charges and Forces" },
  { chapter: "26",  page: 810, answer_page: 1342,    problemsStart: 28,   challengeStart: 63,  last: 71,  title: "The Electric Field" },
  { chapter: "27",  page: 840, answer_page: 1342,    problemsStart: 29,   challengeStart: 55,  last: 59,  title: "Gauss’s Law" },
  { chapter: "28",  page: 868, answer_page: 1343,    problemsStart: 31,   challengeStart: 74,  last: 82,  title: "The Electric Potential" },
  { chapter: "29",  page: 898, answer_page: 1343,    problemsStart: 33,   challengeStart: 76,  last: 82,  title: "Potential and Field" },
  { chapter: "30",  page: 922, answer_page: 1344,    problemsStart: 38,   challengeStart: 68,  last: 73,  title: "Current and Resistance" },
  { chapter: "31",  page: 950, answer_page: 1345,    problemsStart: 34,   challengeStart: 75,  last: 81,  title: "Fundamentals of Circuits" },
  { chapter: "32",  page: 992, answer_page: 1346,    problemsStart: 40,   challengeStart: 76,  last: 82,  title: "The Magnetic Field" },
  { chapter: "33",  page: 1032, answer_page: 1346,    problemsStart: 27,   challengeStart: 79,  last: 85,  title: "Electromagnetic Induction" },
  { chapter: "34",  page: 1064, answer_page: 1347,    problemsStart: 28,   challengeStart: 59,  last: 64,  title: "Electromagnetic Fields and Waves" },
  { chapter: "35",  page: 1087, answer_page: 1347,    problemsStart: 35,   challengeStart: 65,  last: 71,  title: "AC Circuits" },
  { chapter: "36",  page: 1133, answer_page: 1348,    problemsStart: 43,   challengeStart: 73,  last: 76,  title: "Relativity" },
  { chapter: "37",  page: 1156, answer_page: 1348,    problemsStart: 25,   challengeStart: 45,  last: 48,  title: "The Foundations of Modern Physics" },
  { chapter: "38",  page: 1187, answer_page: 1348,    problemsStart: 36,   challengeStart: 66,  last: 70,  title: "Quantization" },
  { chapter: "39",  page: 1210, answer_page: 1349,    problemsStart: 26,   challengeStart: 47,  last: 51,  title: "Wave Functions and Uncertainty" },
  { chapter: "40",  page: 1248, answer_page: 1350,    problemsStart: 22,   challengeStart: 41,  last: 46,  title: "One-Dimensional Quantum Mechanics" },
  { chapter: "41",  page: 1280, answer_page: 1351,    problemsStart: 24,   challengeStart: 51,  last: 57,  title: "Atomic Physics" },
  { chapter: "42",  page: 1309, answer_page: 1352,    problemsStart: 37,   challengeStart: 58,  last: 63,  title: "Nuclear Physics" }
];

randomExercise.init("physics_knight_4ed", chapters);


</script>
