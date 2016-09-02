---
layout: blog_post
comments: false
title: "A simulation of the Earth orbiting the Sun written in JavaScript"
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
  }

  .EarthOrbitSimulation-isTextCentered { text-align: center; }
</style>

<!-- Message shown in old browsers. -->
<p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container EarthOrbitSimulation-isTextCentered">
  <canvas class="EarthOrbitSimulation-canvas"></canvas>
</div>

<button class='EarthOrbitSimulation-button'>Change mass</button>

<p class='EarthOrbitSimulation-debugOutput'></p>

<script>

(function(){
  var debug = (function(){
    var debugOutput = document.querySelector(".EarthOrbitSimulation-debugOutput");

    function print(text) {
      debugOutput.innerHTML = text;
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
    var pixelsInOneEarthSunDistancePerPixel = 90;

    // A factor by which we scale the distance between the Sun and the Earth
    // in order to show it on screen
    var scaleFactor = constants.earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;

    var deltaT = 3600 * 24; // The length of the time increment, in seconds.

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
      canvasHeight = 200,
      bodySizes = {
        sun: 15,
        earth: 5
      },
      colors = {
        sun: "#FFFFFF",
        earth: "#2289FF"
      };

    function drawTheSun() {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);

      context.beginPath();
      context.fillStyle = colors.sun;
      context.arc(middleX, middleY, bodySizes.sun, 0, 2 * Math.PI);
      context.fill();
    }

    function drawTheEarth(distance, angle) {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);
      var centerX = Math.cos(angle) * distance + middleX;
      var centerY = Math.sin(angle) * distance + middleY;

      context.beginPath();
      context.fillStyle = colors.earth;
      context.arc(centerX, centerY, bodySizes.earth, 0, 2 * Math.PI);
      context.fill();
    }

    // Clears everything and draws the whole scene: the line, spring and the box.
    function drawScene(distance, angle) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawTheSun();
      drawTheEarth(distance, angle);
    }

    function hideCanvasNotSupportedMessage() {
      document.getElementById("EarthOrbitSimulation-notSupportedMessage").style.display ='none';
    }

    // Resize canvas to will the width of container
    function fitToContainer(){
      canvas.style.width='200px';
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
      physics.updateFromUserInput(2);
    }

    function init() {
      var button = document.querySelector(".EarthOrbitSimulation-button");
      button.onclick = didClickButton;
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();

</script>