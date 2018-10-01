/*

Three-body problem simulation

https://evgenii.com/blog/three-body-problem-simulator/

License: Public Domain

Credits
=============

1. This work is based on code and lectures by Dr Rosemary Mardling from Monash University.

2. "The Blue Marble" By  NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans. Sources: http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg, https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg

3. "The Sun photographed at 304 angstroms" by NASA/SDO (AIA). Sources: http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg, https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg

4. **"Jupiter's South Pole"** image: NASA/JPL-Caltech/SwRI/MSSS/Betsy Asher Hall/Gervasio Robles, [source](https://www.nasa.gov/image-feature/jupiters-south-pole).

5. **Figure eight orbit**: Moore, C. 1993, Phys. Rev. Lett., 70, 3675.

6. **Kepler-16 system**: Doyle, L. R., Carter, J. A., Fabrycky, D. C., et al. 2011, Science, 333, 1602.

*/

(function(){
  "use strict";
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
      if (Math.round(that.previousSliderValue * 10000) === Math.round(sliderValue * 10000)) { return; }
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
    var debugOutput = document.querySelector(".ThreeBodyProblem-debugOutput");

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

        for (i = 0; i < dimension; i++) {
          u[i] = u0[i] + a[j]*du[i];
          ut[i] = ut[i] + b[j]*du[i];
        }
      }

      for (i = 0; i < dimension; i++) {
        u[i] = u0[i] + ut[i];
      }
    }

    return {
      calculate: calculate
    };
  })();

  // Calculates the simulation of the three bodies
  var physics = (function() {
    var constants = {
      gravitationalConstant: 6.67408 * Math.pow(10, -11),
      // Average density of the body (kg/m^3). Used for calculating body's radius form its mass
      averageDensity: 1410
    };

    // Current state of the system
    var state = {
      // State variables used in the differential equations
      // First two elements are x and y positions, and second two are x and y components of velocity
      // repeated for three bodies.
      u: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Current positions of the bodies, in meters
      positions: [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ]
    };

    // Initial condition of the model. The conditions are loaded from the currently selected simulation.
    var initialConditions = {
      bodies: 3, // Number of bodies
    };

    // Calculate the radius of the body (in meters) based on its mass.
    function calculateRadiusFromMass(mass, density) {
      return Math.pow(3/4 * mass / ( Math.PI * density), 1/3);
    }

    // Returns the diameters of three bodies in meters
    function calculateDiameters() {
      var diameters = [];

      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        if (initialConditions.densities !== undefined && initialConditions.densities.length >= initialConditions.bodies-1) {
          var density = initialConditions.densities[iBody];
        } else {
          density = constants.averageDensity;
        }

        diameters.push(2 * calculateRadiusFromMass(initialConditions.masses[iBody], density));
      }

      return diameters;
    }

    function calculateCenterOfMassVelocity(){
      var centerOfMassVelocity = {x: 0, y: 0};
      var sumOfMasses = 0;

      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        var bodyStart = iBody * 4; // Starting index for current body in the u array
        centerOfMassVelocity.x += initialConditions.masses[iBody] * state.u[bodyStart + 2];
        centerOfMassVelocity.y += initialConditions.masses[iBody] * state.u[bodyStart + 3];
        sumOfMasses += initialConditions.masses[iBody];
      }

      centerOfMassVelocity.x /= sumOfMasses;
      centerOfMassVelocity.y /= sumOfMasses;

      return centerOfMassVelocity;
    }

    function calculateCenterOfMass(){
      var centerOfMass = {x: 0, y: 0};
      var sumOfMasses = 0;

      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        var bodyStart = iBody * 4; // Starting index for current body in the u array
        centerOfMass.x += initialConditions.masses[iBody] * state.u[bodyStart + 0];
        centerOfMass.y += initialConditions.masses[iBody] * state.u[bodyStart + 1];
        sumOfMasses += initialConditions.masses[iBody];
      }

      centerOfMass.x /= sumOfMasses;
      centerOfMass.y /= sumOfMasses;

      return centerOfMass;
    }

    function resetStateToInitialConditions() {
      var iBody, bodyStart;

      // Loop through the bodies
      for (iBody = 0; iBody < initialConditions.bodies; iBody++) {
        bodyStart = iBody * 4; // Starting index for current body in the u array

        var position = initialConditions.positions[iBody];
        state.u[bodyStart + 0] = position.r * Math.cos(position.theta); // x
        state.u[bodyStart + 1] = position.r * Math.sin(position.theta); //y

        var velocity = initialConditions.velocities[iBody];
        state.u[bodyStart + 2] = velocity.r * Math.cos(velocity.theta); // velocity x
        state.u[bodyStart + 3] = velocity.r * Math.sin(velocity.theta); // velocity y
      }

      var centerOfMassVelocity = calculateCenterOfMassVelocity();
      var centerOfMass = calculateCenterOfMass();

      // Correct the velocities and positions of the bodies
      // to make the center of mass motionless at the middle of the screen
      for (iBody = 0; iBody < initialConditions.bodies; iBody++) {
        bodyStart = iBody * 4; // Starting index for current body in the u array
        state.u[bodyStart + 0] -= centerOfMass.x;
        state.u[bodyStart + 1] -= centerOfMass.y;
        state.u[bodyStart + 2] -= centerOfMassVelocity.x;
        state.u[bodyStart + 3] -= centerOfMassVelocity.y;
      }
    }

    // Calculates the acceleration of the body 'iFromBody'
    // due to gravity from other bodies,
    // using Newton's law of gravitation.
    //   iFromBody: the index of body. 0 is first body, 1 is second body.
    //   coordinate: 0 for x coordinate, 1 for y coordinate
    function acceleration(iFromBody, coordinate) {
      var result = 0;
      var iFromBodyStart = iFromBody * 4; // Starting index for the body in the u array

      // Loop through the bodies
      for (var iToBody = 0; iToBody < initialConditions.bodies; iToBody++) {
        if (iFromBody === iToBody) { continue; }
        var iToBodyStart = iToBody * 4; // Starting index for the body in the u array

        // Distance between the two bodies
        var distanceX = state.u[iToBodyStart + 0] -
          state.u[iFromBodyStart + 0];

        var distanceY = state.u[iToBodyStart + 1] -
          state.u[iFromBodyStart + 1];

        var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        var gravitationalConstant = 1;

        if (initialConditions.dimensionless !== true) {
          gravitationalConstant = constants.gravitationalConstant;
        }

        result += gravitationalConstant *
          initialConditions.masses[iToBody] *
          (state.u[iToBodyStart + coordinate] - state.u[iFromBodyStart + coordinate]) /
          (Math.pow(distance, 3));
      }

      return result;
    }

    // Calculate the derivatives of the system of ODEs that describe equation of motion of the bodies
    function derivative() {
      var du = new Array(initialConditions.bodies * 4);

      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        // Starting index for current body in the u array
        var bodyStart = iBody * 4; 

        du[bodyStart + 0] = state.u[bodyStart + 0 + 2]; // Velocity x
        du[bodyStart + 1] = state.u[bodyStart + 0 + 3]; // Velocity y
        du[bodyStart + 2] = acceleration(iBody, 0); // Acceleration x
        du[bodyStart + 3] = acceleration(iBody, 1); // Acceleration y
      }

      return du;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current positions of the bodies
    function updatePosition(timestep) {
      rungeKutta.calculate(timestep, state.u, derivative);
    }

    function calculateNewPosition() {
      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        var bodyStart = iBody * 4; // Starting index for current body in the u array

        state.positions[iBody].x = state.u[bodyStart + 0];
        state.positions[iBody].y = state.u[bodyStart + 1];
      }
    }

    // Returns the largest distance of an object from the center based on initial considitions
    function largestDistanceMeters() {
      var result = 0;

      // Loop through the bodies
      for (var iBody = 0; iBody < initialConditions.bodies; iBody++) {
        var position = initialConditions.positions[iBody];
        if (result < position.r) {
          result = position.r;
        }
      }

      return result;
    }

    function changeInitialConditions(conditions) {
      initialConditions.dimensionless = conditions.dimensionless;
      initialConditions.masses = conditions.masses.slice();
      initialConditions.positions = conditions.positions;
      initialConditions.velocities = conditions.velocities;
      initialConditions.timeScaleFactor = conditions.timeScaleFactor;
      initialConditions.massSlider = conditions.massSlider;
      initialConditions.timeScaleFactorSlider = conditions.timeScaleFactorSlider;
      initialConditions.densities = conditions.densities;
      initialConditions.paleOrbitalPaths = conditions.paleOrbitalPaths;
    }

    return {
      resetStateToInitialConditions: resetStateToInitialConditions,
      updatePosition: updatePosition,
      calculateNewPosition: calculateNewPosition,
      initialConditions: initialConditions,
      state: state,
      calculateDiameters: calculateDiameters,
      largestDistanceMeters: largestDistanceMeters,
      changeInitialConditions: changeInitialConditions,
      constants: constants
    };
  })();

  // Draw the scene
  var graphics = (function() {
    var canvas = null, // Canvas DOM element.
      context = null, // Canvas context for drawing.
      canvasHeight = 600,
      // The scaling factor used to draw distances between the objects and their sizes
      // Updated automatically on first draw
      metersPerPixel = 100,
      minimumSizePixels=10, // Minimum size of an object in pixels.
      maximumSizePixels=80, // Maximum size of an object in pixels.
      colors = {
        orbitalPaths: ["#ff8b22","#6c81ff","#4ccd7a"],
        paleOrbitalPaths: ["#ab681c","#4957ae","#359256"]
      },
      // Previously drawn positions of the two bodies. Used to draw orbital line.
      previousBodyPositions = [
        {x: null, y: null},
        {x: null, y: null},
        {x: null, y: null}
      ],
      // Contains the DOM elements of the bodies
      bodyElemenets = [],
      // Body sizes in pixels
      currentBodySizes = [
        10, 10, 10
      ],
      middleX = 1,
      middleY = 1;

    function drawBody(position, size, bodyElement) {
      var left = (position.x - size/2) + "px";
      var top = (position.y - size/2) + "px";
      bodyElement.style.left = left;
      bodyElement.style.top = top;
    }

    // Updates the sizes of the objects
    //    sizes: the sizes of objects in meters
    function updateObjectSizes(sizes) {
      // Loop through the bodies
      for (var iBody = 0; iBody < sizes.length; iBody++) {
        currentBodySizes[iBody] =  sizes[iBody] / metersPerPixel;

        if (currentBodySizes[iBody] < minimumSizePixels) {
          currentBodySizes[iBody] = minimumSizePixels;
        }

        if (currentBodySizes[iBody] > maximumSizePixels) {
          currentBodySizes[iBody] = maximumSizePixels;
        }

        bodyElemenets[iBody].style.width = currentBodySizes[iBody] + "px";
      }
    }

    function drawOrbitalLine(newPosition, previousPosition, color) {
      if (previousPosition.x === null) {
        previousPosition.x = newPosition.x;
        previousPosition.y = newPosition.y;
        return;
      }

      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(previousPosition.x, previousPosition.y);
      context.lineTo(newPosition.x, newPosition.y);
      context.stroke();

      previousPosition.x = newPosition.x;
      previousPosition.y = newPosition.y;
    }

    // Returns the x and y positions a body on screen in pixels.
    //    position: x and y position in meters from the center of the screen.
    function calculatePosition(position) {
      middleX = Math.floor(canvas.width / 2);
      middleY = Math.floor(canvas.height / 2);
      var centerX = position.x / metersPerPixel + middleX;
      var centerY = -position.y / metersPerPixel + middleY;

      return {
        x: centerX,
        y: centerY
      };
    }

    // Draws the scene
    function drawScene(positions, paleOrbitalPaths) {
      // Loop through the bodies
      for (var iBody = 0; iBody < positions.length; iBody++) {
        var bodyPosition = calculatePosition(positions[iBody]);
        drawBody(bodyPosition, currentBodySizes[iBody], bodyElemenets[iBody]);
        var orbitalPathColors = paleOrbitalPaths ? colors.paleOrbitalPaths : colors.orbitalPaths;
        drawOrbitalLine(bodyPosition, previousBodyPositions[iBody], orbitalPathColors[iBody]);
      }
    }

    function showCanvasNotSupportedMessage() {
      document.getElementById("ThreeBodyProblem-notSupportedMessage").style.display ='block';
    }

    // Resize canvas to will the width of container
    function fitToContainer(){

      // Adjust the canvas to the size of the screen
      canvasHeight = Math.min(window.innerHeight, window.innerWidth) - 100;
      document.querySelector(".ThreeBodyProblem-container").style.height = canvasHeight + 'px';

      canvas.style.width='100%';
      canvas.style.height= canvasHeight + 'px';
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    // Returns true on error and false on success
    function initCanvas() {
      // Find the canvas HTML element
      canvas = document.querySelector(".ThreeBodyProblem-canvas");

      // Check if the browser supports canvas drawing
      if (!(window.requestAnimationFrame && canvas && canvas.getContext)) { return true; }

      // Get canvas context for drawing
      context = canvas.getContext("2d");
      if (!context) { return true; } // Error, browser does not support canvas
      return false;
    }

    // Create canvas for drawing and call success argument
    function init(success) {
      if (initCanvas()) {
        // The browser can not use canvas. Show a warning message.
        showCanvasNotSupportedMessage();
        return;
      }

      // Update the size of the canvas
      fitToContainer();

      var earthElement = document.querySelector(".ThreeBodyProblem-earth");
      var sunElement = document.querySelector(".ThreeBodyProblem-sun");
      var jupiterElement = document.querySelector(".ThreeBodyProblem-jupiter");

      bodyElemenets = [];
      bodyElemenets.push(sunElement);
      bodyElemenets.push(earthElement);
      bodyElemenets.push(jupiterElement);

      // Execute success callback function
      success();
    }

    function clearScene(largestDistanceMeters) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      previousBodyPositions = [
        {x: null, y: null},
        {x: null, y: null},
        {x: null, y: null}
      ];

      // Update the scaling
      metersPerPixel = 2.3 * largestDistanceMeters / Math.min(canvas.offsetWidth, canvas.offsetHeight, window.innerHeight);
    }

    return {
      fitToContainer: fitToContainer,
      drawScene: drawScene,
      updateObjectSizes: updateObjectSizes,
      clearScene: clearScene,
      init: init
    };
  })();

  // Start the simulation
  var simulation = (function() {
    // The number of calculations done in one 16 millisecond frame.
    // The higher the number, the more precise are the calculations and the slower the simulation.
    var calculationsPerFrame = 1000;

    var framesPerSecond = 60; // Number of frames per second

    // Maximum number of times the scene is drawn per frame.
    // To improve performance, we do not draw after each calculation, since drawing can be slow.
    var drawTimesPerFrame = 20;

    // Used to decide if we need to draw at calculations
    var drawIndex =  Math.ceil(calculationsPerFrame / drawTimesPerFrame);

    // The method is called 60 times per second
    function animate() {
      // The time step in seconds used in simulation
      var timestep = physics.initialConditions.timeScaleFactor / framesPerSecond / calculationsPerFrame;

      for (var i = 0; i < calculationsPerFrame; i++) {
        physics.updatePosition(timestep);

        // Decide if we need to draw
        if (i % drawIndex === 0) {
          physics.calculateNewPosition();
          graphics.drawScene(physics.state.positions, physics.initialConditions.paleOrbitalPaths);
        }
      }

      window.requestAnimationFrame(animate);
    }

    function start() {
      graphics.init(function() {
        physics.resetStateToInitialConditions();
        graphics.clearScene(physics.largestDistanceMeters());
        graphics.updateObjectSizes(physics.calculateDiameters());

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
          graphics.fitToContainer();
          graphics.clearScene(physics.largestDistanceMeters());
          graphics.drawScene(physics.state.positions, physics.initialConditions.paleOrbitalPaths);
        });

        animate();
      });
    }

    return {
      start: start
    };
  })();

  // Helper functions for dealing with CSS
  var cssHelper = (function(){
    function hasClass(element, className) {
      return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
    }

    function removeClass(element, className) {
      element.className = element.className
            .replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');
    }

    function addClass(element, className) {
      if (hasClass(element, className)) return;
      element.className += " " + className;
    }

    return {
        hasClass: hasClass,
        removeClass: removeClass,
        addClass: addClass
      };
  })();

  // The presets for different simulations
  var simulations = (function(){
    var content = {
      didChangeModel: null // function handler that is called when user changes a model
    };

    var vigure8Position = {x: 0.97000436, y: -0.24308753};
    var vigure8Velocity = {x: -0.93240737, y: -0.86473146};

    function polarFromCartesian(coordinates) {
      var angle;

      if (coordinates.x === 0) {
        angle = 0;
      } else {
        angle = Math.atan2(coordinates.y, coordinates.x);
      }

      return {
        r: Math.sqrt(Math.pow(coordinates.x, 2) + Math.pow(coordinates.y, 2)),
        theta: angle
      };
    }


    // The list of simulations shown to the user.
    // -------------------------
    //
    //    dimensionless: false if masses are given in kilograms, true if masses are close to 1.
    //    masses: Masses of the bodies in kilograms
    //    timeScaleFactor:
    //        The number of seconds advanced by the model in one second of the animation
    //        Used to speed up things, so user does not wait for one year for the model
    //        of the Earth go around the Sun
    //    positions: Positions of the bodies in Polar coordinates, r is in meters
    //    velocities: Velocities of the bodies in Polar coordinates, r is in m/s
    //    densities: Optional densities (kg/m^3). This is a way to tweak object's size, since densities are
    //                used for estimating the radius of an object from its mass.
    //                If not supplied, an average Sun's density is used.
    //    paleOrbitalPaths: If true then the orbital path is paler than usual.
    //
    var allPresets = {
      "FigureEight": {
        dimensionless: true,
        masses: [1, 1, 1],
        massSlider: {
          min: 0.1,
          max: 5,
          power: 3
        },
        timeScaleFactor: 1,
        timeScaleFactorSlider: {
          min: 0.00,
          max: 20000,
          power: 5
        },
        positions: [ // in Polar coordinates, r is in meters
          polarFromCartesian(vigure8Position),
          polarFromCartesian({x: -vigure8Position.x, y: -vigure8Position.y}),
          polarFromCartesian({x: 0, y: 0})
        ],
        velocities: [ // in Polar coordinates, r is in m/s
          polarFromCartesian({x: -vigure8Velocity.x / 2, y: -vigure8Velocity.y/2}),
          polarFromCartesian({x: -vigure8Velocity.x / 2, y: -vigure8Velocity.y/2}),
          polarFromCartesian(vigure8Velocity)
        ]
      },
      "SunEarthJupiter": {
        masses: [1.98855 * Math.pow(10, 30), 5.972 * Math.pow(10, 24), 1.898 * Math.pow(10, 27)],
        densities: [0.01, 0.01, 0.01],
        massSlider: {
          min: 3 * Math.pow(10, 10),
          max: 3 * Math.pow(10, 31),
          power: 3
        },
        timeScaleFactor: 3600 * 24 * 365,
        timeScaleFactorSlider: {
          min: 0,
          max: 3600 * 24 * 500 * 30000,
          power: 5
        },
        positions: [ // in Polar coordinates, r is in meters
          {
            r: 0,
            theta: 0
          },
          {
            r: 1.496 * Math.pow(10, 11),
            theta: 0
          },
          {
            r: 7.78 * Math.pow(10, 11),
            theta: 0
          }
        ],
        velocities: [ // in Polar coordinates, r is in m/s
          {
            r: 0,
            theta: Math.PI/2
          },
          {
            r: 30 * Math.pow(10, 3),
            theta: Math.PI/2
          },
          {
            r: 13.1 * Math.pow(10, 3),
            theta: Math.PI/2
          }
        ]
      },
      "LagrangePoint5": {
        masses: [1.98855 * Math.pow(10, 30), 5.972 * Math.pow(10, 24), 1.898 * Math.pow(10, 28)],
        densities: [0.001, 0.0001, 0.0001],
        paleOrbitalPaths: true,
        massSlider: {
          min: 3 * Math.pow(10, 10),
          max: 3 * Math.pow(10, 31),
          power: 5
        },
        timeScaleFactor: 3600 * 24 * 1000,
        timeScaleFactorSlider: {
          min: 0,
          max: 3600 * 24 * 500 * 30000,
          power: 5
        },
        positions: [ // in Polar coordinates, r is in meters
          {
            r: 0,
            theta: 0
          },
          {
            r: 7.5 * Math.pow(10, 11),
            theta: -Math.PI/3 - Math.PI/10
          },
          {
            r: 7.78 * Math.pow(10, 11),
            theta: 0
          }
        ],
        velocities: [ // in Polar coordinates, r is in m/s
          {
            r: 0,
            theta: Math.PI/2
          },
          {
            r: 13.3 * Math.pow(10, 3),
            theta: Math.PI/6 - Math.PI/10
          },
          {
            r: 13.1 * Math.pow(10, 3),
            theta: Math.PI/2
          }
        ]
      },
      "Kepler16": {
        masses: [0.6897 * 1.98855 * Math.pow(10, 30), 0.20255 * 1.98855 * Math.pow(10, 30), 0.3333 * 1.898 * Math.pow(10, 27)],
        massSlider: {
          min: 3 * Math.pow(10, 10),
          max: 3 * Math.pow(10, 31),
          power: 5
        },
        timeScaleFactor: 3600 * 24 * 41,
        timeScaleFactorSlider: {
          min: 0,
          max: 3600 * 24 * 500 * 300,
          power: 5
        },
        positions: [ // in Polar coordinates, r is in meters
          {
            r: (0.20255 * 0.22431 * 1.496 * Math.pow(10, 11)) / (0.6897 + 0.20255 ),
            theta: 0
          },
          {
            r: (0.6897 * 0.22431 * 1.496 * Math.pow(10, 11)) / (0.6897 + 0.20255 ),
            theta: Math.PI
          },
          {
            r: 0.7048 * 1.496 * Math.pow(10, 11),
            theta: 0
          }
        ],
        velocities: [ // in Polar coordinates, r is in m/s
          {
            r: 13 * Math.pow(10, 3),
            theta: Math.PI/2
          },
          {
            r: 44 * Math.pow(10, 3),
            theta: 3*Math.PI/2
          },
          {
            r: 33 * Math.pow(10, 3),
            theta: Math.PI/2
          }
        ]
      },
      "Chaotic": {
        dimensionless: true,
        masses: [1, 1, 1],
        massSlider: {
          min: 0.1,
          max: 10,
          power: 3
        },
        timeScaleFactor: 3.7475,
        timeScaleFactorSlider: {
          min: 0.00,
          max: 100,
          power: 3
        },
        positions: [ // in Polar coordinates, r is in meters
          {
            r: 1,
            theta: 0
          },
          {
            r: 1,
            theta: 2*Math.PI/3
          },
          {
            r: 1,
            theta: 4*Math.PI/3
          }
        ],
        velocities: [ // in Polar coordinates, r is in m/s
          {
            r: .55,
            theta: Math.PI/2
          },
          {
            r: .55,
            theta: 2*Math.PI/3 + Math.PI/2
          },
          {
            r: .55,
            theta: 4*Math.PI/3 + Math.PI/2
          }
        ]
      },
    };

    function didClickElement(element) {
      if (!cssHelper.hasClass(element, "ThreeBodyProblem-preset")) {
        didClickElement(element.parentElement);
        return;
      }

      var name = element.getAttribute("data-name");
      var preset = allPresets[name];

      if (content.didChangeModel !== null) {
        content.didChangeModel(preset);
      }

      // Mark the current element as selected
      // -----------

      var presetElements = document.querySelectorAll(".ThreeBodyProblem-preset");

      // Loop through the presets
      for (var iPreset = 0; iPreset < presetElements.length; iPreset++) {
        var presetElement = presetElements[iPreset];
        cssHelper.removeClass(presetElement, 'ThreeBodyProblem-button--isSelected');
      }
      cssHelper.addClass(element, "ThreeBodyProblem-button--isSelected");
    }

    function didClick(e) {
      if (!e) { e = window.event; }
      didClickElement(e.target);
    }

    function init() {
      var presetElements = document.querySelectorAll(".ThreeBodyProblem-preset");

      // Loop through the presets
      for (var iPreset = 0; iPreset < presetElements.length; iPreset++) {
        var presetElement = presetElements[iPreset];
        presetElement.onclick = didClick;
      }

      return allPresets.FigureEight;
    }

    return {
      init: init,
      content: content
    };
  })();

  // A slider maps an input to output values, both between 0 and 1 using an odd power function.
  // The function is constructed such that is not very sensitive at the default output value
  // (for example, the starting value for the mass of an object)
  // but rapidly changes as when the slider is moved far away form it.
  var oddPowerCurve = (function(){
    function calcualteL(defaultOutput, power) {
      if (power === 0) return 1;
      return -Math.pow(defaultOutput, 1 / power);
    }

    function calcualteA(defaultOutput, power) {
      if (power === 0) return 1;
      return Math.pow(1 - defaultOutput, 1 / power) - calcualteL(defaultOutput, power);
    }

    // Return the slider input value based on the output and default output values
    function sliderInputValue(defaultOutput, output, power) {
      if (power === 0) return 1;
      var a = calcualteA(defaultOutput, power);
      if (a === 0) { a = 1; }
      var l = calcualteL(defaultOutput, power);
      var sign = (output - defaultOutput) < 0 ? -1 : 1;
      return (sign * Math.pow(Math.abs(output - defaultOutput), 1 / power) - l) / a;
    }

    // Return the slider output value based on the input and default output values
    function sliderOutputValue(defaultOutput, intput, power) {
      if (power === 0) return 1;
      var a = calcualteA(defaultOutput, power);
      var l = calcualteL(defaultOutput, power);

      var result = Math.pow(a * intput + l, power) + defaultOutput;
      if (result < 0) { result = 0; }
      return result;
    }

    return {
        sliderInputValue: sliderInputValue,
        sliderOutputValue: sliderOutputValue
      };
  })();

  // React to user input
  var userInput = (function(){
    var sliderLabelElement = document.querySelector(".ThreeBodyProblem-sliderLabel");
    var restartButton = document.querySelector(".ThreeBodyProblem-reload");
    var mass1Button = document.querySelector(".ThreeBodyProblem-mass1Button");
    var mass2Button = document.querySelector(".ThreeBodyProblem-mass2Button");
    var mass3Button = document.querySelector(".ThreeBodyProblem-mass3Button");
    var speedButton = document.querySelector(".ThreeBodyProblem-speedButton");
    var sliderElement = document.querySelector(".ThreeBodyProblem-slider");
    var slider;
    var currentSlider = "mass";
    var currentMassSliderIndex = 0;
    var currentModel; // Currently selected model

    // Returns the output value of the slider between 0 to 1 corresponding to the
    // default value of the variable (such as default mass for an object)
    function calculateDefaultSliderOutput(sliderSettings) {
      var defaultValue = getCurrentSimulationValue(currentModel);
      return (defaultValue - sliderSettings.min) / (sliderSettings.max - sliderSettings.min);
    }

    function didUpdateSlider(sliderValue) {
      var sliderText;
      var sliderSettings = getCurrentSliderSettings();


      if (sliderSettings.power !== undefined) {

        if (sliderSettings.power % 2 === 1) { // Odd power
          var defaultOutput = calculateDefaultSliderOutput(sliderSettings);
          sliderValue = oddPowerCurve.sliderOutputValue(defaultOutput, sliderValue, sliderSettings.power);
        } else {
          sliderValue = Math.pow(sliderValue, sliderSettings.power);
        }
      }

      var newValue = sliderSettings.min + (sliderSettings.max - sliderSettings.min) * sliderValue;
      newValue = roundSliderValue(newValue);

      if (currentSlider === "mass") {
        physics.initialConditions.masses[currentMassSliderIndex] = newValue;
        graphics.updateObjectSizes(physics.calculateDiameters());
        sliderText = formatMassForSlider(newValue);
      } else {
        physics.initialConditions.timeScaleFactor = newValue;
        sliderText = formatTimescaleForSlider(newValue);
      }

      sliderLabelElement.innerText = sliderText;
    }

    function getCurrentSliderSettings() {
      var sliderSettings;

      if (currentSlider === "mass") {
        sliderSettings = physics.initialConditions.massSlider;
      } else {
        sliderSettings = physics.initialConditions.timeScaleFactorSlider;
      }

      return sliderSettings;
    }

    function roundSliderValue(value) {
      return Math.round(value * 10000) / 10000;
    }

    function roundSliderValueText(value) {
      return parseFloat(Math.round(value * 10000) / 10000).toFixed(4);
    }

    function bodyNameFromIndex(index) {
      switch(index) {
        case 0:
            return "the Sun";
        case 1:
            return "the Earth";
        default:
            return "Jupiter";
      }
    }

    function formatMassForSlider(mass) {
      var formatted = roundSliderValueText(mass);

      if (mass > 10000) {
        formatted = mass.toExponential(4);
      }

      formatted = "Mass of " + bodyNameFromIndex(currentMassSliderIndex) + " : " + formatted;

      if (physics.initialConditions.dimensionless !== true) {
        formatted += " kg";
      }

      return formatted;
    }

    function formatTimescaleForSlider(value) {
      var timeHumanized = timeHumanReadable(value);
      var formatted = roundSliderValueText(timeHumanized.value);

      if (timeHumanized.value > 10000) {
        formatted = timeHumanized.value.toExponential(4);
      }

      formatted = "Simulation speed: " + formatted + " " + timeHumanized.unit + " per second";

      return formatted;
    }

    function timeHumanReadable(time) {
      var result = {
        unit: 'second',
        value: time
      };

      if (result.value < 60) {
        return result;
      }

      result.value /= 60;
      result.unit = 'minute';

      if (result.value < 60) {
        return result;
      }

      result.value /= 60;
      result.unit = 'hour';

      if (result.value < 24) {
        return result;
      }

      result.value /= 24;
      result.unit = 'day';

      if (result.value < 365) {
        return result;
      }

      result.value /= 365;
      result.unit = 'year';

      if (result.value < 100) {
        return result;
      }

      result.value /= 100;
      result.unit = 'century';

      return result;
    }

    function didClickRestart() {
      physics.resetStateToInitialConditions();
      graphics.clearScene(physics.largestDistanceMeters());
      graphics.updateObjectSizes(physics.calculateDiameters());
      return false; // Prevent default
    }

    function getCurrentSimulationValue(model) {
      var simulationValue;
      if (currentSlider === "mass") {
        simulationValue = model.masses[currentMassSliderIndex];
      } else {
        simulationValue = model.timeScaleFactor;
      }
      return simulationValue;
    }

    function resetSlider() {
      cssHelper.removeClass(sliderElement, "ThreeBodyProblem-sliderSun");
      cssHelper.removeClass(sliderElement, "ThreeBodyProblem-sliderEarth");
      cssHelper.removeClass(sliderElement, "ThreeBodyProblem-sliderJupiter");

      var sliderSettings = getCurrentSliderSettings();
      var simulationValue = getCurrentSimulationValue(physics.initialConditions);
      var sliderText;

      if (currentSlider === "mass") {
        sliderText = formatMassForSlider(physics.initialConditions.masses[currentMassSliderIndex]);

        switch(currentMassSliderIndex) {
            case 0:
                cssHelper.addClass(sliderElement, "ThreeBodyProblem-sliderSun");
                break;
            case 1:
                cssHelper.addClass(sliderElement, "ThreeBodyProblem-sliderEarth");
                break;
            default:
                cssHelper.addClass(sliderElement, "ThreeBodyProblem-sliderJupiter");
        }
      } else {
        sliderText = formatTimescaleForSlider(physics.initialConditions.timeScaleFactor);
      }

      sliderLabelElement.innerText = sliderText;
      var sliderPosition = (simulationValue - sliderSettings.min) / (sliderSettings.max - sliderSettings.min);

      if (sliderSettings.power !== undefined) {
        if (sliderSettings.power % 2 === 1) { // Odd power
          var defaultOutput = calculateDefaultSliderOutput(sliderSettings);
          sliderPosition = oddPowerCurve.sliderInputValue(defaultOutput, sliderPosition, sliderSettings.power);
        } else {
          sliderPosition = Math.pow(sliderPosition, 1 / sliderSettings.power);
        }
      }

      slider.changePosition(sliderPosition);
    }

    function didChangeModel(model) {
      currentModel = model;
      physics.changeInitialConditions(currentModel);
      didClickRestart();
      resetSlider();
    }

    function didClickMass1() {
      currentSlider = "mass";
      currentMassSliderIndex = 0;
      resetSlider();
      return false; // Prevent default
    }

    function didClickMass2() {
      currentSlider = "mass";
      currentMassSliderIndex = 1;
      resetSlider();
      return false; // Prevent default
    }

    function didClickMass3() {
      currentSlider = "mass";
      currentMassSliderIndex = 2;
      resetSlider();
      return false; // Prevent default
    }

    function didClickSpeed() {
      currentSlider = "speed";
      currentMassSliderIndex = 0;
      resetSlider();
      return false; // Prevent default
    }

    function init() {
      currentModel = simulations.init();
      physics.changeInitialConditions(currentModel);
      simulations.content.didChangeModel = didChangeModel;

      // Slider
      slider = SickSlider(".ThreeBodyProblem-slider");
      slider.onSliderChange = didUpdateSlider;
      resetSlider();

      // Buttons
      restartButton.onclick = didClickRestart;
      mass1Button.onclick = didClickMass1;
      mass2Button.onclick = didClickMass2;
      mass3Button.onclick = didClickMass3;
      speedButton.onclick = didClickSpeed;
    }

    return {
      init: init
    };
  })();

  userInput.init();

  simulation.start();
})();