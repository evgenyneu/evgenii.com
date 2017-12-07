/**
* This is a google script that works with a spreadsheet.
* https://docs.google.com/spreadsheets/d/1M86Y-F5aAxi07ULqfAtCAh4NGSL6tXBa1N8Fvd6jf3E/edit?usp=sharing
*
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
        exercises: []
      };

      data.chapters.push(chapter)
    } else {
      var exercise = chapterExerciseJson(sheet, i, sheetData);
      chapter.exercises.push(exercise);
    };
  }
  return data;
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
    last: null
  };

  exercise.type = getByName(sheet, data, "Problem type", row);
  exercise.page = getByName(sheet, data, "Page", row);
  exercise.answerPage = getByName(sheet, data, "Answer page", row);
  exercise.first = getByName(sheet, data, "First exercise", row);
  exercise.last = getByName(sheet, data, "Last exercise", row);
  return exercise;
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