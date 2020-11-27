// Show the table with the robot

/**
 * Draw the table with the robot on screen.
 *
 * @param  {object} state   Simulation state.
 */
export function draw(state) {
  // Set the CSS variables for the number of rows and columns
  document.documentElement.style.setProperty("--colNum", state.xMax + 1);
  document.documentElement.style.setProperty("--rowNum", state.yMax + 1);

  let tableElement = document.querySelector(".ToyRobot-table");
  let totalCells = (state.xMax + 1) * (state.yMax + 1);
  let cellHtml = "<div class='ToyRobot-tableCell'></div>";

  if (state.x === null) {
    // No robot -> show empty table
    tableElement.innerHTML = cellHtml.repeat(totalCells);
  } else {
    // Robot: exists
    // Show it on the board

    // Number of cells before and after robot
    let cellsAfter = state.y * (state.xMax + 1) + state.xMax - state.x;
    let cellsBefore = totalCells - cellsAfter - 1;

    tableElement.innerHTML = '';

    // Show empty cells before robot
    tableElement.innerHTML = cellHtml.repeat(cellsBefore);

    let direction = `ToyRobot-robotFace-${state.direction}`;

    // Cell with the robot
    tableElement.innerHTML += `<div class='ToyRobot-tableCell'>
  <img class='ToyRobot-robot ${direction}' src='./images/robot.svg' />
  </div>`;

    // Empty cells after robot
    tableElement.innerHTML += cellHtml.repeat(cellsAfter);
  }
}
