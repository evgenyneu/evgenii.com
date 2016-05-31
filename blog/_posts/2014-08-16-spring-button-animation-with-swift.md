---
layout: blog_post
comments: true
title: "Spring button animation in iOS/Swift"
meta_description: "Shows spring button animation technique in iOS using Swift language"
tags: programming
---

In my app I have a big Play button. I wanted to show it with a nice bouncing effect to make it more noticeable and less boring.

<div class='isTextCentered'>
  <img width='144' class='isTextCentered' src='/image/blog/2014-08-16-spring-style-animation-in-ios-with-swift.gif' alt='Spring style button animation iOS with Swift'>
</div>

This kind of animation is easy to create with just a few lines of code.
First, I made the button smaller by applying scale transformation:

```Swift
button.transform = CGAffineTransformMakeScale(0.1, 0.1)
```
Then I used spring style animation that resets the button to its initial state.

```Swift
UIView.animateWithDuration(2.0,
  delay: 0,
  usingSpringWithDamping: 0.2,
  initialSpringVelocity: 6.0,
  options: UIViewAnimationOptions.AllowUserInteraction,
  animations: {
    self.button.transform = CGAffineTransformIdentity
  }, completion: nil)
```

## Animation parameters

* First one is duration of the animation, which I set to 2 seconds.
* `usingSpringWithDamping` sets the wobbliness of the spring animation. The closer the value to zero the more shaky the animation.
* `initialSpringVelocity` defines how fast the animation shoots out in the beginning.

It took me many minutes to play with those 3 parameters before I achieved the animation effect I liked.

## Source files

* [Demo app on GitHub](https://github.com/evgenyneu/bubble-button-animation-ios-swift)
* [Button image source](/files/2014-08-16-play.sketch.zip) created with Sketch app.
* Spring button animation [tutorial](http://evgenii.com/blog/spring-button-animation-on-android/) on Android.






