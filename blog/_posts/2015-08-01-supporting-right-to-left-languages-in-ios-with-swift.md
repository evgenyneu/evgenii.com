---
layout: blog_post
comments: true
title: "Supporting right-to-left languages in iOS / Swift"
meta_description: "List of best practices for supporting right-to-left language in iOS apps with Swift."
tags: programming
---

Here is the list of techniques I use to make my iOS apps compatible with [right-to-left languages](https://en.wikipedia.org/wiki/Right-to-left).

1. By default Auto Layout will take care of the right-to-left layout when `.Leading` and `.Trailing` layout attributes are used.
1. Right-to-left layout can be tested by changing **Application Language** settings to **Right to Left Pseudolanguage** in the scheme **Run** settings (Product > Scheme > Edit Scheme...).
1. `semanticContentAttribute` property of a UIView can be used to change the default layout technique. For example, one can force the view to remain in the left-to-right mode. Same can be done in the Storyboard by changing the **Semantic** property of the Attributes Inspector.
1. In order to flip images for right-to-left users use `imageFlippedForRightToLeftLayoutDirection()` method of an `UIImage` object.
1. And finally, here is how to check if the view is currently displayed in the left-to-right mode:

```Swift
let isLeftToRight = UIView.userInterfaceLayoutDirectionForSemanticContentAttribute(
myView.semanticContentAttribute) == .LeftToRight
```


## Reference

* [New UIKit Support for International User Interfaces Video](https://developer.apple.com/videos/play/wwdc2015-222/): WWDC 2015 video.

* [About Internationalization and Localization](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html): iOS Developer Library.

* [Localizing text in Swift code](/blog/localizing-text-in-swift).

* [Localizing numbers, date, time and names in iOS / Swift](/blog/localizing-numbers-date-time-and-names-in-ios-with-swift/)










