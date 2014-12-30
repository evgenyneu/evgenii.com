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

I ran power consumption meter app for 12 hours. The app was started on two fully charged phones: iPhone 6 Plus / iOS 8 and iPhone 5 / iOS 7. After 12 hours I looked at the remaining battery charge level. Location updated were coming in the background when phones were locked.

## Test results

Test results show percentage of battery charge consumed when running the app with different `desiredAccuracy` setting of location manager. The lower the percentage value - the better. No power was consumed during 12 hours when the meter app was not running.

### Accuracy '100 meters'

* **iPhone 6 Plus**: 4% of charge consumed.
* **iPhone 5**: 16% of charge consumed.

Getting location updates in **kCLLocationAccuracyHundredMeters** mode consumed relatively little power on both devices. Incoming location updates usually show accuracy of 65 meters. The accuracy becomes worse in rural areas. Turning WiFi off makes location accuracy drop to 1 km or worse. This tells us that the phone is probably using WiFi when it's available and cell tower triangulation when there is no WiFi.

### Accuracy 'nearest ten meters'

* **iPhone 6 Plus**: 22% of charge consumed.
* **iPhone 5**: 75% of charge consumed.

**kCLLocationAccuracyNearestTenMeters** mode ate significantly more battery than the '100 meters' mode. Location updates are coming more frequently than in 100m mode with average accuracy of 10 meters. The accuracy does not change after WiFi is switched off. I assume that's because the phones are using GPS all the time.

## My conclusion

From the results of the tests I can probably assume that 'nearest ten meters' (GPS) mode consumes from 4 to 6 times more energy than '100 meters' (WiFi / cell tower) mode. Therefore I would avoid running 'ten meters' mode for longer than a couple of hours per day.

## Apps used

* [iOS location power meter](https://github.com/evgenyneu/ios-core-location-battery-meter)

* [Core location accuracy tester](https://github.com/evgenyneu/core-location-tester-ios)
