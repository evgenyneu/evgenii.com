---
layout: blog_post
comments: false
title: "Programming harmonic oscillator in HTML &amp; JavaScript"
meta_description: "This tutorial shows how to program the motion of harmonic oscillator with JavaScript."
tags: programming science
---

<!--  To embed this simulator into your web page copy this source code until "Harmonic Oscillator Simulator END" comment. -->

<!--

  Harmonic Oscillator Simulator

  http://evgenii.com

  License: MIT

-->

<!-- Message shown in old browsers. -->
<p id="HarmonicOscillator-notSupportedMessage" class="HarmonicOscillator-alert">Please use a newer browser to see the simulation.</p>

<div class="HarmonicOscillator">
  <canvas class="HarmonicOscillator-canvas"></canvas>

  <p class="HarmonicOscillator-isTextCentered">Mass<br>
    <input class="HarmonicOscillator-input HarmonicOscillator-inputSmall HarmonicOscillator-isTextCentered" type="number" id="HarmonicOscillator-mass" min="1" max="100" step="1" pattern="\d*">
  </p>

  <p class="HarmonicOscillator-isTextCentered">Spring constant<br>
    <input class="HarmonicOscillator-input HarmonicOscillator-inputSmall HarmonicOscillator-isTextCentered" type="number" id="HarmonicOscillator-springConstant" name="springConstant" min="1" max="100" step="1" pattern="\d*">
  </p>
</div>

<script>

