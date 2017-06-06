---
layout: blog_post
comments: true
title: "Disabling Swift 3 @obj inference in Xcode 9"
meta_description: "This quick tutorial shows how to disable Swift 3 @obj inference in Xcode 9 and prevent build warnings from showing up."
tags: programming
---

Today I installed Xcode 9 and converted my projects to Swift 4.0. Surprisingly, there was not much I needed to change in my code to make it compatible with the new Swift. However, one Dependency Analysis warning showed up after the build:

> The use of Swift 3 @objc inference in Swift 4 mode is deprecated. Please address deprecated @objc inference warnings, test your code with “Use of deprecated Swift 3 @objc inference” logging enabled, and disable Swift 3 @objc inference.

Here is how I got rid of that warning:

1. Click on your project in the *Project Navigator*.
1. Select your target.
1. Click *Build Settings*.
1. In the search bar type "inference" to quickly find the settings.
1. Finally, change the "Swift 3 @objc Inference" settings to "Off" and rebuild the project.

<img src='/image/blog/2017-06-06-disabling-swift3-objc-inference-in-xcode9/disable-swift-3-objc-inference-xcode9.png' alt='Disabling Swift 3 @objc inrefence in Xcode 9' class='isMax100PercentWide hasBorderShade90'>

## References

* [Limiting @objc inference](https://github.com/apple/swift-evolution/blob/master/proposals/0160-objc-inference.md) on Swift Programming Language Evolution.

* An [answer](https://stackoverflow.com/a/44380886/297131) on Stack Overflow.

