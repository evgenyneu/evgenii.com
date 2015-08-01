---
layout: blog_post
title: "Localizing numbers, date, time and names in iOS with Swift."
meta_description: "This tutorial shows how to format numbers, dates, times and names for different languages in iOS using Swift."
tags: programming
---

Here is a list of techniques I use to present values to international users in iOS.

### Numbers

```swift
String.localizedStringWithFormat("%.3f", M_PI)
// 3.142
```

### Currencies

```swift
let currencyFormatter = NSNumberFormatter()
currencyFormatter.numberStyle = .CurrencyStyle
currencyFormatter.stringFromNumber(99.95)
// $99.95
```

### Date and time

```swift
let dateFormatter = NSDateFormatter()
dateFormatter.dateStyle = .ShortStyle
dateFormatter.timeStyle = .ShortStyle
dateFormatter.stringFromDate(NSDate())
// 8/1/15, 6:12 PM
```

### Date and time using template

This technique can be used if you need to have more control on date and time formatting.

```swift
let dateFormatterTemplate = NSDateFormatter()
dateFormatterTemplate.setLocalizedDateFormatFromTemplate("yyyyMMMMdjjmmss")
dateFormatterTemplate.stringFromDate(NSDate())
// August 1, 2015, 6:12:05 PM
```

### Mass

```swift
let massFormatter = NSMassFormatter()
massFormatter.unitStyle = .Long
massFormatter.stringFromKilograms(1.5)
// 1.5 kilograms
```

### Distance

```swift
let lengthFormatter = NSLengthFormatter()
lengthFormatter.unitStyle = .Long
lengthFormatter.stringFromMeters(900)
// 900 meters
```

### Personal names

```swift
let nameComponents = NSPersonNameComponents()
nameComponents.givenName = "Brian"
nameComponents.middleName = "Edward"
nameComponents.familyName = "Cox"

let nameFormatter = NSPersonNameComponentsFormatter()
nameFormatter.style = .Medium
nameFormatter.stringFromPersonNameComponents(nameComponents)
// Brian Cox
```

## Reference

* [What's New in Internationalization](https://developer.apple.com/videos/wwdc/2015/?id=227): WWDC 2015 video.

* [About Internationalization and Localization](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html): iOS Developer Library.

* [Localizing text in Swift code](/blog/localizing-text-in-swift).

* [How to support right-to-left languages in iOS with Swift.](/blog/supporting-right-to-left-languages-in-ios-with-swift/)