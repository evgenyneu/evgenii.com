---
layout: blog_post
comments: true
title: "Ridiculous strawberry picking"
meta_description: "A game where you pick cosmic strawberries by altering the Earth orbit through modification of the Sun's mass"
tags: science
---

<!--

  Ridiculous strawberry picking game

  http://evgenii.com/blog/ridiculous-strawberry-picking/

  License: Public Domain

  Image credits
  =============

  1. "The Blue Marble" By  NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans. Sources: http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg, https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg

  2. "The Sun photographed at 304 angstroms" by NASA/SDO (AIA). Sources: http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg, https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg

-->

<link rel="stylesheet" href="/css/2016/ridiculous-strawberry-picking.css">

<div class="EarthOrbitSimulation EarthOrbitSimulator-hasHont">
  <!-- Message shown in old browsers. -->
  <p id="EarthOrbitSimulation-notSupportedMessage" class="EarthOrbitSimulation-alert EarthOrbitSimulation-isHidden">Please use a newer browser to see the simulation.</p>

  <div class="EarthOrbitSimulation-container isFullScreenWide isUnselectable">
    <img src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/sun.png' alt='Earth' class='EarthOrbitSimulation-sun'>

    <img src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/earth.png' alt='Earth' class='EarthOrbitSimulation-earth'>


    <div class='EarthOrbitSimulation-hudContainer'>
      <div class='EarthOrbitSimulation-hudContainerChild'>
        <div class='EarthOrbitSimulation-strawberryCounter'>
          <img src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/strawberry.png' alt='strawberry' class='EarthOrbitSimulation-strawberryCounterImage'><span class='EarthOrbitSimulation-strawberryCounterNumber'>0</span>
        </div>

        <div class='EarthOrbitSimulation-temperature'>T:<span class='EarthOrbitSimulation-temperatureValue'></span> <span class='EarthOrbitSimulation-temperatureDescription'></span></div>

        <div class='EarthOrbitSimulation-time'></div>

        <a class='EarthOrbitSimulation-reload' href='#'><img src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/reload_icon.png' alt='Restart' class='EarthOrbitSimulation-reloadIcon'></a>
      </div>

      <div class="EarthOrbitSimulation-gameover EarthOrbitSimulation-isTextCentered">
        <div class="EarthOrbitSimulation-gameoverMessage">
          <span class="EarthOrbitSimulation-gameoverMessageContent">My wonder button is being pushed all the time.</span>
          <br><br>
          <a class="EarthOrbitSimulation-gameoverButton EarthOrbitSimulation-button" href="#">Try again</a>
          <a class="EarthOrbitSimulation-continueButton EarthOrbitSimulation-button" href="#">Continue</a>
        </div>
      </div>
    </div>

    <canvas class="EarthOrbitSimulation-canvas"></canvas>
    <canvas class="EarthOrbitSimulation-canvasHabitableZone"></canvas>
  </div>

  <div class="SickSlider EarthOrbitSimulation-massSlider isUnselectable" >
    <div class="SickSlider-stripe"></div>
    <div class="SickSlider-head"></div>
  </div>

  <div class='EarthOrbitSimulation-isTextCentered isUnselectable'>
    Sun's mass: <span class='EarthOrbitSimulation-sunsMass'>1.00</span>
  </div>
  <p class='EarthOrbitSimulation-debugOutput'></p>
</div>
<script src="/js/2016/ridiculous-strawberry-picking.js"></script>

## Carl's experiment


Thursday noon of 23 October 1997. Doctor Carl Cox smashes a ripe strawberry lying on his laboratory desk with his  forehead and shouts "It is wonderful!"

What just happened today to Carl &mdash; and, consequently, to everything else in the vicinity of the 100,000 galaxies within the Laniakea Supercluster &mdash; is quite remarkable and is worth explaining. Doctor Carl has just discovered a way of *increasing* the mass of the Sun by feeding it the dark energy from the area in space stretching billions and billions of light years. This trick, bizarrely, involves berries from the local grocery shop and works both ways: the Sun's mass can also be *reduced* by pumping it back into the surrounding area of the Universe.

Carl approaches a big shiny metallic box with blinking buttons and pushes several of them. A warning message box "Are you sure you want to execute the `big_sun` script?" appears on the screen of the apparatus. Without hesitation Carl presses the "Enter" button and returns to his desk with a satisfied grin. He wipes off berry juice from his forehead with a manuscript of a finished paper titled "Cross pollination of honeysuckles in zero gravity by Australian longhorn beetles" that was planned to be submitted to the Astrobotanical Review journal. This paper is not important anymore. Nothing really is.

## Orbital distance and Newton's Law of Universal Gravitation

The short-term implications of this experiment are obvious to any student who attended an introductory astronomy class. What happens to the Earth if the mass of the Sun increases? One of the most fundamental laws, Newton's Law of Universal Gravitation, tells us that the force of attraction between two bodies is proportional to the product of their masses and inversely proportional to the square of the distance between them [[1, p. 131]](#references). This law implies, that if Carl increases the mass of the Sun, it will exert stronger gravitational force on the Earth. As a result, the Earth *moves closer* to the Sun (see Figure 1).


