import { main } from './main.js';

var expect = chai.expect;

describe('main', () => {
  beforeEach(function () {
    document.querySelector('.TestFixture').innerHTML = `
      <textarea class="ToyRobot-input" placeholder="Enter your commands here"></textarea>
      <button class="ToyRobot-submitButton">Submit</button>
      <div class="ToyRobot-log" />
      <div class="ToyRobot-table" />
    `;
  });

  afterEach(function () {
    document.querySelector('.TestFixture').innerHTML = "";
  });

  it('runs simulation', () => {
    let importElement = document.querySelector(".ToyRobot-input");
    importElement.value = `PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT`;

    main(5, 5);

    let submitButton = document.querySelector(".ToyRobot-submitButton");
    submitButton.onclick.call(submitButton);

    let logElement = document.querySelector(".ToyRobot-log");
    expect(logElement.innerHTML).to.include("3,3,NORTH<br>");
  });
});
