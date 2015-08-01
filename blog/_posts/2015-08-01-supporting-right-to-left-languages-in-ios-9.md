---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "How to support right-to-left languages in iOS 9."
meta_description: "List of best practices for supporting right-to-left language in iOS 9 apps and Xcode 7."
tags: programming
---

Here is the list of techniques I use to make my iOS apps compatible with [right-to-left languages](https://en.wikipedia.org/wiki/Right-to-left).

1. By default Auto Layout will take care of the right-to-left layout when `.Leading` and `.Trailing` layout attributes are used.
1. Right-to-left layout can be tested by changing **Application Language** settings to **Right to Left Pseudolanguage** in the scheme **Run** settings (Product > Scheme > Edit Scheme...).
1. `semanticContentAttribute` property of a UIView can be used to change the default layout technique. For example, one can force the view to remain in the left-to-right mode. Same can be done in the Storyboard by changing the **Semantic** property of the Attributes Inspector.
1. In order to flip images for right-to-left users use `imageFlippedForRightToLeftLayoutDirection()` method of an `UIImage` object.
1. And finally, here is how to check if the view is currently displayed in the left-to-right mode:

```swift
let isLeftToRight = UIView.userInterfaceLayoutDirectionForSemanticContentAttribute(
myView.semanticContentAttribute) == .LeftToRight
```


## Reference

* [WWDC 2015 Video](https://developer.apple.com/videos/wwdc/2015/?id=222) "New UIKit Support for International User Interfaces".
* [Localizing text in Swift code](/blog/localizing-text-in-swift).











