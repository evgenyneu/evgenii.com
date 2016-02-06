---
layout: blog_post
comments: false
title: "Programming harmonic oscillator"
meta_description: "This tutorial shows how to program the motion of harmonic oscillator."
tags: programming science
---

<canvas class="HarmonicOscillator-canvas">
</canvas>

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

    // Resize the canvas
    // ----------------------

    function fitToContainer(canvas){
      canvas.style.width='100%';
      canvas.style.height= canvasHeight + 'px';
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', function(event){
      console.log("resizing");
      fitToContainer(canvas);
      draw();
    });

    fitToContainer(canvas);

    // Draw
    // ----------------------

    //
    // Draw a box at position. Position is a value from -1 to 1.
    // Value 0 corresponds to the central position, while -1 and 1 are the left and right respectively.
    //
    function drawBox(position) {
      var boxTopY = Math.floor((canvasHeight - boxSize) / 2);
      var boxSpaceWidth = canvas.width - boxSize;

      var middleX = boxSpaceWidth * (position + 1) / 2;

      // Rectangle
      context.fillStyle = "#ffb100";
      context.fillRect(middleX, boxTopY, boxSize, boxSize);

      // Border around rectangle
      context.lineWidth = 1;
      context.strokeStyle = "#a66000";
      context.setLineDash([1, 0]);
      context.strokeRect(middleX + .5, boxTopY + .5, boxSize - 1, boxSize - 1)
    }

    function drawMiddleLine() {
      var middleX = Math.floor(canvas.width / 2);

      context.beginPath();
      context.moveTo(middleX, 0);
      context.lineTo(middleX, canvas.height);
      context.lineWidth = 2;
      context.strokeStyle = "#ff6c00";
      context.setLineDash([2,3]);
      context.stroke();
    }

    function draw() {
      drawMiddleLine();
      drawBox(0);
    }

    draw();
  }

  function init() {
    var canvas = document.querySelector(".HarmonicOscillator-canvas");

    if (!!(canvas && canvas.getContext && canvas.getContext('2d'))) {
      var context = canvas.getContext("2d");
      start(canvas, context);
    } else {
      // Canvas is not supported
      document.getElementById("CanvasNotSupportedMessage").className = "";
    }
  }

  init();


  // var positionPercent = 0;
  // var isMovingForward = true;


  // function updatePosition() {
  //   if (isMovingForward) {
  //     if (positionPercent == 100) {
  //       isMovingForward = false;
  //     }
  //   } else {
  //     if (positionPercent == 0) {
  //       isMovingForward = true;
  //     }
  //   }

  //   if (isMovingForward) {
  //     positionPercent += 1;
  //   } else {
  //     positionPercent -= 1;
  //   }
  // }

  // function animate() {
  //   updatePosition();
  //   box.style.left = positionPercent + "%";
  //   window.requestAnimationFrame(animate)
  // }
}());

// var box = document.querySelector(".HarmonicOscillator-box");
// var positionPercent = 0;
// var isMovingForward = true;


// function updatePosition() {
//   if (isMovingForward) {
//     if (positionPercent == 100) {
//       isMovingForward = false;
//     }
//   } else {
//     if (positionPercent == 0) {
//       isMovingForward = true;
//     }
//   }

//   if (isMovingForward) {
//     positionPercent += 1;
//   } else {
//     positionPercent -= 1;
//   }
// }

// function animate() {
//   updatePosition();
//   box.style.left = positionPercent + "%";
//   window.requestAnimationFrame(animate)
// }

// window.onload = function() { window.requestAnimationFrame(animate); }

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
  -webkit-transform: translate(-50%, 0);;
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
 /* -webkit-transform: translate(-25px, 0);
  transform: translate(-25px, 0);*/
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

