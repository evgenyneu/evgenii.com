---
layout: blog_post
comments: true
title: "Localizing numbers, date, time and names in iOS / Swift"
meta_description: "This tutorial shows how to format numbers, dates, times and names for different languages in iOS using Swift."
tags: programming
---

Here is a list of techniques I use to present values to international users in iOS.

### Numbers

```Swift
// Float
String.localizedStringWithFormat("%.3f", M_PI)
// 3.142

// Integer
String.localizedStringWithFormat("%i", 12_345)
// 12,345
```

### Currencies

```Swift
let currencyFormatter = NumberFormatter()
currencyFormatter.numberStyle = .currency
currencyFormatter.string(from: 99.95)
// $99.95
```

### Date and time

```Swift
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .short
dateFormatter.timeStyle = .short
dateFormatter.string(from: Date())
// 8/1/15, 6:12 PM
```

### Date and time using template

This technique can be used if you need to have more control on date and time formatting.

```Swift
let dateFormatterTemplate = DateFormatter()
dateFormatterTemplate.setLocalizedDateFormatFromTemplate("yyyyMMMMdjjmmss")
dateFormatterTemplate.string(from: Date())
// August 1, 2015, 6:12:05 PM
```

### Mass

```Swift
let massFormatter = MassFormatter()
massFormatter.unitStyle = .long
massFormatter.string(fromKilograms: 1.5)
// 1.5 kilograms
```

### Distance

```Swift
let lengthFormatter = LengthFormatter()
lengthFormatter.unitStyle = .long
lengthFormatter.string(fromValue: 100, unit: .meter)
// 900 meters
```

### Personal names

```Swift
var nameComponents = PersonNameComponents()
nameComponents.givenName = "Brian"
nameComponents.middleName = "Edward"
nameComponents.familyName = "Cox"

let nameFormatter = PersonNameComponentsFormatter()
nameFormatter.style = .medium
nameFormatter.string(from: nameComponents)
// Brian Cox
```

## Reference

* [What's New in Internationalization](https://developer.apple.com/videos/play/wwdc2015-227/): WWDC 2015 video.

* [About Internationalization and Localization](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html): iOS Developer Library.

* [Localizing text in Swift code](/blog/localizing-text-in-swift).

* [Supporting right-to-left languages in iOS / Swift](/blog/supporting-right-to-left-languages-in-ios-with-swift/)