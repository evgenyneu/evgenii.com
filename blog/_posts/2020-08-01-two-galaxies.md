---
layout: blog_post
comments: false
title: "Making a JavaScript simulation of two interacting galaxies"
tags: science
---

<style>
.TwoGalaxies--thumbnailContainainer {
    background-color: black;
    position: relative;
}

.TwoGalaxies--start {
    position: absolute;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    bottom: 5%;
    text-decoration: none;
    border-radius: 30% 10%/80%;
    border: none;
    font-size: 20px;
    padding: 8px 13px 6px 13px;
    background-color: #ff6c00;
}

.TwoGalaxies--start:hover {
    background-color: #ff8c10;
}
</style>

<div class='TwoGalaxies--thumbnailContainainer isFullScreenWide isTextCentered'>
  <img class='isMax800PxWide' src='/image/blog/2020-08-01-two-galaxies/two_galaxies_thumbnail.jpg' alt='Two galaxies simulation'>
  <a class="TwoGalaxies--start" href="/files/2020/08/two_galaxies/" target="_blank">Start</a>
</div>


## What's this about?

In this post I want to show how to make a simulation of two interacting galaxies that runs in a Web browser, written in HTML, CSS and JavaScript languages. I won't explain everything, because I would need to write books on physics and Web programming, and I have neither skills nor patience for that yet. Instead, here I just want to briefly show the main ideas that will hopefully make this simulation appear less magical.


## Who made this possible?

