---
layout: blog_post
comments: false
title: "Making a JavaScript simulation of two interacting galaxies"
tags: science
---


## What's this about?

In this post I want to show how to make a simulation of two interacting galaxies that runs in a Web browser, written in HTML, CSS and JavaScript languages. I won't explain everything, because I would need to write books on physics and Web programming, and I have neither skills nor patience for that yet. Instead, here I just want to briefly show the main ideas that will hopefully make this simulation appear less magical. The full code of this simulation is available at [github.com/evgenyneu/two_galaxies](https://github.com/evgenyneu/two_galaxies).


## Who made this possible?

The idea and the physics code of this simulation are not mine. This work is based on the laboratory manual written by my teacher [Daniel Price](http://orcid.org/0000-0002-4716-4235) from Monash University. All I've done was porting Daniel's Fortran code to JavaScript and drawing some buttons. Similar simulation was done in 1972 by Alar and Juri Toomre in their [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf) paper, an inspiration for Daniel's simulation.

I also learned how to simulate moving bodies in space from my Monash astronomy teachers Adelle Goodwin, Melanie Hampel, John Lattanzio and Rosemary Mardling (in alphabetical order).

Lastly, most of the 3D code is not mine, I copy-pasted it from [WebGL Funamentals](https://webglfundamentals.org) tutorials.


## The main idea

This simulation contains two galaxy cores that move around the common center of mass, located at the origin of the coordinate system (Fig. 1). The two cores move in the X-Y plane. If we only consider the cores, then this is just a two-body problem that [we coded previously](/blog/two-body-problem-simulator/). However, this time we want to add stars that move around each core in circular orbits. The stars form discs that are tilted at adjustable angles with respect to the X-Y plane.

<div class='isTextCentered'>
  <img class='isMax600PxWide' src='/image/blog/2020-08-01-two-galaxies/0010_main_idea.jpg' alt='The main idea behind the simulation'>
  <p>Figure 1: The main idea behind the simulation.</p>
</div>


## A spherical cow

This model includes big a simplification of reality: the stars in the simulation are massless, they only feel  gravity from the two cores, but not from other stars. This simplification makes the model very unrealistic. In a real galaxy, the mass is not located at the center, but instead contained in the stars and dark matter and distributed throughout the galaxy. For example, our Milky Way contains a supermassive black hole Sagittarius A* in its center, but the black hole is "only" about one millionth (0.000001) of the mass of the galaxy.

But unrealistic simplifications are sometimes useful because they can help us understand something fundamental about nature. For example, it would have been much harder for Galileo and Newton to discover that unperturbed bodies move at constant velocity without ignoring friction and gravity, which are always present in our daily life.






## Thanks 👍

* [Daniel Price](http://orcid.org/0000-0002-4716-4235): my Monash astronomy teacher, who wrote the Fortran code and the laboratory manual this simulation is based on. **Daniel is the main reason this work exists**.

* [Adelle Goodwin](https://adellej.github.io/), [Melanie Hampel](https://twitter.com/stellarmelanie), [John Lattanzio](https://orcid.org/0000-0003-2952-859X) and [Rosemary Mardling](https://research.monash.edu/en/persons/rosemary-mardling): my Monash teachers, who taught me astronomy and how to make simulate movement of masses in space.

* [webglfundamentals.org](https://webglfundamentals.org): that's where I learned how to do 3D drawing in the web browser for this simulation. Relevant sections are "Fundamentals", "2D translation, rotation, scale, matrix math" and "3D". My 3D code is based on examples from these chapters.

* [Galactic Bridges and Tails](https://github.com/evgenyneu/two_galaxies/raw/master/literature/toomre_1972.pdf): a 1972 paper by Alar and Juri Toomre that analyses similar simulations. I mean, just look at the size and quality of the paper, the attention to detail. Imagine amount of work that went to create all those diagrams. I have not seen anything like that.

* [1941 paper by Erik Holmberg](https://ui.adsabs.harvard.edu/abs/1941ApJ....94..385H/abstract): an even earlier simulation that used physical light bulbs and light sensors instead of computers. I'm super lucky to be able just to press buttons on my laptop.
