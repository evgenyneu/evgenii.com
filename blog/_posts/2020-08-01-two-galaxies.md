---
layout: blog_post
comments: false
title: "Making a JavaScript simulation of two interacting galaxies"
tags: science
---

<link rel="stylesheet" href="/css/2020/two_galaxies.css">


<div class="TwoGalaxies-container isFullScreenWide isUnselectable hasBottomMarginSmall">
  <canvas class="TwoGalaxies-canvas"></canvas>

  <div class='TwoGalaxies-hudContainer'>
    <div class='TwoGalaxies-FPS'></div>
    <div class='TwoGalaxies-hudContainerChild'>
      <div class='TwoGalaxies-leftTopButtonContainer'>
        <a class='TwoGalaxies-resetButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Reset'><img src='/image/blog/2020-08-01-two-galaxies/simulation/reset_icon.svg' alt='Reset' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-restartButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Restart'><img src='/image/blog/2020-08-01-two-galaxies/simulation/restart_icon.svg' alt='Restart' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-fastBackwardButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Rewind'><img src='/image/blog/2020-08-01-two-galaxies/simulation/fast_backward_icon.svg' alt='Rewind' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-pauseButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Pause'><img src='/image/blog/2020-08-01-two-galaxies/simulation/pause_icon.svg' alt='Pause' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-resumeButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover TwoGalaxies-button--isHidden' href='#' title='Resume'><img src='/image/blog/2020-08-01-two-galaxies/simulation/resume_icon.svg' alt='Resume' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-fastForwardButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Fast forward'><img src='/image/blog/2020-08-01-two-galaxies/simulation/fast_forward_icon.svg' alt='Fast forward' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-reverseTimeButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Reverse time'><img src='/image/blog/2020-08-01-two-galaxies/simulation/reverse_time_icon.svg' alt='Reverse time' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-reverseTime2Button TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover TwoGalaxies-button--isHidden' href='#' title='Reverse time'><img src='/image/blog/2020-08-01-two-galaxies/simulation/reverse_time2_icon.svg' alt='Reverse time' class='TwoGalaxies-bottomImage'></a>
      </div>
      <div class='TwoGalaxies-rightTopButtonContainer'>
        <a class='TwoGalaxies-shareButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Share'><img src='/image/blog/2020-08-01-two-galaxies/simulation/share_icon.svg' alt='Share' class='TwoGalaxies-bottomImage'></a>
      </div>
      <div class='TwoGalaxies-leftBottomButtonContainer'>
        <a class='TwoGalaxies-numberOfRingsButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Number of rings'><img src='/image/blog/2020-08-01-two-galaxies/simulation/number_of_rings_icon.svg' alt='Number of rings' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-massButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Mass'><img src='/image/blog/2020-08-01-two-galaxies/simulation/mass_icon.svg' alt='Mass' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-distanceButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Distance'><img src='/image/blog/2020-08-01-two-galaxies/simulation/distance_icon.svg' alt='Distance' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-eccentricityButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Eccentricity'><img src='/image/blog/2020-08-01-two-galaxies/simulation/eccentricity_icon.svg' alt='Eccentricity' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-angleButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Galaxy inclination'><img src='/image/blog/2020-08-01-two-galaxies/simulation/angle_icon.svg' alt='Galaxy inclination' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-ringSeparationButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Ring separation'><img src='/image/blog/2020-08-01-two-galaxies/simulation/ring_separation_icon.svg' alt='Ring separation' class='TwoGalaxies-bottomImage'></a>
        <a class='TwoGalaxies-timeStepButton TwoGalaxies-leftButton TwoGalaxies-button TwoGalaxies-doesChangeOpacityOnHover' href='#' title='Time step'><img src='/image/blog/2020-08-01-two-galaxies/simulation/clock_icon.svg' alt='Time step' class='TwoGalaxies-bottomImage'></a>
      </div>
    </div>
  </div>
</div>

<div class="TwoGalaxies-sliderRings1 TwoGalaxies-sliderColor1 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderRings2 TwoGalaxies-sliderColor2 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderMass1 TwoGalaxies-sliderColor1 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderMass2 TwoGalaxies-sliderColor2 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderDistance SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderEccentricity SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderAngle1 TwoGalaxies-sliderColor1 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderAngle2 TwoGalaxies-sliderColor2 SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderRingSeparation SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-sliderTimeStep SickSlider SickSlider--isHidden hasBottomMarginSmall hasHorizontalMarginsSmall SickSlider--isUnselectable">
  <div class='SickSlider-label'>Label text</div>
  <div class="SickSlider-slider">
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-stripeLeft"></div>
    <div class="SickSlider-head"></div>
  </div>
</div>

<div class="TwoGalaxies-shareContainer TwoGalaxies--isHidden isTextCentered hasTopMarginNormal">
  <textarea class="TwoGalaxies-shareText hasBottomMarginMini">Hello I'm some text</textarea>
  <button class="TwoGalaxies-copyToClipboardButton hasBottomMarginSmall">Copy to clipboard</button>
  <div class="TwoGalaxies-copyOutcome">&nbsp;</div>
