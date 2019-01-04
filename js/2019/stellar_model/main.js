/*

A stellar structure mofrl

https://evgenii.com/blog/three-body-problem-simulator/

License: Public Domain

Credits
=============

1. This work is based on code from Modern Astrophysics by Bradley W. Carroll and Dale A. Ostlie. The original location of the code on Pearson Education website is https://wps.pearsoned.com/aw_carroll_ostlie_astro_2e/48/12319/3153834.cw/index.html.


*/

(function(){
  "use strict";

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

  debug.print("hello there :)");
})();