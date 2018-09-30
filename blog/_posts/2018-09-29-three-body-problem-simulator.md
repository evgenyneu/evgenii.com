---
layout: blog_post
comments: false
title: "Programming a three-body problem in JavaScript"
meta_description: "Here we program a three-body problem in JavaScript showing three bodies rotationg about the common center of mass."
tags: programming science
---

<link rel="stylesheet" href="/css/2018/three-body-problem-simulator.css">

<!-- Message shown in old browsers. -->
  <p id="ThreeBodyProblem-notSupportedMessage" class="ThreeBodyProblem-alert ThreeBodyProblem-isHiddenBlock">Please use a newer browser to see the simulation.</p>

<div class="ThreeBodyProblem-container isFullScreenWide isUnselectable">
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/sun.png' alt='Sun' class='ThreeBodyProblem-sun ThreeBodyProblem-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/earth.png' alt='Earth' class='ThreeBodyProblem-earth ThreeBodyProblem-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/jupiter_juno.png' alt='Jupiter' class='ThreeBodyProblem-jupiter ThreeBodyProblem-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/center_of_mass.png' alt='Center of mass' class='ThreeBodyProblem-centerOfMass'>

    <canvas class="ThreeBodyProblem-canvas"></canvas>

    <div class='ThreeBodyProblem-hudContainer'>
      <div class='ThreeBodyProblem-hudContainerChild'>
        <div class='ThreeBodyProblem-leftBottomButtonCantainer'>
          <a class='ThreeBodyProblem-leftBottomButton ThreeBodyProblem-mass1Button' href='#' title='Mass 1'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_one_icon.png' alt='Mass 1' class='ThreeBodyProblem-leftBottomImage'>
          </a>
          <a class='ThreeBodyProblem-leftBottomButton ThreeBodyProblem-mass2Button' href='#' title='Mass 2'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_two_icon.png' alt='Mass 2' class='ThreeBodyProblem-leftBottomImage'>
          </a>
          <a class='ThreeBodyProblem-leftBottomButton ThreeBodyProblem-mass3Button' href='#' title='Mass 3'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_three_icon.png' alt='Mass 3' class='ThreeBodyProblem-leftBottomImage'>
          </a>
          <a class='ThreeBodyProblem-leftBottomButton ThreeBodyProblem-speedButton' href='#' title='Speed'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/clock_icon.png' alt='Speed' class='ThreeBodyProblem-leftBottomImage'>
          </a>
        </div>
        <a class='ThreeBodyProblem-reload' href='#' title='Reload'><img src='https://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/reload_icon.png' alt='Restart' class='ThreeBodyProblem-reloadIcon'></a>
      </div>
    </div>
</div>

<div class='ThreeBodyProblem-isTextCentered ThreeBodyProblem-hasTopMarginSmall ThreeBodyProblem-hasNegativeBottomMarginNormal isUnselectable'>
  <span class='ThreeBodyProblem-sliderLabel'>0.10</span>
</div>

<div class="SickSlider ThreeBodyProblem-slider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<button class="ThreeBodyProblem-preset ThreeBodyProblem-button ThreeBodyProblem-button--isSelected" data-name="FigureEight">Figure eight</button>
<button class="ThreeBodyProblem-preset ThreeBodyProblem-button" data-name="SunEarthJupiter">Sun, Earth and Jupiter</button>
<button class="ThreeBodyProblem-preset ThreeBodyProblem-button" data-name="LagrangePoint5">Lagrange point L5</button>
<button class="ThreeBodyProblem-preset ThreeBodyProblem-button" data-name="Kepler16">Kepler-16</button>
<button class="ThreeBodyProblem-preset ThreeBodyProblem-button" data-name="Chaotic">Chaotic</button>

<p class='ThreeBodyProblem-debugOutput'></p>

<script src="/js/2018/three-body-problem-simulator.js"></script>

<br>

In this tutorial we will program motion of three bodies in HTML and JavaScript. This work is built upon the [two-body simulation code](/blog/two-body-problem-simulator/). I want to say huge thanks to Dr Rosemary Mardling, who taught me astrophysics in Monash University. This work is based on Rosmary's ideas and code. As always, feel free to check the full [source code](/files/2018/09/three-body-problem-simulator/the_complete_code/), and use it for any purpose.


