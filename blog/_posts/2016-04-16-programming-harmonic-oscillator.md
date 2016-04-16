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


<!-- Styles for Harmonic Oscillator -->
<style>
  .HarmonicOscillator-alert {
    color: red;
    border: 1px solid red;
    background: #ffeeee;
    padding: 5px;
  }

  .HarmonicOscillator-input { padding: 10px 7px 7px 7px; }
  .HarmonicOscillator-inputSmall { width: 4em; }
  .HarmonicOscillator-isTextCentered { text-align: center; }
</style>

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

<!-- Harmonic Oscillator Simulator END -->

<br>

In this tutorial we will program a simulation of a harmonic oscillator shown above using HTML and JavaScript. All you will need is a text editor and a web browser. No prior knowledge of programming or physics is required. Feel free to skip those physics parts that you are not familiar with, they are not necessary for doing this job. The resulting code can be embedded into a page on any web site.

## Contents

1. [Overview of harmonic oscillator](#overview)
1. [Drawing the box-spring model with HTML canvas](#drawing)
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




<h2 id="drawing">2. Drawing the box-spring model with HTML canvas</h2>

Let's begin writing our program by drawing the model consisting of a box and a spring. In later chapters we will animate this drawing according to the equation of motion of harmonic oscillator.

### 2.1 Hello from HTML

First, we will create an HTML file with a test message and open it in the web browser.

* Create a new text file using a text editor of your choice.
* Write "Hello World!" in that file and save it to a local folder.
* Name the file **harmonic.html**
* Open the file in any web browser and you will see a page containing "Hello World!" message. On most operating systems you can open a local html file by just double-clicking it in your file manager. Alternatively, you can open it from your web browser's *File > Open* menu.

```HTML
Hello World!
```

<a href="/files/2016/04/harmonic_oscillator/02_010_create_html_file.html" target="_blank" class="Button">Demo</a>


### 2.2 Canvas element

Now we will create the HTML canvas element. As you might have guessed from its name, this element is used for drawing.

* Replace "Hello World!" text in your HTML file with the following HTML code:

```HTML
<div class="HarmonicOscillator">
  <canvas class="HarmonicOscillator-canvas"></canvas>
</div>
```

<a href="/files/2016/04/harmonic_oscillator/02_020_canvas_element.html" target="_blank" class="Button">Demo</a>

View the file in a web browser and it will show a blank page. This is expected because we have not drawn anything in the canvas. Do not worry if you do not understand the code, you will get familiar with it with practice.

### 2.3 Hello from JavaScript

We will write our first JavaScript code by showing a "Hello World!" message. We will later extend this code to draw the box and the spring.

* Put this text *at the end* of your HTML file and you will see the 'Hello from JavaScript!' greeting in the web browser.

```HTML
<script>

(function(){

  document.write('Hello from JavaScript!');

  // This is a comment. Here we will write JavaScript that draws the simulation.

})();

</script>
```

<a href="/files/2016/04/harmonic_oscillator/02_030_javascript.html" target="_blank" class="Button">Demo</a>

### 2.4 View page source

You probably noticed the "Demo" buttons located under the code blocks.

* Click this demo button.

<a href="/files/2016/04/harmonic_oscillator/02_030_javascript.html" target="_blank" class="Button">Demo</a>


The button opens a web page showing the progress we've made up to this point. It can be also used to see the full source code we have written so far by using the **View Page Source** function of the web browser. In many desktop web browsers you can view the source by right clicking on the web page and selecting **View Page Source** option.



<div class='isTextCentered'>
  <img class='isMax250PxWide hasBorderShade90' src='/image/blog/2016-04-16-programming-harmonic-oscillator/002_040_view_page_source.png' alt='View web page source in Google Chrome.'>
</div>


* View the source code of the last demo page, it should look like this:


<img class='isMax100PercentWide hasBorderShade90' src='/image/blog/2016-04-16-programming-harmonic-oscillator/002_041_view_page_source.png' alt='View web page source in Google Chrome.'>

If you can not see the "View Page Source" menu option, try doing the right-click on a different place of the web page.

### 2.4 Graphics module

We create the JavaScript module called `graphics` that will be responsible for drawing.

* Replace the `document.write('Hello from JavaScript!');` line with the following code.

```JavaScript
// Draw the scene
var graphics = (function() {

  // Create canvas for drawing and call success argument
  function init(success) {
    document.write("Graphics initialized!");
  }

  return {
    init: init
  };
})();

graphics.init();
```

<a href="/files/2016/04/harmonic_oscillator/02_040_graphics_module.html" target="_blank" class="Button">Demo</a>

You will see the text "Graphics initialized!" in your browser. If you don't see the message check the source code in the demo page.

The `graphics` module we created consists of a single function called `init` that shows the text "Graphics initialized!" message. The function is exported by `return {init: init}` statement which allows to call this function from other modules. This trick is called "JavaScript module pattern"  and it is one of many ways to organize JavaScript code. We will use this module pattern to create other modules for physical simulation and user input.

After we defined the module we call its `init` function `graphics.init();` which prints the message.


### 2.5 Old browser alert

Some old browser do not support the drawing with HTML canvas. If this is the case we need notify the user.

* Add the following HTML code **in the beginning** of your file.

```HTML
<style>
  .HarmonicOscillator-alert {
    color: red;
    border: 1px solid red;
    background: #ffeeee;
    padding: 5px;
  }
</style>

<p id="HarmonicOscillator-notSupportedMessage" class="HarmonicOscillator-alert">Please use a newer browser to see the simulation.</p>
```

<a href="/files/2016/04/harmonic_oscillator/02_050_browser_support_message.html" target="_blank" class="Button">Demo</a>

This will show an alert message "Please use a newer browser to see the simulation." on top of the page. We will later hide this message on browsers that support canvas drawing.

As you probably noticed the code also includes styles the alert message. This language is called CSS (Cascading Style Sheets).


### 2.6 Hide old browser alert function

We add the function that we will later use to hide the "old browser" alert.

* Add this code **above** `init` function.

```JavaScript
function hideCanvasNotSupportedMessage() {
  document.getElementById("HarmonicOscillator-notSupportedMessage").style.display ='none';
}
```

<a href="/files/2016/04/harmonic_oscillator/02_060_hide_old_browser_message.html" target="_blank" class="Button">Demo</a>

You will still see the alert because we only defined and have not called the function that hides it.

### 2.6 Declare variables

We declare variables that will be used in the graphics module.

* Add the following JavaScript code in the beginning of the `graphics` module just below `var graphics = (function() {` line:

```JavaScript
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
```

<a href="/files/2016/04/harmonic_oscillator/02_070_add_variables.html" target="_blank" class="Button">Demo</a>

A variable is a named storage for information, like numbers of strings of text. When reading a source code you can infer the purpose of a variable from its name. For example, you can see a definition for the variable `boxSize = 50`. This is the place were we define the size of the box in our simulation.