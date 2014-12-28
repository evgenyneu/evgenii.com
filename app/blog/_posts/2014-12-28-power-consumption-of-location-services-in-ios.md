---
layout: blog_post
title: "Power consumption of location updates in iOS"
meta_description: "This test shows power consumption of using location service on iOS in different accuracy settings"
tags: programming
---

We usually choose between accuracy and power consumption when we want to get location of an iOS device. More precise location comes with a price of higher energy usage. Or does it?

With this little experiment I want to find out if that's actually true.
Is getting more accurate location updates really makes a difference in power consumption on iPhone? Is GPS geolocation method more power hungry than WiFi?

## My setup

I ran power consumption meter app for 12 hours. The app was was started on two fully charged phones: iPhone 6 Plus / iOS 8 and iPhone 5 / iOS 7. After 12 hours I looked at the remaining battery charge level. Location updated were coming in the background when phones were locked.

## Test results

Test results show percentage of battery charge consumed when running the app with different accuracy settings. The lower the percentage value - the better.

### Accuracy kCLLocationAccuracyHundredMeters

* **iPhone 6 Plus**: 0%
* **iPhone 5**: 0%

Getting location updates in **kCLLocationAccuracyHundredMeters** mode consumed almost no power on both devices. Incoming location updates usually show accuracy of 65 meters. The accuracy becomes worse in rural areas. Turning WiFi off makes location accuracy drop to 1 km or worse. This tells us that the phone is probably using WiFi when it's available and cell tower triangulation when there is no WiFi.

### Accuracy kCLLocationAccuracyNearestTenMeters

* **iPhone 6 Plus**: 0%
* **iPhone 5**: 7%

**kCLLocationAccuracyNearestTenMeters** mode consumed 7% of battery charge on iPhone 5. Consumption on iPhone 6 Plus remained zero. Location updates are coming more frequently than in 100m mode with average accuracy of 10 meters. The accuracy does not change after WiFi is switched off. I assume that's because the phones are using GPS.

## My conclusion

From the results of the tests I can probably assume that there is **no much difference in power consumption** between 'nearest ten meters' (GPS) and '100 meters' (WiFi / cell tower) modes. Therefore **I would recommend using kCLLocationAccuracyNearestTenMeters in all cases** unless location accuracy of 1 km or worse is acceptable. 'Ten meters' mode is also more reliable because it does not depend on availability of WiFi hotspots which can be sparse in rural areas. In addition, 'ten meters' will work even if WiFi is turned off in settings.

## Apps used

* [iOS location power meter](https://github.com/evgenyneu/ios-core-location-battery-meter)

* [Core location accuracy tester](https://github.com/evgenyneu/core-location-tester-ios)
