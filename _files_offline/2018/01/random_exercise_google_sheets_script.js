/**
* Generates JSON for the textbook chapters.
* Used for "Random Exercise" page:
*   http://evgenii.com/files/2017/11/random_physics/
*/
function generateData() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = SpreadsheetApp.getActiveSheet()
  var data = getData(sheet);
  var jsonData = JSON.stringify(data);

  var sheetName = 'Data';
  var jsonSheet = spreadsheet.getSheetByName(sheetName);
  if (jsonSheet) {
    jsonSheet.clear();
    jsonSheet.activate();
  } else {
    jsonSheet =
        spreadsheet.insertSheet(sheetName, spreadsheet.getNumSheets());
  }

  spreadsheet.appendRow([jsonData]);
  SpreadsheetApp.flush();
}

function getData(sheet) {
  var title = "";
  var sheetData = sheet.getDataRange().getValues();

  var data = {
    bookTitle: SpreadsheetApp.getActive().getName(),
    chapters: []
  };

  var chapter = null;

  for (var i = 2; i <= sheetData.length; i++) {
    var title = getByName(sheet, sheetData, "Chapter", i);

    if (title) {
      chapter = {
        title: title,
        page: null,
        exercises: []
      };

      chapter.page = getByName(sheet, sheetData, "Page", i);
      data.chapters.push(chapter)
    } else {
      if (isBlank(chapter.page)) {
        chapter.page = getByName(sheet, sheetData, "Page", i);
      }

      var exercise = chapterExerciseJson(sheet, i, sheetData);
      chapter.exercises.push(exercise);
    };
  }
  return data;
}

/**
* Returns true if text is a blank string or not a string
*/
function isBlank(text) {
  if (text === null) return true;
  if (text === undefined) return true;
  text = "" + text;
  if (text.trim().length === 0) return true;
  return false;
}

/**
* Returns JSON for a single exercise group
*/
function chapterExerciseJson(sheet, row, data) {
  var exercise = {
    type: null,
    page: null,
    answerPage: null,
    first: null,
    last: null,
    showEvenProblems: false,
    sections: null
  };

  exercise.type = getByName(sheet, data, "Problem type", row);
  exercise.page = getByName(sheet, data, "Page", row);
  exercise.answerPage = getByName(sheet, data, "Answer page", row);
  exercise.first = getByName(sheet, data, "First exercise", row);
  exercise.last = getByName(sheet, data, "Last exercise", row);

  exercise.sections = parseSections(getByName(sheet, data, "Sections", row));

  var showEvenProblems = getByName(sheet, data, "Show even problems", row);
  if (showEvenProblems && showEvenProblems !== "") { exercise.showEvenProblems = true; }

  return exercise;
}

/**
* Parses the sections for the exercise and returns an object.
* For example, for the input text argument:
*   "2: a-c; 4: a-d"
* the function returns:
*    {"2":["a", "b", "c"], "4": ["a", "b", "c", "d"]},
* where the keys are the exercise numbers and the values are the list of sections: "a", "b", "c" etc.
*/
function parseSections(text) {
  if (isBlank(text)) return null;
  if (typeof text !== "string") return null;

  var sectionsObject = {};

  // Parse exercises
  var exercises = text.split(";")

  for(var i=0; i < exercises.length; i++) {
    var exercise = exercises[i].trim();
    var exerciseSections = exercise.split(":");
    if (exerciseSections.length !== 2) continue;

    var exerciseNumber = exerciseSections[0].trim();
    var sections = exerciseSections[1].trim();

    var firstAndLastSections = sections.split("-");
    if (firstAndLastSections.length !== 2) continue;

    var charCodeStart = firstAndLastSections[0].charCodeAt(0);
    var charCodeEnd = firstAndLastSections[1].charCodeAt(0);

    var sections = [];

    for(var charCode = charCodeStart; charCode <= charCodeEnd; charCode++) {
      var character = String.fromCharCode(charCode);
      sections.push(character);
    }

    sectionsObject[exerciseNumber] = sections;
  }

  return sectionsObject;
}


/**
 * Get cell by column name and row number
*/
function getByName(sheet, data, colName, row) {
  var col = data[0].indexOf(colName);
  if (col != -1) {
    return data[row-1][col];
  }
}

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Generate Data', functionName: 'generateData'}
  ];
  spreadsheet.addMenu('Random Problem', menuItems);
}