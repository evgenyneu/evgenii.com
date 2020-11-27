// User interface of the simulation.

/**
 * Init user interface of the simulation
 *
 * @param  {function} onClick Function that is called when user submits
 *                            commands. Functions takes single argument which
 *                            is the text of the commands.
 */
export function init(onClick) {
  let submitButton = document.querySelector(".ToyRobot-submitButton");
  let inputElement = document.querySelector(".ToyRobot-input");
  submitButton.onclick = () => onClick(inputElement.value);
}


/**
 * Shows output on screen
 *
 * @param  {object} output Array of text output strings to be shown.
 */
export function appendToLog(output) {
  let logElement = document.querySelector(".ToyRobot-log");

  output.forEach((text) => {
    logElement.innerHTML = text + '<br>' + logElement.innerHTML;
  });
}
