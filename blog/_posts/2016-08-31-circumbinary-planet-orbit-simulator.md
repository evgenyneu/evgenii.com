---
layout: blog_post
comments: false
title: "A simulation of an orbit of a circumbinary planet"
meta_description: "This is aAsimulation of a planet orbiting two stars. It allows to set masses and distances."
tags: programming science
---

<!-- Styles for Harmonic Oscillator -->
<style>
  .CircumbinaryPlanetSimulator-alert {
    color: red;
    border: 1px solid red;
    background: #ffeeee;
    padding: 5px;
  }
</style>

<!-- Message shown in old browsers. -->
<p id="CircumbinaryPlanetSimulator-notSupportedMessage" class="CircumbinaryPlanetSimulator-alert">Please use a newer browser to see the simulation.</p>

<canvas class="CircumbinaryPlanetSimulator-canvas"></canvas>

<p class='CircumbinaryPlanetSimulator-debugOutput'></p>


<div class='isTextCentered'>
  <img src='/image/blog/2016-08-31-circumbinary-planet-orbit-simulator/mockup_circumbinary_planet.png' alt='Circumbinary planet simulator mockup' class='isMax400PxWide'>
</div>

<script>

(function(){
  var debug = (function(){
    var debugOutput = document.querySelector(".CircumbinaryPlanetSimulator-debugOutput");

    function print(text) {
      debugOutput.innerHTML = text;
    }

    return {
        print: print,
      };
    })();

  var physics = (function() {
    var distanceCalculator = (function() {
      function calculateAcceleration(state) {
        // [acceleration of distance] = [distance][angular velocity]^2 - G * M / [distance]^2
        return state.distance.value * Math.pow(state.angle.speed, 2) -
          (constants.gravitationalConstant * state.star1.mass)
            / Math.pow(state.distance.value, 2);
      }

      return {
        calculateAcceleration: calculateAcceleration,
      };
    })();

    var angleCalculator = (function() {
      function calculateAcceleration(state) {
        // [acceleration of angle] = - 2[speed][angular velocity] / [distance]
        return -2.0 * state.distance.speed * state.angle.speed / state.distance.value;
      }

      return {
        calculateAcceleration: calculateAcceleration,
      };
    })();

    var constants = {
      gravitationalConstant: 6.67408 * Math.pow(10, -11),
      earthSunDistanceMeters: 1.496 * Math.pow(10, 11),
      earthAngularVelocityMetersPerSecond: 1.990986 *  Math.pow(10, -7),
      massOfTheSunKg: 1.98855 * Math.pow(10, 30)
    }

    // The length of one AU (Earth-Sun distance) in pixels.
    var pixelsInOneEarthSunDistancePerPixel = 50;

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
      },
      star1: {
        mass: constants.massOfTheSunKg
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
      star1: {
        mass: 0
      },
      star2: {
        mass: 0
      }
    };

    function newValue(currentValue, deltaT, derivative) {
      return currentValue + deltaT * derivative;
    }

    function resetStateToInitialConditions() {
      state.distance.value = initialConditions.distance.value;
      state.distance.speed = initialConditions.distance.speed;

      state.angle.value = initialConditions.angle.value;
      state.angle.speed = initialConditions.angle.speed;

      state.star1.mass = initialConditions.star1.mass;
    }

    // The distance that is used for drawing on screen
    function scaledDistance() {
      return state.distance.value / scaleFactor;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current positions of the bodies
    function updatePosition() {
      // Calculate new distance
      var distanceAcceleration = distanceCalculator.calculateAcceleration(state);
      state.distance.speed = newValue(state.distance.speed, deltaT, distanceAcceleration);
      state.distance.value = newValue(state.distance.value, deltaT, state.distance.speed);

      // Calculate new angle
      var angleAcceleration = angleCalculator.calculateAcceleration(state);
      state.angle.speed = newValue(state.angle.speed, deltaT, angleAcceleration);
      state.angle.value = newValue(state.angle.value, deltaT, state.angle.speed);

      debug.print("Scaled distance:<br>" + scaledDistance() + "<br>"
        + "<br><b>Angle</b> <br> Acceleration: "
        + angleAcceleration + "<br>Speed: " + state.angle.speed + "<br>Value: " + state.angle.value + "<br><br><b>Distance</b> <br> Acceleration: "
        + distanceAcceleration + "<br>Speed: " + state.distance.speed + "<br>Value: " + state.distance.value);

      if (state.angle.value > 2 * Math.PI) {
        state.angle.value = state.angle.value % (2 * Math.PI);
      }
    }

    return {
      scaledDistance: scaledDistance,
      resetStateToInitialConditions: resetStateToInitialConditions,
      updatePosition: updatePosition,
      initialConditions: initialConditions,
      state: state,
    };
  })();

  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 200,
      bodySizes = {
        star1: 15,
        star2: 5
      },
      colors = {
        star1: "#FF120D",
        star2: "#2289FF"
      };

    function drawStarOne() {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);

      context.beginPath();
      context.fillStyle = colors.star1;
      context.arc(middleX, middleY, bodySizes.star1, 0, 2 * Math.PI);
      context.fill();
    }

    function drawStarTwo(distance, angle) {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);
      var centerX = Math.cos(angle) * distance + middleX;
      var centerY = Math.sin(angle) * distance + middleY;

      context.beginPath();
      context.fillStyle = colors.star2;
      context.arc(centerX, centerY, bodySizes.star2, 0, 2 * Math.PI);
      context.fill();
    }

    // Clears everything and draws the whole scene: the line, spring and the box.
    function drawScene(distance, angle) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawStarOne();
      drawStarTwo(distance, angle);
    }

    function hideCanvasNotSupportedMessage() {
      document.getElementById("CircumbinaryPlanetSimulator-notSupportedMessage").style.display ='none';
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
      canvas = document.querySelector(".CircumbinaryPlanetSimulator-canvas");

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

  simulation.start();
})();

</script>