The idea and the physics code of this simulation are not mine. This work is based on the laboratory manual written by my teacher [Daniel Price](http://orcid.org/0000-0002-4716-4235) from Monash University. All I've done was porting Daniel's Fortran code to JavaScript and drawing some buttons. Similar simulation was done in 1972 by Alar and Juri Toomre in their [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf) paper, an inspiration for Daniel's simulation.

I also learned how to simulate moving bodies in space from my Monash astronomy teachers Adelle Goodwin, Melanie Hampel, John Lattanzio and Rosemary Mardling (in alphabetical order).

Lastly, most of the 3D code is not mine either, I copy-pasted it from [WebGL Funamentals](https://webglfundamentals.org) tutorials.


## The main idea

This simulation contains two galaxy cores that move around the common center of mass, located at the origin of the coordinate system (Fig. 1). The two cores move in the X-Y plane. If we only consider the cores, then this is just a two-body problem that [we coded previously](/blog/two-body-problem-simulator/). However, this time we want to add stars that move around each core in circular orbits. The stars form discs that are tilted at adjustable angles with respect to the X-Y plane.

<div class='isTextCentered'>
  <img class='isMax600PxWide' src='/image/blog/2020-08-01-two-galaxies/0010_main_idea.jpg' alt='The main idea behind the simulation'>
  <p>Figure 1: The main idea behind the simulation.</p>
</div>


## A spherical cow

This model includes big a simplification of reality: the stars in the simulation are massless, they only feel  gravity from the two cores, but not from other stars. This simplification makes the model very unrealistic. In a real galaxy, the mass is not located at the center, but instead contained in the stars and dark matter and distributed throughout the galaxy. For example, our Milky Way contains a supermassive black hole Sagittarius A* in its center, but the black hole is "only" about one millionth (0.000001) of the mass of the galaxy.

But unrealistic simplifications are sometimes useful because they can help us understand something fundamental about nature. For example, it would have been much harder for Galileo and Newton to discover that unperturbed bodies move at constant velocity without ignoring friction and gravity, which are always present in our daily life.


## Downloading the code

Enough talking, let's look at the code, which is located at [github.com/evgenyneu/two_galaxies](https://github.com/evgenyneu/two_galaxies). To download the code, open a Terminal app and run

```
git clone https://github.com/evgenyneu/two_galaxies.git
```

This requires [Git program](https://git-scm.com) to be installed, and it will download the code into `two_galaxies` directory.

## Exploring the code

Open `two_galaxies` directory in any coding text editor of your choice. I use [Atom](https://atom.io) (Fig. 2), other editors I recommend are [Sublime Text](https://www.sublimetext.com) and [Visual Studio Code](https://code.visualstudio.com).

<div class='isTextCentered'>
  <img class='isMax500PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0020_look_at_code.png' alt='Simulation code'>
  <p>Figure 2: HTML code of the simulation viewed in Atom editor.</p>
</div>

The simulation is a web app, and is written in the only three languages any Web browser can understand: HTML, CSS and JavaScript.

### HTML code

The HTML code is located in [index.html](https://github.com/evgenyneu/two_galaxies/blob/master/index.html) file (Fig. 2). It contains the layout of the web page and its elements, such as the black canvas for drawing stars, buttons and sliders. It also contains code written in GLSL ES language, which stands for OpenGL Shading Language. This code is for showing 3D graphics using the graphics processing unit (GPU). GPU is a computer hardware that is optimised to draw coloured triangles, points and lines on your screen very fast, which makes it possible to animate thousands of stars in real time in this simulation.


### CSS code

The CSS code of the simulation is located in [css/two_galaxies.css](https://github.com/evgenyneu/two_galaxies/blob/master/css/two_galaxies.css) file (Fig. 3). This code is for setting the styles of HTML elements, things like positions, sizes and colors. For example, Fig. 3 shows `.TwoGalaxies-button` style which is used for all square buttons in the simulation. It sets the size of the buttons to be 45 by 45 pixels.

<div class='isTextCentered'>
  <img class='isMax500PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0030_css_code.png' alt='CSS code'>
  <p>Figure 3: CSS code of the simulation.</p>
</div>


### JavaScript code

Most of the simulation code is in form many JavaScript files, located in [js directory](https://github.com/evgenyneu/two_galaxies/tree/master/js) (Fig. 4). Unlike HTML and CSS, which are languages specific to web development, JavaScript is a general purpose programming language used to encode the logic of the program. For example, Fig. 4 shows a function `numberOfStarsInOneRing` that calculates the number of stars in a ring of a galaxy. The entry point of the program is located in the [main.js](https://github.com/evgenyneu/two_galaxies/blob/master/js/main.js) file.

<div class='isFullScreenWide isTextCentered'>
  <img class='isMax800PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0040_javascript_code.png' alt='JavaScript code'>
  <p>Figure 4: JavaScript code of the simulation.</p>
</div>


## Run the simulation locally

Next, we want to run the simulation on your computer, so you can tinker with the code and see the effects. In order to do this, you need to install a web server, which is a program that runs web sites. There are many web servers available, but the simpler ones come with Python and Node.js.


### Option 1: running a web server with Python

First, [install Python](https://wiki.python.org/moin/BeginnersGuide/Download). Next, in the Terminal, change to the `two_galaxies` directory where you downloaded the code earlier:

```
cd two_galaxies
```

and start the web server:

```
python -m http.server
```

You can now open [http://0.0.0.0:8000/](http://0.0.0.0:8000/) URL in your web browser and see the simulation (Fig. 5).

<div class='isTextCentered'>
  <img class='isMax100PercentWide' src='/image/blog/2020-08-01-two-galaxies/0050_running_web_site_locally.png' alt='Running a simulation locally with Python web server.'>
  <p>Figure 5: Running the simulation locally using Python web server.</p>
</div>

The purpose of using a local web server is that you can make changes to the code, refresh the web browser and see the effects.



### Option 2: running a web server with Node.js

Alternatively, instead of Python you can use a web server that comes with Node.js. First, [install Node.js](https://nodejs.org/en/download/). Next, from the Terminal, install the web server:

```
npm install http-server -g
```

Finally, from `two_galaxies` directory, start the web server and navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080) URL in your web browser to see the simulation:

```
npx http-server
```


## How the simulation works?

Conceptually, this simulation is very simple. All it is doing is showing moving circles on the screen. The trick is to calculate their positions and then change positions  with time. This is done using three steps:

1. First, for each star we calculate three numbers &mdash; its x, y, and z coordinates in 3D space &mdash; and then use them to draw a coloured circle on screen. These are initial positions of the stars, and that's where we see them after the web page is first loaded.

2. Next, after a short time interval, we want to calculate new positions using Newton's second law (we will return to this physics later):

    <div class='Equation isTextCentered'>
      <span></span>
      <span>
        <img class='isMax80PxWide' src='/image/blog/2020-08-01-two-galaxies/0060_newtons_second_law.png' alt="Newton's second law">.
      </span>
      <span>(1)</span>
    </div>

3. Finally, we repeat this 60 times a second (or at a different rate, depending on refresh rate of your monitor), and this gives an impression of a moving collection of stars.

Simple.


## Counting the stars

Our first job is to calculate the initial positions of stars. But before that, we need to know the number of stars in each ring of a galaxy (Fig. 6).

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2020-08-01-two-galaxies/0070_galaxy_rings.png' alt='A single galaxy.'>
  <p>Figure 6: A single galaxy is made of stars placed in circular rings.</p>
</div>

This is done with the following function, located in [js/physics/initial_conditions.js](https://github.com/evgenyneu/two_galaxies/blob/master/js/physics/initial_conditions.js) file:

```JavaScript
export function numberOfStarsInOneRing(ringNumber, multiplier) {
  return ringNumber * multiplier;
}
```

This function returns the number of stars in a given ring of a galaxy. The ring number is passed using input parameter `ringNumber`, and the increase in the number of stars in each next ring is specified with `multiplier` parameter. For example, the function will return 12 stars for the first ring when we call `numberOfStarsInOneRing(1, 6)`, 18 for the second ring `numberOfStarsInOneRing(2, 6)`, an so on, adding 6 more stars to the each next ring.

Now that you have local web server running, you can experiment with the code and see the effects. For example, change the return statement from

```JavaScript
return ringNumber * multiplier;
```

to

```
return 7;
```

Then refresh the web browser, and you will see funny galaxies shown on Fig. 7.

<div class='isTextCentered'>
  <img class='isMax400PxWide' src='/image/blog/2020-08-01-two-galaxies/0075_seven_stars_in_a_ring.png' alt='A single galaxy.'>
  <p>Figure 7: Galaxies with seven stars in each ring.</p>
</div>

Next, we need to calculate the total number of stars in one galaxy. This is done by  `numberOfStarsInAllRingsOneGalaxy` function:

```JavaScript
export function numberOfStarsInAllRingsOneGalaxy(numberOfRings,
                                                 multiplier) {
  var stars = 0;

  // Loop over each ring, starting from the one closer to the center
  for(let ringNumber = 1; ringNumber <= numberOfRings; ringNumber++) {
    // Calculate the number of stars in one ring and add it to total
    stars += numberOfStarsInOneRing(ringNumber, multiplier);
  }

  return stars;
}
```

Here, inside the loop, we call function `numberOfStarsInOneRing` for rings 1, 2, and up to the total number of rings, adding the number of stars in each ring to the galaxy's total.


## Positioning stars in a galaxy

Now that we know the number of stars in one galaxy we can calculate their intial positions and velocities. This is done in `galaxyStarsPositionsAndVelocities` function located in [js/physics/initial_conditions.js](https://github.com/evgenyneu/two_galaxies/blob/master/js/physics/initial_conditions.js) file:

```JavaScript
export function galaxyStarsPositionsAndVelocities(args) {
  let stars = numberOfStarsInAllRingsOneGalaxy(args.numberOfRings);
  var positions = Array(stars * 3).fill(0);
  var velocities = Array(stars * 3).fill(0);
  ...
```

It starts with calculating the total number of stars in one galaxy, by calling `numberOfStarsInAllRingsOneGalaxy` function and saving the result in `stars` variable. Then it creates two arrays to store positions and velocities of the stars. Since we are dealing with 3D, each coordinate requires three numbers x, y and z. That's why the size of the arrays is three times larges than the number of stars: `Array(stars * 3)`.

We will need to keep this in mind when accessing positions and velocities form these arrays. For example, positions[0] will be the x-coordinate of the first star and
positions[1] will be its y-coordinate. The x-coordinate of the second star is positions[4], and z-coordinate of the sixth star is positions[3*6 + 2], or positions[20], and so on.

Next, we want to use the angle of galaxy inclination (Fig 8) with respect to the x-y plane., which is passed to this function as parameter `args.galaxyAngleDegree`. This angle is chosen by the user in degrees, but we want to convert it to radians, using the fact that 180 degrees is π (3.1415) radians:

```JavaScript
var galaxyAngleRadians = args.galaxyAngleDegree * Math.PI / 180;
```

<div class='isTextCentered'>
  <img class='isMax500PxWide' src='/image/blog/2020-08-01-two-galaxies/0080_galaxy_angle.png' alt='A single galaxy.'>
  <p>Figure 8: A galaxy inclination angle of 60 degrees. The angle is measured from the X-Y place, where the galaxy cores are moving.</p>
</div>

Next, we look at each galaxy ring separately, starting with the first ring using the `for` loop:

```JavaScript
// Loop over the rings of the galaxy
for(let ringNumber = 1; ringNumber <= args.numberOfRings; ringNumber++) {
  // Find distance of stars in current ring from the galaxy center
  let distanceFromCenter = ringNumber * args.ringSeparation;

  // Find number of stars in the ring
  let numberOfStars = numberOfStarsInOneRing(ringNumber,
                                             args.ringMultiplier);
```

Inside the loop, we calculate the distance of the star (and the ring) from galactic center (Fig. 9), which is equal to the ring number times the separation between rings `args.ringSeparation`, which is passed as function's argument.

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2020-08-01-two-galaxies/0900_distance_from_center_star_angle.png' alt='Distance from center and angle between neighbours.'>
  <p>Figure 9: Calculating distance from a star in the third ring to the galaxy center and the angle between two neighbours.</p>
</div>

Next, we use `numberOfStarsInOneRing` function to calculate the total number of stars in the current ring. We also need an angle between two neighbouring stars in the same ring, in radians (Fig. 9). Since there are `numberOfStars` stars and the full ring in 2π radians, the angle between two stars is `2π / numberOfStars`:

```JavaScript
// Find number of stars in the ring
let numberOfStars = numberOfStarsInOneRing(ringNumber,
                                           args.ringMultiplier);

// Calculate the angle between two neighbouring stars in a ring
// when viewed from the galaxy center
let angleBetweenNeighbours = 2 * Math.PI / numberOfStars;
```

## Calculating star's speed

We will calculate the velocity of each star in the galaxy, but first we need to find their speeds. Velocity is a vector, pointing in the direction of movement and having  length equal to the speed. We are inside the loop and dealing with a star at a specific ring number `ringNumber`. Since we want our rings to be circular, all stars in the same ring must have equal speeds, otherwise the symmetry of the circle would be broken. Let's calculate this speed.

Consider a single star. Since we chose to neglect gravity from other stars, the galaxy core is the only object that attracts our star. The core exerts force `F` on the star of mass `m`. This causes the star to accelerate with acceleration `a`, resulting in a circular orbit instead of a straight line. In math language, this can be expressed with Newton's second law:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax80PxWide' src='/image/blog/2020-08-01-two-galaxies/0060_newtons_second_law.png' alt="Newton's second law">.
  </span>
  <span>(1)</span>
</div>



## Thanks 👍

* [Daniel Price](http://orcid.org/0000-0002-4716-4235): my Monash astronomy teacher, who wrote the Fortran code and the laboratory manual this simulation is based on. **Daniel is the main reason this work exists**.

* [Adelle Goodwin](https://adellej.github.io/), [Melanie Hampel](https://twitter.com/stellarmelanie), [John Lattanzio](https://orcid.org/0000-0003-2952-859X) and [Rosemary Mardling](https://research.monash.edu/en/persons/rosemary-mardling): my Monash teachers, who taught me astronomy and how to make simulate movement of masses in space.

* [webglfundamentals.org](https://webglfundamentals.org): that's where I learned how to do 3D drawing in the web browser for this simulation. Relevant sections are "Fundamentals", "2D translation, rotation, scale, matrix math" and "3D". My 3D code is based on examples from these chapters.

* [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf): a 1972 paper by Alar and Juri Toomre that analyses similar simulations. I mean, just look at the size and quality of the paper, the attention to detail. Imagine amount of work that went to create all those diagrams. I have not seen anything like that.

* [1941 paper by Erik Holmberg](https://ui.adsabs.harvard.edu/abs/1941ApJ....94..385H/abstract): an even earlier simulation that used physical light bulbs and light sensors instead of computers. I'm super lucky to be able just to press buttons on my laptop.