(function(){
   // Calculate position and velocity of the box
  var physics = (function() {
    // Initial condition for the system
    var initialConditions = {
      xDisplacement:  1.0, // Box is displaced to the right
      velocity:       0.0, // Velocity is zero
      springConstant: 100.0, // The higher the value the stiffer the spring
      mass:           10.0 // The mass of the box
    };

    // Current state of the system
    var state = {
      /*
      Position of the box:
        0 is when the box is at the center.
        1.0 is the maximum position to the right.
        -1.0 is the maximum position to the left.
      */
      xDisplacement: 0,
      velocity: 0,
      springConstant: 0, // The higher the value the stiffer the spring
      mass: 0 // The mass of the box
    };

    var previousTime = 0; // Stores time of the previous iteration in seconds
    var timeElapsed = 0; // Stores elapsed time in seconds from the start of emulation.

    function resetStateToInitialConditions() {
      state.xDisplacement = initialConditions.xDisplacement;
      state.velocity = initialConditions.velocity;
      state.springConstant = initialConditions.springConstant;
      state.mass = initialConditions.mass;
    }

    // Returns acceleration (change of velocity) at displacement x
    function accelerationAtDisplacement(x) {
      // We are using the formula for harmonic oscillator:
      // a = -(k/m) * x
      // Where a is acceleration, x is displacement, k is spring constant and m is mass.

      return -(state.springConstant / state.mass) * x;
    }

    // Returns the time elapsed from previous iteration
    function deltaT(time) {
      return time - previousTime;
    }

    // Calculates velocity of the box at given time
    function calculateVelocity(time) {
      return state.velocity + deltaT(time) * accelerationAtDisplacement(state.xDisplacement);
    }

    // Calculates displacement at given time and velocity
    function calculateXDisplacelement(time, velocity) {
      return state.xDisplacement + deltaT(time) * state.velocity;
    }

    // Calculate the new X position of the box
    function updateXDisplacement() {
      timeElapsed += (16 / 1000); // Increment time by 16 milliseconds (1/60 of a second)
      state.velocity = calculateVelocity(timeElapsed);
      state.xDisplacement = calculateXDisplacelement(timeElapsed, state.velocity);
      previousTime = timeElapsed;
    }

    return {
      resetStateToInitialConditions: resetStateToInitialConditions,
      updateXDisplacement: updateXDisplacement,
      initialConditions: initialConditions,
      state: state,
    };
  })();

  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 100,
      boxSize = 50,
      springInfo = {
        height: 30, // Height of the spring
        numberOfSegments: 12 // Number of segments in the spring.
      },
      colors = {
        shade30: "#a66000",
        shade40: "#ff6c00",
        shade50: "#ffb100"
      };

    // Return the middle X position of the box
    function boxMiddleX(xDisplacement) {
      var boxSpaceWidth = canvas.width - boxSize;
      return boxSpaceWidth * (xDisplacement + 1) / 2 + boxSize / 2;
    }

    // Draw spring from the box to the center. Position argument is the box position and varies from -1 to 1.
    // Value 0 corresponds to the central position, while -1 and 1 are the left and right respectively.
    function drawSpring(xDisplacement) {
      var springEndX = boxMiddleX(xDisplacement),
        springTopY = (canvasHeight - springInfo.height) / 2,
        springEndY = canvasHeight / 2,
        canvasMiddleX = canvas.width / 2,
        singleSegmentWidth = (canvasMiddleX - springEndX) / (springInfo.numberOfSegments - 1),
        springGoesUp = true;

      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = colors.shade40;
      context.moveTo(springEndX, springEndY);

      for (var i = 0; i < springInfo.numberOfSegments; i++) {
        var currentSegmentWidth = singleSegmentWidth;
        if (i === 0 || i === springInfo.numberOfSegments - 1) { currentSegmentWidth /= 2; }

        springEndX += currentSegmentWidth;
        springEndY = springTopY;
        if (!springGoesUp) { springEndY += springInfo.height; }
        if (i === springInfo.numberOfSegments - 1) { springEndY = canvasHeight / 2; }

        context.lineTo(springEndX, springEndY);
        springGoesUp = !springGoesUp;
      }

      context.stroke();
    }

    // Draw a box at position. Position is a value from -1 to 1.
    // Value 0 corresponds to the central position, while -1 and 1 are the left and right respectively.
    function drawBox(xDisplacement) {
      var boxTopY = Math.floor((canvasHeight - boxSize) / 2);
      var startX = boxMiddleX(xDisplacement) - boxSize / 2;

      // Rectangle
      context.beginPath();
      context.fillStyle = colors.shade50;
      context.fillRect(startX, boxTopY, boxSize, boxSize);

      // Border around rectangle
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = colors.shade30;
      context.strokeRect(startX + 0.5, boxTopY + 0.5, boxSize - 1, boxSize - 1);
    }

    // Draw vertical line in the middle
    function drawMiddleLine() {
      var middleX = Math.floor(canvas.width / 2);

      context.beginPath();
      context.moveTo(middleX, 0);
      context.lineTo(middleX, canvas.height);
      context.lineWidth = 2;
      context.strokeStyle = colors.shade40;
      context.setLineDash([2,3]);
      context.stroke();
      context.setLineDash([1,0]);
    }

    // Clears everything and draws the whole scene: the line, spring and the box.
    function drawScene(xDisplacement) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawMiddleLine();
      drawSpring(xDisplacement);
      drawBox(xDisplacement);
    }

    function hideCanvasNotSupportedMessage() {
      document.getElementById("HarmonicOscillator-notSupportedMessage").style.display ='none';
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
      canvas = document.querySelector(".HarmonicOscillator-canvas");
      if (!(window.requestAnimationFrame && canvas && canvas.getContext)) { return; }
      context = canvas.getContext("2d", { alpha: false });
      if (!context) { return; }
      hideCanvasNotSupportedMessage();
      fitToContainer(); // Update the size of the canvas
      success();
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
      init: init
    };
  })();

  // Get input for the spring constant and mass form user
  var userInput = (function(){

    // Update mass and spring constant with selected values
    function updateSimulation(massInput, springConstantInput) {
      physics.resetStateToInitialConditions();
      physics.state.mass = parseFloat(massInput.value) || physics.initialConditions.mass;
      physics.state.springConstant = parseFloat(springConstantInput.value) || physics.initialConditions.springConstant;
    }

    function init() {
      // Mass
      // -----------

      var massInput = document.getElementById("HarmonicOscillator-mass");

      // Set initial mass value
      massInput.value = physics.initialConditions.mass;

      // User updates mass in simulation
      massInput.addEventListener('input', function() {
        updateSimulation(massInput, springConstantInput);
      });

      // Spring constant
      // -----------

      var springConstantInput = document.getElementById("HarmonicOscillator-springConstant");

      // Set initial spring constant value
      springConstantInput.value = physics.initialConditions.springConstant;

      // User updates spring constant in simulation
      springConstantInput.addEventListener('input', function() {
        updateSimulation(massInput, springConstantInput);
      });
    }

    return {
      init: init
    };
  })();

  // Start the animation
  var main = (function() {
    function animate() {
      physics.updateXDisplacement();
      graphics.drawScene(physics.state.xDisplacement);
      window.requestAnimationFrame(animate);
    }

    function init() {
      graphics.init(function() {
        userInput.init();
        physics.resetStateToInitialConditions();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.drawScene(physics.state.xDisplacement);
        });

        // Start the animation sequence
        animate();
      });
    }

    return {
      init: init
    };
  })();

  main.init();
})();

