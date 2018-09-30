---
layout: blog_post
comments: false
title: "Programming a three-body problem in JavaScript"
meta_description: "Here we program a three-body problem in JavaScript showing three bodies rotationg about the common center of mass."
tags: programming science
---

<link rel="stylesheet" href="/css/2018/three-body-problem-simulator.css">

<!-- Message shown in old browsers. -->
  <p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert EarthOrbitSimulation-isHiddenBlock">Please use a newer browser to see the simulation.</p>

<div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/sun.png' alt='Earth' class='EarthOrbitSimulation-sun EarthOrbitSimulation-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/earth.png' alt='Earth' class='EarthOrbitSimulation-earth EarthOrbitSimulation-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/jupiter_juno.png' alt='Jupiter' class='EarthOrbitSimulation-jupiter EarthOrbitSimulation-spin'>
    <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/center_of_mass.png' alt='Earth' class='EarthOrbitSimulation-centerOfMass'>

    <canvas class="EarthOrbitSimulation-canvas"></canvas>

    <div class='EarthOrbitSimulation-hudContainer'>
      <div class='EarthOrbitSimulation-hudContainerChild'>
        <div class='EarthOrbitSimulation-leftBottomButtonCantainer'>
          <a class='EarthOrbitSimulation-leftBottomButton EarthOrbitSimulation-mass1Button' href='#' title='Mass 1'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_one_icon.png' alt='Mass 1' class='EarthOrbitSimulation-leftBottomImage'>
          </a>
          <a class='EarthOrbitSimulation-leftBottomButton EarthOrbitSimulation-mass2Button' href='#' title='Mass 2'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_two_icon.png' alt='Mass 2' class='EarthOrbitSimulation-leftBottomImage'>
          </a>
          <a class='EarthOrbitSimulation-leftBottomButton EarthOrbitSimulation-mass3Button' href='#' title='Mass 3'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/mass_three_icon.png' alt='Mass 3' class='EarthOrbitSimulation-leftBottomImage'>
          </a>
          <a class='EarthOrbitSimulation-leftBottomButton EarthOrbitSimulation-speedButton' href='#' title='Speed'>
            <img src='http://127.0.0.1:4000/image/blog/2018-09-27-three-body-problem-simulator/clock_icon.png' alt='Speed' class='EarthOrbitSimulation-leftBottomImage'>
          </a>
        </div>
        <a class='EarthOrbitSimulation-reload' href='#' title='Reload'><img src='https://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/reload_icon.png' alt='Restart' class='EarthOrbitSimulation-reloadIcon'></a>
      </div>
    </div>
</div>

<div class='EarthOrbitSimulation-isTextCentered EarthOrbitSimulation-hasTopMarginSmall EarthOrbitSimulation-hasNegativeBottomMarginNormal isUnselectable'>
  <span class='EarthOrbitSimulation-sliderLabel'>0.10</span>
</div>

<div class="SickSlider EarthOrbitSimulation-slider isUnselectable" >
  <div class="SickSlider-stripe"></div>
  <div class="SickSlider-head"></div>
</div>

<button class="EarthOrbitSimulation-preset EarthOrbitSimulation-button EarthOrbitSimulation-button--isSelected" data-name="FigureEight">Figure eight </button>
<button class="EarthOrbitSimulation-preset EarthOrbitSimulation-button" data-name="SunEarthJupiter">Sun, Earth and Jupiter</button>
<button class="EarthOrbitSimulation-preset EarthOrbitSimulation-button" data-name="LagrangePoint5">Lagrange point L5</button>
<button class="EarthOrbitSimulation-preset EarthOrbitSimulation-button" data-name="Kepler16">Kepler-16</button>
<button class="EarthOrbitSimulation-preset EarthOrbitSimulation-button" data-name="Chaotic">Chaotic</button>


<p class='EarthOrbitSimulation-debugOutput'></p>

<script src="/js/2018/three-body-problem-simulator.js"></script>

<br>

In this tutorial we will program a simulation of motion of two celestial bodies in HTML/JavaScript. This work is mostly based on what I learned from Dr Rosemary Mardling, who is an astrophysicist at Monash University. In addition, this code uses techniques we developed in [harmonic oscillator tutorial](/blog/programming-harmonic-oscillator/), which would be a good starting place for those who are new to this topic. Please feel free to use the full [source code](/files/2018/08/two-body-problem-simulator/the_complete_code/) of this simulation for any purpose.


## Our approach

We have already done a simulation of motion of two bodies in the [Earth orbit simulator](/blog/earth-orbit-simulation/) tutorial. There we derived equations of motion from the Lagrangian and used them to move the planet around the Sun. For simplicity, we choose the center of mass of two bodies to be at the center of the Sun, which stayed stationary at the origin of our coordinate system. Here we will use a different approach and allow two bodies to move around a common center of mass.

