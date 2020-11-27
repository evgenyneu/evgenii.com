import {
  appendToLog
} from './ui.js';

var expect = chai.expect;

describe('appendToLog', () => {
  beforeEach(function () {
    document.querySelector('.TestFixture').innerHTML = `
      <textarea class="ToyRobot-input" placeholder="Enter your commands here"></textarea>
      <button class="ToyRobot-submitButton">Submit</button>
      <div class="ToyRobot-log" />
    `;
  });

  afterEach(function () {
    document.querySelector('.TestFixture').innerHTML = "";
  });

  it('appends', () => {
    appendToLog(['one', 'two']);

    let logElement = document.querySelector(".ToyRobot-log");
    expect(logElement.innerHTML).to.include("two<br>one<br>");
  });
});
