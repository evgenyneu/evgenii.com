window.randomExercise = function(){
  "use strict";
  var userSettings = {
    chaptersToShow: [],
    useLastChapter: false,
    includeExercises: true,
    includeChallenges: true
  };

  var data = {
    bookTitle: null, // Unique title for the exercise, used for storing user setings in local storage. Ex: "Calculus Stewart 3ed".
    chapters: null // Contain chapter information supplied by the user.
  };

  var button = document.querySelector(".RandomExercise-runButton");
  var toggleChaptersButton = document.querySelector(".RandomExercise-clearChapters");
  var lastChapter = 0;

  function showBookTitle(title) {
    var titleElement = document.querySelector(".RandomExercise-bookTitle");
    titleElement.innerHTML = title;
  }

  /**
    Massage exercises for further use.
  */
  function massageExercises() {
    for(var i=0; i < data.chapters.length; i++)
    {
      var chapter = data.chapters[i];

      if (chapter.exercises !== undefined) {
        for(var j=0; j < chapter.exercises.length; j++)
        {
          var exercise = chapter.exercises[j];
          exercise.chapterId = i;
          exercise.chapterTitle = chapter.title;
        }
      } else {
        // There are no exercises, create one
        var newExercise = {
          type: "Normal",
          page: chapter.page,
          answerPage: chapter.answerPage,
          first: chapter.first,
          last: chapter.last,
          chapterId: i,
          chapterTitle: chapter.title
        };

        chapter.exercises = [newExercise];
      }
    }
  }

  /**
   * Show exercise types.
   */
  function showExerciseTypes() {
    var types = getExerciseTypes();
    var html = "";

    for(var i=0; i < types.length; i++)
    {
      var type = types[i];
      html = html + '<label><input type="checkbox" name="exercise[]" data-type="' + type + '" onchange="randomExercise.saveUserSetting(this)" checked> ' + type + '</label><br>';
    }

    var containter = document.querySelector(".RandomExercise-execriceTypes");
    if (containter === null) { return; }
    containter.innerHTML = html;
  }

  /**
    Returns a list of exercise types supplied by the user.
  */
  function getExerciseTypes() {
    var types = [];

    for(var i=0; i < data.chapters.length; i++)
    {
      var chapter = data.chapters[i];
      if (chapter.exercises === undefined) { continue; }

      for(var j=0; j < chapter.exercises.length; j++)
      {
        var type = chapter.exercises[j].type;

        if (types.indexOf(type) === -1) {
          types.push(type);
        }
      }
    }

    return types;
  }

  /**
   * Show the chapter checkboxes.
   */
  function showChapters() {
    var html = "";

    for(var i=0; i < data.chapters.length; i++)
    {
      var chapter = data.chapters[i];
      html = html + '<label><input type="checkbox" name="chapter[]" data-chapterId="' + i + '" onchange="randomExercise.saveUserSetting(this)" checked> ' + chapter.title + '</label><br>';
    }

    var chaptersContainter = document.querySelector(".RandomExercise-chapters");
    chaptersContainter.innerHTML = html;
  }

  /**
   * Shows the chapter, problem and page number to the user.
   */
  function showProblem(title, problem, type, page, answerPage) {
    var titleElement = document.querySelector(".RandomExercise-chapterTitle");
    titleElement.innerHTML = title;

    var problemElement = document.querySelector(".RandomExercise-problemNumber");
    problemElement.innerHTML = "Problem: " + problem;

    var pageElement = document.querySelector(".RandomExercise-pageNumber");
    pageElement.innerHTML = "Page: " + page;

    var answerPageElement = document.querySelector(".RandomExercise-answerPageNumber");
    answerPageElement.innerHTML = "Answer page: " + answerPage;

    if (type !== "" && type !== "Normal") {
      problemElement.innerHTML += " (" + type + ")";
    }
  }

  /**
   * Returns the list of chapter to work with.
   */
  function includedChapters() {
    var chapterToShowFromLocalStorage = localStorage.getItem(localStoragePrefixedKey("includedChapters"));
    var chaptersToShow = [];

    if (chapterToShowFromLocalStorage !== null) {
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
      if (checkbox.checked) { chapters.push(Number(checkbox.getAttribute('data-chapterId'))); }
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
    clearCheckboxes("chapter[]");
    var chapterArray =  document.getElementsByName("chapter[]");

    for(var i=0; i< userSettings.chaptersToShow.length; i++)
    {
      var chapter = userSettings.chaptersToShow[i];

      for(var j=0; j< chapterArray.length; j++)
      {
        var checkbox = chapterArray[j];
        if (Number(checkbox.getAttribute('data-chapterId')) === chapter) {
          checkbox.checked = true;
          break;
        }
      }
    }
  }

  function clearCheckboxes(name) {
    var checkboxes =  document.getElementsByName(name);

    for(var j=0; j< checkboxes.length; j++)
    {
      checkboxes[j].checked = false;
    }
  }

  function updateIncludedExerciseTypesCheckboxes() {
    clearCheckboxes("exercise[]");
    var checkboxes =  document.getElementsByName("exercise[]");

    for(var i=0; i< userSettings.includedExerciseTypes.length; i++)
    {
      var type = userSettings.includedExerciseTypes[i];

      for(var j=0; j< checkboxes.length; j++)
      {
        var checkbox = checkboxes[j];
        if (checkbox.getAttribute('data-type') === type) {
          checkbox.checked = true;
          break;
        }
      }
    }
  }

  function loadUserSetting() {
    userSettings.chaptersToShow = includedChapters();
    updateIncludedChaptersCheckboxes();

    userSettings.includedExerciseTypes = includedExerciseTypes();
    updateIncludedExerciseTypesCheckboxes();

    // Use last chapter
    var useLastChapterElement = document.querySelector(".RandomExercise-useLastChapter");
    var localStorageUseLastChapter = localStorage.getItem(localStoragePrefixedKey("useLastChapter"));
    if (localStorageUseLastChapter) {
      userSettings.useLastChapter = localStorageUseLastChapter === 'true';
    }
    useLastChapterElement.checked = userSettings.useLastChapter;
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

    userSettings.includedExerciseTypes = includedExerciseTypesFromHtml();
    localStorage.setItem(localStoragePrefixedKey("includedExerciseTypes"), userSettings.includedExerciseTypes);
  }

  /**
   * Returns the list of exercise types to work with.
   */
  function includedExerciseTypes() {
    var execriceTypesToShowFromLocalStorage = localStorage.getItem(localStoragePrefixedKey("includedExerciseTypes"));
    var typesToShow = [];

    if (execriceTypesToShowFromLocalStorage !== null) {
      if (execriceTypesToShowFromLocalStorage !== "") {
        typesToShow = execriceTypesToShowFromLocalStorage.split(",").map(function(x) { return x; });
      }
    } else {
      typesToShow = includedExerciseTypesFromHtml();
    }

    return typesToShow;
  }

  /**
   * Returns the list of selected exercise types.
   */
  function includedExerciseTypesFromHtml() {
    var typesArray =  document.getElementsByName("exercise[]");
    var types = [];

    if (typesArray.length === 0) {
      // No exercise boxes are show, always select default exercises.
      return ["Normal"];
    }

    for(var i=0; i< typesArray.length; i++)
    {
      var checkbox = typesArray[i];
      if (checkbox.checked) { types.push(checkbox.getAttribute('data-type')); }
    }

    return types;
  }

  /**
    Returns a list of exercises that will be used to select a random exercise from.
  */
  function getExercisesToShow() {
    var chaptersToShow = userSettings.chaptersToShow;
    if (userSettings.useLastChapter && lastChapter > 0) { chaptersToShow = [lastChapter]; }
    var selectedTypes = userSettings.includedExerciseTypes;
    var exercises = [];

    for(var i=0; i < chaptersToShow.length; i++)
    {
      var chapter = data.chapters[chaptersToShow[i]];

      for(var j=0; j < chapter.exercises.length; j++)
      {
        var exercise = chapter.exercises[j];
        var type = exercise.type;

        if (selectedTypes.indexOf(type) !== -1) {
          exercises.push(exercise);
        }
      }
    }

    return exercises;
  }

  /**
   * Shows a random problem.
   */
  function pickRandomProblem() {
    var title = "Please select chapters",
      problem = 0,
      page = 0,
      answerPage = 0,
      type = "";

    var exercisesToShow = getExercisesToShow();

    if (exercisesToShow.length > 0) {
      // Pick a random exercise
      var exerciseIndex = Math.floor(Math.random() * exercisesToShow.length);
      var exercise = exercisesToShow[exerciseIndex];

      // Pick a random exercise number
      problem = Math.floor(Math.random() * (exercise.last - exercise.first + 1)) + exercise.first;

      if (problem % 2 === 0) { // An even problem, we need only odd ones
        if (problem === exercise.first) {
          problem = problem + 1;
        } else {
          problem = problem - 1;
        }
      }

      lastChapter = exercise.chapterId;
      page = exercise.page;
      answerPage = exercise.answerPage;
      title = exercise.chapterTitle;
      type = exercise.type;
    }

    showProblem(title, problem, type, page, answerPage);
  }

  /**
    Initializes the exercises.
  */
  function init(dataIn) {
    data = dataIn;
    data.name = data.bookTitle;
    data.chapters = data.chapters;
    button.onclick = pickRandomProblem;
    toggleChaptersButton.onclick = toggleChapters;

    showBookTitle(data.bookTitle);
    massageExercises();
    showExerciseTypes();
    showChapters();
    loadUserSetting();
  }

  return {
    saveUserSetting: saveUserSetting,
    init: init
  };
}();