---
layout: blog_post
comments: false
title: "Programming harmonic oscillator"
meta_description: "This tutorial shows how to program the motion of harmonic oscillator."
tags: programming science
---

<canvas class="HarmonicOscillator-canvas">
</canvas>

<div class='DebugText'></div>

<h3 class="isHidden" id="CanvasNotSupportedMessage">Please use a newer browser to see the simulation</h3>


<!-- <div class='HarmonicOscillator'>
  <div class='HarmonicOscillator-box'></div><img class='HarmonicOscillator-springRight'
    src="/image/blog/2016-02-06-programming-harmonic-oscillator/harmonic_oscillator_spring.png">
</div> -->

<script>

// Request Animatino Frame polyfill
// https://gist.github.com/paulirish/1579671
//
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// ----------------------

(function(){
  function start(canvas, context) {
    var canvasHeight = 100;
    var boxSize = 50;

    // Initial condition for the system
    var initialConditions = {
      xDisplacement:  1.0, // Box is displaced to the right
      velocity:       0.0  // Velocity is zero
    };

    /*
      Position of the box:
        0 is when the box is at the center.
        1.0 is the maximum position to the right.
        -1.0 is the maximum position to the left.
    */
    var xDisplacement = initialConditions.xDisplacement;
    var velocity = initialConditions.velocity;

    // Time
    // ----------

    var previousTime = 0; // Stores time of the previous iteration (in milliseconds)
    var timeElapsed = 0; // Stores elapsed time in seconds from the start of emulation.

    var springInfo = {
      height: 30,
      numberOfSegments: 12
    };

    var colors = {
      shade30: "#a66000",
      shade40: "#ff6c00",
      shade50: "#ffb100"
    };

    function showDebugMessage(message) {
      var debugElement = document.querySelector(".DebugText");

      if (debugElement.textContent !== undefined) {
        debugElement.textContent = message;
      }
      else {
        debugElement.innerText = message;
      }
    }


    // Resize the canvas
    // ----------------------

    function fitToContainer(canvas){
      canvas.style.width='100%';
      canvas.style.height= canvasHeight + 'px';
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', function(event){
      fitToContainer(canvas);
      drawScene();
    });

    fitToContainer(canvas);

    // Draw
    // ----------------------

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
    function drawScene() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawMiddleLine();
      drawSpring(xDisplacement);
      drawBox(xDisplacement);
    }

    // Returns acceleration (change of velocity) at displacement x
    function accelerationAtDisplacement(x) {
      // We are using the main formula for harmonic oscillator:
      // a = -(k/m) * x
      return -x;
    }

    // Returns the time elapsed from previous iteration
    function deltaT(time) {
      return time - previousTime;
    }

    // Calculates velocity of the box at given time
    function calculateVelocity(time) {
      return velocity + deltaT(time) * accelerationAtDisplacement(xDisplacement);
    }

    // Calculates displacement at given time and velocity
    function calculateXDisplacelement(time, velocity) {
      return xDisplacement + deltaT(time) * velocity;
    }

    // Calculate the new X position of the box at given time
    function updateXDisplacement(time) {
      velocity = calculateVelocity(time);
      xDisplacement = calculateXDisplacelement(time, velocity);
    }

    function formatFloat(float) {
      return parseFloat(Math.round(float * 100) / 100).toFixed(2);
    }

    function animate(timeReal) {
      timeElapsed += 16 / 1000; // Increment time by 16 milliseconds (1/60 of a second)
      updateXDisplacement(timeElapsed);
      drawScene();
      previousTime = timeElapsed;
      window.requestAnimationFrame(animate);
    }

    animate(0);

    // for (var i = 1; i < 60; i++) {
    //   animate(80 * i);
    //   var velocityFormatted = formatFloat(velocity);
    //   var displacementFormatted = formatFloat(xDisplacement);
    //   console.log(i + ". velocity: " + velocityFormatted + ", x: " + displacementFormatted);
    // }
  }

  function showCanvasNotSupportedMessage() {
    document.getElementById("CanvasNotSupportedMessage").className = "";
  }

  function init() {
    var canvas = document.querySelector(".HarmonicOscillator-canvas");
    var context = null;

    if (!!(canvas && canvas.getContext)) {
      var context = canvas.getContext("2d", { alpha: false });
      if (!!context) {
        start(canvas, context);
        return;
      }
    }

    showCanvasNotSupportedMessage()
  }

  init();
}());

</script>

<style>

.HarmonicOscillator {
  position: relative;
  margin: 0 25px 0 25px;
  padding: 10px 0 10px 0;
  border: 1px solid #ff6c00;
}

.HarmonicOscillator-box {
  display: inline-block;
  position: relative;
  left: 40%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  vertical-align: middle;

  width: 50px;
  height: 50px;
  border: 1px solid #a66000;
  background-color: #ffb100;
  z-index: -1;
}

.HarmonicOscillator-springRight {
  display: inline-block;
  position: relative;
  width: 10%;
  height: 30px;
  padding-right: 25px;
  margin-left: -25px;
  left: 40%;
  vertical-align: middle;
  z-index: -1;
}

/* Vertical line in the center */
.HarmonicOscillator:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px dotted #ff6c00;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

</style>
