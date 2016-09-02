---
layout: blog_post
comments: false
title: "A simulation of the Earth orbiting the Sun"
meta_description: "This is a simulation of the Earth orbiting the Sun."
layout_class: theme-nightSky
tags: programming science
---

<!-- Styles for Harmonic Oscillator -->
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
  }

  .EarthOrbitSimulation-isTextCentered { text-align: center; }

  .EarthOrbitSimulation-earth {
    position: absolute;
    width: 25px;
    -webkit-animation:spin .1s linear infinite;
    -moz-animation:spin .1s linear infinite;
    animation:spin .1s linear infinite;
  }

  .EarthOrbitSimulation-sun {
    position: absolute;
    width: 75px;
    top: 50%;
    left: 50%;
    margin-left: -37.5px;
    margin-top: -37.5px;
    -webkit-animation:spin .5s linear infinite;
    -moz-animation:spin .5s linear infinite;
    animation:spin .5s linear infinite;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }

  .EarthOrbitSimulation-canvas { display: block; }

  .isUnselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    -o-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }

  .SickSlider {
    position: relative;
    height: 40px;
    cursor: pointer;
  }

  .SickSlider-stripe {
    height: 5px;
    width: 100%;
    background-color: #2289FF;
    border: 1px solid #699DFE;
    position: absolute;
    top: 18px;
    left: 0px;
  }

  .SickSlider-head {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 40px;
    background-color: #2289FF;
    border: 1px solid #FFFFFF;
  }
</style>

<!-- Message shown in old browsers. -->
<p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='/image/blog/2016-08-31-earth-orbit-simulation/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>
    <img src='/image/blog/2016-08-31-earth-orbit-simulation/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>
    <canvas class="EarthOrbitSimulation-canvas"></canvas>
</div>

<br>

<div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<br>

<button class='EarthOrbitSimulation-button'>Change mass</button>

<p class='EarthOrbitSimulation-debugOutput'></p>

<script>

(function(){
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

  var physics = (function() {
    var constants = {
      gravitationalConstant: 6.67408 * Math.pow(10, -11),
      earthSunDistanceMeters: 1.496 * Math.pow(10, 11),
      earthAngularVelocityMetersPerSecond: 1.990986 *  Math.pow(10, -7),
      massOfTheSunKg: 1.98855 * Math.pow(10, 30)
    }

    // The length of one AU (Earth-Sun distance) in pixels.
    var pixelsInOneEarthSunDistancePerPixel = 150;

    // A factor by which we scale the distance between the Sun and the Earth
    // in order to show it on screen
    var scaleFactor = constants.earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;

    // The number of calculations of orbital path done in one 16 millisecond frame.
    // The higher the number, the more precise are the calculations.
    var numberOfCalculationsPerFrame = 1000;

    var deltaT = 3600 * 24 / numberOfCalculationsPerFrame; // The length of the time increment, in seconds.

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
      massOfTheSunKg: constants.massOfTheSunKg
    };

    function calculateDistanceAcceleration(state) {
      // [acceleration of distance] = [distance][angular velocity]^2 - G * M / [distance]^2
      return state.distance.value * Math.pow(state.angle.speed, 2) -
        (constants.gravitationalConstant * state.massOfTheSunKg)
          / Math.pow(state.distance.value, 2);
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

      for (i = 0; i < numberOfCalculationsPerFrame; i++) {
        calculateNewPosition();
      }

    }

    function calculateNewPosition() {
      // Calculate new distance
      var distanceAcceleration = calculateDistanceAcceleration(state);
      state.distance.speed = newValue(state.distance.speed, deltaT, distanceAcceleration);
      state.distance.value = newValue(state.distance.value, deltaT, state.distance.speed);

      // Calculate new angle
      var angleAcceleration = calculateAngleAcceleration(state);
      state.angle.speed = newValue(state.angle.speed, deltaT, angleAcceleration);
      state.angle.value = newValue(state.angle.value, deltaT, state.angle.speed);

      // debug.print("Scaled distance:<br>" + scaledDistance() + "<br>"
      //   + "<br><b>Angle</b> <br> Acceleration: "
      //   + angleAcceleration + "<br>Speed: " + state.angle.speed + "<br>Value: " + state.angle.value + "<br><br><b>Distance</b> <br> Acceleration: "
      //   + distanceAcceleration + "<br>Speed: " + state.distance.speed + "<br>Value: " + state.distance.value);

      if (state.angle.value > 2 * Math.PI) {
        state.angle.value = state.angle.value % (2 * Math.PI);
      }
    }

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
      colors = {
        orbitalPath: "#777777"
      },
      previousEarthPosition = null,
      earthElement;

    function drawTheEarth(earthPosition) {
      var left = (earthPosition.x - earthSize/2) + "px";
      var top = (earthPosition.y - earthSize/2) + "px";
      earthElement.style.left = left;
      earthElement.style.top = top;
    }

    function calculateEarthPosition(distance, angle) {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);
      var centerX = Math.cos(angle) * distance + middleX;
      var centerY = Math.sin(-angle) * distance + middleY;

      return {
        x: centerX,
        y: centerY
      }
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

    // Clears everything and draws the whole scene: the line, spring and the box.
    function drawScene(distance, angle) {
      var earthPosition = calculateEarthPosition(distance, angle)
      drawTheEarth(earthPosition);
      drawOrbitalLine(earthPosition);
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

      // Execute success callback function
      success();
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
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
          graphics.drawScene(physics.scaledDistance(), physics.state.angle.value);
        });

        animate();
      });
    }

    return {
      start: start
    };
  })();

  // Get input for the mass and the spring constant from the user
  var userInput = (function(){
    function didClickButton() {
      physics.updateFromUserInput(0);
    }

    function initMassSlider() {
      var slider = document.querySelector(".EarthOrbitSimulation-massSlider");
      var sliderHead = document.querySelector(".SickSlider-head");
      var sliding = false;

      // Start dragging lider
      // -----------------

      slider.addEventListener("mousedown", function(e) {
        sliding = true;
        updateHeadPosition(e);
      });

      slider.addEventListener("touchstart", function(e) {
        sliding = true;
        updateHeadPosition(e);
      });

      // End dragging lider
      // -----------------

      document.addEventListener("mouseup", function(){
        sliding = false;
        debug.print("mouseup");
      });

      document.addEventListener("dragend", function(){
        sliding = false;
        debug.print("dragend");
      });

      document.addEventListener("touchend", function(e) {
        sliding = false;
        debug.print("touchend");
      });

      // Drag slider
      // -----------------

      document.addEventListener("mousemove", function(e) {
        if (!sliding) { return; }
        updateHeadPosition(e);
      });

      document.addEventListener("touchmove", function(e) {
        if (!sliding) { return; }
        updateHeadPosition(e);
      });

      function updateHeadPosition(e) {
        var pointerX = e.pageX;

        if (e.touches && e.touches.length > 0) {
          pointerX = e.touches[0].pageX;
        }

        var pointerX = pointerX - slider.offsetLeft;
        var headLeft = (pointerX - 16);
        if (headLeft < 0) { headLeft = 0; }

        if ((headLeft + sliderHead.offsetWidth) > slider.offsetWidth) {
          headLeft = slider.offsetWidth - sliderHead.offsetWidth;
        }

        sliderHead.style.left = headLeft + "px";
      }
    }

    function init() {
      var button = document.querySelector(".EarthOrbitSimulation-button");
      button.onclick = didClickButton;

      initMassSlider()
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();

</script>

## Photo sources

1. **The Blue Marble**: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **The Sun photographed at 304 angstroms**, NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).