## Our coordinate system

A surprising fact about the motion of two bodies is that their common center of mass remains still (or moves at constant velocity). We can take advantage of this fact and place the origin of the coordinate system at the center of mass (Fig. 1).

<div class='isTextCentered'>
  <img class='isMax400PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0010_coordinate_system.jpg' alt='Coordinate system for a two-body problem'>
  <p>Figure 1: A coordinate system with the origin at the common center of mass of the two bodies.</p>
</div>

## Newton's law of gravitation

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

The variable **q** in Eq. 2 is the mass ratio of the bodies (i.e. mass of the Earth divided by Sun's mass). The two dots above vector **r** mean the second time derivative.


## Equations of motion for x and y

Next, we write Eq. 2 in terms of x and y coordinates, which gives a system of two second-order non-linear differential equations:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0040_equation_of_motion_for_x_and_y.png' alt='Equation of motion for x and y'>
  </span>
  <span>(3)</span>
</div>

## Reducing the order of ODEs

We will solve Eq. 3 numerically. In order to do this, we need to translate it into a system of first-order ODEs by making the following substitutions:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax80PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0050_substitutions_ode_reducing_order.png' alt='Substitutions for reducing the order of the ODEs'>
  </span>
  <span>(4)</span>
</div>

We will store the values of these four variables in the `state.u` array of the `physics` object:

```JavaScript
var state = {
  // Four variables used in the differential equations
  // First two elements are x and y positions, and second two are x and y components of velocity
  u: [0, 0, 0, 0]
}
```

Using the new variables we can now translate two second-order differential equations (Eq. 4) into four first-order ones:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax150PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0060_syste_of_odes.png' alt='System of first-order differential equations'>
  </span>
  <span>(5)</span>
</div>

We can now write a function that returns the derivatives of the four variables:

```JavaScript
// Calculate the derivatives of the system of ODEs that describe equation of motion of two bodies
function derivative() {
  var du = new Array(state.u.length);

  // x and y coordinates
  var r = state.u.slice(0,2);

  // Distance between bodies
  var rr = Math.sqrt( Math.pow(r[0],2) + Math.pow(r[1],2) );

  for (var i = 0; i < 2; i++) {
    du[i] = state.u[i + 2];
    du[i + 2] = -(1 + state.masses.q) * r[i] / (Math.pow(rr,3));
  }

  return du;
}
```

## Solve ODEs numerically

Now we can use a numerical method to solve the ODEs. In [Earth orbit simulator](/blog/earth-orbit-simulation/) we used Euler's method, but here we will try another popular method called Runge-Kutta:

```JavaScript
var timestep = 0.15;
rungeKutta.calculate(timestep, state.u, derivative);
```

We will run this code at each frame of the animation and it will save the new values of positions and velocities in `state.u`. The first two elements of this array are the x and y positions of the **r** vector from Fig. 1.



## Drawing two bodies on the screen

We are almost done. We have found the vector **r**, which describes the position of Earth *relative* to the Sun. We will now use this vector to calculate the positions of two bodies on screen. The trick here is to use the mass-distance relation shown in Fig. 2.


<div class='isTextCentered'>
  <img class='isMax400PxWide' src='/image/blog/2018-08-17-two-body-problem-simulator/0070_mass_distance_relation.jpg' alt='Mass-distance between two bodies'>
  <p>Figure 2: A relation between masses of two bodies and distances to the common center of mass.</p>
</div>

With this knowledge, we can finally calculate the positions of the two bodies. The positions are saved in the `state.positions` array and then used to show the two bodies on screen.

```JavaScript
function calculateNewPosition() {
    r = 1; // Distance between two bodies
    // m12 is the sum of two massses
    var a1 = (state.masses.m2 / state.masses.m12) * r;
    var a2 = (state.masses.m1 / state.masses.m12) * r;

    state.positions[0].x = -a2 * state.u[0];
    state.positions[0].y = -a2 * state.u[1];

    state.positions[1].x = a1 * state.u[0];
    state.positions[1].y = a1 * state.u[1];
}
```



## Credits

1. This work is based on code and lectures by Dr Rosemary Mardling from Monash University.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

1. **"Jupiter's South Pole"** image: NASA/JPL-Caltech/SwRI/MSSS/Betsy Asher Hall/Gervasio Robles, [source](https://www.nasa.gov/image-feature/jupiters-south-pole).

1. **Figure eight orbit**: Moore, C. 1993, Phys. Rev. Lett., 70, 3675.

1. **Kepler-16 system**: Doyle, L. R., Carter, J. A., Fabrycky, D. C., et al. 2011, Science, 333, 1602.


## References

* [The complete source code](/files/2018/08/two-body-problem-simulator/the_complete_code/) of the two-body problem simulation.