</div>


<!-- WebGL program for drawing stars -->

<script class="Webgl-vertexShader" type="notjs">
  attribute vec4 a_position;
  attribute vec4 a_color;
  attribute float a_star_size;
  uniform mat4 u_matrix;
  varying vec4 v_color;

  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;

    // Make stars that are further away appear smaller
    // but not smaller than minimum size
    gl_PointSize = max(a_star_size / gl_Position.z, 4.0);

    // Pass the color to the fragment shader
    v_color = a_color;
  }
</script>

<script class="Webgl-fragmentShader" type="notjs">
  // Precision of the fragment shader
  precision mediump float;

  // Passed in from the vertex shader.
  varying vec4 v_color;

  void main() {
    // Draw a disk
    // Based on
    // https://www.desultoryquest.com/blog/drawing-anti-aliased-circular-points-using-opengl-slash-webgl/
    // ---------

    // gl_PointCoord is the [x, y] coordinate of currently drawn pixel inside
    // the 1 by 1 rectangle. The x and y values are between 0 and 1.
    // We translate the coordinates to be from -1 to 1 instead:
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;

    // Calculate the square of the distance from [0, 0]
    float r = dot(cxy, cxy);

    // Do not draw the pixel if the distance is greater than one,
    // which means the pixel is outside the disk
    if (r > 1.0) {
        discard;
    }

    // Draw the pixels inside the disk with the supplied color
    // Make middle brighter to make it look like a sphere
    gl_FragColor = v_color * r + vec4(1, 1, 1, 1) * (1.0 - r);
  }

</script>


<!-- WebGL program for drawing trajectories of galaxy cores -->

<script class="Webgl-vertexShader-trajectory" type="notjs">
  attribute vec4 a_position;
  uniform mat4 u_matrix;

  void main() {
    gl_Position = u_matrix * a_position;
  }
</script>

<script class="Webgl-fragmentShader-trajectory" type="notjs">
  // Precision of the fragment shader
  precision mediump float;

  uniform vec4 u_color;

  void main() {
    gl_FragColor = u_color;
  }

</script>

<script type="module" src="/js/2020/two_galaxies/main.js"></script>


## What's this about?

In this post I want to show how to make a simulation of two interacting galaxies that runs in a Web browser, using HTML, CSS and JavaScript languages. I won't explain everything, because I would need to write a book (maybe several), and I have neither the skill nor the patience for that yet. Instead, here I just want to briefly show the main ideas, in both physics and code, that will hopefully make this simulation appear less magical. The full source code is available [here](https://github.com/evgenyneu/two_galaxies).

## The main idea

This simulation contains two galaxy cores that move around the common center of mass, located at the origin of the coordinate system (Fig. 1). The two cores move in the X-Y plane. If we only consider the cores, then this is just a two-body problem that [we coded previously](/blog/two-body-problem-simulator/). However, this time we want to add stars that move around each core in circular orbits. The stars form discs that are tilted at adjustable angles.

<div class='isTextCentered'>
  <img class='isMax600PxWide' src='/image/blog/2020-08-01-two-galaxies/0010_main_idea.jpg' alt='The main idea behind the simulation'>
  <p>Figure 1: The main idea behind the simulation.</p>
</div>

## A spherical cow

This model includes big a simplification of reality: the stars are massless, they only feel the gravity from the two cores, but not from other stars. This simplification makes the model very unrealistic. In a real galaxy, the mass is not located at the center, but instead contained in the stars and dark matter that is distributed through the galaxy. For example, our Milky Way contains a supermassive black hole Sagittarius A* in its center, but the black hole is "only" about one millionth (0.000001) of the mass of the galaxy.

But unrealistic simplifications are useful. Sometimes, they help us understand something fundamental about complex reality. Without neglecting the everyday effects of friction and gravity, it would have been much harder for Galileo and Newton to discover the central law of physics, that unperturbed bodies move at constant velocity.






## Acknowledgements and Links

* Daniel Price ([Monash](http://users.monash.edu.au/~dprice/), [orcid.org](http://orcid.org/0000-0002-4716-4235)): he wrote the Fortran code and the laboratory manual this simulation is based on. He also taught me astrophysics in Monash uni so I can understand the code. In other words, **he is the main reason this work exists**.

* [webglfundamentals.org](https://webglfundamentals.org): that's where I learned how to do 3D drawing in the web browser for this simulation. Relevant sections are "Fundamentals", "2D translation, rotation, scale, matrix math" and "3D".

* [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf): a 1972 paper by Alar and Juri Toomre that analyses similar simulations. I mean, just look at the size and quality of the paper, the attention to detail. Imagine amount of work that went to create all those diagrams. I have not seen anything like that.

* [github.com/evgenyneu/two_galaxies](https://github.com/evgenyneu/two_galaxies): the source code of this simulation. Feel free to use, contribute or fix bugs.
