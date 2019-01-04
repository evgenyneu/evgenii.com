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

  // Show debug messages on screen
  var debug = (function(){
    var debugOutput = document.querySelector(".StellarModel-debugOutput");

    function print(text) {
      var date = new Date();
      debugOutput.innerHTML = text + " " + date.getMilliseconds();
    }

    return {
        print: print,
      };
  })();

  function init() {
    window.stellar.constants.init();

    var initialParameters = {
      mSolar: 1.2,
      lSolar: 1.6,
      tEff: 5700,
      x: 0.7,
      z: 0.008
    };

    window.stellar.initialModel.init(initialParameters);
  }

  init();
  console.log(window.stellar.initialModel.data);
})();