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


<div class='isTextCentered'>
  <img src='/image/blog/2016-08-31-circumbinary-planet-orbit-simulator/mockup_circumbinary_planet.png' alt='Circumbinary planet simulator mockup' class='isMax400PxWide'>
</div>

<script>

(function(){
  var physics = (function() {
    var initialConditions = {
      distance:    70.0,
      angle:       Math.PI / 6
    };

    // Current state of the system
    var state = {
      distance: 0,
      angle: 0
    };

    var deltaT = 0.016; // The length of the time increment, in seconds.

    function resetStateToInitialConditions() {
      state.distance = initialConditions.distance;
      state.angle = initialConditions.angle;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current positions of the bodies
    function updatePosition() {
      state.angle -= Math.PI / 30;
      if (state.angle > 2 * Math.PI) {
        state.angle = state.angle % (2 * Math.PI);
      }
    }

    return {
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
      graphics.drawScene(physics.state.distance, physics.state.angle);
      window.requestAnimationFrame(animate);
    }

    function start() {
      graphics.init(function() {
        // Use the initial conditions for the simulation
        physics.resetStateToInitialConditions();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.drawScene(physics.state.distance, physics.state.angle);
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