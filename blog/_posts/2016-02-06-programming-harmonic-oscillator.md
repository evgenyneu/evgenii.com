---
layout: blog_post
comments: false
title: "Programming harmonic oscillator"
meta_description: "This tutorial shows how to program the motion of harmonic oscillator."
tags: programming science
---

<canvas class="HarmonicOscillator-canvas" height="100">
</canvas>


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

var canvas = document.querySelector(".HarmonicOscillator-canvas");
// canvas.style.width ='100%';
// canvas.width  = canvas.offsetWidth;
var context = canvas.getContext("2d");

function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100px';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

fitToContainer(canvas);

function draw() {
  context.fillStyle = "#ffb100";
  context.fillRect(0,0,50,50);

  context.strokeStyle = "#a66000";
  context.strokeRect(0,0,50,50)
}


window.addEventListener('resize', function(event){
  console.log("resizing");
  fitToContainer(canvas);
  draw();
});

draw();

var positionPercent = 0;
var isMovingForward = true;


function updatePosition() {
  if (isMovingForward) {
    if (positionPercent == 100) {
      isMovingForward = false;
    }
  } else {
    if (positionPercent == 0) {
      isMovingForward = true;
    }
  }

  if (isMovingForward) {
    positionPercent += 1;
  } else {
    positionPercent -= 1;
  }
}

function animate() {
  updatePosition();
  box.style.left = positionPercent + "%";
  window.requestAnimationFrame(animate)
}


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

.HarmonicOscillator-canvas {
  /*width: 200px;*/
  /*height: 100px;*/
  /*width: 100%;*/
  /*height: auto;*/
  background-color: green;
}

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

