---
layout: blog_post
comments: true
title: "Drawing of the Sun and its planets with correct relative sizes"
meta_description: "This is my attempt to draw a picture of the Solar system with true relative sizes of the Sun and its planets/"
tags: science
---

On the Figure 1 I wanted to show the Sun and all its planets with true colors and sizes proportional to each other. We know that diameter of the Earth is approximately 109 times smaller than that of the Sun. When creating the image I hoped to preserve this differences in sizes between the astronomical objects in order to visualize the magnitude of our cosmic neighborhood. It is surprising to actually see how small our own planet Earth is when it is placed next to the "gas giants" Jupiter and Saturn. When looking at this picture I try to imagine the size of my city, my house or my own body and realize how insignificant they are at planetary scale.

<div class='isFullScreenWide isTextCentered hasBackgroundColorShade10'>
  <br>
  <img src='/image/blog/2015-12-26-sun-and-planets-in-scale/0020_solar_system_object_sizes_in_scale.png' alt='The Sun and planets with correct relative sizes' class='isMax800PxWide'>
  <br>
</div>

<p class='isTextCentered'>Figure 1: Picture of the Sun and its planets in true colors with sizes in scale. Distances are not in scale. Zoom in to view details.</p>

## What's wrong with this image?

The relative sizes of the planets and the Sun shown on Figure 1 are approximately correct but some other physical properties are imprecise.

### 1) Distances between planets

The image above shows the planets separated by equal intervals. In reality, of course, those distances are unequal and much greater than the sizes of the planets. I could not draw the image with both planet sizes and distances in scale, and I tried. For example, the distance between the Sun and Mercury equals roughly to 83 Sun diameters. Or we can image it this way: it would take 83 Suns to fill this space between the Sun and Mercury. A realistic image of the Solar System would be so big that you would need to scroll the screen 100 times to get from the Sun to its first planet Mercury. It would take another 150 screens to see the Earth. Although such image would be more realistic very few people would find it useful.

### 2) Brightness and color of the planets

The image shows the planets and the Sun in real colors. It means that the objects look similar to what an astronaut would see when observing them from space. For example, if you were on a space ship you would perceive the Sun as white, while it looks yellow or orange from Earth due to effect of *Rayleigh scattering* of sunlight in the atmosphere.

While planet colors shown on Figure 1 are approximately correct their brightness is not. This is due to the physical fact that the amount of light from a star that reaches a fixed area of space is proportional to the square of the distance that star. This fact is described by the following equation for the *surface area of the sphere*, where `r` is the radius of the sphere.

```
A = 4πr²
```

It can be seen from this equation that the farther away the planet is from the Sun the less light it receives. For example, Uranus is approximately 19 times farther away from the Sun than the Earth is. For example, the square meter of surface on Uranus receives 361 times less light from the Sun compared to equal area on planet Earth. As a result the distant planets like Uranus and Neptune would appear darker that they are on the Figure 1.

### 3) Positions of the planets

Needless to say, the planets of the Solar System do not magically align to form a straight line shown on the image. Perfect alignment of the planets within a degree is such an improbable event that it would unlikely to happen in the future within the life span of the Solar System.


## Data for the sizes of the Sun and its planets

To create the Figure 1 I used the data for the sizes of the Sun and its planets shown in Table 1. The size of each object expressed as the mean radius in kilometers. The *mean radius* of an astronomical object is the average distance from its surface to its center. In addition, the table shows the sizes relative to the size of the Sun.

<table class='table isBlockCentered'>
  <thead>
    <tr>
      <th>Object name</th>
      <th>Radius (km)</th>
      <th>Relative to the Sun</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sun</td>
      <td class='isTextRightAligned'>696,342</td>
      <td class='isTextRightAligned'>1.000000</td>
    </tr>
    <tr>
      <td>Mercury</td>
      <td class='isTextRightAligned'>2,440</td>
      <td class='isTextRightAligned'>0.003504</td>
    </tr>
    <tr>
      <td>Venus</td>
      <td class='isTextRightAligned'>6,052</td>
      <td class='isTextRightAligned'>0.008691</td>
    </tr>
    <tr>
      <td>Earth</td>
      <td class='isTextRightAligned'>6,371</td>
      <td class='isTextRightAligned'>0.009149</td>
    </tr>
    <tr>
      <td>Mars</td>
      <td class='isTextRightAligned'>3,390</td>
      <td class='isTextRightAligned'>0.004868</td>
    </tr>
    <tr>
      <td>Jupiter</td>
      <td class='isTextRightAligned'>69,911</td>
      <td class='isTextRightAligned'>0.100398</td>
    </tr>
    <tr>
      <td>Saturn</td>
      <td class='isTextRightAligned'>58,232</td>
      <td class='isTextRightAligned'>0.083626</td>
    </tr>
    <tr>
      <td>Uranus</td>
      <td class='isTextRightAligned'>25,362</td>
      <td class='isTextRightAligned'>0.036422</td>
    </tr>
    <tr>
      <td>Neptune</td>
      <td class='isTextRightAligned'>24,622</td>
      <td class='isTextRightAligned'>0.035359</td>
    </tr>
  </tbody>
</table>

<p class='isTextCentered'>Table 1: Mean radii of the Sun and its planets.</p>

## Sources of the size data

1. **Sun**: Emilio, M.; Kuhn, J. R.; Bush, R. I.; Scholl, I. F. (2012). "Measuring the Solar Radius from Space during the 2003 and 2006 Mercury Transits". The Astrophysical Journal, Volume 750, Issue 2, article id. 135, 8 pp. (2012). Links: [arXiv:1203.4898v1](http://arxiv.org/abs/1203.4898), [2012ApJ...750..135E](http://adsabs.harvard.edu/abs/2012ApJ...750..135E), [doi:10.1088/0004-637X/750/2/135.](http://dx.doi.org/10.1088/0004-637X/750/2/135).
1. **Mercury**:
1. **Venus**:
1. **Earth**:
1. **Mars**:
1. **Jupiter**:
1. **Saturn**:
1. **Uranus**:
1. **Neptune**:

## Photo sources

1. **Mercury**: NASA, Messanger, [source](http://www.nasa.gov/mission_pages/messenger/multimedia/messenger_orbit_image20111129_1.html)
1. **Venus**: NASA, Mattias Malmer, Mariner 10, [source](https://commons.wikimedia.org/wiki/File:Venus_in_Real_Color_(Mosaic).jpg).
1. **Earth**: NASA, Apollo 17, [source](https://commons.wikimedia.org/wiki/File:Apollo17WorldReversed.jpg).
1. **Mars**: NASA, Hubble Space Telescope, [source](http://grin.hq.nasa.gov/ABSTRACTS/GPN-2000-000923.html).
1. **Jupiter**: NASA, ESA, and A. Simon (Goddard Space Flight Center), Hubble Space Telescope, [source](http://www.spacetelescope.org/images/heic1410a/).
1. **Saturn**: NASA, Voyager 2, [source](http://www.ciclops.org/view/3163/Saturn-taken-from-Voyager-2?js=1).
1. **Uranus**: NASA, Voyager 2, [source](http://photojournal.jpl.nasa.gov/catalog/PIA18182).
1. **Neptune**: NASA, Hubble Space Telescope, [source](http://www.nasa.gov/multimedia/imagegallery/image_feature_399.html).
