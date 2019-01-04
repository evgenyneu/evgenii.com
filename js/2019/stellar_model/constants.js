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

  // Contains physical and astronomical constants in SI units.
  var constants = (function(){
    var data = {
      // Values related to pi
      pi: 3.14159265358979323846264338327950,

      // Physical constants
      c: 2.99792458e08,
      h: 6.62606876e-34,
      k_B: 1.3806503e-23,

      //Astronomical length constants
      au: 1.4959787066e11,

      // Solar constants
      mSun: 1.9891e30,
      sSun: 1.365e3, // Solar constant
      rSun: 6.95508e8
    };

    function init() {
      // Values related to pi
      data.fourPi = 4 * data.pi;

      // Physical constants
      data.sigma  = 2 * Math.pow(data.pi, 5) * Math.pow(data.k_B, 4) /
        (15 * Math.pow(data.c, 2) * Math.pow(data.h, 3));

      // Solar constants
      data.lSun =  data.fourPi * Math.pow(data.au, 2) * data.sSun;
    }

    return {
      init: init,
      data: data
    };
  })();

  window.stellar.constants = constants;
})();