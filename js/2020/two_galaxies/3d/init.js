// Initialise the graphics, the canvas and WebGL, load colors and star
// sizes in the GPU.
// The code is based on examples from https://webglfundamentals.org.

import { createProgramFromScripts } from './web_gl_utils.js';
import m4 from './m4.js';

import { numberOfStarsInAllRingsOneGalaxy, totalNumberOfBodies }
  from '../physics/initial_conditions.js';


// Adjust the size of the drawing buffer based on the CCS pixel size
// of the canvas
function fitToContainer(drawData){
  var canvas = drawData.gl.canvas;
  var realToCSSPixels = window.devicePixelRatio;

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawing buffer match it in
  // device pixels.
  var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is not the same size.
  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight) {

    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}


/**
 * Prepare for drawing trajectories of the two galaxy cores.
 *
 * @param  {object} drawData Object containing information used for drawing.
 */
function initTrajectories(drawData) {
  // Create two shaders for drawing trajectories
  // ---------

  let gl = drawData.gl;

  var program = createProgramFromScripts(gl,
    [
      ".Webgl-vertexShader-trajectory",
      ".Webgl-fragmentShader-trajectory"
    ]);

  // Lookup location of the position attribute for the program
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer (attributes get their data from buffers)
  var positionBuffer = gl.createBuffer();

  drawData.trajectories = {
    program: program,
    positionLocation: positionLocation,
    positionBuffer: positionBuffer,
    matrixLocation: matrixLocation,
    colorLocation: colorLocation
  };
}


/**
 * Prepare for drawing stars on screen:
 * initialize WebGL, create buffers for loading positions and colors of stars
 * into the GPU etc.
 *
 * The code is based on examples from https://webglfundamentals.org.
 *
 * @param  {object} initialParams Initial parameters of the simulation.
 * @return {object} Information that will be used later at each animation
 *                  frame for drawing stars on screen.
 */
export function initGraphics(initialParams) {
  // Get canvas object
  var canvas = document.querySelector(".TwoGalaxies-canvas");
  var gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Create two shaders for drawing stars
  // ---------

  var program = createProgramFromScripts(
    gl, [".Webgl-vertexShader", ".Webgl-fragmentShader"]);

  // Lookup location of the position attribute for the program
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  var starSizeLocation = gl.getAttribLocation(program, "a_star_size");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer (attributes get their data from buffers)
  var positionBuffer = gl.createBuffer();
  var colorBuffer = gl.createBuffer();
  var starSizeBuffer = gl.createBuffer();

  var drawData = {
    gl: gl,
    program: program,
    positionLocation: positionLocation,
    positionBuffer: positionBuffer,
    colorLocation: colorLocation,
    colorBuffer: colorBuffer,
    starSizeLocation: starSizeLocation,
    starSizeBuffer: starSizeBuffer,
    matrixLocation: matrixLocation
  };

  // Load the colors of the stars into the GPU
  loadColors(drawData, initialParams);

  // Load the sizes of the stars in the GPU
  loadStarSizes(drawData, initialParams);

  initTrajectories(drawData);

  // Adjust the size of the drawing region based on the size of the
  // web browser window
  fitToContainer(drawData);

  // Adjust the canvas size when the browser window is resized
  window.addEventListener('resize', (e) => fitToContainer(drawData));

  return drawData;
}


/**
 * Load star colors into the GPU buffer
 *
 * @param  {object} drawData Draw data
 * @param  {object} initialParams Initial parameters of the simulation
 * @param  {array} twoColors  Colors of the two galaxies
 */
export function loadColors(drawData, initialParams) {
  // Calculate the number of stars in each galaxy
  let stars1 = numberOfStarsInAllRingsOneGalaxy(initialParams.numberOfRings[0],
                                                initialParams.ringMultiplier);

  let stars2 = numberOfStarsInAllRingsOneGalaxy(initialParams.numberOfRings[1],
                                                initialParams.ringMultiplier);

  // Total number of bodies
  let bodies = 2 + stars1 + stars2;

  let twoColors = initialParams.colors;
  var colors = new Uint8Array(bodies * 3);

  // Core 1
  colors[0] = initialParams.coreColors[0][0];
  colors[1] = initialParams.coreColors[0][1];
  colors[2] = initialParams.coreColors[0][2];

  // Core 2
  colors[3] = initialParams.coreColors[1][0];
  colors[4] = initialParams.coreColors[1][1];
  colors[5] = initialParams.coreColors[1][2];

  // Stars of first galaxy
  for(let i = 0; i < stars1; i++) {
    colors[6 + i * 3 + 0] = twoColors[0][0];
    colors[6 + i * 3 + 1] = twoColors[0][1];
    colors[6 + i * 3 + 2] = twoColors[0][2];
  }

  // Stars of second galaxy
  for(let i = 0; i < stars2; i++) {
    colors[6 + i * 3 + stars1 * 3 + 0] = twoColors[1][0];
    colors[6 + i * 3 + stars1 * 3 + 1] = twoColors[1][1];
    colors[6 + i * 3 + stars1 * 3 + 2] = twoColors[1][2];
  }

  var gl = drawData.gl;

  // Bind ARRAY_BUFFER to the colorBuffer (creates a global variable inside WebGL)
  gl.bindBuffer(gl.ARRAY_BUFFER, drawData.colorBuffer);

  // Write colors to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
}


/**
 * Load star star sizes into the GPU buffer
 *
 * @param  {object} drawData Draw data
 * @param  {object} initialParams Initial parameters of the simulation
 * @param  {array} twoColors  Colors of the two galaxies
 */
export function loadStarSizes(drawData, initialParams) {
  // Total number of bodies (stars plus two galaxy cores)
  let bodies = totalNumberOfBodies(initialParams.numberOfRings[0],
                                   initialParams.numberOfRings[1],
                                   initialParams.ringMultiplier);

  let size = initialParams.starSize;
  var sizes =  new Float32Array(bodies).fill(size);

  // Size of the galaxy core. Make them dependent on their masses
  let coreSize = 2.0 * size;

  // The size of a constant density star is proportional to its mass
  // to the 1/3 power
  sizes[0] = coreSize * Math.pow(initialParams.masses[0], 1/3);
  sizes[1] = coreSize * Math.pow(initialParams.masses[1], 1/3);

  var gl = drawData.gl;

  // Bind ARRAY_BUFFER to the starSizeBuffer (creates a global variable inside WebGL)
  gl.bindBuffer(gl.ARRAY_BUFFER, drawData.starSizeBuffer);

  // Write sizes to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
}