<div class='isTextCentered'>
  <img class='isMax300PxWide' src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/massive_sun_smaller_earth_sun_distance.png' alt='Relationship between the mass of the Sun and the Sun-Earth distance'>
  <p>Figure 1: The Earth is closer to the more massive Sun.</p>
</div>


## Orbital period and Kepler's third law

Everybody knows that it takes about 365 days for the Earth to complete one full circle around the Sun. We call this time 'a year' and astronomers call it the Earth's *orbital period*. But what happens to Earth's orbital period as the planet moves closer to the Sun? This question can be  answered by using Kepler's third law [[2, p. 27]](#references) that states &mdash; closer planets have *smaller* orbital periods. Therefore, the increase in Sun's mass will result in shorter year on the Earth.


## The Sun's luminosity

The increase in Sun's mass also affects its brightness, which is also called 'luminosity'. This happens because larger mass creates bigger gravitational pressure in its core, which increases the rate of fusion reactions and creates more light. How much brighter the Sun becomes if Carl doubles its mass? Figure 2 demonstrates that the Sun will be about eight times brighter, because the luminosity of a star similar to the Sun is roughly proportional to the cube of its mass [[3]](#references).

<div class='isTextCentered'>
  <img class='isMax500PxWide' src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/massive_sun_is_brighter.png' alt='More massive stars are much brighter'>
  <p>Figure 2: The bigger Sun is much brighter.</p>
</div>

## Habitable zone

As we've shown, the planets receive more sunlight as the Sun's mass increases. As a result, if the Earth's distance to the Sun does not change, its average global temperature will increase. If it gets too hot, Earth's oceans will start to boil and that will probably be the death sentence to all animal life on the surface of our planet. In astronomy, the range of distances from a star at which liquid water can exist on the surface of a planet is called the star's *habitable zone*. As Doctor Carl increases the mass of the Sun, its habitable zone moves *farther away*.

We can see from Figure 3 that massive Sun would have more distant habitable zone. In this case, the Earth would be too close to the Sun, and the water would boil and evaporate. Therefore, Carl Cox needs to be very careful and try not to keep Sun's mass high for too long.

<div class='isTextCentered'>
  <img class='isMax100PercentWide isTextCentered' src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/star_habitable_zone.png' alt='More massive stars are much brighter'>
  <p>Figure 3: The habitable zone of the bigger Sun is farther away.</p>
</div>

## The dark energy and the expansion of the Universe

The *dark energy* is a term astronomers use to explain the observed expansion of the Universe [[2, p. 726]](#references). At this point astrophysicists do not have a clue what this dark energy actually is, nor they were able to detect it. The idea is that there is a mysterious uniform substance that fills all of space in the Universe and pushes the Universe apart. As a result, the galaxies which are not close enough to have strong gravitational attraction are moving away from each other.

<div class='isTextCentered'>
  <img class='isMax300PxWide isTextCentered' src='http://evgenii.com/image/blog/2016-09-17-ridiculous-strawberry-picking/expanstion_of_universe.png' alt='Dark energy pushes the space apart.'>
  <p>Figure 4: Dark energy makes space bigger.</p>
</div>

What would happen if Carl Cox took some of this dark energy and converted it into Sun's mass? If such a trick was possible, the space would stop inflating and start collapsing. This would, consequently, make the space smaller with time making the galaxies approach each other with increasing speeds. Would it be a good thing? Possibly, but if there is a space real estate market &mdash; the contraction will make the available space smaller and drive the prices up. And that can make some alien real estate buyers very, very unhappy.

## Credits

1. **Editor in chief**: Emily Saaen.

1. **"The Blue Marble"** image: NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron Evans, [source](http://www.nasa.gov/images/content/115334main_image_feature_329_ys_full.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg).

1. **"The Sun photographed at 304 angstroms"** image: NASA/SDO (AIA), [source](http://sdo.gsfc.nasa.gov/assets/img/browse/2010/08/19/20100819_003221_4096_0304.jpg), [source](https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg).

<div id='references'>&nbsp;</div>

## References

* [1]. J. Bennet, M. Donahue, N. Schneider , and M. Voit, *Cosmic perspective*. United Kingdom: Pearson Education Limited, 2014.

* [2]. J. Bennett, G. Shostak, *Life in the Universe*, 4th ed. San Francisco, CA: Pearson, 2016.

* [3]. "[Mass-luminosity relationship](http://hyperphysics.phy-astr.gsu.edu/hbase/Astro/herrus.html#c3)". Hyperphysics. Retrieved 2016-09-03.

* [4]. [The complete source code](/files/2016/09/ridiculous_strawberry_picking/the_complete_code/) of the game.

* [5]. [Programming a simulation of the Earth orbiting the Sun](/blog/earth-orbit-simulation/).
