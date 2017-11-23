---
layout: default
noindex: true
comments: false
title: "Random physics problem"
---

# Random physics problem

<p>
  <button class="CardsExperiment-runButton Button">Get random problem</button>
</p>

<p>
  <span class="PhysicsProblem-chapterNumber"></span> <span class="PhysicsProblem-chapterTitle"></span><br>
  <span></span> <span class="PhysicsProblem-pageNumber"></span><br>
  <span></span> <span class="PhysicsProblem-problemNumber"></span>
</p>

<h3>Settings</h3>

<div>
  <p>
    <label><input type="checkbox" class="PhysicsProblem-useLastChapter" name="sameChapter" value="1"
      onchange="physicsProblems.saveUserSetting()"> Same chapter</label>
  </p>

  <p>
    <label><input type="checkbox" class="PhysicsProblem-includeExercises" name="includeExercises" value="1"
      onchange="physicsProblems.saveUserSetting()"> Include exercises</label>
  </p>

  <p>
    <label><input type="checkbox" class="PhysicsProblem-includeChallenges" name="includeChappanges" value="1"
      onchange="physicsProblems.saveUserSetting()"> Include challenges</label>
  </p>
</div>

<h3>Chapters</h3>

<div>
  <p class='PhysicsProblem-chapters'>
    <label><input type="checkbox" class="PhysicsProblem-useLastChapter" name="chapter[]" value="1"> 1. Concepts of Motion</label><br>
    <label><input type="checkbox" class="PhysicsProblem-useLastChapter" name="chapter[]" value="2"> 2. Kinematics in One Dimension</label><br>
    <label><input type="checkbox" class="PhysicsProblem-useLastChapter" name="chapter[]" value="3"> 3. Vectors and Coordinate Systems</label>
  </p>

  <button class="CardsExperiment-clearChapters Button">Set/clear all</button>
</div>

<h3>About</h3>

<p>Return a random odd-numbered problem from Knight's Physics for Scientists and Engineers 3rd edition textbook.</p>


<script>

