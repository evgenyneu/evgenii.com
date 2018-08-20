/*

Two-body problem simulation

https://evgenii.com/blog/two-body-problem-simulation

License: Public Domain

Image credits
=============

1. "The Blue Marble" By  NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans. Sources: http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg, https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg

2. "The Sun photographed at 304 angstroms" by NASA/SDO (AIA). Sources: http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg, https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg

*/

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

  // Runge-Kutta numerical integration
  var rungeKutta = (function() {
    // h: timestep
    // u: variables
    // derivative: function that calculates the derivatives
    function calculate(h, u, derivative) {
      var a = [h/2, h/2, h, 0];
      var b = [h/6, h/3, h/3, h/6];
      var u0 = [];
      var ut = [];
      var dimension = u.length;

      for (var i = 0; i < dimension; i++) {
        u0.push(u[i]);
        ut.push(0);
      }

      for (var j = 0; j < 4; j++) {
        var du = derivative();

        for (var i = 0; i < dimension; i++) {
          u[i] = u0[i] + a[j]*du[i];
          ut[i] = ut[i] + b[j]*du[i];
        }
      }

      for (var i = 0; i < dimension; i++) {
        u[i] = u0[i] + ut[i];
      }
    }

    return {
      calculate: calculate
    };
  })();

  // Calculates the position of the Earth
  var physics = (function() {
    // Current state of the system
    var state2 = {
      masses: {
        q: 0, // Current mass ratio m2 / m1
        m1: 1,
        m2: 0, // Will be set to q
        m12: 0 // Will be set to m1 + m2
      },
      eccentricity: 0, // Current eccentricity of the orbit
      // Current positions of the two bodies
      positions: [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ],
      u: [0, 0, 0, 0], // Four variables used in the differential equations
      iteration: 0 // Temporary REMOVE THIS!!!
    };

    // Initial condition of the model
    var initialConditions2 = {
      eccentricity: 0.1, // Eccentricity of the orbit
      q: 0.5, // Mass ratio m2 / m1
      position: {
        x: 1,
        y: 0
      },
      velocity: {
        u: 0
      }
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

    // Calculate the initial velocity of the seconf body
    // in vertical direction based on mass ratio q and eccentricity
    function initialVelocity(q, eccentricity) {
      return Math.sqrt( (1 + q) * (1 + eccentricity) );
    }

    // Update parameters that depend on mass ratio and eccentricity
    function updateParametersDependentOnUserInput() {
      state2.masses.m2 = state2.masses.q;
      state2.masses.m12 = state2.masses.m1 + state2.masses.m2;
      state2.u[3] = initialVelocity(state2.masses.q, state2.eccentricity);
    }

    function resetStateToInitialConditions2() {
      state2.masses.q = initialConditions2.q
      state2.eccentricity = initialConditions2.eccentricity

      state2.u[0] = initialConditions2.position.x;
      state2.u[1] = initialConditions2.position.y;
      state2.u[2] = initialConditions2.velocity.u;

      updateParametersDependentOnUserInput()
    }

    // The distance that is used for drawing on screen
    function scaledDistance() {
      return state.distance.value / scaleFactor;
    }

    function derivative() {
      var du = new Array(state2.u.length);
      var r = state2.u.slice(0,2);
      var rr = Math.sqrt( r[0]**2 + r[1]**2 );

      for (var i = 0; i < 2; i++) {
        du[i] = state2.u[i + 2];
        du[i + 2] = -(1 + state2.masses.q) * r[i] / (rr**3);
      }

      return du;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current positions of the bodies
    function updatePosition2() {
      rungeKutta.calculate(0.07, state2.u, derivative);
      calculateNewPosition2();
    }

    function calculateNewPosition2() {
      var a1 = (state2.masses.m2 / state2.masses.m12);
      var a2 = (state2.masses.m1 / state2.masses.m12);

      state2.positions[0].x = -a2 * state2.u[0]
      state2.positions[0].y = -a2 * state2.u[1]

      state2.positions[1].x = a1 * state2.u[0]
      state2.positions[1].y = a1 * state2.u[1]
    }

    // Returns the separatation between two objects
    // This is a value from 1 and larger
    function separationBetweenObjects() {
      return initialConditions2.position.x / (1 - state2.eccentricity);
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

    function updateMassRatioFromUserInput(massRatio) {
      state2.masses.q = massRatio;
      updateParametersDependentOnUserInput();
    }

    function updateEccentricityFromUserInput(eccentricity) {
      state2.eccentricity = eccentricity;
      updateParametersDependentOnUserInput();
    }

    return {
      scaledDistance: scaledDistance,
      resetStateToInitialConditions2: resetStateToInitialConditions2,
      updatePosition2: updatePosition2,
      initialConditions2: initialConditions2,
      updateMassRatioFromUserInput: updateMassRatioFromUserInput,
      updateEccentricityFromUserInput: updateEccentricityFromUserInput,
      state2: state2,
      separationBetweenObjects: separationBetweenObjects
    };
  })();

  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 400,
      earthSize = 25,
      sunsSize = 60,
      defaultBodySize = 60,
      colors = {
        orbitalPath: "#777777"
      },
      // Previously drawn positions of the two bodies. Used to draw orbital line.
      previousBodyPositions = [
        {x: null, y: null},
        {x: null, y: null}
      ],
      earthElement,
      sunElement,
      earthEndElement,
      currentSunsSize = sunsSize,
      currentBodySizes = [
        defaultBodySize, defaultBodySize
      ],
      middleX = 1,
      middleY = 1;

    function showHideEarthEndMessage(show) {
      earthEndElement.style.display = show ? 'block' : 'none';
    }

    function drawTheEarth(earthPosition) {
      var left = (earthPosition.x - earthSize/2) + "px";
      var top = (earthPosition.y - earthSize/2) + "px";
      earthElement.style.left = left;
      earthElement.style.top = top;
    }

    function drawBody(position, size, bodyElement) {
      var left = (position.x - size/2) + "px";
      var top = (position.y - size/2) + "px";
      bodyElement.style.left = left;
      bodyElement.style.top = top;
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
      // sunElement.style.marginLeft = -(currentSunsSize / 2.0) + "px";
      // sunElement.style.marginTop = -(currentSunsSize / 2.0) + "px";
    }

    // Updates the sizes of the two object based on the mass ratio (value from 0 to 1)
    // and the scale factor (value from 1 and larger).
    function updateObjectSizes(massRatio, scaleFactor) {
      currentBodySizes[1] = defaultBodySize / scaleFactor;
      sunElement.style.width = currentBodySizes[1] + "px";

      currentBodySizes[0] = defaultBodySize * massRatio / scaleFactor;
      earthElement.style.width = currentBodySizes[0] + "px";
    }

    function drawOrbitalLine(newPosition, previousPosition) {
      if (previousPosition.x === null) {
        previousPosition.x = newPosition.x;
        previousPosition.y = newPosition.y;
        return;
      }

      context.beginPath();
      context.strokeStyle = colors.orbitalPath;
      context.moveTo(previousPosition.x, previousPosition.y);
      context.lineTo(newPosition.x, newPosition.y);
      context.stroke();

      previousPosition.x = newPosition.x;
      previousPosition.y = newPosition.y;
    }

    // Return true if Earth has collided with the Sun
    function isEarthCollidedWithTheSun(earthPosition) {
      var correctedSunsSize = currentSunsSize - 20;
      var sunHalf = correctedSunsSize / 2;
      var sunLeft = middleX - sunHalf;
      var sunRight = middleX + sunHalf;
      var sunTop = middleY - sunHalf;
      var sunBottom = middleY + sunHalf;

      return (earthPosition.x >= sunLeft && earthPosition.x <= sunRight &&
        earthPosition.y >= sunTop && earthPosition.y <= sunBottom);
    }

    function calculatePosition(position) {
      middleX = Math.floor(canvas.width / 2);
      middleY = Math.floor(canvas.height / 2);
      var scale = 100;
      var centerX = position.x * scale + middleX;
      var centerY = position.y * scale + middleY;

      return {
        x: centerX,
        y: centerY
      };
    }

    // Draws the scene
    function drawScene2(positions) {
      var body1Position = calculatePosition(positions[0]);
      drawBody(body1Position, currentBodySizes[0], earthElement);
      drawOrbitalLine(body1Position, previousBodyPositions[0]);

      var body2Position = calculatePosition(positions[1]);
      drawBody(body2Position, currentBodySizes[1], sunElement);
      drawOrbitalLine(body2Position, previousBodyPositions[1]);
    }

    // Draws the scene
    function drawScene(distance, angle) {
      // var earthPosition = calculateEarthPosition(distance, angle);
      // drawTheEarth(earthPosition);
      // drawOrbitalLine(earthPosition);

      // if (isEarthCollidedWithTheSun(earthPosition)) {
      //   physics.state.paused = true;
      //   showHideEarthEndMessage(true);
      // }
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
      previousBodyPositions = [
        {x: null, y: null},
        {x: null, y: null}
      ];
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
      drawScene2: drawScene2,
      updateSunSize: updateSunSize,
      updateObjectSizes: updateObjectSizes,
      showHideEarthEndMessage: showHideEarthEndMessage,
      clearScene: clearScene,
      init: init
    };
  })();

  // Start the simulation
  var simulation = (function() {
    // The method is called 60 times per second
    function animate() {
      physics.updatePosition2();
      graphics.drawScene2(physics.state2.positions);
      // graphics.drawScene(physics.scaledDistance(), physics.state.angle.value);
      window.requestAnimationFrame(animate);
    }

    function start() {
      graphics.init(function() {
        // Use the initial conditions for the simulation
        physics.resetStateToInitialConditions2();
        graphics.updateObjectSizes(physics.initialConditions2.q, physics.separationBetweenObjects());

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
    var eccentricityElement = document.querySelector(".EarthOrbitSimulation-eccentricity");
    var restartButton = document.querySelector(".EarthOrbitSimulation-reload");
    var massSlider, eccentricitySlider;

    function didUpdateMassSlider(sliderValue) {
      if (sliderValue === 0) { sliderValue = 0.005; }
      var oldEccentricity = physics.state2.eccentricity;
      physics.resetStateToInitialConditions2();
      graphics.clearScene();
      physics.updateMassRatioFromUserInput(sliderValue);
      physics.updateEccentricityFromUserInput(oldEccentricity);
      graphics.updateObjectSizes(physics.state2.masses.q, physics.separationBetweenObjects());
      showMassRatio(sliderValue);
    }

    function showMassRatio(ratio) {
      var formattedRatio = parseFloat(Math.round(ratio * 100) / 100).toFixed(2);
      sunsMassElement.innerHTML = formattedRatio;
    }

    function didUpdateEccentricitySlider(sliderValue) {
      var oldMassRatio = physics.state2.masses.q;
      physics.resetStateToInitialConditions2();
      graphics.clearScene();
      physics.updateMassRatioFromUserInput(oldMassRatio);
      physics.updateEccentricityFromUserInput(sliderValue);
      showEccentricity(sliderValue);
      graphics.updateObjectSizes(physics.state2.masses.q, physics.separationBetweenObjects());
    }

    function showEccentricity(ratio) {
      var formattedRatio = parseFloat(Math.round(ratio * 100) / 100).toFixed(2);
      eccentricityElement.innerHTML = formattedRatio;
    }

    function didClickRestart() {
      graphics.showHideEarthEndMessage(false);
      physics.resetStateToInitialConditions();
      physics.resetStateToInitialConditions2();
      graphics.clearScene();
      showMassRatio(physics.initialConditions2.q);
      showEccentricity(physics.initialConditions2.eccentricity);
      massSlider.changePosition(physics.initialConditions2.q);
      eccentricitySlider.changePosition(physics.initialConditions2.eccentricity);
      graphics.updateObjectSizes(physics.initialConditions2.q, physics.separationBetweenObjects());
      return false; // Prevent default
    }

    function init() {
      // Mass slider
      massSlider = SickSlider(".EarthOrbitSimulation-massSlider");
      massSlider.onSliderChange = didUpdateMassSlider;
      showMassRatio(physics.initialConditions2.q);
      massSlider.changePosition(physics.initialConditions2.q);

      // Eccentricity slider
      eccentricitySlider = SickSlider(".EarthOrbitSimulation-eccentricitySlider");
      eccentricitySlider.onSliderChange = didUpdateEccentricitySlider;
      showEccentricity(physics.initialConditions2.eccentricity);
      eccentricitySlider.changePosition(physics.initialConditions2.eccentricity);

      restartButton.onclick = didClickRestart;
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();