## Three-body simulations

The little buttons under the slider are used the run the following simulations. 

### Figure eight

This is a stable three-body system discovered by Cris Moore [5]. The system remains stable even if we change the masses off all bodies a little bit, to 0.99 for example. Just for fun, try increasing the speed of this animation. At certain speeds you will see weird stroboscopic effects. Be careful, this can make you dizzy.

### Sun, Earth and Jupiter

This simulation uses true masses, velocities and distances of the Sun, Earth and Jupiter. We can measure one period of the Earth's orbit in the simulation, which is around one second (may depend on computer speed and refresh rate of the monitor). We can see that the simulation is working correctly, because its it run at speed of one year per second.

### Lagrange point L5

Here the Earth is located near the Sun-Jupiter L5 Lagrange point. Notice that the radius of the Earth's orbit is smaller than that of Jupiter initially. If Jupiter's was not as massive, the Earth would overtake Jupiter. We can check this by decreasing Jupiter's mass and clicking Reload button. However, the combined gravity from Jupiter and the Sun traps the Earth, and it is destined to remain at L5 point behind Jupiter.

### Kepler-16

This is a simulation of a binary star system that also has a planet with a mass of 1/3 of Jupiter. Both binary stars are smaller than the Sun. This orbital plane of the planet is located edge-on, such that it blocks some light form the stars. This allowed scientists to measure periodic dips in the light from the stars, and this is how the planet was discovered [6]. The system appears to be stable, at least in the short term.


### Chaotic

This is an example of how an orderly and symmetrical system can quickly become unstable. Even small changes in the masses or the speed of the simulation produce different outcomes. The simulation even looks different when it is run in different browsers. This demonstrates sensitivity of a chaotic system to small variations.



## The coordinate system

We will be using a coordinate system with its origin located at the center of mass of the three bodies, as shown in Fig. 1.

<div class='isTextCentered'>
  <img class='isMax400PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/010_coordinate_system.png' alt='Coordinate system for a two-body problem'>
  <p>Figure 1: A coordinate system with the origin at the common center of mass of the two bodies.</p>
</div>


## The equations of motion

The main equation for this simulation is the Newton's equation of universal gravitation:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax120PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/0020_newtons_law_of_gravitation.png' alt="Newton's law of universal gravitation">
  </span>
  <span>(1)</span>
</div>

Combining this with the Newton's second law `F = m a`, we can derive three equations of motion:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax300PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/0030_equations_of_motion.png' alt='Equations of motion for three bodies'>
  </span>
  <span>(2)</span>
</div>

The double dot means the second time derivative. Vector

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax120PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/0040_vector_r12.png' alt='Vector v12'>
  </span>
  <span>(3)</span>
</div>

points from the Sun to the Earth. Equation 2 also includes the magnitudes of the vectors, which can be calculated as follows, for the case of vector pointing form the Sun to the Earth:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax300PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/0050_length_of_vector_r12.png' alt='The length of vector v12'>
  </span>
  <span>(4)</span>
</div>

Here `x1, y1` and `x2, y2` are the coordinates of the Earth and the Sun respectively.

## Writing equations of motions in `x` and `y`

Equation 2 contains three equations of motion. In order to use the equations in our program we need to write each equation in terms of `x` and `y` coordinates. This gives six equations

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax350PxWide' src='/image/blog/2018-09-27-three-body-problem-simulator/0060_equations_of_motions_with_coordinates_x_and_y.png' alt='Equations of motions of three bodies in terms of coordinates x and y'>
  </span>
  <span>(5)</span>
</div>



## Credits

1. This work is based on code and lectures by Dr Rosemary Mardling from Monash University.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

1. **"Jupiter's South Pole"** image: NASA/JPL-Caltech/SwRI/MSSS/Betsy Asher Hall/Gervasio Robles, [source](https://www.nasa.gov/image-feature/jupiters-south-pole).

1. **Figure eight orbit**: Moore, C. 1993, Phys. Rev. Lett., 70, 3675.

1. **Kepler-16 system**: Doyle, L. R., Carter, J. A., Fabrycky, D. C., et al. 2011, Science, 333, 1602.


## References

* [The complete source code](/files/2018/09/three-body-problem-simulator/the_complete_code/) of the three-body problem simulation.
