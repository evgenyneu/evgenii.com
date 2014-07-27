---
layout: blog_post
title: "Optional trailing closures in Swift"
meta_description: "Writing a function with an optional trailing closure in Swift language."
tags: programming
---

Swift language has a handy feature called `trailing closures`.
It is a clean way of passing a closure into a function.

```swift
func makeTea(doNext: () -> ()) {
  // making tea ...
  doNext()
}
```

We can then call the function this way.

```swift
makeTea { drinkTea() }
```

Here we call `makeTea` function and pass a closure expression `drinkTea()` into it.
Notice that we did not write parentheses `()` when calling `makeTea`, which
is allowed if there are no other parameters.

## Making trailing closure optional

But what if we don't always need to pass a closure into our function?
It is achieved by

1. making parameter an optional type `(...)?`,
2. using nil for its default value ` = nil` and
3. calling parameter using optional chaining `?()`.

```swift
func makeTea(doNext: (() -> ())? = nil) {
  // making tea ...
  doNext?()
}
```

Now we can call `makeTea` function without supplying the closure.

```swift
makeTea()
```