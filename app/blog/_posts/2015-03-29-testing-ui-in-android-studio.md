---
layout: blog_post
title: "Tutorial: testing an activity in Android Studio"
meta_description: "This tutorial shows how to setup tests in Android Studio and write test for basic UI interactions."
tags: programming
---

In this tutorial we will learn how to:

* Setup tests in Android Studio.
* Write tests for basic UI interations in activity.

For this tutorial you will need to have Android Studio installed and know how to run an app. Please refer to the excellent Android tutorial for installation instructions and basic introduction. For this tutorial I used Android Studio version 1.1.0.

## Our goal: the 'Greeter' app

We will create an app called "Greeter". It has a text input and a "Greet" button. After user enters their name and taps the "Greet" button the app will show a greeting message.

<p class='isTextCentered'>
  <img alt='Finished app screen' class='Image-width300 Image--hasBorder' src='/image/blog/2015-09-27-testing-ui-in-android-studio/01_finished_app_screen.png' >
</p>

## Let's get started: creating a project.

1. Open Android Studio and create a new project: "File > New Project".
1. Follow defaults for the "New Project" wizard. That will create a project with a blank activity.
1. Run the app by clicking the green start icon.

<p class='isTextCentered'>
  <img alt='Run the app' class='Image-width100 Image--hasBorder' src='/image/blog/2015-09-27-testing-ui-in-android-studio/02_running_the_app.png' >
</p>

The app will run on device and show an empty screen with "Hello world!" message

<p class='isTextCentered'>
  <img alt='Empty app screen with "Hello World" message' class='Image-width300 Image--hasBorder' src='/image/blog/2015-09-27-testing-ui-in-android-studio/03_empty_app_first_run.png' >
</p>

