---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Testing activity in Android Studio. Part 1."
meta_description: "This tutorial shows how to setup tests in Android Studio and write test for basic UI interactions."
tags: programming
---

In this tutorial we will learn how to:

* Create a new project in Android Studio.
* Create new test confiuration and run the tests.
* Write tests for basic UI interactions in activity.

Here we will be using test-driven development approach (called TDD) to write a simple Android app.

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








## 2. Create test configuration and run tests

We need to create a test configuration the first time we run the tests. There are already tests created by the New Project Wizard. Let's run them.

* In your project window open **app > java**.
* You will see two subfolders with same name **com.yourcompany.greeter**. The second one will have **(androidTest)**. Right-click on that one.
* Select **Run > Tests in 'com.mycomp...** from the menu.
* Select your device or emulator in the next dialog and it will run the tests.

![Create test configuration and run tests](/image/blog/2015-09-27-testing-ui-in-android-studio/0200_create_test_configuration_in_android_studio.png)

### View test results

You will see a lot of green colour in the Run tool window. It means the tests passed successfully.
If your Run window is closed click the **Run** button on the bottom-left or select **View > Tool Windows > Run** from the main menu.

![View test results in run tool window](/image/blog/2015-09-27-testing-ui-in-android-studio/0210_view_test_results_in_run_tool_window_in_android_studio.png)

### Switch between App and Test configurations

We have created configuration for testing and can now use it any time we want to run our tests.

Click the configuration menu next to the run button on the toolbar. You will see **app** and **Test in `com.myapp..** configurations there. This is how we can switch between running the app and tests.

![Switch between app and test configurations](/image/blog/2015-09-27-testing-ui-in-android-studio/0220_switch_between_app_and_tests_in_android_studio.png)

### Reference







