"use strict";

beforeEach(function () {
  jasmine.addMatchers({
    toBeApprox: function () {
      return {
        /*
          Compares two decimal numbers.
          Successful when their relative difference is smaller than `rel` (1e-15 by default).
        */
        compare: function(actual, expected, rel) {
          if (rel === undefined) {
            rel = 1e-15;
          }

          if (actual === 0) {
            return {
              pass: Math.abs(expected) < rel
            };
          } else {
            return {
              pass: Math.abs((actual - expected) / actual) < rel
            };
          }
        }
      };
    }
  });
});
