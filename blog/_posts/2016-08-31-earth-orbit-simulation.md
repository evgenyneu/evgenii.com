---
layout: blog_post
comments: true
title: "Programming a simulation of the Earth orbiting the Sun"
meta_description: "This tutorial shows how to program a simulation of the Earth orbiting the Sun using JavaScript."
tags: programming science
---

<!--

  To embed this simulator into your web page copy this source code until "Simulator END" comment.

  Note that the code uses the images loaded from http://evgenii.com web site. You will need to host these images if you want to make sure the game always works and is not dependent on evgenii.com web site.

-->

<!--

  Earth Orbit Simulator

  http://evgenii.com/blog/earth-orbit-simulation

  License: Public Domain

  Image credits
  =============

  1. "The Blue Marble" By  NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans. Sources: http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg, https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg

  2. "The Sun photographed at 304 angstroms" by NASA/SDO (AIA). Sources: http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg, https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg

-->

<!-- Styles -->
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
    height: 400px;
    background-image: url("http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/starry_night.png");
    background-position: center bottom;
    background-repeat: repeat;
    background-size: 874px 260px;
  }

  .EarthOrbitSimulation-isTextCentered { text-align: center; }
  .EarthOrbitSimulation-isHiddenBlock { display: none; }

  .EarthOrbitSimulation-earth {
    position: absolute;
    width: 25px;
    top: -1000px;
    -webkit-animation:spin .1s linear infinite;
    -moz-animation:spin .1s linear infinite;
    animation:spin .1s linear infinite;
    z-index: 1000;
  }

  .EarthOrbitSimulation-earthEnd {
    position: absolute;
    background-color: #443344;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background-image: url("http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/starry_night.png");
    background-position: left top;
    background-repeat: repeat;
    background-size: 674px 220px;
  }

  .EarthOrbitSimulation-earthEndMessage {
    color: #DDDDDD;
    font-size: 1.3em;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .EarthOrbitSimulation-sun {
    position: absolute;
    width: 60px;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    -webkit-animation:spin .5s linear infinite;
    -moz-animation:spin .5s linear infinite;
    animation:spin .5s linear infinite;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }

  .EarthOrbitSimulation-canvas { display: block; }

  /* Prevent browser from showing selection when the element is touched */
  .isUnselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    -o-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }

  /*
    Hud display
    ---------
  */

  .EarthOrbitSimulation-hudContainer {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1001;
    left: 0;
    top: 0;
  }

  .EarthOrbitSimulation-hudContainerChild {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /*
    Reload button
    ---------
  */

  .EarthOrbitSimulation-reload {
    position: absolute;
    display: block;
    bottom: 10px;
    right: 15px;
    width: 40px;
    height: 40px;
    outline: none;
  }

  .EarthOrbitSimulation-reload:focus { outline: none; }

  .EarthOrbitSimulation-reloadIcon {
    width: 100%;
    border : 0;
  }

  .EarthOrbitSimulation-massSlider {
    max-width: 400px;
    margin: 0 auto;
  }

  /*

  Sick Slider
  --------------

  */

  .SickSlider {
    position: relative;
    height: 60px;
    cursor: pointer;
  }

  .SickSlider-stripe {
    height: 5px;
    width: 100%;
    background-color: #999999;
    /*border: 1px solid #a66000;*/
    position: absolute;
    top: 28px;
    left: 0px;
  }

  .SickSlider-head {
    position: absolute;
    top: 10px;
    left: 0;
    width: 30px;
    height: 40px;
    background-color: #ff9400;
    border: 1px solid #FFFFFF;
  }
</style>

<!-- Message shown in old browsers. -->
<p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>
    <img src='http://evgenii.com/image/blog/2016-08-31-earth-orbit-simulation/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>
    <canvas class="EarthOrbitSimulation-canvas"></canvas>

    <div class="EarthOrbitSimulation-earthEnd EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-isHiddenBlock">
      <div class="EarthOrbitSimulation-earthEndMessage">
        "My wonder button is being pushed all the time."
        <br><br>Carl Sagan
      </div>

    </div>

    <div class='EarthOrbitSimulation-hudContainer'>
      <div class='EarthOrbitSimulation-hudContainerChild'>
        <a class='EarthOrbitSimulation-reload' href='#'><img src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/reload_icon.png' alt='Restart' class='EarthOrbitSimulation-reloadIcon'></a>
      </div>
    </div>
</div>

<div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<div class='EarthOrbitSimulation-isTextCentered isUnselectable'>
  Mass of the Sun: <span class='EarthOrbitSimulation-sunsMass'>1.00</span>
</div>

<p class='EarthOrbitSimulation-debugOutput'></p>

<script>

(function(){
  // A Slider UI element
  function SickSlider(sliderElementSelector) {
    var that = {
      // A function that will be called when user changes the slider position.
      // The function will be passed the slider position: a number between 0 and 1.
      onSliderChange: null,
      // Store the previous slider value in order to prevent calling onSliderChange function with the same argument
      previousSliderValue: -42,
      didRequestUpdateOnNextFrame: false
    };

    // Initializes the slider element
    //
    // Arguments:
    //   sliderElementSelector: A CSS selector of the SickSlider element.
    that.init = function(sliderElementSelector) {
      that.slider = document.querySelector(sliderElementSelector);
      that.sliderHead = that.slider.querySelector(".SickSlider-head");
      var sliding = false;

      // Start dragging slider
      // -----------------

      that.slider.addEventListener("mousedown", function(e) {
        sliding = true;
        that.updateHeadPositionOnTouch(e);
      });

      that.slider.addEventListener("touchstart", function(e) {
        sliding = true;
        that.updateHeadPositionOnTouch(e);
      });

      that.slider.onselectstart = function () { return false; };

      // End dragging slider
      // -----------------

      document.addEventListener("mouseup", function(){
        sliding = false;
      });

      document.addEventListener("dragend", function(){
        sliding = false;
      });

      document.addEventListener("touchend", function(e) {
        sliding = false;
      });

      // Drag slider
      // -----------------

      document.addEventListener("mousemove", function(e) {
        if (!sliding) { return; }
        that.updateHeadPositionOnTouch(e);
      });

      document.addEventListener("touchmove", function(e) {
        if (!sliding) { return; }
        that.updateHeadPositionOnTouch(e);
      });

      that.slider.addEventListener("touchmove", function(e) {
        if (typeof e.preventDefault !== 'undefined' && e.preventDefault !== null) {
          e.preventDefault(); // Prevent screen from sliding on touch devices when the element is dragged.
        }
      });
    };

    // Returns the slider value (a number form 0 to 1) from the cursor position
    //
    // Arguments:
    //
    //   e: a touch event.
    //
    that.sliderValueFromCursor = function(e) {
      var pointerX = e.pageX;

      if (e.touches && e.touches.length > 0) {
        pointerX = e.touches[0].pageX;
      }

      pointerX = pointerX - that.slider.offsetLeft;
      var headLeft = (pointerX - 16);
      if (headLeft < 0) { headLeft = 0; }

      if ((headLeft + that.sliderHead.offsetWidth) > that.slider.offsetWidth) {
        headLeft = that.slider.offsetWidth - that.sliderHead.offsetWidth;
      }

      // Calculate slider value from head position
      var sliderWidthWithoutHead = that.slider.offsetWidth - that.sliderHead.offsetWidth;
      var sliderValue = 1;

      if (sliderWidthWithoutHead !== 0) {
        sliderValue = headLeft / sliderWidthWithoutHead;
      }

      return sliderValue;
    };


    // Changes the position of the slider
    //
    // Arguments:
    //
    //   sliderValue: a value between 0 and 1.
    //
    that.changePosition = function(sliderValue) {
      var headLeft = (that.slider.offsetWidth - that.sliderHead.offsetWidth) * sliderValue;
      that.sliderHead.style.left = headLeft + "px";
    };

    // Update the slider position and call the callback function
    //
    // Arguments:
    //
    //   e: a touch event.
    //
    that.updateHeadPositionOnTouch = function(e) {
      var sliderValue = that.sliderValueFromCursor(e);

      // Handle the head change only if it changed significantly (more than 0.1%)
      if (Math.round(that.previousSliderValue * 1000) === Math.round(sliderValue * 1000)) { return; }
      that.previousSliderValue = sliderValue;

      if (!that.didRequestUpdateOnNextFrame) {
        // Update the slider on next redraw, to improve performance
        that.didRequestUpdateOnNextFrame = true;
        window.requestAnimationFrame(that.updateOnFrame);
      }
    };

    that.updateOnFrame = function() {
      that.changePosition(that.previousSliderValue);

      if (that.onSliderChange) {
        that.onSliderChange(that.previousSliderValue);
      }

      that.didRequestUpdateOnNextFrame = false;
    };

    that.init(sliderElementSelector);

    return that;
  }

  // Show debug messages on screen
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

  // Calculates the position of the Earth
  var physics = (function() {
    var constants = {
      gravitationalConstant: 6.67408 * Math.pow(10, -11),
      earthSunDistanceMeters: 1.496 * Math.pow(10, 11),
      earthAngularVelocityMetersPerSecond: 1.990986 *  Math.pow(10, -7),
      massOfTheSunKg: 1.98855 * Math.pow(10, 30)
    };

    // The length of one AU (Earth-Sun distance) in pixels.
    var pixelsInOneEarthSunDistancePerPixel = 150;

    // A factor by which we scale the distance between the Sun and the Earth
    // in order to show it on screen
    var scaleFactor = constants.earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;

    // The number of calculations of orbital path done in one 16 millisecond frame.
    // The higher the number, the more precise are the calculations and the slower the simulation.
    var numberOfCalculationsPerFrame = 1000;

    // The length of the time increment, in seconds.
    var deltaT = 3600 * 24 / numberOfCalculationsPerFrame;

    // Initial condition of the model
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
      massOfTheSunKg: constants.massOfTheSunKg,
      paused: false
    };

    function calculateDistanceAcceleration(state) {
      // [acceleration of distance] = [distance][angular velocity]^2 - G * M / [distance]^2
      return state.distance.value * Math.pow(state.angle.speed, 2) -
        (constants.gravitationalConstant * state.massOfTheSunKg) / Math.pow(state.distance.value, 2);
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
      if (physics.state.paused) { return; }
      for (var i = 0; i < numberOfCalculationsPerFrame; i++) {
        calculateNewPosition();
      }

    }

    // Calculates position of the Earth
    function calculateNewPosition() {
      // Calculate new distance
      var distanceAcceleration = calculateDistanceAcceleration(state);
      state.distance.speed = newValue(state.distance.speed, deltaT, distanceAcceleration);
      state.distance.value = newValue(state.distance.value, deltaT, state.distance.speed);

      // Calculate new angle
      var angleAcceleration = calculateAngleAcceleration(state);
      state.angle.speed = newValue(state.angle.speed, deltaT, angleAcceleration);
      state.angle.value = newValue(state.angle.value, deltaT, state.angle.speed);

      if (state.angle.value > 2 * Math.PI) {
        state.angle.value = state.angle.value % (2 * Math.PI);
      }
    }

    // Updates the mass of the Sun
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
      sunsSize = 60,
      colors = {
        orbitalPath: "#777777"
      },
      previousEarthPosition = null,
      earthElement,
      sunElement,
      earthEndElement,
      currentSunsSize = sunsSize;
      middleX = 1,
      middleY = 1

    function showHideEarthEndMessage(show) {
      earthEndElement.style.display = show ? 'block' : 'none';
    }

    function drawTheEarth(earthPosition) {
      var left = (earthPosition.x - earthSize/2) + "px";
      var top = (earthPosition.y - earthSize/2) + "px";
      earthElement.style.left = left;
      earthElement.style.top = top;
    }

    function calculateEarthPosition(distance, angle) {
      middleX = Math.floor(canvas.width / 2);
      middleY = Math.floor(canvas.height / 2);
      var centerX = Math.cos(angle) * distance + middleX;
      var centerY = Math.sin(-angle) * distance + middleY;

      return {
        x: centerX,
        y: centerY
      };
    }

    // Updates the size of the Sun based on its mass. The sunMass argument is a fraction of the real Sun's mass.
    function updateSunSize(sunMass) {
      sunElement.setAttribute("style","filter:brightness(" + sunMass + "); " +
        "-webkit-filter:brightness(" + sunMass + "); ");
      var sunsDefaultWidth = sunsSize;
      currentSunsSize = sunsDefaultWidth * Math.pow(sunMass, 1/3);
      sunElement.style.width = currentSunsSize + "px";
      sunElement.style.marginLeft = -(currentSunsSize / 2.0) + "px"
      sunElement.style.marginTop = -(currentSunsSize / 2.0) + "px"
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

    // Return true if Earth has collided with the Sun
    function isEarthCollidedWithTheSun(earthPosition) {
      var correctedSunsSize = currentSunsSize - 20;
      var sunHalf = correctedSunsSize / 2;
      var sunLeft = middleX - sunHalf;
      var sunRight = middleX + sunHalf;
      var sunTop = middleY - sunHalf;
      var sunBottom = middleY + sunHalf;

      return (earthPosition.x >= sunLeft && earthPosition.x <= sunRight
        && earthPosition.y >= sunTop && earthPosition.y <= sunBottom);
    }

    // Draws the scene
    function drawScene(distance, angle) {
      var earthPosition = calculateEarthPosition(distance, angle);
      drawTheEarth(earthPosition);
      drawOrbitalLine(earthPosition);

      if (isEarthCollidedWithTheSun(earthPosition)) {
        physics.state.paused = true;
        showHideEarthEndMessage(true);
      }
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
      sunElement = document.querySelector(".EarthOrbitSimulation-sun");
      earthEndElement = document.querySelector(".EarthOrbitSimulation-earthEnd");

      // Execute success callback function
      success();
    }

    function clearScene() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      previousEarthPosition = null;
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
      updateSunSize: updateSunSize,
      showHideEarthEndMessage: showHideEarthEndMessage,
      clearScene: clearScene,
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
          graphics.clearScene();
          graphics.drawScene(physics.scaledDistance(), physics.state.angle.value);
        });

        animate();
      });
    }

    return {
      start: start
    };
  })();

  // React to user input
  var userInput = (function(){
    var sunsMassElement = document.querySelector(".EarthOrbitSimulation-sunsMass");
    var restartButton = document.querySelector(".EarthOrbitSimulation-reload");
    var massSlider;

    function updateSunsMass(sliderValue) {
      var sunsMassValue = sliderValue * 2;

      if (sunsMassValue > 1) {
        sunsMassValue = Math.pow(5, sunsMassValue - 1);
      }

      var formattedMass = parseFloat(Math.round(sunsMassValue * 100) / 100).toFixed(2)
      sunsMassElement.innerHTML = formattedMass;
      physics.updateFromUserInput(sunsMassValue);
      graphics.updateSunSize(sunsMassValue);
    }

    function didClickRestart() {
      graphics.showHideEarthEndMessage(false);
      physics.resetStateToInitialConditions();
      graphics.clearScene();
      updateSunsMass(0.5);
      massSlider.changePosition(0.5);
      physics.state.paused = false;
      return false; // Prevent default
    }

    function init() {
      massSlider = SickSlider(".EarthOrbitSimulation-massSlider");
      massSlider.onSliderChange = updateSunsMass;
      massSlider.changePosition(0.5);
      restartButton.onclick = didClickRestart;
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();

</script>

<!-- Simulator END -->

<br>

This tutorial shows how to program a simulation of the Earth orbiting the Sun with HTML/JavaScript. The complete source code of the simulation can be viewed [here](/files/2016/09/earth_orbit_simulation/the_complete_code/). We went through the basics of creating an HTML simulation in the [harmonic oscillator tutorial](/blog/programming-harmonic-oscillator/), please refer to it in order to get started. This tutorial will not be as detailed as the one about the harmonic oscillator. Here we will only discuss the physics and math behind the orbital simulation.

This work is based largely on the concepts from the book by Leonard Susskind and George Hrabovsky *"The theoretical minimum: What you need to know to start doing physics"*. It is an excellent book that introduces classical mechanics and explains how to write the equations of motion of a system using the Lagrangian and Hamiltonian methods. There are also Susskind's [YouTube video lectures](https://youtu.be/ApUFtLCrU90) that cover the same material. Please refer to these resources if you want more information on the physics used here.

## The coordinate system

Since the Earth is rotating around the Sun it makes sense to use polar coordinate system shown on Figure 1. The coordinates will be: the angle 𝜃 and the distance *r* between the centers of the Sun and the Earth.

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0010_coordinate_system.png' alt='Coordinate system and variables'>
  <p>Figure 1: The coordinate system and variables.</p>
</div>

The origin of this coordinate system is located at the center of the Sun. This is a simplification, since both the Earth and the Sun rotate around the joint center of mass. However, for the purpose of our simulation we assume that the Sun does not move.

## The kinetic and potential energy

The equation for the kinetic energy of the Earth with mass *m* is

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax200PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0020_kinetic_energy.png' alt='The equation for the kinetic energy of the Earth orbitin the Sun'>
  </span>
  <span>(1)</span>
</div>

The potential energy, which comes from the gravitational attraction between the Sun of mass *M* and the Earth, is described by the following equation:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0030_potential_energy.png' alt='The equation for the potential energy of the Earth orbitin the Sun'>
  </span>
  <span>(2)</span>
</div>

Letter *G* in Equation 2 is the *gravitational constant*:

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0040_gravitational_constant.png' alt='The gravitational constant'>
</div>


## The Lagrangian

We will find the equations of motions using the Lagrangian, which is the kinetic energy minus the potential energy of the Sun-Earth system:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax300PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0050_the_lagrangian_sun_earth.png' alt='The Lagrangian equation for the Sun-Earth system.'>
  </span>
  <span>(3)</span>
</div>

## The first equation of motion: the distance *r*

Now we know the Lagrangian and can apply the Euler-Lagrange equation to get two equations of motion. The first one is found using the following formula, involving partial derivatives of the Lagrangian from Equation 3 with respect to distance *r* and its time derivative:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0060_euler_lagrange_equation_one.png' alt='The Euler–Lagrange equation one.'>
  </span>
  <span>(4)</span>
</div>

After taking the derivatives we get the first equation of motion:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0070_of_motion_for_distance.png' alt='Equation of motion for the distance between the Sun and the Earth.'>
  </span>
  <span>(5)</span>
</div>

We will use Equation 5 in our program and compute the distance *r* from its second derivative.

## The second equation of motion: the angle 𝜃

We use the Euler-Lagrange equation again, but this time we take derivatives of the Lagrangian from Equation 3 with respect to the angle 𝜃 and its time derivative:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0080_euler_lagrange_equation_two.png' alt='The Euler–Lagrange equation two.'>
  </span>
  <span>(6)</span>
</div>

After differentiating and simplifying we get:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0090_of_motion_for_angle_one.png' alt='Equation of motion for the angle.'>
  </span>
  <span>(7)</span>
</div>

We make the second time derivative of the angle 𝜃 the subject of the equation:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax120PxWide' src='/image/blog/2016-08-31-earth-orbit-simulation/0100_of_motion_for_angle_two.png' alt='Equation of motion for the angle, solving for the second derivative.'>
  </span>
  <span>(8)</span>
</div>

Equation 8 will be used in our program to compute the angle 𝜃 from its second derivative.

## Solving equations of motions with Euler's method

We have done the hard part and found Equations 5 and 8, which describe the evolution of the Sun-Earth system over time. In order to animate the Earth we need to solve these equations and find the angle 𝜃 and distance *r*. We will not attempt to solve those differential equations algebraically, but instead use a numerical Euler's method.

## Initial conditions

Before applying the Euler's method we will first need to set the initial conditions, both for the angle and the distance. We set the initial distance to be equal to the length of the *astronomical unit* (AU), which is the average distance between the Sun and the Earth. The first time derivative of the distance, or the speed of the Earth, will be zero. Note that this is the speed of the Earth in the direction of the Sun, not the speed in the direction of the orbit.

```JavaScript
// Initial condition of the model
var initialConditions = {
  distance: {
    value: 1.496 * Math.pow(10, 11),
    speed: 0.00
  },
  angle: {
    value: Math.PI / 6,
    speed: 1.990986 *  Math.pow(10, -7)
  }
};
```

Now we need to define the initial conditions of the angle 𝜃. We set an arbitrary value of 𝛑/6 radians, since it does not matter at which angle the simulation is started. The value of initial time derivative of the angle 𝜃, or the angular speed, does matter and can be obtained using a simple calculation. The Earth makes the full circle in one year, therefore, we can approximate its angular speed by dividing 2𝛑 by the number of seconds in the sidereal year.

## Storing the current state of the system

The initial conditions describe the system at the start of the simulation. As time changes the Earth will move and the four parameters will change as well. Therefore, in our program we need to store the current state of the system, which is represented by the same four values: position, angle and their time derivatives, or speeds.

```JavaScript
var state = {
  distance: {
    value: 0,
    speed: 0
  },
  angle: {
    value: 0,
    speed: 0
  }
};
```

## Computing the acceleration of the distance *r*

We have set the initial conditions for the distance *r* and we know how it evolves from Equation 5. Now we can simply write this equation in our program as a function `calculateDistanceAcceleration` that computes the second time derivative of the distance *r* given the current state:

```JavaScript
function calculateDistanceAcceleration(state) {
  return state.distance.value * Math.pow(state.angle.speed, 2) -
    (constants.gravitationalConstant * state.massOfTheSunKg) / Math.pow(state.distance.value, 2);
}
```

## Computing the acceleration of the angle 𝜃

Similarly, we write the second equation of motion (Equation 8) for the angle as a function `calculateAngleAcceleration`:

```JavaScript
function calculateAngleAcceleration(state) {
  return -2.0 * state.distance.speed * state.angle.speed / state.distance.value;
}
```

## Finding a value from its derivative with Euler's method

The key feature of the Euler's method is its ability to compute the value of a physical property from its derivative. For example, the method allows to compute the distance from speed. Similarly, it can give us the speed from the acceleration.

Luckily, this is exactly what we need in our simulation. Equations 5 and 8 give as the accelerations for the distance and the angle respectively. We can then use Euler's method to find velocities from these accelerations. And by repeating the same trick again, we can find the distance and the angle from their speeds.

To do this, we write a function called `newValue`. It computes the new value of a physical property by using its `derivative` and the time increment `deltaT`:

```JavaScript
function newValue(currentValue, deltaT, derivative) {
  return currentValue + deltaT * derivative;
}
```

In our program, the value `deltaT` will be a very small time increment, about 90 seconds, which will allow us to approximate the motion of the Earth with reasonable precision.

## Finding the distance *r*

Now we are ready to bring all pieces together and write the code that computes the distance *r* from its second derivative. First, we use the function `calculateDistanceAcceleration` to calculate the acceleration *r*. Then we call `newValue` to find the speed by using the acceleration. And finally, we use the speed to find the distance *r* itself:

```JavaScript
var distanceAcceleration = calculateDistanceAcceleration(state);

state.distance.speed = newValue(state.distance.speed,
  deltaT, distanceAcceleration);

state.distance.value = newValue(state.distance.value,
  deltaT, state.distance.speed);
```

## Finding the distance 𝜃

We use exactly the same procedure to find the angle 𝜃. First, we find its acceleration with the function `calculateAngleAcceleration`. Then, we use it to find the angular speed by calling the function `newValue`. And finally, we compute the angle 𝜃 from its angular speed:

```JavaScript
var angleAcceleration = calculateAngleAcceleration(state);

state.angle.speed = newValue(state.angle.speed,
  deltaT, angleAcceleration);

state.angle.value = newValue(state.angle.value,
  deltaT, state.angle.speed);
```

## Moving the planet

We have learned how to compute both coordinates *r* and 𝜃 of the Earth. Now all that remains to be done is to run this code repeatedly in a loop and the system will evolve before our eyes. Our program translates the polar coordinates into the actual coordinates of the Earth image on the computer screen and the simulation produces a very natural orbital motion.

I personally find it almost magical that the simulation works at all. Remember that we started with just the Equations 1 and 2 for the kinetic and potential energies of the Sun-Earth system. Then we used those equations to write a Lagrangian equation 3 and find the equations of motions 5 and 8. And finally, we solved those two equations numerically using the Euler's method. This gave us the precise position of the Earth as the time changes.

For me it is hard to believe that such complex thing as the motion of a planet around its star can be computed so easily from the energy of the system. And yet, it moves.


## Credits

1. **Editor in chief**: Emily Saaen.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

## References

* [The complete source code](/files/2016/09/earth_orbit_simulation/the_complete_code/) of the Earth orbit simulation.

* Susskind, L., &amp; Hrabovsky, G. (2013). The theoretical minimum: What you need to know to start doing physics. New York: Basic Boks.

* [Classical mechanics lectures](https://youtu.be/ApUFtLCrU90) by Leonard Susskind on YouTube.

* [Programming a harmonic oscillator](/blog/programming-harmonic-oscillator/).

* [Sources of the formulas in LaTex format](/files/2016/09/earth_orbit_simulation/earth_orbit_simulation.tex).