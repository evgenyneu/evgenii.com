import {
  processInput,
  processCommand,
  place,
  move,
  left,
  right,
  report
} from './logic.js';

var expect = chai.expect;

describe('processInput', () => {
  describe('correct', () => {
    it('test 1', () => {
      var state = {x: null, y: null, direction: null, xMax: 4, yMax: 4};

      let result = processInput(state, `PLACE 0,0,NORTH
MOVE
REPORT`);

      expect(result.length).to.equal(1);
      expect(result[0]).to.equal("0,1,NORTH");
    });

    it('test 2', () => {
      var state = {x: null, y: null, direction: null, xMax: 4, yMax: 4};

      let result = processInput(state, `PLACE 0,0,NORTH
LEFT
REPORT`);

      expect(result.length).to.equal(1);
      expect(result[0]).to.equal("0,0,WEST");
    });

    it('test 3', () => {
      var state = {x: null, y: null, direction: null, xMax: 4, yMax: 4};

      let result = processInput(state, `PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT`);

      expect(result.length).to.equal(1);
      expect(result[0]).to.equal("3,3,NORTH");
    });
  });
});

describe('processCommand incorrect', () => {
  describe('incorrect command', () => {
    it('unknown', () => {
      let result = processCommand({}, 'jump');
      expect(result).to.equal("Unknown command 'jump'");
    });

    it('empty', () => {
      let result = processCommand({}, '');
      expect(result).to.equal("No command is given");
    });

    it('blank', () => {
      let result = processCommand({}, '  ');
      expect(result).to.equal("No command is given");
    });
  });

  describe('correct', () => {
    it('place', () => {
      var state = {};
      let result = processCommand(state, 'PLACE 2,3,NORTH');
      expect(result).to.equal(null);
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('north');
    });

    it('move', () => {
      var state = {x: 2, y: 3, direction: 'west', xMax: 4, yMax: 6};
      let result = processCommand(state, 'MOVE');
      expect(result).to.equal(null);
      expect(state.x).to.equal(1);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('west');
    });

    it('left', () => {
      var state = {x: 2, y: 3, direction: 'west', xMax: 4, yMax: 6};
      let result = processCommand(state, 'LEFT');
      expect(result).to.equal(null);
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('south');
    });

    it('right', () => {
      var state = {x: 2, y: 3, direction: 'west', xMax: 4, yMax: 6};
      let result = processCommand(state, 'RIGHT');
      expect(result).to.equal(null);
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('north');
    });

    it('report', () => {
      var state = {x: 2, y: 3, direction: 'west', xMax: 4, yMax: 6};
      let result = processCommand(state, 'REPORT');
      expect(result).to.equal('2,3,WEST');
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('west');
    });

    it('command with spaces', () => {
      var state = {x: 2, y: 3, direction: 'west', xMax: 4, yMax: 6};
      let result = processCommand(state, '   REPORT   ');
      expect(result).to.equal('2,3,WEST');
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('west');
    });
  });
});

describe('place', () => {
  describe('places', () => {
    it('places', () => {
      var state = {};
      let result = place(state, '2,3,WEST');
      expect(result).to.equal(null);
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('west');
    });

    it('with spaces', () => {
      var state = {};
      let result = place(state, '  2, 3, WEST  ');
      expect(result).to.equal(null);
      expect(state.x).to.equal(2);
      expect(state.y).to.equal(3);
      expect(state.direction).to.equal('west');
    });
  });

  describe('incorrect', () => {

    it('single word', () => {
      var state = {};
      let result = place(state, 'error');
      expect(result).to.equal("Incorrect PLACE command, should be in PLACE \
X,Y,F format, where F is EAST, WEST, NORTH or SOUTH.");

      expect(state).to.eql({});
    });

    it('undefined', () => {
      var state = {};
      let result = place(state, undefined);
      expect(result).to.equal("Incorrect PLACE command, should be in PLACE \
X,Y,F format, where F is EAST, WEST, NORTH or SOUTH.");

      expect(state).to.eql({});
    });

    it('non integer x', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, 'd,2,WEST');
      expect(result).to.equal("X position must be a number between 0 and 4");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('non integer y', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '3,a,WEST');
      expect(result).to.equal("Y position must be a number between 0 and 6");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('x exceeds maximum', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '6,2,WEST');
      expect(result).to.equal("X position must be a number between 0 and 4");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('y exceeds maximum', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '3,9,WEST');
      expect(result).to.equal("Y position must be a number between 0 and 6");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('x is negative', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '-1,2,WEST');
      expect(result).to.equal("X position must be a number between 0 and 4");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('y is negative', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '3,-1,WEST');
      expect(result).to.equal("Y position must be a number between 0 and 6");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });

    it('incorrect direction', () => {
      var state = {xMax: 4, yMax: 6};
      let result = place(state, '3,2,error');
      expect(result).to.equal("Incorrect direction 'error', must be EAST, WEST, \
NORTH or SOUTH");
      expect(state).to.eql({xMax: 4, yMax: 6});
    });
  });
});

