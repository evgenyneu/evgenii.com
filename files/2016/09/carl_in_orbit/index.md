---
layout: default
noindex: true
comments: false
title: "Ridiculous strawberry picking"
---

# Ridiculous strawberry picking

<!--  To embed this simulator into your web page copy this source code until "Simulator END" comment. -->

<!--

  Earth Orbit Simulator

  http://evgenii.com

  License: Public Domain

-->

<!-- Styles -->
<style>
  /* Prevent browser from showing selection when the element is touched */
  .isUnselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    -o-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }

  .EarthOrbitSimulator-hasHont {
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
  }

  .EarthOrbitSimulation-alert {
    color: red;
    border: 1px solid red;
    background: #ffeeee;
    padding: 5px;
  }

  .EarthOrbitSimulation-container {
    background-color: #000000;
    position: relative;
    background-image: url("http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/starry_night.png");
    background-position: center bottom;
    background-repeat: repeat;
    background-size: 874px 260px;
  }

  .EarthOrbitSimulation-isTextCentered { text-align: center; }
  .EarthOrbitSimulation-isHiddenBlock { display: none; }

  .EarthOrbitSimulation-sun {
    position: absolute;
    width: 60px;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    -webkit-animation:spin .5s linear infinite;
    -moz-animation:spin .5s linear infinite;
    animation:spin .5s linear infinite;
    z-index: 999;
  }

  .EarthOrbitSimulation-earth {
    position: absolute;
    width: 25px;
    -webkit-animation:spin .1s linear infinite;
    -moz-animation:spin .1s linear infinite;
    animation:spin .1s linear infinite;
    z-index: 1000;
  }

  .EarthOrbitSimulation-straberry {
    position: absolute;
    width: 35px;
    top: 30px;
    left: 40px;
    z-index: 1000;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }

  .EarthOrbitSimulation-canvas,
  .EarthOrbitSimulation-canvasHabitableZone { display: block; }

  .EarthOrbitSimulation-canvasHabitableZone {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  /*
    Game over
    ---------
  */

  .EarthOrbitSimulation-gameover {
    position: absolute;
    background-color: #443344;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background-image: url("http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/starry_night.png");
    background-position: left top;
    background-repeat: repeat;
    background-size: 674px 220px;
  }

  .EarthOrbitSimulation-gameoverMessage {
    color: #DDDDDD;
    font-size: 1em;
    line-height: 1.3;
    position: relative;
    padding: 10px;
    top: 50%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  @media (min-width: 600px) {
    .EarthOrbitSimulation-gameoverMessage {
      font-size: 1.2em;
      line-height: 1.5;
    }
  }

  .EarthOrbitSimulation-button {
    color: #ffb100;
    padding: 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid #ffb100;
  }

  /*
    Hud display
    ---------
  */

  .EarthOrbitSimulation-hudContainer {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  .EarthOrbitSimulation-hudContainerChild {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /*
    Reload button
    ---------
  */

  .EarthOrbitSimulation-reload {
    position: absolute;
    display: block;
    bottom: 10px;
    right: 15px;
    width: 40px;
    height: 40px;
    outline: none;
  }

  .EarthOrbitSimulation-reload:focus { outline: none; }

  .EarthOrbitSimulation-reloadIcon {
    width: 100%;
    border : 0;
  }

  /*
    Strawberry counter
    ---------
  */

  .EarthOrbitSimulation-strawberryCounter {
    position: absolute;
    top: 10px;
    left: 15px;
    color: #DDDDDD;
  }

  .EarthOrbitSimulation-strawberryCounterImage {
    width: 15px;
    margin-right: 3px;
  }

  .EarthOrbitSimulation-strawberryCounter-isBlinking {
    -webkit-animation: blink-animation 0.3s steps(2, start) infinite;
    animation: blink-animation 0.3s steps(2, start) infinite;
    -webkit-animation-iteration-count: 4; /* Chrome, Safari, Opera */
    animation-iteration-count: 4;
  }

  /*
    Climate
    ---------
  */

  .EarthOrbitSimulation-temperature {
    position: absolute;
    bottom: 10px;
    left: 15px;
    color: #DDDDDD;
  }

  .EarthOrbitSimulation-hasTooHotWarning {
    background-color: red;
    color: white;
    padding-left: 3px;
    padding-right: 3px;
  }

  .EarthOrbitSimulation-hasTooColdWarning {
    background-color: #BEC7FF;
    color: black;
    padding-left: 3px;
    padding-right: 3px;
  }

  /*
    Time
    ---------
  */

  .EarthOrbitSimulation-time {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #DDDDDD;
  }

  /* Blinking */
  .EarthOrbitSimulation-isBlinking {
    -webkit-animation: blink-animation 0.6s steps(2, start) infinite;
    animation: blink-animation 0.6s steps(2, start) infinite;
  }

  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }


  /*

  Sick Slider
  --------------

  */

  .SickSlider {
    position: relative;
    height: 60px;
    cursor: pointer;
    z-index: 900;
  }

  .SickSlider-stripe {
    height: 5px;
    width: 100%;
    background-color: #999999;
    position: absolute;
    top: 28px;
    left: 0px;
  }

  .SickSlider-head {
    position: absolute;
    top: 10px;
    left: 0;
    width: 30px;
    height: 40px;
    background-color: #ff9400;
    border: 1px solid #FFFFFF;
  }
</style>

<!-- Message shown in old browsers. -->
<div class="EarthOrbitSimulation EarthOrbitSimulator-hasHont">
<p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
  <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>

  <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>


  <div class='EarthOrbitSimulation-hudContainer'>
    <div class='EarthOrbitSimulation-hudContainerChild'>
      <div class='EarthOrbitSimulation-strawberryCounter'>
        <img src='/image/blog/2016-09-03-big-sun-experiment/strawberry.png' alt='Straberry' class='EarthOrbitSimulation-strawberryCounterImage'><span class='EarthOrbitSimulation-strawberryCounterNumber'>0</span>
      </div>

      <div class='EarthOrbitSimulation-temperature'>T:<span class='EarthOrbitSimulation-temperatureValue'></span> <span class='EarthOrbitSimulation-temperatureDescription'></span></div>

      <div class='EarthOrbitSimulation-time'></div>

      <a class='EarthOrbitSimulation-reload' href='#'><img src='/image/blog/2016-09-03-big-sun-experiment/reload_icon.png' alt='Restart' class='EarthOrbitSimulation-reloadIcon'></a>
    </div>
  </div>

  <canvas class="EarthOrbitSimulation-canvas"></canvas>
  <canvas class="EarthOrbitSimulation-canvasHabitableZone"></canvas>

  <div class="EarthOrbitSimulation-gameover EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-isHiddenBlock">
    <div class="EarthOrbitSimulation-gameoverMessage">
      <span class="EarthOrbitSimulation-gameoverMessageContent">My wonder button is being pushed all the time.</span>
      <br><br>
      <a class="EarthOrbitSimulation-gameoverButton EarthOrbitSimulation-button" href="#">💥 Try again ✨</a>
      <a class="EarthOrbitSimulation-continueButton EarthOrbitSimulation-button" href="#">💥 Continue ✨</a>
    </div>
  </div>

  <img src='/image/blog/2016-09-03-big-sun-experiment/strawberry.png' alt='Straberry' class='EarthOrbitSimulation-straberry'>
</div>

<div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<div class='EarthOrbitSimulation-isTextCentered isUnselectable'>
  Sun's mass: <span class='EarthOrbitSimulation-sunsMass'>1.00</span>
</div>

<p class='EarthOrbitSimulation-debugOutput'></p>
</div>

<script>

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
      enabled: true
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
      that.changePosition(sliderValue);

      if (that.onSliderChange) {
        if (that.previousSliderValue !== sliderValue) {
          that.onSliderChange(sliderValue);
        }

        that.previousSliderValue = sliderValue;
      }
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
        var message = currentTemperatureCelsius > 10 ? "All complex life on Earth has become extinct due to high global temperature that caused the water to evaporate and create a runaway greenhouse effect which increased the temperature further." : "All complex life on Earth has become extinct due to low global temperature that caused the shutdown of photosynthesis in plants.";
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

    return {
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
      numberOfCalculationsPerFrame: 1000
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
    var gameoverElement = document.querySelector(".EarthOrbitSimulation-gameover");
    var gameoverMessageContentElement = document.querySelector(".EarthOrbitSimulation-gameoverMessageContent");
    var restartButton = document.querySelector(".EarthOrbitSimulation-gameoverButton");
    var continueButton = document.querySelector(".EarthOrbitSimulation-continueButton");

    function show(message) {
      toggleButtons(true);
      helper.showBlockElement(gameoverElement);
      gameoverMessageContentElement.innerHTML = message;
    }

    function showWithContinueButton(message, didClickContinue) {
      toggleButtons(false);
      helper.showBlockElement(gameoverElement);
      gameoverMessageContentElement.innerHTML = message;

      continueButton.onclick = function() {
        didClickContinue();
        return false; // Prevent default click
      };
    }

    function toggleButtons(showRestart) {
      if (showRestart) {
        helper.showInlineElement(restartButton);
        helper.hideInlineElement(continueButton);
      } else {
        helper.showInlineElement(continueButton);
        helper.hideInlineElement(restartButton);
      }
    }

    function hide() {
      helper.hideBlockElement(gameoverElement);
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
      var value =  Math.E * 1121 * (Math.sin(Math.E * currentIndex * 121) + 1);
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
      straberryCounterNumberElement = document.querySelector(".EarthOrbitSimulation-strawberryCounterNumber"),
      straberryCounterElement = document.querySelector(".EarthOrbitSimulation-strawberryCounter");

    function reset() {
      values.collectedNumber = 0;
      straberryCounterNumberElement.innerHTML = "0";
    }

    function increment() {
      values.collectedNumber += 1;
      straberryCounterNumberElement.innerHTML = "" + values.collectedNumber;

      // Blink the counter
      straberryCounterElement.className = 'EarthOrbitSimulation-strawberryCounter';
      void straberryCounterElement.offsetWidth;
      straberryCounterElement.className = 'EarthOrbitSimulation-strawberryCounter EarthOrbitSimulation-strawberryCounter-isBlinking';
    }

    return {
      values: values,
      reset: reset,
      increment: increment
    };
  })();

  // Moves the strawberry and handles its collision with the Earth and the Sun.
  var strawberry = (function(){
    var straberryElement = document.querySelector(".EarthOrbitSimulation-straberry"),
      initialDistanceFromTheSunMeters = 2.0 * physics.constants.earthSunDistanceMeters,
      distanceFromTheSunMeters = 1,
      speedMetersPerSecond = 3000.0, // How fast the strawberry is moving
      initialAngle = -.2,
      angle = 1,
      strawberrySizePixels = 35.0,
      // Show the "Strawberry has landed" only once
      shownStraberryHasLandedOnEarthMessage = false,
      // Show the "Sun has been removed" message only once
      shownSunWasRemovedMessage = false,
      rotationClockwise = true; // When true, the straberry is rotating clockwise

    /*
     Updates the strawberry position and detects collision with the Sun or the Earth.
     This function is called on every frame, 60 times per second.
    */
    function update() {
      if (physics.state.paused) { return; }

      // Update strawberry position
      // ------------------

      updatePosition();
      var distanceFromTheSunPixels = distanceFromTheSunMeters / physics.constants.scaleFactor;
      var straberryPosition = calculatePosition(distanceFromTheSunPixels, angle);
      drawStraberry(straberryPosition);


      // Check if strawberry has collided with the Sun
      // ------------------

      if (isCollidedWithTheSun(straberryPosition)) {
        userInput.removeSun();

        if (!shownSunWasRemovedMessage) {
          physics.state.paused = true;
          shownSunWasRemovedMessage = true;

          gameoverMessage.showWithContinueButton("Greetings Earthlings! An unauthorized dark energy transfer has been detected in your stellar system. This transfer slowed down the inflation of the Universe and triggered a cosmic real estate crisis. To restore our profits we have removed your star. We apologize for any inconvenience and wish you a good night. ~The department of intergalactic spacelords.", didTapContinueButtonAfterSunHasBeenRemoved);
        }
      }

      // Check if strawberry has collided with the Earth
      // ------------------

      if (isCollidedWithTheEarth(straberryPosition)) {
        strawberryCounter.increment();

        if (shownStraberryHasLandedOnEarthMessage) {
          showNewStrawberry();
        } else {
          physics.state.paused = true;
          shownStraberryHasLandedOnEarthMessage = true;

          gameoverMessage.showWithContinueButton("The giant strawberry safely landed on the Earth and kept standing there without any signs of activity. On closer examination it appeared to be made of some kind of mineral similar to diamond. The landing site has soon become a popular tourist attraction where one can buy a smoothie or a strawberry-shaped souvenir.", didTapContinueButtonAfterCollisionWithEarth);

          helper.hideBlockElement(straberryElement);
        }
      }
    }

    function didTapContinueButtonAfterSunHasBeenRemoved() {
      gameoverMessage.hide();
      physics.state.paused = false;
    }

    function didTapContinueButtonAfterCollisionWithEarth() {
      gameoverMessage.hide();
      showNewStrawberry();
      physics.state.paused = false;
    }

     // Return true if the strawberry has collided with the Sun
    function isCollidedWithTheSun(straberryPosition) {
      var sizeOfTheSun = 1.2 * graphics.values.currentSunsSizePixels;
      if (sizeOfTheSun < 50) { sizeOfTheSun = 50; }
      return collision.areCollided(straberryPosition, graphics.values.center, sizeOfTheSun);
    }

    // Return true if the strawberry has collided with the Earth
    function isCollidedWithTheEarth(straberryPosition) {
      return collision.areCollided(straberryPosition, graphics.values.earthPosition, 2.0 * graphics.values.earthSize);
    }

    function updatePosition() {
      var distanceTravelledInOneFrame = speedMetersPerSecond * physics.constants.timeIncrementPerFrameInSeconds;
      distanceFromTheSunMeters -= distanceTravelledInOneFrame;
    }

    function drawStraberry(position) {
      var left = (position.x - strawberrySizePixels / 2) + "px";
      var top = (position.y - strawberrySizePixels / 2) + "px";
      straberryElement.style.left = left;
      straberryElement.style.top = top;
    }

    function calculatePosition(distance, angle) {
      var rotationSign = rotationClockwise ? 1 : -1;
      var udatedAngle = rotationSign * Math.sin(distance / 300) * 3 + angle;
      var centerX = Math.cos(udatedAngle) * distance + graphics.values.center.x;
      var centerY = Math.sin(-udatedAngle) * distance + graphics.values.center.y;

      return {
        x: centerX,
        y: centerY
      };
    }

    function showNewStrawberry() {
      distanceFromTheSunMeters = initialDistanceFromTheSunMeters;
      angle = calculateNewAngle(strawberryCounter.values.collectedNumber + 1);
      rotationClockwise = seedableRandom.getBoolean();
      helper.showBlockElement(straberryElement);
    }

    function calculateNewAngle(number) {
      return 2 * Math.PI * seedableRandom.nextValue();
    }

    function reset() {
      seedableRandom.reset();
      showNewStrawberry();
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
        framesPerSecond: 60,
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

    function hideCanvasNotSupportedMessage() {
      document.getElementById("EarthOrbitSimulation-notSupportedMessage").style.display ='none';
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
      if (initCanvas()) { return; }
      if (initHabitableZoneCanvas()) { return; }

      // If we got to this point it means the browser can draw
      // Hide the old browser message
      hideCanvasNotSupportedMessage();

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

    function saveAsImage() {
      var dataUrl = canvas.toDataURL("image/png");
      var newWindow = window.open('about:blank','Carl in Orbit');
      newWindow.document.write("<img src='" + dataUrl + "' alt='Carl in Orbit'/><p>Long tap or right-click on the image  to save it</p>");
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
      updateSunSizeAndBrightness: updateSunSizeAndBrightness,
      redrawHabitableZone: redrawHabitableZone,
      clearScene: clearScene,
      saveAsImage: saveAsImage,
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
      strawberry.update();

      climate.update(physics.state.distance.value,
        habitableZone.values.innerDistanceMeters,
        habitableZone.values.outerDistanceMeters);

      window.requestAnimationFrame(animate);
    }

    function start() {
      graphics.init(function() {
        // Use the initial conditions for the simulation
        physics.resetStateToInitialConditions();
        strawberry.reset();
        gameoverMessage.init();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.clearScene();
          console.log(physics.state.massOfTheSunKg);
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
      physics.resetStateToInitialConditions();
      graphics.clearScene();
      updateSunsMass(0.5);
      massSlider.changePosition(0.5);
      climate.reset();
      physics.state.paused = false;
      simulationTime.reset();
      strawberry.reset();
      massSlider.enabled = true;
      strawberryCounter.reset();
      return false; // Prevent default click
    }

    function init() {
      massSlider = SickSlider(".EarthOrbitSimulation-massSlider");
      massSlider.onSliderChange = updateSunsMass;
      massSlider.changePosition(0.5);
      restartButton.onclick = didClickRestart;

      // restartButtonTwo.onclick = function() {
      //   graphics.saveAsImage();
      //   return false; // Prevent default
      // };
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

  userInput.init();

  simulation.start();
})();

</script>

<!-- Simulator END -->


## Carl's experiment


Thursday noon of 23 October 1997. Doctor Carl Cox smashes a ripe strawberry lying on his laboratory desk with his broad forehead and shouts "It is wonderful!". He leans towards a brand new Pentium 2 computer and emails one word to his friend and colleague Neil Feynman: "Fragaria".

What just happened today to Carl, and, consequently, to everything else in the vicinity of the 100,000 galaxies within the Laniakea Supercluster, is quite remarkable and is worth explaining. Doctor Carl has just discovered a way of *increasing* the mass of the Sun by feeding it the dark energy from the area in space stretching billions and billions of light years. This trick, bizarrely, involves berries from the local grocery shop and works both ways: the Sun's mass can also be *reduced* by pumping it back into the surrounding area of the Universe.

Carl approaches a big shiny metallic box with blinking buttons and pushes several of them. A big warning message box "Are you sure you want to execute the `big_bloody_sun` script?" appears on the computer screen of the apparatus. Without hesitation Carl presses the "Enter" button and returns to his desk with a satisfied grin on hist tired face. He wipes off berry juice from his forehead with a manuscript of a finished paper titled "Cross pollination of Honeysuckles in zero gravity by bumblebees" that was planned to be submitted to the Astrobotanical Review journal. This paper is not important anymore. Nothing really is.

## Orbital distance and Newton's Law of Universal Gravitation

The short-term implications of this experiment are obvious to any student who attended an introductory astronomy class. What happens to the Earth if the mass of the Sun increases? One of the most fundamental laws, Newton's Law of Universal Gravitation, tells us that the force of attraction between two bodies is proportional to the product of their masses and inversely proportional to the square of the distance between them [1, p. 131]. This law implies, that if Carl increases the mass of the Sun, it exerts stronger gravitational force on the Earth. As a result, the Earth *moves closer* to the Sun (see Figure 1).


<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2016-09-03-big-sun-experiment/massive_sun_smaller_earth_sun_distance.png' alt='Relationship between the mass of the Sun and the Sun-Earth distance'>
  <p>Figure 1: Mass of the Sun and the Sun-Earth distance.</p>
</div>


## Orbital period and Kepler's third law

It takes about 365 days for the Earth to complete one full circle around the Sun. This time is also called the *orbital period*. What happens to Earth's orbital period as it moves closer to the Sun? This question can be  answered by using Kepler third law [2, p. 27] that states that closer planets have smaller orbital periods. Therefore, the increase in Sun's mass will result in shorter year on the Earth.


## The Sun's luminosity

The increase in Sun's mass also affects its brightness, or luminosity. This happens because larger mass creates bigger gravitational pressure in its core, which increases the rate of fusion reaction that creates more light. How much brighter the Sun becomes if Carl doubles its mass? It will be about eight times brighter, because the luminosity of a star similar to the Sun is roughly proportional to the cube of its mass \(see Figure 2\)[3].

<div class='isTextCentered'>
  <img class='isMax500PxWide' src='/image/blog/2016-09-03-big-sun-experiment/massive_sun_is_brighter.png' alt='More massive stars are much brighter'>
  <p>Figure 2: Star's luminosity and mass.</p>
</div>

## Habitable zone

As we've shown, the planets receive more sunlight as the Sun's mass increases. As a result, if the Earth's distance to the Sun does not change, its average global temperature will increase. If it gets too hot, Earth's oceans will start to boil and that will probably be the death sentence to all the life on our planet. In astronomy, the range of distances from a star at which liquid water can exist on the surface of a planet is called the star's *habitable zone*. As Doctor Carl increases the mass of the Sun, its habitable zone moves *further away*.

We can see from Figure 3 that massive Sun would have more distant habitable zone. In this case, the Earth would be too close the Sun, and the water would boil and evaporate. Therefore, Carl Cox needs to be very careful and try not to keep Sun's mass high for too long. Otherwise, the heat will destroy all life on the planet.

<div class='isTextCentered'>
  <img class='isMax100PercentWide isTextCentered' src='/image/blog/2016-09-03-big-sun-experiment/star_habitable_zone.png' alt='More massive stars are much brighter'>
  <p>Figure 3: Star's habitable zone and mass.</p>
</div>


## Photo credits

1. **The Blue Marble**: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **The Sun photographed at 304 angstroms**: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

## References

* [1]. J. Bennet, M. Donahue, N. Schneider , and M. Voit, *Cosmic perspective*. United Kingdom: Pearson Education Limited, 2014.

* [2]. J. O. Bennett, G. S. Shostak, *Life in the Universe*, 4th ed. San Francisco, CA: Pearson, 2016.

* [3]. "[Mass-luminosity relationship](http://hyperphysics.phy-astr.gsu.edu/hbase/Astro/herrus.html#c3)". Hyperphysics. Retrieved 2016-09-03.

* [3]. [The complete source code](/files/2016/09/earth_orbit_simulation/the_complete_code/) of the Earth orbit simulation.

* [4]. Susskind, L., &amp; Hrabovsky, G. (2013). *The theoretical minimum: What you need to know to start doing physics*. New York: Basic Boks.