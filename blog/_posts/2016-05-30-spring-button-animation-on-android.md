---
layout: blog_post
comments: true
title: "Creating a bubble button animation on Android"
meta_description: "This tutorial shows how to animate a button with spring/bubble effect on Android."
tags: programming
---

<div class='isTextCentered'>
  <img width='144' class='isTextCentered' src='/image/blog/2016-05-30-spring-button-animation-on-android/005-spring-button-animation.gif' alt='Spring style button animation on Android'>
</div>

This tutorial shows how to animate a button with bounce effect on Android using Android Studio version 2.1.

I assume that you know how to create an app in Android Studio. If you don't have this experience yet then I would recommend reading the excellent [Building Your First App](https://developer.android.com/training/basics/firstapp/index.html) tutorial from Google first.

## 1) Add a button view

We begin by placing a button in the activity layout file **res/layout/activity_main.xml**.


```XML
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.mycompany.bubblebutton.MainActivity">

    <Button
        android:id="@+id/button"
        android:layout_width="92dp"
        android:layout_height="92dp"
        android:onClick="didTapButton"
        android:layout_centerHorizontal="true"
        android:background="#FFA400" />

</RelativeLayout>
```

## 2) Create a scale animation

Next, we create an animation file **res/anim/bounce.xml** for scaling views.

* Right click on the **res** folder.
* Select *New / Android resource file*.

<div class='isTextCentered'>
  <img src='/image/blog/2016-05-30-spring-button-animation-on-android/010-create-animation-file.png' alt='Create scale animation file in Android Studio' class='isMax100PercentWide hasBorderShade90'>
</div>

* Write **bounce** as the name of the file
* Choose the **Animation** resource type. The directory name field will change to **anim**.

<div class='isTextCentered'>
  <img src='/image/blog/2016-05-30-spring-button-animation-on-android/012-name-animation-file-android-studio.png' alt='Name the animation file in Android Studio' class='isMax100PercentWide hasBorderShade90'>
</div>


Next, open the **res/anim/bounce.xml** file that was created for you and replace its content with the following code.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >

    <scale
        android:duration="2000"
        android:fromXScale="0.3"
        android:toXScale="1.0"
        android:fromYScale="0.3"
        android:toYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%" />
</set>
```

This code creates an animation that changes the size of a view from 30% to 100% during two seconds.

## 3) React to button tap

Now we add the code that animates the button on tap. Add the following method to your activity Java file.

```Java
public void didTapButton(View view) {
    Button button = (Button)findViewById(R.id.button);
    final Animation myAnim = AnimationUtils.loadAnimation(this, R.anim.bounce);
    button.startAnimation(myAnim);
}
```

If you run the app and tap the button it will animate smoothly from smaller to bigger size.



<div class='isTextCentered'>
  <img width='100' src='/image/blog/2016-05-30-spring-button-animation-on-android/020-button-animation-scale-android.gif' alt='Animating a button with scale effect on Android'>
</div>

## 4) Implement the bounce interpolator

Next, we write the code that adds the bounce effect to the scale animation.

* Create a new *Java Class* file in your app module and name it **BounceInterpolator**.
* Open the Java file that was created and replace the class code with the following.

```Java
class BounceInterpolator implements android.view.animation.Interpolator {
    double mAmplitude = 1;
    double mFrequency = 10;

    BounceInterpolator(double amplitude, double frequency) {
        mAmplitude = amplitude;
        mFrequency = frequency;
    }

    public float getInterpolation(float time) {
        return (float) (-1 * Math.pow(Math.E, -time/ mAmplitude) *
                Math.cos(mFrequency * time) + 1);
    }
}
```

I will explain how this code works in a moment.

## 5) Use the bounce interpolator

Finally, open your activity Java file again and replace the entire `didTapButton` method with the following code.

```Java
public void didTapButton(View view) {
    Button button = (Button)findViewById(R.id.button);
    final Animation myAnim = AnimationUtils.loadAnimation(this, R.anim.bounce);

    // Use bounce interpolator with amplitude 0.2 and frequency 20
    BounceInterpolator interpolator = new BounceInterpolator(0.2, 20);
    myAnim.setInterpolator(interpolator);

    button.startAnimation(myAnim);
}
```

Here we added the `BounceInterpolator` to the animation with `setInterpolator` method. If you run the app and tap the button it will animate with the spring effect.

<div class='isTextCentered'>
  <img width='100' src='/image/blog/2016-05-30-spring-button-animation-on-android/030-bounce-button-animation-android.gif' alt='Animating a button with abounce effect on Android'>
</div>

## How the bounce animation interpolator works

We initialized the `BounceInterpolator` with two arguments.

```Java
BounceInterpolator interpolator = new BounceInterpolator(0.2, 20);
```

1. The first value `0.2` is the bounce **amplitude**. The higher value produces more pronounced bounces.
1. The second value `20` is the **frequency** of the bounces. The higher value creates more wobbles during the animation time period.

In order to achieve the bounce effect the `getInterpolation` method maps the time using the following function:

<div class='isTextCentered'>
  <img class='isMax300PxWide' src='/image/blog/2016-05-30-spring-button-animation-on-android/040-bounce-function-equation.png' alt='Bounce animation function equation'>
</div>

In this equation, *a* and *w* are the amplitude and frequency values and *t* is the time. The equation contains a  cosine function that causes the periodic wobbles during the animation. In order to reduce its amplitude with time we multiply the cosine by an exponential function. The following graph shows that the animation overshoots above the value 1 first and then settles closer to it.

<div class='isTextCentered'>
  <img class='isMax300PxWide hasBorderShade90' src='/image/blog/2016-05-30-spring-button-animation-on-android/050-graph-of-bounce-interpolation.png' alt='The graph of bounce animation interpolation'>
</div>



## Reference

* [Source code](https://github.com/evgenyneu/bounce-button-animation-android) for the demo Android app.
* [Live graph](https://www.desmos.com/calculator/6gbvrm5i0s) of the time interpolator function.
* Spring button animation [tutorial](http://evgenii.com/blog/spring-button-animation-with-swift/) for iOS/Swift.





