---
layout: blog_post
comments: true
title: "Disabling Swift 3 @obj inference in Xcode 9"
meta_description: "This quick tutorial shows how to disable Swift 3 @obj inference in Xcode 9 and prevent build warnings from showing up."
tags: programming
---

Today I installed Xcode 9 and converted my projects to Swift 4.0. Surprisingly, very few changes were necessary to make my code compatible with the new Swift. However, one warning showed up after the build:

> The use of Swift 3 @objc inference in Swift 4 mode is deprecated. Please address deprecated @objc inference warnings, test your code with “Use of deprecated Swift 3 @objc inference” logging enabled, and disable Swift 3 @objc inference.

Here is how I got rid of that warning:

1. Click on your project in the *Project Navigator*.
1. Select your target.
1. Click *Build Settings*.
1. In the search bar type "inference" to quickly find the settings.
1. Finally, change the "Swift 3 @objc Inference" settings to "Off" and rebuild the project.

<img src='/image/blog/2017-06-06-disabling-swift3-objc-inference-in-xcode9/disable-swift-3-objc-inference-xcode9.png' alt='Disabling Swift 3 @objc inrefence in Xcode 9' class='isMax100PercentWide hasBorderShade90'>

## What does "Swift 3 @objc Inference" setting do?

Before Swift 4, the compiler made some Swift declarations automatically available to Objective-C. For example, if one subclassed from NSObject, the compiler created Objective-C entry points for all methods in such classes. The mechanism is called *@objc inference*.

In Swift 4, such automatic @objc inference is deprecated because it is costly to generate all those Objective-C entry points. When "Swift 3 @objc Inference" setting is set to "On", it allows the old code to work. However, it will show deprecation warnings that need to be addressed. It is recommended to "fix" these warnings and switch the setting to "Off", which is the default for new Swift projects.


## Example 1: before Swift 4

This code worked before Swift 4, since method `foo` was automatically exposed to Objective-C:

```Swift
class MyClass: NSObject {
  func foo() {}

  func test() {
    var cl: AnyObject
    cl = MyClass()
    cl.foo?() // No problem before Swift 4
  }
}
```

## Example 2: since Swift 4

Let's try running the same code in Swift 4:


```Swift
class MyClass: NSObject {
  func foo() {}

  func test() {
    var cl: AnyObject
    cl = MyClass()
    cl.foo?() // Error: Value of type 'AnyObject' has no member 'foo'
  }
}
```

Now the compiler shows an error, since `foo` method is no longer available  from Objective-C. For convenience, the Swift 4 code migration sets "Swift 3 @objc Inference" setting to "On", which makes our code compile with the following warning:

> Reference to instance method 'foo()' of 'MyClass' depends on '@objc' attribute inference deprecated in Swift 4.

## Make class members available to Objective-C

If we want declarations to be accessible from Objective-C we can mark individual members with the `@objc` annotation:

```Swift
class MyClass : NSObject {
  @objc func foo() { } // This method is available to Objective-C
  func bar() { } // But not this method
}
```

Alternatively, if we want all members of our class to be exposed to Objective-C, we can mark the class with `@objcMembers` annotation:

```Swift
@objcMembers // All class members will be exposed to Objective-C
class MyClass : NSObject {
  func foo() { }
  func bar() { }
}
```


## References

* [Limiting @objc inference](https://github.com/apple/swift-evolution/blob/master/proposals/0160-objc-inference.md) Swift proposal.

* An [answer](https://stackoverflow.com/a/44380886/297131) on Stack Overflow.