window.physicsProblems = function(){
  var chapters = [
    { chapter: 1,   page: 66,     problemsStart: 35,                        last: 57,  title: "Concepts of Motion" },
    { chapter: 2,   page: 98,     problemsStart: 27,   challengeStart: 76,  last: 83,  title: "Kinematics in One Dimension" },
    { chapter: 3,   page: 116,    problemsStart: 19,                        last: 44,  title: "Vectors and Coordinate Systems" },
    { chapter: 4,   page: 146,    problemsStart: 36,   challengeStart: 77,  last: 86,  title: "Kinematics in Two Dimensions" },
    { chapter: 5,   page: 168,    problemsStart: 28,   challengeStart: 54,  last: 57,  title: "Force and Motion" },
    { chapter: 6,   page: 198,    problemsStart: 26,   challengeStart: 72,  last: 77,  title: "Dynamics I: Motion Along a Line" },
    { chapter: 7,   page: 222,    problemsStart: 19,   challengeStart: 53,  last: 57,  title: "Newton’s Third Law" },
    { chapter: 8,   page: 246,    problemsStart: 21,   challengeStart: 59,  last: 67,  title: "Dynamics II: Motion in a Plane" },
    { chapter: 9,   page: 274,    problemsStart: 26,   challengeStart: 70,  last: 75,  title: "Impulse and Momentum" },
    { chapter: 10,  page: 306,    problemsStart: 33,   challengeStart: 67,  last: 76,  title: "Energy" },
    { chapter: 11,  page: 338,    problemsStart: 37,   challengeStart: 72,  last: 75,  title: "Work" },
    { chapter: 12,  page: 384,    problemsStart: 49,   challengeStart: 83,  last: 88,  title: "Rotation of a Rigid Body" },
    { chapter: 13,  page: 406,    problemsStart: 25,   challengeStart: 62,  last: 70,  title: "Newton’s Theory of Gravity" },
    { chapter: 14,  page: 436,    problemsStart: 30,   challengeStart: 75,  last: 80,  title: "Oscillations" },
    { chapter: 15,  page: 470,    problemsStart: 31,   challengeStart: 70,  last: 74,  title: "Fluids and Elasticity" },
    { chapter: 16,  page: 500,    problemsStart: 33,   challengeStart: 69,  last: 74,  title: "A Macroscopic Description of Matter" },
    { chapter: 17,  page: 531,    problemsStart: 31,   challengeStart: 77,  last: 82,  title: "Work, Heat, and the First Law of Thermodynamics" },
    { chapter: 18,  page: 556,    problemsStart: 37,   challengeStart: 63,  last: 65,  title: "The Micro/Macro Connection" },
    { chapter: 19,  page: 584,    problemsStart: 31,   challengeStart: 69,  last: 72,  title: "Heat Engines and Refrigerators" },
    { chapter: 20,  page: 620,    problemsStart: 40,   challengeStart: 77,  last: 82,  title: "Traveling Waves" },
    { chapter: 21,  page: 656,    problemsStart: 30,   challengeStart: 74,  last: 80,  title: "Superposition" },
    { chapter: 22,  page: 683,    problemsStart: 30,   challengeStart: 69,  last: 75,  title: "Wave Optics" },
    { chapter: 23,  page: 724,    problemsStart: 38,   challengeStart: 78,  last: 82,  title: "Ray Optics" },
    { chapter: 24,  page: 748,    problemsStart: 23,   challengeStart: 42,  last: 46,  title: "Optical Instruments" },
    { chapter: 25,  page: 780,    problemsStart: 28,   challengeStart: 72,  last: 76,  title: "Electric Charges and Forces" },
    { chapter: 26,  page: 810,    problemsStart: 28,   challengeStart: 63,  last: 71,  title: "The Electric Field" },
    { chapter: 27,  page: 840,    problemsStart: 29,   challengeStart: 55,  last: 59,  title: "Gauss’s Law" },
    { chapter: 28,  page: 868,    problemsStart: 31,   challengeStart: 74,  last: 82,  title: "The Electric Potential" },
    { chapter: 29,  page: 898,    problemsStart: 33,   challengeStart: 76,  last: 82,  title: "Potential and Field" },
    { chapter: 30,  page: 922,    problemsStart: 38,   challengeStart: 68,  last: 73,  title: "Current and Resistance" },
    { chapter: 31,  page: 950,    problemsStart: 34,   challengeStart: 75,  last: 81,  title: "Fundamentals of Circuits" },
    { chapter: 32,  page: 992,    problemsStart: 40,   challengeStart: 76,  last: 82,  title: "The Magnetic Field" },
    { chapter: 33,  page: 1032,   problemsStart: 27,   challengeStart: 79,  last: 85,  title: "Electromagnetic Induction" },
    { chapter: 34,  page: 1064,   problemsStart: 28,   challengeStart: 59,  last: 64,  title: "Electromagnetic Fields and Waves" },
    { chapter: 35,  page: 1087,   problemsStart: 35,   challengeStart: 65,  last: 71,  title: "AC Circuits" },
    { chapter: 36,  page: 1133,   problemsStart: 43,   challengeStart: 73,  last: 76,  title: "Relativity" },
    { chapter: 37,  page: 1156,   problemsStart: 25,   challengeStart: 45,  last: 48,  title: "The Foundations of Modern Physics" },
    { chapter: 38,  page: 1187,   problemsStart: 36,   challengeStart: 66,  last: 70,  title: "Quantization" },
    { chapter: 39,  page: 1210,   problemsStart: 26,   challengeStart: 47,  last: 51,  title: "Wave Functions and Uncertainty" },
    { chapter: 40,  page: 1248,   problemsStart: 22,   challengeStart: 41,  last: 46,  title: "One-Dimensional Quantum Mechanics" },
    { chapter: 41,  page: 1280,   problemsStart: 24,   challengeStart: 51,  last: 57,  title: "Atomic Physics" },
    { chapter: 42,  page: 1309,   problemsStart: 37,   challengeStart: 58,  last: 63,  title: "Nuclear Physics" }
   ];

  var userSettings = {
    chaptersToShow: [],
    useLastChapter: false,
    includeExercises: true,
    includeChallenges: true
  };

  var button = document.querySelector(".CardsExperiment-runButton");
  var toggleChaptersButton = document.querySelector(".CardsExperiment-clearChapters");
  var lastChapter = 0;

  /**
   * Show the chapter checkboxes.
   */
  function showChapters() {
    var chaptersContainter = document.querySelector(".PhysicsProblem-chapters");
    var html = "";

    for(var i=0; i< chapters.length; i++)
    {
      var chapter = chapters[i];
      html = html + '<label><input type="checkbox" class="PhysicsProblem-useLastChapter" name="chapter[]" value="' + chapter.chapter + '" onchange="physicsProblems.saveUserSetting(this)"> ' + chapter.chapter + '. ' + chapter.title + '</label><br>';
    }

    chaptersContainter.innerHTML = html;
  }

  /**
   * Shows the chapter, problem and page number to the user.
   */
  function showProblemNumber(title, chapter, problem, page) {
    var chapterElement = document.querySelector(".PhysicsProblem-chapterNumber");
    chapterElement.innerHTML = chapter + ".";

    var titleElement = document.querySelector(".PhysicsProblem-chapterTitle");
    titleElement.innerHTML = title;

    var problemElement = document.querySelector(".PhysicsProblem-problemNumber");
    problemElement.innerHTML = "Problem: " + problem;

    var pageElement = document.querySelector(".PhysicsProblem-pageNumber");
    pageElement.innerHTML = "Page: " + page;
  }

  /**
   * Returns the list of chapter to work with.
   */
  function includedChapters() {
    var chapterToShowFromLocalStorage = localStorage.includedChapters;
    var chaptersToShow = [];

    if (chapterToShowFromLocalStorage !== undefined) {
      if (chapterToShowFromLocalStorage !== "") {
        chaptersToShow = chapterToShowFromLocalStorage.split(",").map(function(x) { return Number(x); });
      }
    } else {
      chaptersToShow = includedChaptersFromHtml();
    }

    return chaptersToShow;
  }

  /**
   * Returns the list of chapter to work with.
   */
  function includedChaptersFromHtml() {
    var chapterArray =  document.getElementsByName("chapter[]");
    var chapters = [];

    for(var i=0; i< chapterArray.length; i++)
    {
      var checkbox = chapterArray[i];
      if (checkbox.checked) { chapters.push(Number(checkbox.value)); }
    }

    return chapters;
  }

  function toggleChapters() {
    var chapterArray =  document.getElementsByName("chapter[]");
    var value = !chapterArray[0].checked;

    for(var i=0; i< chapterArray.length; i++)
    {
      var checkbox = chapterArray[i];
      checkbox.checked = value;
    }

    saveUserSetting();
  }

  function updateIncludedChaptersCheckboxes() {
    var chapterArray =  document.getElementsByName("chapter[]");

    for(var i=0; i< userSettings.chaptersToShow.length; i++)
    {
      var chapter = userSettings.chaptersToShow[i];
      var checkbox = chapterArray[chapter-1];
      checkbox.checked = true;
    }
  }

  function loadUserSetting() {
    userSettings.chaptersToShow = includedChapters();
    updateIncludedChaptersCheckboxes();

    // User last chapter
    var useLastChapterElement = document.querySelector(".PhysicsProblem-useLastChapter");
    if (localStorage.useLastChapter !== undefined) {
      userSettings.useLastChapter = localStorage.useLastChapter === 'true';
    }
    useLastChapterElement.checked = userSettings.useLastChapter;

    // Include exercises
    var includeExercisesElement = document.querySelector(".PhysicsProblem-includeExercises");
    if (localStorage.includeExercises !== undefined) {
      userSettings.includeExercises = localStorage.includeExercises === 'true';
    }
    includeExercisesElement.checked = userSettings.includeExercises;

    // Include challenges
    var includeChallengesElement = document.querySelector(".PhysicsProblem-includeChallenges");
    if (localStorage.includeChallenges !== undefined) {
      userSettings.includeChallenges = localStorage.includeChallenges === 'true';
    }
    includeChallengesElement.checked = userSettings.includeChallenges;
  }

  function saveUserSetting() {
    userSettings.chaptersToShow = includedChaptersFromHtml();
    localStorage.includedChapters = userSettings.chaptersToShow;

    var useLastChapterElement = document.querySelector(".PhysicsProblem-useLastChapter");
    userSettings.useLastChapter = useLastChapterElement.checked;
    localStorage.useLastChapter = userSettings.useLastChapter;

    var includeExercisesElement = document.querySelector(".PhysicsProblem-includeExercises");
    userSettings.includeExercises = includeExercisesElement.checked;
    localStorage.includeExercises = userSettings.includeExercises;

    var includeChallengesElement = document.querySelector(".PhysicsProblem-includeChallenges");
    userSettings.includeChallenges = includeChallengesElement.checked;
    localStorage.includeChallenges = userSettings.includeChallenges;
  }

  /**
   * Shows a random problem.
   */
  function pickRandomProblem() {
    var title = "Please select chapters",
      chapter = 0,
      problem = 0,
      page = 0;

    var chaptersToShow = userSettings.chaptersToShow;

    if (chaptersToShow.length > 0) {
      var chapterIndex = Math.floor(Math.random() * chaptersToShow.length);
      chapter = chaptersToShow[chapterIndex];
      if (userSettings.useLastChapter && lastChapter > 0) { chapter = lastChapter; }
      lastChapter = chapter;
    }

    chapters.map( function(item) {
      if (item.chapter === chapter) {
        var firstProblem = 1;
        var lastProblem = item.last;

        if (!userSettings.includeChallenges && item.challengeStart !== undefined) { lastProblem = item.challengeStart - 1; }
        if (!userSettings.includeExercises) { firstProblem = item.problemsStart; }
        console.log("First: " + firstProblem + " last: " + lastProblem);


        problem = Math.floor(Math.random() * lastProblem) + firstProblem;
        if (problem % 2 === 0) { // An even problem, we need only odd ones
          if (problem === firstProblem) {
            problem = problem + 1;
          } else {
            problem = problem - 1;
          }
        }

        page = item.page;
        title = item.title;
      }
    });

    showProblemNumber(title, chapter, problem, page);
  }

  button.onclick = pickRandomProblem;
  toggleChaptersButton.onclick = toggleChapters;

  showChapters();
  loadUserSetting();

  return {
    saveUserSetting: saveUserSetting
  };
}();


</script>
