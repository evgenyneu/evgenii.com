/*

A stellar structure model.

https://evgenii.com/blog/stellar-model/

License: Public Domain

Credits
=============

1. This work is based on code from Modern Astrophysics by Bradley W. Carroll and Dale A. Ostlie. The original location of the code on Pearson Education website is

  https://wps.pearsoned.com/aw_carroll_ostlie_astro_2e/48/12319/3153834.cw/index.html


*/

(function(){
  "use strict";

  window.stellar = window.stellar || {};
  var o = window.stellar;

  // The initial parameters of the star
  var initialModel = (function(){
    var data = {
      mSolar: 1.2,
      lSolar: 1.6,
      tEff: 5700,
      x: 0.7,
      z: 0.008
    };

    function init() {
      data.y = o.composition.helium(data.X, data.Z);
      data.mS = data.mSolar * o.constants.data.mSun;
      data.lS = data.lSolar * o.constants.data.lSun;

      // Eq. (3.17)
      data.rS = Math.sqrt(data.lS / (o.constants.data.fourPi *
        o.constants.data.sigma * Math.pow(data.tEff, 4)));

      data.rSolar = data.rS / o.constants.data.rSun; // Solar radius as SI value
    }

    return {
        data: data,
        init: init
      };
  })();

  o.initialModel = initialModel;
})();