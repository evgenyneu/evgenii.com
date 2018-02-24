/*

Ridiculous strawberry picking game

http://evgenii.com/blog/ridiculous-strawberry-picking/

License: Public Domain

Image credits
=============

1. "The Blue Marble" By  NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans. Sources: http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg, https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg

2. "The Sun photographed at 304 angstroms" by NASA/SDO (AIA). Sources: http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg, https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg

*/
(function(){
// A Slider UI element
function SickSlider(sliderElementSelector) {
  var that = {
    // A function that will be called when user changes the slider position.
    // The function will be passed the slider position: a number between 0 and 1.
    onSliderChange: null,
    // Store the previous slider value in order to prevent calling onSliderChange function with the same argument
    previousSliderValue: -42,
    // Does not react to user input when false
    enabled: true,
    didRequestUpdateOnNextFrame: false
  };

  // Initializes the slider element
  //
  // Arguments:
  //   sliderElementSelector: A CSS selector of the SickSlider element.
  that.init = function(sliderElementSelector) {
    that.slider = document.querySelector(sliderElementSelector);
    that.sliderHead = that.slider.querySelector(".SickSlider-head");
    var sliding = false;

    // Start dragging slider
    // -----------------

    that.slider.addEventListener("mousedown", function(e) {
      sliding = true;
      that.updateHeadPositionOnTouch(e);
    });

    that.slider.addEventListener("touchstart", function(e) {
      sliding = true;
      that.updateHeadPositionOnTouch(e);
    });

    that.slider.onselectstart = function () { return false; };

    // End dragging slider
    // -----------------

    document.addEventListener("mouseup", function(){
      sliding = false;
    });

    document.addEventListener("dragend", function(){
      sliding = false;
    });

    document.addEventListener("touchend", function(e) {
      sliding = false;
    });

    // Drag slider
    // -----------------

    document.addEventListener("mousemove", function(e) {
      if (!sliding) { return; }
      that.updateHeadPositionOnTouch(e);
    });

    document.addEventListener("touchmove", function(e) {
      if (!sliding) { return; }
      that.updateHeadPositionOnTouch(e);
    });

    that.slider.addEventListener("touchmove", function(e) {
      if (typeof e.preventDefault !== 'undefined' && e.preventDefault !== null) {
        e.preventDefault(); // Prevent screen from sliding on touch devices when the element is dragged.
      }
    });
  };

  // Returns the slider value (a number form 0 to 1) from the cursor position
  //
  // Arguments:
  //
  //   e: a touch event.
  //
  that.sliderValueFromCursor = function(e) {
    var pointerX = e.pageX;

    if (e.touches && e.touches.length > 0) {
      pointerX = e.touches[0].pageX;
    }

    pointerX = pointerX - that.slider.offsetLeft;
    var headLeft = (pointerX - 16);
    if (headLeft < 0) { headLeft = 0; }

    if ((headLeft + that.sliderHead.offsetWidth) > that.slider.offsetWidth) {
      headLeft = that.slider.offsetWidth - that.sliderHead.offsetWidth;
    }

    // Calculate slider value from head position
    var sliderWidthWithoutHead = that.slider.offsetWidth - that.sliderHead.offsetWidth;
    var sliderValue = 1;

    if (sliderWidthWithoutHead !== 0) {
      sliderValue = headLeft / sliderWidthWithoutHead;
    }

    return sliderValue;
  };

  // Changes the position of the slider
  //
  // Arguments:
  //
  //   sliderValue: a value between 0 and 1.
  //
  that.changePosition = function(sliderValue) {
    var headLeft = (that.slider.offsetWidth - that.sliderHead.offsetWidth) * sliderValue;
    that.sliderHead.style.left = headLeft + "px";
  };

  // Update the slider position and call the callback function
  //
  // Arguments:
  //
  //   e: a touch event.
  //
  that.updateHeadPositionOnTouch = function(e) {
    if (!that.enabled) { return; }
    var sliderValue = that.sliderValueFromCursor(e);

    // Handle the head change only if it changed significantly (more than 0.1%)
    if (Math.round(that.previousSliderValue * 1000) === Math.round(sliderValue * 1000)) { return; }
    that.previousSliderValue = sliderValue;

    if (!that.didRequestUpdateOnNextFrame) {
      // Update the slider on next redraw, to improve performance
      that.didRequestUpdateOnNextFrame = true;
      window.requestAnimationFrame(that.updateOnFrame);
    }
  };

  that.updateOnFrame = function() {
    that.changePosition(that.previousSliderValue);

    if (that.onSliderChange) {
      that.onSliderChange(that.previousSliderValue);
    }

    that.didRequestUpdateOnNextFrame = false;
  };

  that.init(sliderElementSelector);

  return that;
}

// Show debug messages on screen
var debug = (function(){
  var debugOutput = document.querySelector(".EarthOrbitSimulation-debugOutput");

  function print(text) {
    var date = new Date();
    debugOutput.innerHTML = text + " " + date.getMilliseconds();
  }

  return {
    print: print
  };
})();

// Shows the current date on screen
var simulationTime = (function(){
  var startYear = 1997,
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    secondsSinceStartYear = (31 /*jan*/ +
      28 /*feb*/ +
      31 /*mar*/ +
      30 /*apr*/ +
      31 /*may*/ +
      30 /*jun*/ +
      31 /*jul*/ +
      31 /*aug*/ +
      30 /*sep*/ +
      23 /*oct*/) * 24 * 3600 +
    12 * 3600 /*noon*/,
    numberOfSimulatedSecondsSinceStart = secondsSinceStartYear, // Seconds since the start of the simulations,
    updateCycle = -1, // Used to limit the number of climate calculations, in order to improve performance
    secondsInSiderealYear = 365.242189 * 24 * 3600, // The length of the sidereal year for the Earth, in seconds
    timeElement = document.querySelector(".EarthOrbitSimulation-time"),
    previousTime = "";

  // The function is called on each frame, which is 60 time per second
  function update() {
    if (physics.state.paused) { return; }

    numberOfSimulatedSecondsSinceStart += physics.constants.timeIncrementPerFrameInSeconds;

    updateCycle += 1;
    if (updateCycle > 5) { updateCycle = 0; }
    if (updateCycle !== 0) { return; } // Update climate only once in 10 cycles, to improve performance

    var yearsSinceStart = Math.floor(numberOfSimulatedSecondsSinceStart / secondsInSiderealYear);
    var year = startYear + yearsSinceStart;
    var secondsSinceYearStart = (numberOfSimulatedSecondsSinceStart % secondsInSiderealYear);
    var monthId = Math.floor(secondsSinceYearStart / secondsInSiderealYear * 12);
    var monthName = monthNames[monthId];
    showTime(year, monthName);
  }

  function showTime(year, month) {
    var text = month + " " + year;
    if (text === previousTime) { return; }
    timeElement.innerHTML = text;
    previousTime = text;
  }

  function reset() {
    numberOfSimulatedSecondsSinceStart = secondsSinceStartYear;
  }

  return {
    reset: reset,
    update: update
  };
})();

// Calculates the average global temperature on Earth
var climate = (function() {
  var initialTemperatureCelsius = 16,
    currentTemperatureCelsius = initialTemperatureCelsius,
    updateCycle = -1, // Used to limit the number of climate calculations, in order to improve performance
    previouslyDisplayedTemperature = 0, // Stores the previously display temperature
    temperatureElement = document.querySelector(".EarthOrbitSimulation-temperatureValue"),
    temperatureDescriptionElement = document.querySelector(".EarthOrbitSimulation-temperatureDescription"),

    // The number of cycles for Earth to survive in extreme cold or hot conditions.
    maxNumberOfExtremeCyclesToSurvive = 5,

    // The  number of cycles that Earth has been under extreme cold or hot conditions.
    cyclesUnderExtremeConditions = 0;

  function update(earthSunDistanceMeters, habitableZoneInnerDistanceMeters, habitableZoneOuterDistanceMeters) {
    if (physics.state.paused) { return; }

    if (isEarthDead()) {
      physics.state.paused = true;

      var message =  "High global temperature caused some of the water to evaporate and create a runaway greenhouse effect. The temperature rose even higher, and all animal species living on the surface of the planet have become extinct.";

      if (currentTemperatureCelsius < 10) {
        if (physics.currentSunMassRatio() === 0) { // Sun has been removed
          message = "The absence of the Sun caused the shutdown of photosynthesis in plants and other organisms. All animal species living on the surface of the planet have become extinct.";
        } else {
          message = "Low global temperature caused the shutdown of photosynthesis in plants and other organisms. All animal species living on the surface of the planet have become extinct.";
        }
      }

      gameoverMessage.show(message);
      return;
    }

    updateCycle += 1;
    if (updateCycle > 30) { updateCycle = 0; }
    if (updateCycle !== 0) { return; } // Update climate only once in 100 cycles, to improve performance

    var tempChange = 0; // Change in temperature degrees

    if (earthSunDistanceMeters < habitableZoneInnerDistanceMeters) {
      // Earth is heating
      tempChange = Math.ceil(habitableZoneInnerDistanceMeters / earthSunDistanceMeters) ;
      if (tempChange > 3) { tempChange = 3; }
      if (tempChange === 0) { tempChange = 1; }
    } else if (earthSunDistanceMeters > habitableZoneOuterDistanceMeters) {
      // Earth is cooling
      var distanceToOuterEdge = habitableZoneOuterDistanceMeters - earthSunDistanceMeters;
      tempChange = Math.floor(5 * distanceToOuterEdge / habitableZoneOuterDistanceMeters);
      if (tempChange < -5) { tempChange = -5; }
      if (tempChange === 0) { tempChange = -1; }
    } else {
      // Earth is in the habitable zone
      if (currentTemperatureCelsius != initialTemperatureCelsius) {
        // Restore the temperature
        tempChange = Math.ceil((initialTemperatureCelsius - currentTemperatureCelsius) / 5);

        if (tempChange === 0) {
          if (currentTemperatureCelsius > initialTemperatureCelsius) { tempChange = -1; }
          if (currentTemperatureCelsius < initialTemperatureCelsius) { tempChange = 1; }
        }
      }
    }

    currentTemperatureCelsius += tempChange;

    displayCurrentTemperature(currentTemperatureCelsius);
    displayTemperatureDescription();
  }

  function displayCurrentTemperature(currentTemperatureCelsius) {
    if (previouslyDisplayedTemperature === currentTemperatureCelsius) { return; }
    previouslyDisplayedTemperature = currentTemperatureCelsius;
    temperatureElement.innerHTML = currentTemperatureCelsius;
  }

  function displayTemperatureDescription(changeDegrees) {
    var description = "nice",
      showTooHotWarning = false,
      showTooColdWarning = false;

    if (currentTemperatureCelsius  > initialTemperatureCelsius) {
      if (currentTemperatureCelsius >= 40) {
        // Extremely hot
        showTooHotWarning = true;
        description = "too hot";
        cyclesUnderExtremeConditions += 1;
      } else {
        cyclesUnderExtremeConditions = 0;

        if (currentTemperatureCelsius >= 30) {
          description = "hot";
        } else if (currentTemperatureCelsius >= 20) {
          description = "warm";
        }
      }
    } else {
      if (currentTemperatureCelsius <= 0) {
        // Extremely cold
        description = "freezing";
        showTooColdWarning = true;
        cyclesUnderExtremeConditions += 1;
      } else {
        cyclesUnderExtremeConditions = 0;

        if (currentTemperatureCelsius <= 7) {
          description = "cold";
        } else if (currentTemperatureCelsius <= 12) {
          description = "cool";
        }
      }
    }

    temperatureDescriptionElement.innerHTML = description;

    // Style the description warning with blinking and color if needed
    // -----------

    var descriptionElementClass = "";

    if (showTooHotWarning) {
      descriptionElementClass = "EarthOrbitSimulation-isBlinking EarthOrbitSimulation-hasTooHotWarning";
    } else if (showTooColdWarning) {
      descriptionElementClass = "EarthOrbitSimulation-isBlinking EarthOrbitSimulation-hasTooColdWarning";
    }

    temperatureDescriptionElement.className = descriptionElementClass;
  }

  function isEarthDead() {
    return cyclesUnderExtremeConditions > maxNumberOfExtremeCyclesToSurvive;
  }

  function reset() {
    currentTemperatureCelsius = initialTemperatureCelsius;
    updateCycle = -1;
    cyclesUnderExtremeConditions = 0;
  }

  return {
    reset: reset,
    update: update
  };
})();

// Calculates the location of the habitable zone
var habitableZone = (function() {
  var innerEdgeMultiplier = 0.84, // The distance in AUs of the inner edge of the habitable zone
    outerEdgeMultiplier = 1.7,   // The distance in AUs of the outer edge of the habitable zone

    values = {
      innerDistanceMeters: 1, // The distance from the Sun to the inner edge of the habitable zone, in meters
      outerDistanceMeters: 1 // The distance from the Sun to the outer edge of the habitable zone, in meters
    };

  // Update habitable zone based on the mass of the Sun.
  // `massOfTheSunRatio` is a proportion of normal mass of the Sun (default is 1).
  function update(massOfTheSunRatio) {
    var sunLuminocity = Math.pow(massOfTheSunRatio, 3);

    values.innerDistanceMeters = innerDistanceMeters(sunLuminocity);
    values.outerDistanceMeters = outerDistanceMeters(sunLuminocity);
  }

  // Returns the distance of the inner edge of the habitable zone form the Sun in meters.
  // `sunLuminocityRatio` is a proportion of Sun luminocity (default is 1).
  function innerDistanceMeters(sunLuminocityRatio) {
    return Math.sqrt(sunLuminocityRatio) * innerEdgeMultiplier * physics.constants.earthSunDistanceMeters;
  }

  // Returns the distance of the outer edge of the habitable zone form the Sun in pixels.
  function innerDistancePixels() {
    return values.innerDistanceMeters / physics.constants.scaleFactor;
  }

  // Returns the distance of the outer edge of the habitable zone form the Sun in meters.
  // `sunLuminocityRatio` is a proportion of Sun luminocity (default is 1).
  function outerDistanceMeters(sunLuminocityRatio) {
    return Math.sqrt(sunLuminocityRatio) * outerEdgeMultiplier * physics.constants.earthSunDistanceMeters;
  }

  // Returns the distance of the outer edge of the habitable zone form the Sun in pixels.
  function outerDistancePixels() {
    return values.outerDistanceMeters / physics.constants.scaleFactor;
  }

  return {
    innerDistancePixels: innerDistancePixels,
    outerDistancePixels: outerDistancePixels,
    update: update,
    values: values
  };
})();

var helper = (function(){
  function showBlockElement(elemenent) {
    elemenent.style.display = 'block';
  }

  function hideBlockElement(elemenent) {
    elemenent.style.display = 'none';
  }

  function showInlineElement(elemenent) {
    elemenent.style.display = 'inline';
  }

  function hideInlineElement(elemenent) {
    elemenent.style.display = 'none';
  }

  function rotateElement(element, deg) {
    element.style.webkitTransform = 'rotate(' + deg + 'deg)';
    element.style.mozTransform    = 'rotate(' + deg + 'deg)';
    element.style.msTransform     = 'rotate(' + deg + 'deg)';
    element.style.oTransform      = 'rotate(' + deg + 'deg)';
    element.style.transform       = 'rotate(' + deg + 'deg)';
  }

  function createImage(src, alt) {
    var image = document.createElement('img');
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    return image;
  }

  /**
   * Remove item from array
   *
   * Modifies the array “in place”, i.e. the array passed as an argument
   * is modified as opposed to creating a new array. Also returns the modified
   * array for your convenience.
   *
   * Source: http://stackoverflow.com/a/36540678/297131
   */
  function removeFromArray(array, item) {
    var itemIndex;

    // Look for the item (the item can have multiple indices)
    itemIndex = array.indexOf(item);

    while (itemIndex !== -1) {
        // Remove the item, then return the modified array
        array.splice(itemIndex, 1);

        itemIndex = array.indexOf(item);
    }

    // Return the modified array
    return array;
  }

  // http://stackoverflow.com/a/5169076/297131
  function addClass(element, clazz) {
    if (!hasClass(element, clazz)) {
      element.className += " " + clazz;
    }
  }

  function removeClass(element, clazz) {
    if (hasClass(element, clazz)) {
      var reg = new RegExp('(\\s|^)' + clazz + '(\\s|$)');
      element.className = element.className.replace(reg,' ');
      element.className = element.className.trim();
    }
  }

  function hasClass(elemement, clazz) {
    return elemement.className.match(new RegExp('(\\s|^)' + clazz + '(\\s|$)'));
  }

  return {
    addClass: addClass,
    removeClass: removeClass,
    removeFromArray: removeFromArray,
    createImage: createImage,
    rotateElement: rotateElement,
    showInlineElement: showInlineElement,
    hideInlineElement: hideInlineElement,
    showBlockElement: showBlockElement,
    hideBlockElement: hideBlockElement
  };
})();


// Checks if two objects are collided
var collision = (function(){
  // Return true if two object are collided
  function areCollided(objectOnePosition, objectTwoPosition, objectTwoSize) {
    var correctedObjectTwoSize = objectTwoSize * 0.8;
    var objectTwoHalf = correctedObjectTwoSize / 2;
    var objectTwoLeft = objectTwoPosition.x - objectTwoHalf;
    var objectTwoRight = objectTwoPosition.x + objectTwoHalf;
    var objectTwoRightTop = objectTwoPosition.y - objectTwoHalf;
    var objectTwoBottom = objectTwoPosition.y + objectTwoHalf;

    return (objectOnePosition.x >= objectTwoLeft && objectOnePosition.x <= objectTwoRight &&
      objectOnePosition.y >= objectTwoRightTop && objectOnePosition.y <= objectTwoBottom);
  }

  return {
    areCollided: areCollided
  };
})();


// Calculates the position of the Earth
var physics = (function() {
  var constants = {
    gravitationalConstant: 6.67408 * Math.pow(10, -11),
    earthSunDistanceMeters: 1.496 * Math.pow(10, 11),
    earthAngularVelocityMetersPerSecond: 1.990986 *  Math.pow(10, -7),
    massOfTheSunKg: 1.98855 * Math.pow(10, 30),
    pixelsInOneEarthSunDistance: 100, // The length of one AU (Earth-Sun distance) in pixels.

    // The number of calculations of orbital path done in one 16 millisecond frame.
    // The higher the number, the more precise are the calculations and the slower the simulation.
    numberOfCalculationsPerFrame: 100
  };

  // A factor by which we scale the distance between the Sun and the Earth
  // in order to show it on screen
  constants.scaleFactor = constants.earthSunDistanceMeters / constants.pixelsInOneEarthSunDistance;

  // The number of seconds advanced by the animation in each frame.
  // The frames are fired 60 times per second.
  constants.timeIncrementPerFrameInSeconds = 3600 * 24 * 2;

  // The length of the time increment, in seconds.
  constants.deltaT = constants.timeIncrementPerFrameInSeconds / constants.numberOfCalculationsPerFrame;


  // Initial condition of the model
  var initialConditions = {
    distance: {
      value: constants.earthSunDistanceMeters,
      speed: 0.00
    },
    angle: {
      value: Math.PI / 6,
      speed: constants.earthAngularVelocityMetersPerSecond
    }
  };

  // Current state of the system
  var state = {
    distance: {
      value: 0,
      speed: 0
    },
    angle: {
      value: 0,
      speed: 0
    },
    massOfTheSunKg: constants.massOfTheSunKg,
    paused: false
  };

  function calculateDistanceAcceleration(state) {
    // [acceleration of distance] = [distance][angular velocity]^2 - G * M / [distance]^2
    return state.distance.value * Math.pow(state.angle.speed, 2) -
      (constants.gravitationalConstant * state.massOfTheSunKg) / Math.pow(state.distance.value, 2);
  }

  function calculateAngleAcceleration(state) {
    // [acceleration of angle] = - 2[speed][angular velocity] / [distance]
    return -2.0 * state.distance.speed * state.angle.speed / state.distance.value;
  }

  // Calculates a new value based on the time change and its derivative
  // For example, it calculates the new distance based on the distance derivative (velocity)
  // and the elapsed time interval.
  function newValue(currentValue, deltaT, derivative) {
    return currentValue + deltaT * derivative;
  }

  function resetStateToInitialConditions() {
    state.distance.value = initialConditions.distance.value;
    state.distance.speed = initialConditions.distance.speed;

    state.angle.value = initialConditions.angle.value;
    state.angle.speed = initialConditions.angle.speed;
  }

  // The distance that is used for drawing on screen
  function earthSunDistancePixels() {
    return state.distance.value / constants.scaleFactor;
  }

  // The main function that is called on every animation frame.
  // It calculates and updates the current positions of the bodies
  function updatePosition() {
    if (physics.state.paused) { return; }
    for (var i = 0; i < constants.numberOfCalculationsPerFrame; i++) {
      calculateNewPosition();
    }
  }

  // Calculates position of the Earth
  function calculateNewPosition() {
    // Calculate new distance
    var distanceAcceleration = calculateDistanceAcceleration(state);
    state.distance.speed = newValue(state.distance.speed, constants.deltaT, distanceAcceleration);
    state.distance.value = newValue(state.distance.value, constants.deltaT, state.distance.speed);

    // Calculate new angle
    var angleAcceleration = calculateAngleAcceleration(state);
    state.angle.speed = newValue(state.angle.speed, constants.deltaT, angleAcceleration);
    state.angle.value = newValue(state.angle.value, constants.deltaT, state.angle.speed);

    if (state.angle.value > 2 * Math.PI) {
      state.angle.value = state.angle.value % (2 * Math.PI);
    }
  }

  // Updates the mass of the Sun
  function updateFromUserInput(solarMassMultiplier) {
    state.massOfTheSunKg = constants.massOfTheSunKg * solarMassMultiplier;
  }

  // Returns the current mass of the Sun as a fraction of the normal mass.
  function currentSunMassRatio() {
    return state.massOfTheSunKg / constants.massOfTheSunKg;
  }

  return {
    earthSunDistancePixels: earthSunDistancePixels,
    resetStateToInitialConditions: resetStateToInitialConditions,
    currentSunMassRatio: currentSunMassRatio,
    updatePosition: updatePosition,
    initialConditions: initialConditions,
    updateFromUserInput: updateFromUserInput,
    constants: constants,
    state: state
  };
})();

// Show a full screen message when the game is lost
var gameoverMessage = (function(){
  var containerElement = document.querySelector(".EarthOrbitSimulation"),
    gameoverMessageContentElement = document.querySelector(".EarthOrbitSimulation-gameoverMessageContent"),
    restartButton = document.querySelector(".EarthOrbitSimulation-gameoverButton"),
    continueButton = document.querySelector(".EarthOrbitSimulation-continueButton"),
    gameoverCssClass = 'EarthOrbitSimulation-hasGameoverMessage',
    gameoverWithRestartButtonCssClass = 'EarthOrbitSimulation-hasGameoverMessage-hasRestartButton';

  function show(message) {
    showMessage(true);
    gameoverMessageContentElement.innerHTML = message;
  }

  function showWithContinueButton(message, didClickContinue) {
    gameoverMessageContentElement.innerHTML = message;
    showMessage(false);

    continueButton.onclick = function() {
      didClickContinue();
      return false; // Prevent default click
    };
  }

  function showMessage(hasRestartButton) {
    helper.addClass(containerElement, gameoverCssClass);

    if (hasRestartButton) {
      helper.addClass(containerElement, gameoverWithRestartButtonCssClass);
    } else {
      helper.removeClass(containerElement, gameoverWithRestartButtonCssClass);
    }
  }

  function hide() {
    helper.removeClass(containerElement, gameoverCssClass);
  }

  function init() {
    restartButton.onclick = userInput.didClickRestart;
  }

  return {
    show: show,
    showWithContinueButton: showWithContinueButton,
    gameoverMessage: gameoverMessage,
    hide: hide,
    init: init
  };
})();

// Returns a random number, same numbers each time.
var seedableRandom = (function(){
  var currentIndex = 1;

  // Resets the generator, the nextValue function will start returning same numbers
  function reset() {
    currentIndex = 1;
  }

  // Returns a random number between 0 and 1, inclusive
  function nextValue() {
    var value =  Math.E * 7321 * (Math.sin(Math.E * currentIndex * 121) + 1);
    value = (value > 1) ? (value % 1) : value; // always between 1 and zero
    currentIndex++;
    return value;
  }

  // Returns random boolean
  function getBoolean() {
    return nextValue() > 0.5;
  }

  return {
    nextValue: nextValue,
    getBoolean: getBoolean,
    reset: reset
  };
})();

// Displays the number of collected strawberries
var strawberryCounter = (function(){
  var values = {
      collectedNumber: 0 // number of strawberries picked
    },
    strawberryCounterNumberElement = document.querySelector(".EarthOrbitSimulation-strawberryCounterNumber"),
    strawberryCounterElement = document.querySelector(".EarthOrbitSimulation-strawberryCounter");

  function reset() {
    values.collectedNumber = 0;
    strawberryCounterNumberElement.innerHTML = "0";
  }

  function increment() {
    values.collectedNumber += 1;
    strawberryCounterNumberElement.innerHTML = "" + values.collectedNumber;

    // Blink the counter
    strawberryCounterElement.className = 'EarthOrbitSimulation-strawberryCounter';
    void strawberryCounterElement.offsetWidth;
    strawberryCounterElement.className = 'EarthOrbitSimulation-strawberryCounter EarthOrbitSimulation-strawberryCounter-isBlinking';
  }

  return {
    values: values,
    reset: reset,
    increment: increment
  };
})();

// The pool of strawberry DOM elements.
// Adding and removing DOM elements is relatively slow operation and can be noticeable on mobile devices.
// We use this object for improving performance by keeping strawberry elements in the DOM
// instead of removing and adding them each time the number of strawberries is changed on screen.
var strawberryPool = (function() {
  var container = document.querySelector(".EarthOrbitSimulation-container"),
    cachedElements = []; // Contains existing but currently hidden strawberry elements.

  /*
    Hides the element and caches it for later use with 'getOne' function
  */
  function hideAndCache(element) {
    helper.addClass(element, 'EarthOrbitSimulation-isHidden');
    cachedElements.push(element);
  }

  /*
    Returns a strawberry element
  */
  function getOne() {
    var element = getOneFromCache();
    if (element !== null) { return element; }

    // The cache is empty - create a new element instead and add to the DOM
    element = helper.createImage('https://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/strawberry.png',
      'Cosmic strawberry');

    element.className = 'EarthOrbitSimulation-strawberry';
    container.appendChild(element);
    return element;
  }

  // Returns a strawberry element from cache or null if the cache is empty.
  function getOneFromCache() {
    if (cachedElements.lenght === 0) { return null; }
    var element = cachedElements.shift();
    if (typeof element === 'undefined' || element === null) { return null; }
    element.style.left = '100px';
    element.style.top = '-1000px';
    helper.removeClass(element, 'EarthOrbitSimulation-isHidden');
    return element;
  }

  return {
    getOne: getOne,
    hideAndCache: hideAndCache
  };
})();

/*
  Represents a single juicy strawberry
*/
function OneStrawberry() {
  var that = {
    container: document.querySelector(".EarthOrbitSimulation-container"),
    element: null, // Contains the DOM element for the strawberry,
    initialDistanceFromTheSunMeters: 5.0 * physics.constants.earthSunDistanceMeters,
    distanceFromTheSunMeters: 1,
    speedMetersPerSecond: 3000.0, // How fast the strawberry is moving
    // The distance from the Sun at which the strawberry slows down form light speed to ordinary speed
    distanceFromTheSunLightSpeedOffMeters: 2.0 * physics.constants.earthSunDistanceMeters,
    lightSpeedMetersPerSecond: 200000.0, // How fast the strawberry is travelling at 'light speed'
    initialAngle: -0.2,
    angle: 1,
    strawberrySizePixels: 35.0,
    rotationClockwise: true, // When true, the strawberry is rotating clockwise
    approachCurvature: 3,
    position: {x: 1, y: 1} // Current position
  };

  /*
   Updates the strawberry position and detects collision with the Sun or the Earth.
   This function is called on every frame, 60 times per second.
  */
  that.update = function() {
    if (physics.state.paused) { return; }

    // Update strawberry position
    // ------------------

    that.updatePosition();
    var distanceFromTheSunPixels = that.distanceFromTheSunMeters / physics.constants.scaleFactor;
    that.position = that.calculatePosition(distanceFromTheSunPixels, that.angle);
    that.drawstrawberry(that.position);
  };

  that.updatePosition = function() {
    var currentSpeed = 0;

    if (that.distanceFromTheSunMeters > that.distanceFromTheSunLightSpeedOffMeters) {
      // Use light speed, too far fro the Sun
      currentSpeed = that.lightSpeedMetersPerSecond;
    } else {
      // Use normal speeed, close to the Sun
      currentSpeed = that.speedMetersPerSecond;
    }

    var distanceTravelledInOneFrame = currentSpeed * physics.constants.timeIncrementPerFrameInSeconds;
    that.distanceFromTheSunMeters -= distanceTravelledInOneFrame;
  };

   // Return true if the strawberry has collided with the Sun
  that.isCollidedWithTheSun = function() {
    var sizeOfTheSun = 1.4 * graphics.values.currentSunsSizePixels;
    if (sizeOfTheSun < 50) { sizeOfTheSun = 50; }
    return collision.areCollided(that.position, graphics.values.center, sizeOfTheSun);
  };

  // Return true if the strawberry has collided with the Earth
  that.isCollidedWithTheEarth = function() {
    return collision.areCollided(that.position, graphics.values.earthPosition, 2.0 * graphics.values.earthSize);
  };

  that.drawstrawberry = function(position) {
    var left = (position.x - that.strawberrySizePixels / 2) + "px";
    var top = (position.y - that.strawberrySizePixels / 2) + "px";
    that.element.style.left = left;
    that.element.style.top = top;
  };

  that.calculatePosition = function(distance, angle) {
    var rotationSign = that.rotationClockwise ? 1 : -1;
    // Add some curvature to the motion
    var curvature = rotationSign * Math.sin(distance / 300) * that.approachCurvature;
    var udatedAngle = curvature + angle;

    var centerX = Math.cos(udatedAngle) * distance + graphics.values.center.x;
    var centerY = Math.sin(-udatedAngle) * distance + graphics.values.center.y;

    return {
      x: centerX,
      y: centerY
    };
  };

  // Shows the strawberry element on screen
  that.showElement = function() {
    if (that.element !== null) { return; }
    that.element = strawberryPool.getOne();
  };

  // Show strawberry on screen
  that.show = function() {
    that.distanceFromTheSunMeters = that.initialDistanceFromTheSunMeters;
    that.angle = that.calculateNewAngle();
    that.approachCurvature = that.calculateNewCurvature();
    that.speedMetersPerSecond = that.calculateNewSpeed();
    that.rotationClockwise = seedableRandom.getBoolean();

    var rotationAngle = that.calculateNewRotationAngle();
    helper.rotateElement(that.element, rotationAngle);
  };

  /*
    Calculates the rotation angle for the strawberry image in degrees.
    Angle of 0 means the strawberry image is not rotatied.
  */
  that.calculateNewRotationAngle = function() {
    var correctionDegrees = -13; // correct for  the image rotation.
    var rotationAngle = that.angle / Math.PI * 180.0; // Convert to degrees
    rotationAngle = 90 - rotationAngle + correctionDegrees;
    return rotationAngle;
  };

  /*
    Calculates a curvature multiplier for the strawberry path, a value between 0 and 5.
    0 means the path is linear, and 5 means the path is highly curved.
  */
  that.calculateNewCurvature = function() {
    return 5 * seedableRandom.nextValue();
  };

  /*
    Calculates an angle at which the strawberry approaches the sun, in radians.
    Angle of 0 means, the strawberry approaches the Sun from the right.
  */
  that.calculateNewAngle = function() {
    return 2 * Math.PI * seedableRandom.nextValue();
  };

  /*
    Calculates the speed for the strawberry. The speed increases with the number of picked strawberries
    making the game harder. There is also a slight random variation in speed.
  */
  that.calculateNewSpeed = function() {
    var speedDifficultyIncrease = 25 * strawberryCounter.values.collectedNumber;

    // Make every third strawberry come faster in the beginning
    // to prevent players from using an easy strategy of using the inner habitable zone orbit.
    if (strawberryCounter.values.collectedNumber < 10 &&
        strawberryCounter.values.collectedNumber !== 0 &&
        strawberryCounter.values.collectedNumber % 3 === 0) {

      speedDifficultyIncrease = 1000;
    }

    return 2500 + (1000 * seedableRandom.nextValue()) + speedDifficultyIncrease;
  };

  that.remove = function() {
    if (that.element === null) { return; }
    strawberryPool.hideAndCache(that.element);
    that.element = null;
  };

  that.init = function() {
    that.showElement();
    that.show();
  };

  that.init();

  return that;
}

// Shows the strawberries
var strawberries = (function(){
  var allStrawberries = [], // Currently shown strawberries
    // Show the "Strawberry has landed" only once
    shownstrawberryHasLandedOnEarthMessage = false,
    // Show the "Sun has been removed" message only once
    shownSunWasRemovedMessage = false;

  /*
   Updates the strawberry position and detects collision with the Sun or the Earth.
   This function is called on every frame, 60 times per second.
  */
  function update() {
    if (physics.state.paused) { return; }

    for (var i = 0; i < allStrawberries.length; i++) {
      var strawberry = allStrawberries[i];
      strawberry.update();

      isCollidedWithSun(strawberry);
      isCollidedWithEarth(strawberry);
    }
  }

  // Check if strawberry has collided with the Sun
  function isCollidedWithSun(strawberry) {
    if (!strawberry.isCollidedWithTheSun()) { return; }
    userInput.removeSun();

    if (!shownSunWasRemovedMessage) {
      physics.state.paused = true;
      shownSunWasRemovedMessage = true;

      gameoverMessage.showWithContinueButton("Greetings Earthlings! We detected an unauthorized dark energy transfer that slowed down the inflation of the Universe and triggered a cosmic real estate crisis. To restore our profits we have removed your star. We apologize for any inconvenience and wish you a good night. ~The Intergalactic Realty Association of Neighbourly Temporal Spacelords.", didTapContinueButtonAfterSunHasBeenRemoved);
    }
  }

  // Check if strawberry has collided with the Earth
  function isCollidedWithEarth(strawberry) {
    if (!strawberry.isCollidedWithTheEarth()) { return; }

    strawberryCounter.increment();
    removeOneStrawberry(strawberry);

    if (shownstrawberryHasLandedOnEarthMessage) {
      addStrawberries();
    } else {
      physics.state.paused = true;
      shownstrawberryHasLandedOnEarthMessage = true;

      gameoverMessage.showWithContinueButton("A giant strawberry-shaped object safely landed on the Earth. Its landing site became a thriving tourist attraction, where one can sip on a strawberry smoothie from a strawberry-shaped disposable cup, while perusing a vast selection of strawberry-shaped key chains, baseball caps and spaceship fresheners.", didTapContinueButtonAfterCollisionWithEarth);
    }
  }

  function didTapContinueButtonAfterSunHasBeenRemoved() {
    gameoverMessage.hide();
    physics.state.paused = false;
  }

  function didTapContinueButtonAfterCollisionWithEarth() {
    gameoverMessage.hide();
    addStrawberries();
    physics.state.paused = false;
  }

  /*
    Start showing the first strawberry.
  */
  function reset() {
    seedableRandom.reset();
    currentStrawberriesToShow = 0;
    removeAllStrawberries();
    addStrawberries();
  }

  var currentStrawberriesToShow = 0;

  /*

    Contains the amount of strawberries to add to the screen when the given amount of picked strawberries is reached.

    For example ("0": 1) means that we start by showing one strawberry.

    When four strawberries are picked ("4": 1) we add another strawberry, now showing two in total.

    When five strawberries are picked ("5": -1) we remove one strawberry, showing one in total.

    When seven strawberries are picked ("7": 1) we add another strawberry again, showing two in total on screen.
  */
  var dataStrawberriesToAdd = {
    "0": 1,   // total 1
    "4": 1,   // total 2
    "5": -1,  // total 1
    "7": 1,   // total 2
    "8": -1,  // total 1
    "10": 1,  // total 2
    "12": 1,  // total 3
    "13": -1, // total 2
    "14": -1, // total 1
    "15": 1,  // total 2
    "17": -1, // total 1
    "20": 1,  // total 2
    "25": 1,  // total 3
    "26": -1, // total 2

    "30": 1,  // total 3
    "34": -1, // total 2
    "37": 1,  // total 3
    "38": -1, // total 2
    "40": 1,  // total 3
    "42": 1,  // total 4
    "43": -1, // total 3
    "44": -1, // total 2
    "45": 1,  // total 3
    "47": -1, // total 2
    "50": 1,  // total 3
    "55": 1,  // total 4
    "56": -1, // total 3

    "60": 1,  // total 4
    "64": -1, // total 3
    "67": 1,  // total 4
    "68": -1, // total 3
    "70": 1,  // total 4
    "72": 1,  // total 5
    "73": -1, // total 4
    "74": -1, // total 3
    "75": 1,  // total 4
    "77": -1, // total 3
    "80": 1,  // total 4
    "85": 1,  // total 5
    "86": -1  // total 4
  };

  // Returns the increase in the number of strawberries on screen.
  // 0 - same number
  // 1 - one more strawberry is added
  // -1 - the number of strawberries is reduced by one
  function strawberriesIncrease() {
    for (var numberProperty in dataStrawberriesToAdd) {
      if (dataStrawberriesToAdd.hasOwnProperty(numberProperty)) {
        var collectedNumber = parseInt(numberProperty, 10);
        if (strawberryCounter.values.collectedNumber === collectedNumber) {
          return dataStrawberriesToAdd[numberProperty];
        }
      }
    }

    return 0;
  }

  function addStrawberries() {
    currentStrawberriesToShow += strawberriesIncrease();
    var strawberriesToAdd = currentStrawberriesToShow - allStrawberries.length;
    if (strawberriesToAdd === 0 && allStrawberries.length === 0) { strawberriesToAdd = 1; }

    for (var i = 0; i < strawberriesToAdd; i++) {
      addOneStrawberry();
    }
  }

  function addOneStrawberry() {
    var strawberry = OneStrawberry();
    allStrawberries.push(strawberry);
  }

  function removeAllStrawberries() {
    for (var i = 0; i < allStrawberries.length; i++) {
      allStrawberries[i].remove();
    }

    allStrawberries = [];
  }

  function removeOneStrawberry(strawberry) {
    strawberry.remove();
    helper.removeFromArray(allStrawberries, strawberry);
  }

  return {
    reset: reset,
    update: update
  };
})();

// Draw the scene
var graphics = (function() {
  var canvas = null, // Canvas DOM element.
    context = null, // Canvas context for drawing.
    canvasHabitableZone = null, // Habitable zone canvas DOM element
    contextHabitableZone = null, // Habitable zone canvas context
    canvasHeight = 400,
    colors = {
      orbitalPath: "#777777",
      habitableZoneFillColor: "#00FF00"
    },
    previousEarthPosition = null,
    earthElement,
    sunElement,
    values = {
      center: {
        x: 1,
        y: 1
      },
      earthPosition: { x: 1, y: 1 },
      earthSize: 25,
      sunsSize: 60
    };

  values.currentSunsSizePixels = values.sunsSize;

  function drawTheEarth(earthPosition) {
    var left = (earthPosition.x - values.earthSize/2) + "px";
    var top = (earthPosition.y - values.earthSize/2) + "px";
    earthElement.style.left = left;
    earthElement.style.top = top;
  }

  function calculateEarthPosition(distance, angle) {
    var centerX = Math.cos(angle) * distance + values.center.x;
    var centerY = Math.sin(-angle) * distance + values.center.y;

    return {
      x: centerX,
      y: centerY
    };
  }

  // Updates the size of the Sun based on its mass. The sunMass argument is a fraction of the real Sun's mass.
  function updateSunSizeAndBrightness(sunMass) {
    // Change brightness
    sunElement.setAttribute("style","filter:brightness(" + sunMass + "); " +
      "-webkit-filter:brightness(" + sunMass + "); ");

    var sunsDefaultWidth = values.sunsSize;
    values.currentSunsSizePixels = sunsDefaultWidth * Math.pow(sunMass, 1/3);
    sunElement.style.width = values.currentSunsSizePixels + "px";
    sunElement.style.marginLeft = -(values.currentSunsSizePixels / 2.0) + "px";
    sunElement.style.marginTop = -(values.currentSunsSizePixels / 2.0) + "px";
  }

  // Draw the habitable zone
  // `sunMassRatio` is a proportion of normal mass of the Sun (default is 1).
  function redrawHabitableZone(sunMassRatio) {
    habitableZone.update(sunMassRatio);
    contextHabitableZone.clearRect(0, 0, canvas.width, canvas.height);
    contextHabitableZone.fillStyle = colors.habitableZoneFillColor;
    contextHabitableZone.globalAlpha = 0.15;
    contextHabitableZone.beginPath();

    contextHabitableZone.arc(values.center.x, values.center.y, habitableZone.innerDistancePixels(),
      0, 2*Math.PI, true);

    contextHabitableZone.arc(values.center.x, values.center.y, habitableZone.outerDistancePixels(),
      0, 2*Math.PI, false);

    contextHabitableZone.fill();
  }

  function drawOrbitalLine(newEarthPosition) {
    if (previousEarthPosition === null) {
      previousEarthPosition = newEarthPosition;
      return;
    }

    context.beginPath();
    context.strokeStyle = colors.orbitalPath;
    context.moveTo(previousEarthPosition.x, previousEarthPosition.y);
    context.lineTo(newEarthPosition.x, newEarthPosition.y);
    context.stroke();

    previousEarthPosition = newEarthPosition;
  }

  // Return true if Earth has collided with the Sun
  function isEarthCollidedWithTheSun(earthPosition) {
    return collision.areCollided(earthPosition, values.center, values.currentSunsSizePixels);
  }

  // Draws the scene
  function drawScene(distance, angle) {
    values.earthPosition = calculateEarthPosition(distance, angle);
    drawTheEarth(values.earthPosition);
    drawOrbitalLine(values.earthPosition);

    if (isEarthCollidedWithTheSun(values.earthPosition)) {
      physics.state.paused = true;
      gameoverMessage.show("The Earth has collided with the Sun and evaporated at temperature over 5,700 degrees. It was quick and almost painless death for all life.");
    }
  }

  function showCanvasNotSupportedMessage() {
    document.getElementById("EarthOrbitSimulation-notSupportedMessage").style.display ='block';
  }

  function calculateScreenCenter() {
    values.center.x = Math.floor(canvas.width / 2);
    values.center.y = Math.floor(canvas.height / 2);
  }

  // Resize canvas to will the width of container
  function fitToContainer(){
    layoutCanvas(canvas, canvasHeight);
    layoutCanvas(canvasHabitableZone, canvasHeight);
    calculateScreenCenter();
  }

  function layoutCanvas(canvasElement, height) {
    canvasElement.style.width = '100%';
    canvasElement.style.height = height + 'px';
    canvasElement.width = canvasElement.offsetWidth;
    canvasElement.height = canvasElement.offsetHeight;
  }

  // Returns true on error and false on success
  function initCanvas() {
    // Find the canvas HTML element
    canvas = document.querySelector(".EarthOrbitSimulation-canvas");

    // Check if the browser supports canvas drawing
    if (!(window.requestAnimationFrame && canvas && canvas.getContext)) { return true; }

    // Get canvas context for drawing
    context = canvas.getContext("2d");
    if (!context) { return true; } // Error, browser does not support canvas
    return false;
  }

  // Returns true on error and false on success
  function initHabitableZoneCanvas() {
    canvasHabitableZone = document.querySelector(".EarthOrbitSimulation-canvasHabitableZone");

    // Get canvas context for drawing
    contextHabitableZone = canvasHabitableZone.getContext("2d");
    if (!contextHabitableZone) { return true; } // Error, browser does not support canvas
    return false;
  }

  // Create canvas for drawing and call success argument
  function init(success) {
    if (initCanvas()) {
      // The browser can not use canvas. Show a warning message.
      showCanvasNotSupportedMessage();
      return;
    }

    if (initHabitableZoneCanvas()) {
      // The browser can not use canvas. Show a warning message.
      showCanvasNotSupportedMessage();
      return;
    }

    // Update the size of the canvas
    fitToContainer();

    earthElement = document.querySelector(".EarthOrbitSimulation-earth");
    sunElement = document.querySelector(".EarthOrbitSimulation-sun");
    redrawHabitableZone(1);

    // Execute success callback function
    success();
  }

  function clearScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    previousEarthPosition = null;
  }

  return {
    fitToContainer: fitToContainer,
    drawScene: drawScene,
    updateSunSizeAndBrightness: updateSunSizeAndBrightness,
    redrawHabitableZone: redrawHabitableZone,
    clearScene: clearScene,
    values: values,
    init: init
  };
})();

// Start the simulation
var simulation = (function() {
  // The method is called 60 times per second
  function animate() {
    physics.updatePosition();
    simulationTime.update();
    graphics.drawScene(physics.earthSunDistancePixels(), physics.state.angle.value);
    strawberries.update();

    climate.update(physics.state.distance.value,
      habitableZone.values.innerDistanceMeters,
      habitableZone.values.outerDistanceMeters);

    window.requestAnimationFrame(animate);
  }

  function start() {
    graphics.init(function() {
      // Use the initial conditions for the simulation
      physics.resetStateToInitialConditions();
      strawberries.reset();
      gameoverMessage.init();

      // Redraw the scene if page is resized
      window.addEventListener('resize', function(event){
        graphics.fitToContainer();
        graphics.clearScene();
        graphics.redrawHabitableZone(physics.currentSunMassRatio());
        graphics.drawScene(physics.earthSunDistancePixels(), physics.state.angle.value);
      });

      animate();
    });
  }

  return {
    start: start
  };
})();

// React to user input
var userInput = (function(){
  var sunsMassElement = document.querySelector(".EarthOrbitSimulation-sunsMass");
  var restartButton = document.querySelector(".EarthOrbitSimulation-reload");
  var massSlider;

  function updateSunsMass(sliderValue) {
    var sunsMassValue = sliderValue * 2;

    if (sunsMassValue > 1) {
      sunsMassValue = Math.pow(5, sunsMassValue - 1);
    }

    var formattedMass = parseFloat(Math.round(sunsMassValue * 100) / 100).toFixed(2);
    sunsMassElement.innerHTML = formattedMass;
    physics.updateFromUserInput(sunsMassValue);
    graphics.updateSunSizeAndBrightness(sunsMassValue);
    graphics.redrawHabitableZone(sunsMassValue);
  }

  function didClickRestart() {
    gameoverMessage.hide();
    strawberryCounter.reset();
    physics.resetStateToInitialConditions();
    graphics.clearScene();
    updateSunsMass(0.5);
    massSlider.changePosition(0.5);
    climate.reset();
    physics.state.paused = false;
    simulationTime.reset();
    strawberries.reset();
    massSlider.enabled = true;
    return false; // Prevent default click
  }

  function init() {
    massSlider = SickSlider(".EarthOrbitSimulation-massSlider");
    massSlider.onSliderChange = updateSunsMass;
    massSlider.changePosition(0.5);
    restartButton.onclick = didClickRestart;
  }

  function removeSun() {
    massSlider.changePosition(0);
    massSlider.enabled = false;
    updateSunsMass(0);
  }

  return {
    didClickRestart: didClickRestart,
    removeSun: removeSun,
    init: init
  };
})();

simulation.start();
userInput.init();

})();