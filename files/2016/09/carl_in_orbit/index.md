---
layout: default
noindex: true
comments: false
title: "Carl in Orbit"
---

<!--  To embed this simulator into your web page copy this source code until "Simulator END" comment. -->

<!--

  Earth Orbit Simulator

  http://evgenii.com

  License: Public Domain

-->

<!-- Styles -->
<style>
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

  .EarthOrbitSimulation-earth {
    position: absolute;
    width: 25px;
    -webkit-animation:spin .1s linear infinite;
    -moz-animation:spin .1s linear infinite;
    animation:spin .1s linear infinite;
    z-index: 1000;
  }

  .EarthOrbitSimulation-earthEnd {
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

  .EarthOrbitSimulation-earthEndMessage {
    color: #DDDDDD;
    font-size: 1.3em;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .EarthOrbitSimulation-earthEndButton {
    color: #ffb100;
    padding: 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid #ffb100;
  }

  .EarthOrbitSimulation-reloadButton {
    background-color: #ff9400;
    color: #ffffff;
    padding: 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid #ffb100;
  }

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
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }

  .EarthOrbitSimulation-canvas { display: block; }

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

  /*

  Sick Slider
  --------------

  */

  .SickSlider {
    position: relative;
    height: 60px;
    cursor: pointer;
  }

  .SickSlider-stripe {
    height: 5px;
    width: 100%;
    background-color: #999999;
    /*border: 1px solid #a66000;*/
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
<p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>
    <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>
    <canvas class="EarthOrbitSimulation-canvas"></canvas>

    <div class="EarthOrbitSimulation-earthEnd EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-isHiddenBlock">
      <div class="EarthOrbitSimulation-earthEndMessage">
        "My wonder button is being pushed all the time."
        <br><br>Carl Sagan
        <br><br><br>
        <a class="EarthOrbitSimulation-earthEndButton" href="#">💥 Wonder Button ✨</a>
      </div>

    </div>
</div>
<div class='EarthOrbitSimulation-isTextCentered isUnselectable'>
  <br>
  Mass of the Sun: <span class='EarthOrbitSimulation-sunsMass'>1.00</span>
</div>

<div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<p class="EarthOrbitSimulation-isTextCentered">
  <a class="EarthOrbitSimulation-reloadButton" href="#">Restart</a>
</p>

<p class='EarthOrbitSimulation-debugOutput'></p>

<script>

(function(){
  // A Slider UI element
  function SickSlider(sliderElementSelector) {
    var that = {
      // A function that will be called when user changes the slider position.
      // The function will be passed the slider position: a number between 0 and 1.
      onSliderChange: null,
      // Store the previous slider value in order to prevent calling onSliderChange function with the same argument
      previousSliderValue: -42
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

      that.slider.onselectstart = function () { return false; }

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
        print: print,
      };
  })();

  // Calculates the position of the Earth
  var physics = (function() {
    var constants = {
      gravitationalConstant: 6.67408 * Math.pow(10, -11),
      earthSunDistanceMeters: 1.496 * Math.pow(10, 11),
      earthAngularVelocityMetersPerSecond: 1.990986 *  Math.pow(10, -7),
      massOfTheSunKg: 1.98855 * Math.pow(10, 30)
    };

    // The length of one AU (Earth-Sun distance) in pixels.
    var pixelsInOneEarthSunDistancePerPixel = 150;

    // A factor by which we scale the distance between the Sun and the Earth
    // in order to show it on screen
    var scaleFactor = constants.earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;

    // The number of calculations of orbital path done in one 16 millisecond frame.
    // The higher the number, the more precise are the calculations and the slower the simulation.
    var numberOfCalculationsPerFrame = 1000;

    // The length of the time increment, in seconds.
    var deltaT = 3600 * 24 / numberOfCalculationsPerFrame;

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
    function scaledDistance() {
      return state.distance.value / scaleFactor;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current positions of the bodies
    function updatePosition() {
      if (physics.state.paused) { return; }
      for (var i = 0; i < numberOfCalculationsPerFrame; i++) {
        calculateNewPosition();
      }

    }

    // Calculates position of the Earth
    function calculateNewPosition() {
      // Calculate new distance
      var distanceAcceleration = calculateDistanceAcceleration(state);
      state.distance.speed = newValue(state.distance.speed, deltaT, distanceAcceleration);
      state.distance.value = newValue(state.distance.value, deltaT, state.distance.speed);

      // Calculate new angle
      var angleAcceleration = calculateAngleAcceleration(state);
      state.angle.speed = newValue(state.angle.speed, deltaT, angleAcceleration);
      state.angle.value = newValue(state.angle.value, deltaT, state.angle.speed);

      if (state.angle.value > 2 * Math.PI) {
        state.angle.value = state.angle.value % (2 * Math.PI);
      }
    }

    // Updates the mass of the Sun
    function updateFromUserInput(solarMassMultiplier) {
      state.massOfTheSunKg = constants.massOfTheSunKg * solarMassMultiplier;
    }

    return {
      scaledDistance: scaledDistance,
      resetStateToInitialConditions: resetStateToInitialConditions,
      updatePosition: updatePosition,
      initialConditions: initialConditions,
      updateFromUserInput: updateFromUserInput,
      state: state
    };
  })();

  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 400,
      earthSize = 25,
      sunsSize = 60,
      colors = {
        orbitalPath: "#777777"
      },
      previousEarthPosition = null,
      earthElement,
      sunElement,
      earthEndElement,
      currentSunsSize = sunsSize;
      middleX = 1,
      middleY = 1

    function showHideEarthEndMessage(show) {
      earthEndElement.style.display = show ? 'block' : 'none';
    }

    function drawTheEarth(earthPosition) {
      var left = (earthPosition.x - earthSize/2) + "px";
      var top = (earthPosition.y - earthSize/2) + "px";
      earthElement.style.left = left;
      earthElement.style.top = top;
    }

    function calculateEarthPosition(distance, angle) {
      middleX = Math.floor(canvas.width / 2);
      middleY = Math.floor(canvas.height / 2);
      var centerX = Math.cos(angle) * distance + middleX;
      var centerY = Math.sin(-angle) * distance + middleY;

      return {
        x: centerX,
        y: centerY
      };
    }

    // Updates the size of the Sun based on its mass. The sunMass argument is a fraction of the real Sun's mass.
    function updateSunSize(sunMass) {
      var sunsDefaultWidth = sunsSize;
      currentSunsSize = sunsDefaultWidth * Math.pow(sunMass, 1/5);
      sunElement.style.width = currentSunsSize + "px";
      sunElement.style.marginLeft = -(currentSunsSize / 2.0) + "px"
      sunElement.style.marginTop = -(currentSunsSize / 2.0) + "px"
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
      var correctedSunsSize = currentSunsSize - 20;
      var sunHalf = correctedSunsSize / 2;
      var sunLeft = middleX - sunHalf;
      var sunRight = middleX + sunHalf;
      var sunTop = middleY - sunHalf;
      var sunBottom = middleY + sunHalf;

      return (earthPosition.x >= sunLeft && earthPosition.x <= sunRight
        && earthPosition.y >= sunTop && earthPosition.y <= sunBottom);
    }

    // Draws the scene
    function drawScene(distance, angle) {
      var earthPosition = calculateEarthPosition(distance, angle);
      drawTheEarth(earthPosition);
      drawOrbitalLine(earthPosition);

      if (isEarthCollidedWithTheSun(earthPosition)) {
        physics.state.paused = true;
        showHideEarthEndMessage(true);
      }
    }

    function hideCanvasNotSupportedMessage() {
      document.getElementById("EarthOrbitSimulation-notSupportedMessage").style.display ='none';
    }

    // Resize canvas to will the width of container
    function fitToContainer(){
      canvas.style.width='100%';
      canvas.style.height= canvasHeight + 'px';
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    // Create canvas for drawing and call success argument
    function init(success) {
      // Find the canvas HTML element
      canvas = document.querySelector(".EarthOrbitSimulation-canvas");

      // Check if the browser supports canvas drawing
      if (!(window.requestAnimationFrame && canvas && canvas.getContext)) { return; }

      // Get canvas context for drawing
      context = canvas.getContext("2d");
      if (!context) { return; } // Error, browser does not support canvas

      // If we got to this point it means the browser can draw
      // Hide the old browser message
      hideCanvasNotSupportedMessage();

      // Update the size of the canvas
      fitToContainer();

      earthElement = document.querySelector(".EarthOrbitSimulation-earth");
      sunElement = document.querySelector(".EarthOrbitSimulation-sun");
      earthEndElement = document.querySelector(".EarthOrbitSimulation-earthEnd");

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
      updateSunSize: updateSunSize,
      showHideEarthEndMessage: showHideEarthEndMessage,
      clearScene: clearScene,
      init: init
    };
  })();

  // Start the simulation
  var simulation = (function() {
    // The method is called 60 times per second
    function animate() {
      physics.updatePosition();
      graphics.drawScene(physics.scaledDistance(), physics.state.angle.value);
      window.requestAnimationFrame(animate);
    }

    function start() {
      graphics.init(function() {
        // Use the initial conditions for the simulation
        physics.resetStateToInitialConditions();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.clearScene();
          graphics.drawScene(physics.scaledDistance(), physics.state.angle.value);
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
    var restartButton = document.querySelector(".EarthOrbitSimulation-earthEndButton");
    var restartButtonTwo = document.querySelector(".EarthOrbitSimulation-reloadButton");
    var massSlider;

    function updateSunsMass(sliderValue) {
      var sunsMassValue = sliderValue * 2;

      if (sunsMassValue > 1) {
        sunsMassValue = Math.pow(5, sunsMassValue - 1);
      }

      var formattedMass = parseFloat(Math.round(sunsMassValue * 100) / 100).toFixed(2)
      sunsMassElement.innerHTML = formattedMass;
      physics.updateFromUserInput(sunsMassValue);
      graphics.updateSunSize(sunsMassValue);
    }

    function didClickRestart() {
      graphics.showHideEarthEndMessage(false);
      physics.resetStateToInitialConditions();
      graphics.clearScene();
      updateSunsMass(0.5);
      massSlider.changePosition(0.5);
      physics.state.paused = false;
      return false; // Prevent default
    }

    function init() {
      massSlider = SickSlider(".EarthOrbitSimulation-massSlider");
      massSlider.onSliderChange = updateSunsMass;
      massSlider.changePosition(0.5);
      restartButton.onclick = didClickRestart;
      restartButtonTwo.onclick = didClickRestart;
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();

</script>

<!-- Simulator END -->


## Photo credits

1. **The Blue Marble**: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **The Sun photographed at 304 angstroms**: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

## References

* [The complete source code](/files/2016/09/earth_orbit_simulation/the_complete_code/) of the Earth orbit simulation.

* Susskind, L., &amp; Hrabovsky, G. (2013). The theoretical minimum: What you need to know to start doing physics. New York: Basic Boks.

* [Programming a harmonic oscillator](/blog/programming-harmonic-oscillator/).