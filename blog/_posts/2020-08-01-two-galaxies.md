---
layout: blog_post
comments: true
title: "Making a JavaScript simulation of two interacting galaxies"
tags: science
katex: true
---

<style>
.TwoGalaxies--thumbnailContainainer {
    background-color: black;
    position: relative;
    min-height: 100px;
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
    padding: 8px 13px 8px 13px;
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

In this post I want to show how to make a simulation of two interacting galaxies that runs in a Web browser, written in HTML, CSS and JavaScript languages. I won't explain everything, because I would need to write a post ten times longer than it is (and who wants to read that?). Instead, here I just want to briefly show the main ideas that will hopefully make this simulation appear less magical.


## Who made this possible?

The idea and the physics code of this simulation are not mine. This work is based on the laboratory manual written by my teacher [Daniel Price](http://orcid.org/0000-0002-4716-4235) from Monash University. All I've done was port Daniel's Fortran code to JavaScript and draw in some buttons. Similar simulation was done in 1972 by Alar and Juri Toomre in their [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf) paper, an inspiration for Daniel's simulation.

I also learned how to simulate moving bodies in space from my Monash astronomy teachers Adelle Goodwin, Melanie Hampel, John Lattanzio and Rosemary Mardling (in alphabetical order).

Lastly, most of the 3D code is not mine either, I copy-pasted it from [WebGL Funamentals](https://webglfundamentals.org) tutorials.


## The main idea

This simulation contains two galaxy cores that move around the common center of mass, located at the origin of the coordinate system (Fig. 1).

<div class='isTextCentered'>
  <img class='isMax600PxWide' src='/image/blog/2020-08-01-two-galaxies/0010_main_idea.jpg' alt='The main idea behind the simulation'>
  <p>Figure 1: The main idea behind the simulation.</p>
</div>

The two cores move in the X-Y plane. If we only consider the cores, then this is just a two-body problem that [we coded previously](/blog/two-body-problem-simulator/). However, this time we want to add stars that move around each core in circular orbits. The stars form discs that are tilted at adjustable angles with respect to the X-Y plane.


## A spherical cow

This model includes a big simplification of reality: the stars in the simulation only feel gravity from the two galactic cores, but not from other stars. This simplification makes the model very unrealistic. In a real galaxy, the mass is not located at the center, but instead contained in the stars and dark matter and distributed throughout the galaxy. For example, our Milky Way contains a supermassive black hole Sagittarius A* in its center, but the black hole is "only" about one millionth (0.000001) of the mass of the galaxy.

But unrealistic simplifications are sometimes useful because they can help us understand something fundamental about nature. For example, it would have been much harder for Galileo and Newton to discover that an unperturbed object moves at constant velocity without ignoring friction and gravity, which are always present in our daily life.


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

Most of the simulation code is in JavaScript files, located in [js directory](https://github.com/evgenyneu/two_galaxies/tree/master/js) (Fig. 4). Unlike HTML and CSS, which are languages specific to web development, JavaScript is a general purpose programming language used to encode the logic of a program. For example, Fig. 4 shows a function `numberOfStarsInOneRing` that calculates the number of stars in a ring of a galaxy. The entry point of the program is located in the [main.js](https://github.com/evgenyneu/two_galaxies/blob/master/js/main.js) file.

<div class='isFullScreenWide isTextCentered'>
  <img class='isMax800PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0040_javascript_code.png' alt='JavaScript code'>
  <p>Figure 4: JavaScript code of the simulation.</p>
</div>


## Run the simulation locally

Next, I want to show how to run the simulation on your computer so you can tinker with the code and see the effects. In order to do this, you need to install a web server, which is a program that runs web sites. There are many web servers available, but the simpler ones come with Python and Node.js.


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

    $$\vec{F} = m \vec{a}. \tag{1}$$

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

This function returns the number of stars in a given ring of a galaxy. The ring number is passed using input parameter `ringNumber`, and the increase in the number of stars in each next ring is specified with `multiplier` parameter. For example, the function will return 6 stars for the first ring when we call `numberOfStarsInOneRing(1, 6)`, 12 for the second ring `numberOfStarsInOneRing(2, 6)`, an so on, adding 6 more stars to the next ring.

Now that you have a local web server running, you can experiment with the code and see the effects. For example, change the return statement from

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

It starts with calculating the total number of stars in one galaxy, by calling `numberOfStarsInAllRingsOneGalaxy` function and saving the result in `stars` variable. Then it creates two arrays to store positions and velocities of the stars. Since we are dealing with 3D, each coordinate requires three numbers x, y and z. That's why the size of the arrays is three times larger than the number of stars: `Array(stars * 3)`.

We will need to keep this in mind when accessing positions and velocities form these arrays. For example, `positions[0]` will be the x-coordinate of the first star and
`positions[1]` will be its y-coordinate. The x-coordinate of the second star is `positions[4]`, and z-coordinate of the sixth star is `positions[3*6 + 2]`, or `positions[20]`, and so on.

Next, we want to set the angle of galaxy inclination (Fig. 8) with respect to the x-y plane., which is passed to this function as parameter `args.galaxyAngleDegree`. This angle is chosen by the user in degrees, but we want to convert it to radians, using the fact that 180 degrees is π (3.1415) radians:

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

Inside the loop, we calculate the distance of the star (and the ring) from galactic center (Fig. 9), which is equal to the ring number times the separation between rings `args.ringSeparation`.

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2020-08-01-two-galaxies/0090_distance_from_center_star_angle.png' alt='Distance from center and angle between neighbours.'>
  <p>Figure 9: Calculating distance from a star in the third ring to the galactic center and the angle between two neighbours.</p>
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

Our goal is to calculate the velocity of each star in the galaxy, but first we need to find the speeds of stars. Velocity is a vector, pointing in the direction of movement. The length of a velocity vector is equal to the speed. Since we want our rings to be circular, all stars in the same ring must have equal speeds, otherwise the symmetry of the circle would be broken. Let's calculate this speed.

Consider a single star. Since we chose to neglect gravity from other stars, the galactic core is the only object that attracts our star (Fig. 10). The core exerts force \\(F\\) on the star of mass \\(m\\). This causes the star to accelerate with acceleration \\(a\\), resulting in a circular orbit instead of a straight line.

<div class='isTextCentered'>
  <img class='isMax500PxWide' src='/image/blog/2020-08-01-two-galaxies/0100_gravity_force.png' alt='Core exerting gravitational force on the stars.'>
  <p>Figure 10: Galactic core exerting gravitational force on an orbiting star.</p>
</div>

In math language, this can be expressed with Newton's second law:

$$F = m a \tag{2}.$$

The acceleration \\(a\\), also called *centripetal acceleration*, for a body moving in a circle of radius \\(r\\) with speed \\(v\\) is given by

$$a = \frac{v^2}{r}. \tag{3}$$

Substituting \\(a\\) into Eq. 2 gives:

$$F = m \frac{v^2}{r}. \tag{4}$$

Next, we use another of Newton's discovery - the law of universal gravitation:

$$F = \frac{G m M}{r^2}, \tag{5}$$

which allows us to calculate gravitational force \\(F\\) between two masses \\(m\\) and \\(M\\) that are distance \\(r\\) apart. Here \\(G\\) is a number called *gravitational constant*:

$$G = 6.67 \times 10^{-11} \frac{\text{m}^3}{\text{kg} \ \text{s}^2}. \tag{6}$$

Next, we equate equations 4 and 5:

$$m\frac{v^2}{r} = \frac{G m M}{r^2}. \tag{7}$$

Mass of the star \\(m\\) and distance \\(r\\) cancels:

$$v^2 = \frac{GM}{r}. \tag{8}$$

Finally, we take the square root of both sides and get the expression for the speed of the star we wanted:

$$v = \sqrt{\frac{GM}{r}}. \tag{9}$$

Now we return to our `galaxyStarsPositionsAndVelocities` function, and find this equation in the code:

```JavaScript
let starSpeed = Math.sqrt(args.coreMass / distanceFromCenter);
```

You might have noticed a small difference. Our JavaScript code does not have constant \\(G\\). Why? Because we made constant \\(G\\) equal to one.

[reader stares in disbelief]

Let me explain...


### Changing units of length, mass and time

You can see that constant \\(G\\) (Eq. 6) has units of \\(\frac{\text{m}^3}{\text{kg} \ \text{s}^2}\\). Here \\(\text{m}\\) (meter) is a unit of length, \\(\text{kg}\\) (kilogram) is a unit of mass, and \\(\text{s}\\) (second) is a unit of time. We will now do a trick that I saw astronomers do many times, and which confused me a lot until my teacher John Lattanzio explained it to me.

> We want to change the units of length, mass and time, such the constant \\(G\\) is equal to one in these units.

The point of this is to avoid putting constant \\(G\\) anywhere in the code. Another reason for this, is to make our mass, length and time numbers small, since stellar masses and distances are very large numbers when expressed in meters and kilograms.

Here is one way of changing the units. We first define the new units

$$
\begin{aligned}
    \text{Unit of length:} \ U_L &= a \ \text{m} \\
    \text{Unit of mass:} \ U_M &= b \ \text{kg} \tag{10} \\
    \text{Unit of time:} \ U_T &= c \ \text{s},
\end{aligned}
$$

where \\(a\\),  \\(b\\) and \\(c\\) are numbers we want to find. Out goal is to make gravitational constant \\(G\\) equal to one in these units. This is done by taking Eq. 6, replacing the number \\(6.67 \times 10^{-11}\\) with \\(1\\) and also replacing \\(\text{m}\\), \\(\text{kg}\\) and \\(\text{s}\\) with new units: \\(U_L\\), \\(U_M\\) and \\(U_T\\):

$$G = 1 \frac{U_L^3}{U_M U_T^2} \tag{11}.$$

Next, we substitute new units from Eq. 10:

$$G = 1 \frac{(a \ \text{m})^3}{(b \ \text{kg}) (c \ \text{s})^2} = \frac{a^3}{bc^2} \frac{\text{m}^3}{\text{kg} \ \text{s}^2}. \tag{12}$$

Equating this with Eq. 6 gives

$$ \frac{a^3}{bc^2} \cancel{ \frac{\text{m}^3}{\text{kg} \ \text{s}^2} } = 6.67 \times 10^{-11} \cancel{ \frac{\text{m}^3}{\text{kg} \ \text{s}^2} }. \tag{13}$$

The units cancel and we get

$$ \frac{a^3}{bc^2} = 6.67 \times 10^{-11}. \tag{14}$$

This equation can not be solved, because it has three unknown variables \\(a\\), \\(b\\) and \\(c\\). Since one of our goals was to make new units small (Eq. 10), we can pick some arbitrary large numbers for \\(a\\) (length) and \\(b\\) (mass) and then calculate \\(c\\) (time) using Eq. 14. Stellar distances are often measured with a unit of length called *parsec* (pc), which is a typical distance between stars:

$$1 \ \text{pc} = 3.086 \times 10^{16} \ \text{m}. \tag{15}$$

Galactic distances are even larger, and are often measured in thousands of parsecs, or kiloparsecs (kpc). For example, Earth is eight kiloparsec away from the center of Milky Way. Since we are simulating galaxies, it will make sense to use kiloparsec as our unit of length:

$$U_L = 1000 \ \text{pc}. \tag{16}$$

We can now convert kiloparsecs to meters, use Eq. 10 and calculate \\(a\\):

$$
\begin{aligned}
    a \ \text{m} &= (1000 \ \text{pc}) \ \frac{3.086 \times 10^{16} \ \text{m}}{1 \ \text{pc}} \\
    a &= 3.086 \times 10^{19}. \tag{19}
\end{aligned}
$$

This gives the new unit of length we were looking for:

$$
U_L = 3.086 \times 10^{19} \ m \tag{20}.
$$

Next, we want to choose a suitable value of \\(b\\) for the unit of mass. We are working with galaxies, so it would be natural to use mass of Milky Way as our mass unit. There are about 300 billion (\\(3 \times 10^{11}\\)) stars in Milky Way, but we will round it to 100 billion (\\(10^{11}\\)). We will assume that the average stellar mass is equal to the mass of the Sun, which is about

$$M_\odot = 2 \times 10^{30} \ \text{kg}.$$

Multiplying the number of stars (\\(10^{11}\\)) with this mass gives the unit of mass we wanted:

$$U_M = (10^{11}) (2 \times 10^{30} \ \text{kg}) = 2 \times 10^{41} \ \text{kg}.$$

Therefore, the number \\(b\\) is

$$b = 2 \times 10^{41}.$$

Finally, we use Eq. 14, substitute numbers \\(a\\) and \\(b\\), and find \\(c\\):

$$
\begin{aligned}
c &= \sqrt{\frac{a^3}{(6.67 \times 10^{-11})(b)}} \\
  &= \sqrt{\frac{(3.086 \times 10^{19})^3}{(6.67 \times 10^{-11})(2 \times 10^{41})}} \\
  &\approx 4.7 \times 10^{13}.
\end{aligned}
$$

We have found that in order to make constant \\(G\\) equal to one in new units (Eq. 11), we need to choose the unit of time to be

$$U_T = 4.7 \times 10^{13} \ \text{s}.$$

This is a very large number, let's convert it to years, using the fact that there are 3600 seconds in one hour, 24 hours in one dat, and 365 days in a typical year:

$$
\begin{aligned}
U_T &= \left( \frac{4.7 \times 10^{13} \ \cancel{\text{s}}}{1} \right) \left( \frac{1 \ \cancel{\text{h}}}{3600 \ \cancel{\text{s}}} \right) \left( \frac{1 \ \cancel{\text{d}}}{24 \ \cancel{\text{h}}} \right) \left( \frac{1 \ \text{y}}{365 \ \cancel{\text{d}}} \right) \\
  &\approx 1.5 \times 10^6 \ \text{y}.
\end{aligned}
$$

We have calculate the new unit of time to be 1.5 million years. Let's see if that makes sense. Our animation advances by about one unit of time after each animation frame. If refresh rate of the computer screen is 60 Hz (a typical screen in 2020), then 90 million years will pass in simulation time after one second of our time. This is comparable to the  250 million years, which is the time it takes the Sun to rotate around the center of Milky Way. This means that unit of time \\(U_T &= 1.5 \times 10^6 \ \text{y} \\) is reasonable.

Let's remind us what we've done. We wanted to get rid of constant \\(G\\) in code by making it equal to one. We have done this by choosing new units of length, mass and time, which are also more suitable to galactic scales:

$$
\begin{aligned}
    \text{Unit of length:} \ U_L &= 3.086 \times 10^{19} \ \text{m} \\
    \text{Unit of mass:} \ U_M &= 2 \times 10^{41} \ \text{kg}  \\
    \text{Unit of time:} \ U_T &= 4.7 \times 10^{13} \ \text{s}.
\end{aligned}
$$



## To be continued...

I will keep extending this article and cover more code from the simulation. Please feel free to comment or ask questions.









## Thanks 👍

* [Daniel Price](http://orcid.org/0000-0002-4716-4235): my Monash astronomy teacher, who wrote the Fortran code and the laboratory manual this simulation is based on.

* [Adelle Goodwin](https://adellej.github.io/), [Melanie Hampel](https://twitter.com/stellarmelanie), [John Lattanzio](https://orcid.org/0000-0003-2952-859X) and [Rosemary Mardling](https://research.monash.edu/en/persons/rosemary-mardling): my Monash teachers, who taught me astronomy and how to simulate movement of masses in space.

* [webglfundamentals.org](https://webglfundamentals.org): that's where I learned how to do 3D drawing in the web browser for this simulation. Relevant sections are "Fundamentals", "2D translation, rotation, scale, matrix math" and "3D". My 3D code is based on examples from these chapters.

* [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf): a 1972 paper by Alar and Juri Toomre that analyses similar simulations. I mean, just look at the size and quality of the paper, the attention to detail. Imagine amount of work that went to create all those diagrams. I have not seen anything like that.

* [1941 paper by Erik Holmberg](https://ui.adsabs.harvard.edu/abs/1941ApJ....94..385H/abstract): an even earlier simulation that used physical light bulbs and light sensors instead of computers. I'm super lucky to be able just to press buttons on my laptop.
