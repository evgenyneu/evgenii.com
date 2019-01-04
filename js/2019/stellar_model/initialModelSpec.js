"use strict";

describe("initialModel", function() {
  var o = window.stellar;
  o.main.init();
  var obj = o.initialModel;

  describe("init", function() {
    it("should init", function() {
      var initialParameters = {
        mSolar: 1.2,
        lSolar: 1.6,
        tEff: 5700,
        x: 0.7,
        z: 0.008
      };

      obj.init(initialParameters);

      expect(obj.data.mSolar).toBeApprox(1.2);
      expect(obj.data.lSolar).toBeApprox(1.6);
      expect(obj.data.rSolar).toBeApprox(1.29925101565831);
      expect(obj.data.mS).toBeApprox(2.38692e+30);
      expect(obj.data.lS).toBeApprox(6.142049637565578e+26);
      expect(obj.data.rS).toBeApprox(9.036394753984797e+08);
      expect(obj.data.tEff).toBeApprox(5700);
      expect(obj.data.x).toBeApprox(0.7);
      expect(obj.data.y).toBeApprox(0.292);
      expect(obj.data.z).toBeApprox(0.008);
    });
  });
});