</script>

<!-- Styles for Harmonic Oscillator -->
<style>
  .HarmonicOscillator-input { padding: 10px 7px 7px 7px; }
  .HarmonicOscillator-inputSmall { width: 4em; }
  .HarmonicOscillator-isTextCentered { text-align: center; }
  .HarmonicOscillator-alert { color: red; border: 1px solid red; background: #ffdddd; padding: 5px;}
</style>

<!-- Harmonic Oscillator Simulator END -->

<br>

In this tutorial we will program a simulation of a harmonic oscillator shown above using HTML and JavaScript. All you will need is a text editor and a web browser. No prior knowledge in programming or physics is required. Feel free to skip those physics parts that you are not familiar with, they are not necessary for writing the program. The resulting code is released under MIT license and can be embedded into a page on any web site.

In this tutorial consist of the following chapters:

1. [Overview of harmonic oscillator](#overview)
1. [Drawing the model using HTML canvas](#drawing)
1. Deriving the equation of motion for harmonic oscillator
1. Solving the equation of motion numerically with Euler's method
1. Programming user input for mass and spring constant

<h2 id="overview">1. Overview of harmonic oscillator</h2>

Harmonic oscillator is a system frequently used in physics to describe various processes. This system has a rest position called *equilibrium*. If we move the system in any direction from the equilibrium there is force that pushes it back. The further away we displace the system the stronger is the force in the opposite direction. Or if we use the math language the force is opposite and proportional to the displacement *x*:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-04-16-programming-harmonic-oscillator/001_0010_harmonic_oscillator_equation.png' alt='Harmonic oscillator equation: F=-kx'>.
  </span>
  <span>(1)</span>
</div>

We can think of a simple model for the harmonic oscillator consisting of a box that is attached to the ground with a spring. The *k* value in Equation 1 is the **spring constant** which describes the stiffness of the spring. The larger the *k* value the harder it is to stretch or compress the spring.

To make things simple let's assume we are living in an ideal world with no friction. Therefore, if we displace the box and let it go it will keep moving back and forth forever.




<h2 id="drawing">2. Drawing the model using HTML canvas</h2>

Let's begin our program by drawing the model consisting of a box and a spring. In later chapters we will animate this drawing according to the equation of motion of harmonic oscillator.

<h3 id="drawing">2.1 Creating HTML document</h2>

* Create a new text file using a text editor of your choice.
* Write "Hello World!" in that file and save it to a local folder.
* Name the file **harmonic.html**
* Open the file in any web browser and you will see a page containing "Hello World!" message. On most operating systems you can open a local html file by just double-clicking it in your file manager. Alternatively, you can open it from your web browser's *File > Open* menu.

<a href="/files/2016/04/harmonic_oscillator/1.1.create_html_file.html" target="_blank" class="Button">Demo</a>

```HTML
Hello World!
```

