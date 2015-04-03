---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Tutorial: testing an activity in Android Studio"
meta_description: "This tutorial shows how to setup tests in Android Studio and write test for basic UI interactions."
tags: programming
---

In this tutorial we will learn how to:

* Setup tests in Android Studio.
* Write tests for basic UI interations in activity.
* Use test-driven development (TDD in short) approach for writing an Android app.

### TDD?

Don't worry if it sounds scary and too scientific. It is actually very simple. All it means is writing tests *before* writing the app code. I think it's easy to bring TDD to Android development. All thanks to the excellent testing capabilities of the platform.

### I assume you already know

For this tutorial you will need to have Android Studio installed and know how to run an app. Please refer to the excellent Android tutorial for installation instructions and basic introduction. For this tutorial I used Android Studio version 1.1.0.

### The app we will create

We will create an app called "Greeter". It has a text input and a "Greet" button. After user enters their name and taps the "Greet" button the app will show a greeting message.

![The `Greeter` app we will create](/image/blog/2015-09-27-testing-ui-in-android-studio/0100_finished_app_screen.png)

## 1. Let's get started: create a project in Android Studio

Open Android Studio and create a new project: **File > New Project**.

![New project in Android Studio](/image/blog/2015-09-27-testing-ui-in-android-studio/0110_new_project_in_android_studio.png)

Select a **blank activity**.

![Select new project with blank activity in Android Studio](/image/blog/2015-09-27-testing-ui-in-android-studio/0120_new_project_select_blank_activity_in_android_studio.png)

On the last step keep default activity name: `MainActivity`. This name will be used in our code later.

![Set activity name and title](/image/blog/2015-09-27-testing-ui-in-android-studio/0130_set_activity_name_and_title_in_android_studio.png)

Finally, click **Finish** and run the app by clicking the green start icon.

![Run the app in Android Studio](/image/blog/2015-09-27-testing-ui-in-android-studio/0140_run_android_studio_project.png)

You will see the app on device or the emulator. It will have an empty screen with "Hello world!" message.

![Empty Android app](/image/blog/2015-09-27-testing-ui-in-android-studio/0300_empty_app_first_run.png)

