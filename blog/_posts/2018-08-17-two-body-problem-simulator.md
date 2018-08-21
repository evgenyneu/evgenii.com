---
layout: blog_post
comments: true
title: "Programming a two-body problem simulator in JavaScript"
meta_description: "Here we program a two-body problem in JavaScript showing two bodies rotationg about the common center of mass."
tags: programming science
---

<link rel="stylesheet" href="/css/2018/two-body-problem-simulator.css">

<!-- Message shown in old browsers. -->
  <p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert EarthOrbitSimulation-isHiddenBlock">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='https://evgenii.com/image/blog/2018-08-17-two-body-problem-simulator/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>
    <img src='https://evgenii.com/image/blog/2018-08-17-two-body-problem-simulator/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>
    <img src='https://evgenii.com/image/blog/2018-08-17-two-body-problem-simulator/center_of_mass.png' alt='Earth' class='EarthOrbitSimulation-centerOfMass'>

    <canvas class="EarthOrbitSimulation-canvas"></canvas>

    <div class='EarthOrbitSimulation-hudContainer'>
      <div class='EarthOrbitSimulation-hudContainerChild'>
        <a class='EarthOrbitSimulation-reload' href='#'><img src='https://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/reload_icon.png' alt='Restart' class='EarthOrbitSimulation-reloadIcon'></a>
      </div>
    </div>
</div>

<div class='EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-hasTopMarginNormal EarthOrbitSimulation-hasNegativeBottomMarginNormal isUnselectable'>
  Mass ratio: <span class='EarthOrbitSimulation-sunsMass'>0.10</span>
</div>

<div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<div class='EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-hasTopMarginNormal EarthOrbitSimulation-hasNegativeBottomMarginNormal isUnselectable'>
  Eccentricity: <span class='EarthOrbitSimulation-eccentricity'>0.10</span>
</div>

<div class="SickSlider EarthOrbitSimulation-eccentricitySlider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<p class='EarthOrbitSimulation-debugOutput'></p>

<script src="/js/2018/two-body-problem-simulator.js"></script>

<br>

In this tutorial we will program a simulation of motion of two celestial bodies in HTML/JavaScript. This work is largely based on what I learned from Dr Rosemary Mardling, who is an astrophysicist at Monash University. Please feel free to use the full [source code](/files/2018/08/two-body-problem-simulator/the_complete_code/) of this simulation for any purpose.


## Our approach

We have already done a simulation of motion of two bodies in the [Earth orbit simulator](blog/earth-orbit-simulation/) tutorial. There we derived equations of motion from the Lagrangian and used them to move the planet around the Sun. For simplicity, we choose the center of mass of two bodies to be at the center of the Sun, which stayed stationary at the origin of our coordinate system. Here we will use a different approach and allow two bodies to move around a common center of mass.

## Our coordinate system

A surprising fact about the motion of two bodies is that their common center of mass remains still (or moves at constant velocity). We can take advantage of this fact and place the origin of the coordinate system at the center of mass (Fig. 1).

<div class='isTextCentered'>
  <img class='isMax400PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0010_coordinate_system.jpg' alt='Coordinate system for a two-body problem'>
  <p>Figure 1: A coordinate system with the origin at the common center of mass of the two bodies.</p>
</div>

## Newtons law of gravitation

The main equation used in our simulation is the Newton's law of universal gravitation (Eq. 1). It says that the force of gravitational attraction between two bodies is proportional to the product of their masses and inversely proportional to the square of the distance between them.

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0020_newtons_law_of_gravitation.png' alt='The equation for the kinetic energy of the Earth orbitin the Sun'>
  </span>
  <span>(1)</span>
</div>

## Equation of motion

After a series of algebraic manipulations and removing dimensions, we can turn Eq. 1 into an equation of motion of two bodies shown in Eq. 2. Here vector **r** describes the position of second body *relative to* the first one. This vector is shown as blue arrow on Fig. 1.

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0030_equation_of_motion_of_two_bodies.png' alt='The equation of motion of two bodies'>
  </span>
  <span>(2)</span>
</div>

The variable **q** in Eq. 2 is the mass ratio of the first body (mass of the Sun divided by that of the Earth). The two dots above vector **r** denote the second time derivative.


## Equation of motion for x and y

Next, we write Eq. 1 in terms of x and y coordinates, which gives a system of two second-order non-linear differential equations:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0040_equation_of_motion_for_x_and_y.png' alt='Equation of motion for x and y'>
  </span>
  <span>(3)</span>
</div>

## Reducing the order of ODEs

We will be solve Eq. 3 numerically. In order to do this, we need to translate it into a system of first-order ODEs by making the following substitutions:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax80PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0050_substitutions_ode_reducing_order.png' alt='Substitutions for reducing the order of the ODEs'>
  </span>
  <span>(3)</span>
</div>

The substitutions allows us to translate two second-order differential equations into four first-order ones:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0060_syste_of_odes.png' alt='System of first-order differential equations'>
  </span>
  <span>(4)</span>
</div>


## To be continued...






## Credits

1. This work is based on code and lectures by Dr Rosemary Mardling from Monash University.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

## References

* [The complete source code](/files/2018/08/two-body-problem-simulator/the_complete_code/) of the two-body problem simulation.
