---
layout: blog_post
comments: false
title: "Two-body problem simulator"
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



## Credits

1. This work is based on code and lectures by Rosemary Mardling from Monash University.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

## References

* [The complete source code](/files/2018/08/two-body-problem-simulator/the_complete_code/) of the two-body problem simulation.