describe('move', () => {
  it('moves north', () => {
    var state = {x: 1, y: 3, direction: 'north', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(4);
    expect(state.direction).to.equal('north');
  });

  it('moves north edge', () => {
    var state = {x: 1, y: 6, direction: 'north', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal("Reached the edge, can't move further");
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(6);
    expect(state.direction).to.equal('north');
  });

  it('moves west', () => {
    var state = {x: 1, y: 3, direction: 'west', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(0);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('west');
  });

  it('moves west edge', () => {
    var state = {x: 0, y: 3, direction: 'west', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal("Reached the edge, can't move further");
    expect(state.x).to.equal(0);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('west');
  });

  it('moves east', () => {
    var state = {x: 1, y: 3, direction: 'east', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(2);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('east');
  });

  it('moves east edge', () => {
    var state = {x: 4, y: 3, direction: 'east', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal("Reached the edge, can't move further");
    expect(state.x).to.equal(4);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('east');
  });

  it('moves south', () => {
    var state = {x: 1, y: 3, direction: 'south', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(2);
    expect(state.direction).to.equal('south');
  });

  it('moves south edge', () => {
    var state = {x: 1, y: 0, direction: 'south', xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal("Reached the edge, can't move further");
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(0);
    expect(state.direction).to.equal('south');
  });

  it('has not been placed', () => {
    var state = {x: null, y: null, direction: null, xMax: 4, yMax: 6};
    let result = move(state);
    expect(result).to.equal("Can't move because robot has not been placed yet");
    expect(state.x).to.equal(null);
    expect(state.y).to.equal(null);
    expect(state.direction).to.equal(null);
  });
});


describe('left', () => {
  it('from north', () => {
    var state = {x: 1, y: 3, direction: 'north', xMax: 4, yMax: 6};
    let result = left(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('west');
  });

  it('from west', () => {
    var state = {x: 1, y: 3, direction: 'west', xMax: 4, yMax: 6};
    let result = left(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('south');
  });

  it('from south', () => {
    var state = {x: 1, y: 3, direction: 'south', xMax: 4, yMax: 6};
    let result = left(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('east');
  });

  it('from east', () => {
    var state = {x: 1, y: 3, direction: 'east', xMax: 4, yMax: 6};
    let result = left(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('north');
  });

  it('has not been placed', () => {
    var state = {x: null, y: null, direction: null, xMax: 4, yMax: 6};
    let result = left(state);
    expect(result).to.equal("Can't turn because robot has not been placed yet");
    expect(state.x).to.equal(null);
    expect(state.y).to.equal(null);
    expect(state.direction).to.equal(null);
  });
});


describe('right', () => {
  it('from north', () => {
    var state = {x: 1, y: 3, direction: 'north', xMax: 4, yMax: 6};
    let result = right(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('east');
  });

  it('from west', () => {
    var state = {x: 1, y: 3, direction: 'west', xMax: 4, yMax: 6};
    let result = right(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('north');
  });

  it('from south', () => {
    var state = {x: 1, y: 3, direction: 'south', xMax: 4, yMax: 6};
    let result = right(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('west');
  });

  it('from east', () => {
    var state = {x: 1, y: 3, direction: 'east', xMax: 4, yMax: 6};
    let result = right(state);
    expect(result).to.equal(null);
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(3);
    expect(state.direction).to.equal('south');
  });

  it('has not been placed', () => {
    var state = {x: null, y: null, direction: null, xMax: 4, yMax: 6};
    let result = right(state);
    expect(result).to.equal("Can't turn because robot has not been placed yet");
    expect(state.x).to.equal(null);
    expect(state.y).to.equal(null);
    expect(state.direction).to.equal(null);
  });
});

describe('report', () => {
  it('reports', () => {
    var state = {x: 1, y: 3, direction: 'north'};
    let result = report(state);
    expect(result).to.equal("1,3,NORTH");
  });

  it('has not been placed', () => {
    var state = {x: null, y: null, direction: null};
    let result = report(state);
    expect(result).to.equal("Robot has not been placed yet");
  });
});
