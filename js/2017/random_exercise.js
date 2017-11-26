window.randomExercise = function(){
  "use strict";
  var userSettings = {
    chaptersToShow: [],
    useLastChapter: false,
    includeExercises: true,
    includeChallenges: true
  };

  var data = {
    name: null, // Unique name for the exercise, used for storing user setings in local storage. Ex: "stewart_calculus".
    chapters: null // Contain chapter information supplied by the user.
  };

  var button = document.querySelector(".RandomExercise-runButton");
  var toggleChaptersButton = document.querySelector(".RandomExercise-clearChapters");
  var lastChapter = 0;

  /**
   * Show the chapter checkboxes.
   */
  function showChapters() {
    var chaptersContainter = document.querySelector(".RandomExercise-chapters");
    var html = "";

    for(var i=0; i< data.chapters.length; i++)
    {
      var chapter = data.chapters[i];
      html = html + '<label><input type="checkbox" name="chapter[]" value="' + chapter.chapter + '" onchange="randomExercise.saveUserSetting(this)"> ' + chapter.chapter + '. ' + chapter.title + '</label><br>';
    }

    chaptersContainter.innerHTML = html;
  }

  /**
   * Shows the chapter, problem and page number to the user.
   */
  function showProblemNumber(title, chapter, problem, page, answer_page) {
    var chapterElement = document.querySelector(".RandomExercise-chapterNumber");
    chapterElement.innerHTML = chapter + ".";

    var titleElement = document.querySelector(".RandomExercise-chapterTitle");
    titleElement.innerHTML = title;

    var problemElement = document.querySelector(".RandomExercise-problemNumber");
    problemElement.innerHTML = "Problem: " + problem;

    var pageElement = document.querySelector(".RandomExercise-pageNumber");
    pageElement.innerHTML = "Page: " + page + ", answer: " + answer_page;
  }

  /**
   * Returns the list of chapter to work with.
   */
  function includedChapters() {
    var chapterToShowFromLocalStorage = localStorage.getItem(localStoragePrefixedKey("includedChapters"));
    var chaptersToShow = [];

    if (chapterToShowFromLocalStorage) {
      if (chapterToShowFromLocalStorage !== "") {
        chaptersToShow = chapterToShowFromLocalStorage.split(",").map(function(x) { return x; });
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
      if (checkbox.checked) { chapters.push(checkbox.value); }
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
    var useLastChapterElement = document.querySelector(".RandomExercise-useLastChapter");
    var localStorageUseLastChapter = localStorage.getItem(localStoragePrefixedKey("useLastChapter"));
    if (localStorageUseLastChapter !== undefined) {
      userSettings.useLastChapter = localStorageUseLastChapter === 'true';
    }
    useLastChapterElement.checked = userSettings.useLastChapter;

    // Include exercises
    var includeExercisesElement = document.querySelector(".RandomExercise-includeExercises");
    var localStorageIncludeExercises = localStorage.getItem(localStoragePrefixedKey("includeExercises"));
    if (localStorageIncludeExercises !== undefined) {
      userSettings.includeExercises = localStorageIncludeExercises === 'true';
    }
    includeExercisesElement.checked = userSettings.includeExercises;

    // Include challenges
    var includeChallengesElement = document.querySelector(".RandomExercise-includeChallenges");
    var localStorageIncludeChallenge = localStorage.getItem(localStoragePrefixedKey("includeChallenges"));
    if (localStorageIncludeChallenge !== undefined) {
      userSettings.includeChallenges = localStorageIncludeChallenge === 'true';
    }
    includeChallengesElement.checked = userSettings.includeChallenges;
  }

  function localStoragePrefixedKey(name) {
    return data.name + "_" + name;
  }

  function saveUserSetting() {
    userSettings.chaptersToShow = includedChaptersFromHtml();
    localStorage.setItem(localStoragePrefixedKey("includedChapters"), userSettings.chaptersToShow);

    var useLastChapterElement = document.querySelector(".RandomExercise-useLastChapter");
    userSettings.useLastChapter = useLastChapterElement.checked;
    localStorage.setItem(localStoragePrefixedKey("useLastChapter"), userSettings.useLastChapter);

    var includeExercisesElement = document.querySelector(".RandomExercise-includeExercises");
    userSettings.includeExercises = includeExercisesElement.checked;
    localStorage.setItem(localStoragePrefixedKey("includeExercises"), userSettings.includeExercises);

    var includeChallengesElement = document.querySelector(".RandomExercise-includeChallenges");
    userSettings.includeChallenges = includeChallengesElement.checked;
    localStorage.setItem(localStoragePrefixedKey("includeChallenges"), userSettings.includeChallenges);
  }

  /**
   * Shows a random problem.
   */
  function pickRandomProblem() {
    var title = "Please select chapters",
      chapter = 0,
      problem = 0,
      page = 0,
      answer_page = 0;

    var chaptersToShow = userSettings.chaptersToShow;

    if (chaptersToShow.length > 0) {
      var chapterIndex = Math.floor(Math.random() * chaptersToShow.length);
      chapter = chaptersToShow[chapterIndex];
      if (userSettings.useLastChapter && lastChapter > 0) { chapter = lastChapter; }
      lastChapter = chapter;
    }

    data.chapters.map( function(item) {
      if (item.chapter === chapter) {
        var firstProblem = 1;
        var lastProblem = item.last;

        if (!userSettings.includeChallenges && item.challengeStart !== undefined) { lastProblem = item.challengeStart - 1; }
        if (!userSettings.includeExercises) { firstProblem = item.problemsStart; }

        problem = Math.floor(Math.random() * lastProblem) + firstProblem;
        if (problem % 2 === 0) { // An even problem, we need only odd ones
          if (problem === firstProblem) {
            problem = problem + 1;
          } else {
            problem = problem - 1;
          }
        }

        page = item.page;
        answer_page = item.answer_page;
        title = item.title;
      }
    });

    showProblemNumber(title, chapter, problem, page, answer_page);
  }

  /**
    Initializes the exercises.
      name: unique name of the exercises used for saving user checkbox choises in HTMl storage. Ex: "stewart_calculus".
      chapters: the chapter data for the textbook.
  */
  function init(name, chapters) {
    data.name = name;
    data.chapters = chapters;
    button.onclick = pickRandomProblem;
    toggleChaptersButton.onclick = toggleChapters;

    showChapters();
    loadUserSetting();
  }

  return {
    saveUserSetting: saveUserSetting,
    init: init
  };
}();