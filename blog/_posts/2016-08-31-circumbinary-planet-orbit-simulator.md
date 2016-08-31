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
  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 200;

    function drawStar() {
      var middleX = Math.floor(canvas.width / 2);
      var middleY = Math.floor(canvas.height / 2);

      context.beginPath();
      context.arc(middleX, middleY, 50, 0, 2 * Math.PI);
      context.stroke();
    }

    // Clears everything and draws the whole scene: the line, spring and the box.
    function drawScene() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawStar();
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
    function start() {
      graphics.init(function() {
        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.drawScene();
        });

        graphics.drawScene();
      });
    }

    return {
      start: start
    };
  })();

  simulation.start();
})();

</script>