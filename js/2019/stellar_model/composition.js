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

  // Contains inlined function definitions for information about the composition of the gas
  var composition = (function(){

    // Calculate the amount of Helium-4 in the mixture
    function helium(X, Z)
    {
      return (1 - X - Z);
    }

    return {
      helium: helium
    };
  })();

  window.stellar.composition = composition;
})();