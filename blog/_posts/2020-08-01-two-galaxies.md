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
  <img class='isMax100PercentWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0020_look_at_code.png' alt='Simulation code'>
  <p>Figure 2: HTML code of the simulation viewed in Atom editor.</p>
</div>

The simulation is a web app, and is written in the only three languages any Web browser can understand: HTML, CSS and JavaScript.

### HTML code

The HTML code is located in [index.html](https://github.com/evgenyneu/two_galaxies/blob/master/index.html) file (Fig. 2). It contains the layout of the web page and its elements, such as the black canvas for drawing stars, buttons and sliders. It also contains code written in GLSL ES language, which stands for OpenGL Shading Language. This code is for showing 3D graphics using the graphics processing unit (GPU). GPU is a computer hardware that is optimised to draw coloured triangles, points and lines on your screen very fast. This made it possible to animate thousands of stars in real time in this simulation.


### CSS code

The CSS code of the simulation is located in [css/two_galaxies.css](https://github.com/evgenyneu/two_galaxies/blob/master/css/two_galaxies.css) file (Fig. 3). This code is for setting the styles of HTML elements, things like positions, sizes and colors. For example, Fig. 3 shows `.TwoGalaxies-button` style which is used for all square buttons in the simulation. It sets the size of the buttons to be 45 by 45 pixels.

<div class='isTextCentered'>
  <img class='isMax500PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0030_css_code.png' alt='CSS code'>
  <p>Figure 3: CSS code of the simulation.</p>
</div>


### JavaScript code

Most of the simulation code is in form of JavaScript, located in [js directory](https://github.com/evgenyneu/two_galaxies/tree/master/js) (Fig. 4). Unlike HTML and CSS, which are languages specific to web development, JavaScript is a general purpose programming language used to encode the logic of the program. For example, Fig. 4 shows a function `numberOfStarsInOneRing` that calculates the number of stars in a ring of a galaxy. The entry point of the program is located in the [main.js](https://github.com/evgenyneu/two_galaxies/blob/master/js/main.js) file.

<div class='isFullScreenWide isTextCentered'>
  <img class='isMax800PxWide hasBorderShade80' src='/image/blog/2020-08-01-two-galaxies/0040_javascript_code.png' alt='JavaScript code'>
  <p>Figure 4: JavaScript code of the simulation.</p>
</div>


## Run the simulation locally

Next, we want to run the simulation on your computer, so you can tinker with the code and see the effects. In order to do this, you need to install a web server, which is a program that  to runs web sites. There are many web servers available, but the simpler ones come with Python and Node.js.


### Running web server with Python

First, [install Python](https://wiki.python.org/moin/BeginnersGuide/Download). Next, in the Terminal, change to the `two_galaxies` directory where you downloaded the code earlier:

```
cd two_galaxies
```

and start the web server:

```
python -m http.server
```

You can now open [http://0.0.0.0:8000/](http://0.0.0.0:8000/) URL in your web browser and see the simulation (Fig. 5). If you make any change in the code, you can just refresh the page and see your changes.

<div class='isTextCentered'>
  <img class='isMax100PercentWide' src='/image/blog/2020-08-01-two-galaxies/0050_running_web_site_locally.png' alt='Running a simulation locally with Python web server.'>
  <p>Figure 5: Running the simulation locally using Python web server.</p>
</div>



### Running web server with Node.js

Alternatively, instead of Python you can use a web server that comes with Node.js. First, [install Node.js](https://nodejs.org/en/download/). Next, install the web server:

```
npm install http-server -g
```

Finally, start the web server and navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080) URL in your web browser to see the simulation:

```
npx http-server
```

## Thanks 👍

* [Daniel Price](http://orcid.org/0000-0002-4716-4235): my Monash astronomy teacher, who wrote the Fortran code and the laboratory manual this simulation is based on. **Daniel is the main reason this work exists**.

* [Adelle Goodwin](https://adellej.github.io/), [Melanie Hampel](https://twitter.com/stellarmelanie), [John Lattanzio](https://orcid.org/0000-0003-2952-859X) and [Rosemary Mardling](https://research.monash.edu/en/persons/rosemary-mardling): my Monash teachers, who taught me astronomy and how to make simulate movement of masses in space.

* [webglfundamentals.org](https://webglfundamentals.org): that's where I learned how to do 3D drawing in the web browser for this simulation. Relevant sections are "Fundamentals", "2D translation, rotation, scale, matrix math" and "3D". My 3D code is based on examples from these chapters.

* [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf): a 1972 paper by Alar and Juri Toomre that analyses similar simulations. I mean, just look at the size and quality of the paper, the attention to detail. Imagine amount of work that went to create all those diagrams. I have not seen anything like that.

* [1941 paper by Erik Holmberg](https://ui.adsabs.harvard.edu/abs/1941ApJ....94..385H/abstract): an even earlier simulation that used physical light bulbs and light sensors instead of computers. I'm super lucky to be able just to press buttons on my laptop.
