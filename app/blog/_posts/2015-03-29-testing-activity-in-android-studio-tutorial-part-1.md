---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Testing activity in Android Studio. Part 1."
meta_description: "This tutorial shows how to setup tests in Android Studio and write test for basic UI interactions."
tags: programming
---

In this tutorial we will learn how to:

* Create a new project in Android Studio.
* Create new test configuration and run the tests.
* Write tests for basic UI interactions in activity.

### I assume you already know

For this tutorial you will need to have Android Studio installed and know how to run an app. Please refer to the excellent [Building Your First App](https://developer.android.com/training/basics/firstapp/index.html) tutorial from Google.

### Greeter app

We will create an app called "Greeter". It has a text input and a "Greet" button. In this app user enters a name and taps the "Greet" button. The app shows a greeting message.

![The `Greeter` app we will create](/image/blog/2015-03-27-testing-ui-in-android-studio/0100_finished_app_screen.png)







## 1. Let's get started: create a project in Android Studio

* Open Android Studio and create a new project: **File > New Project**.
* Enter **Greeter** in Application Name and **mycompany.com** in Company Domain.

![New project in Android Studio](/image/blog/2015-03-27-testing-ui-in-android-studio/0110_new_project_in_android_studio.png)

Select a **blank activity**.

![Select new project with blank activity in Android Studio](/image/blog/2015-03-27-testing-ui-in-android-studio/0120_new_project_select_blank_activity_in_android_studio.png)

Next, keep default activity name: `MainActivity`. This name will be used in our code later.

![Set activity name and title](/image/blog/2015-03-27-testing-ui-in-android-studio/0130_set_activity_name_and_title_in_android_studio.png)

Finally, click **Finish** and run the app by clicking the green start icon on the toolbar.

![Run the app in Android Studio](/image/blog/2015-03-27-testing-ui-in-android-studio/0140_run_android_studio_project.png)

You will see the app on your device or emulator. It will have an empty screen with "Hello world!" message. Beautiful!

![Empty Android app](/image/blog/2015-03-27-testing-ui-in-android-studio/0300_empty_app_first_run.png)








## 2. Create test configuration and run tests

We need to create a test configuration the first time we run the tests. There are already tests created by the New Project Wizard. Let's run them.

* In your project window expand **app > java** folders.
* You will see two packages with the same name **com.mycompany.greeter**. The second one will have **(androidTest)**. Right-click on that one.
* Select **Run > Tests in 'com.mycomp...** from the context menu.
* Select your device or emulator in the next dialog and it will run the tests.

![Create test configuration and run tests](/image/blog/2015-03-27-testing-ui-in-android-studio/0200_create_test_configuration_in_android_studio.png)

### View test results

You will see a lot of green colour in the Run tool window. It means the tests passed successfully.
If your Run window is closed click the **Run** button on the bottom panel or select **View > Tool Windows > Run** from the main menu.

![View test results in run tool window](/image/blog/2015-03-27-testing-ui-in-android-studio/0210_view_test_results_in_run_tool_window_in_android_studio.png)

### Switch between App and Test configurations

We have created configuration for testing and can now use it any time we want to run our tests.

Click the configuration dropdown menu located next to the run button on the toolbar. You will see **app** and **Test in `com.myapp..** configurations there. This is how we can switch between running the app and tests.

![Switch between app and test configurations](/image/blog/2015-03-27-testing-ui-in-android-studio/0220_switch_between_app_and_tests_in_android_studio.png)

### Test configuration (under the hood)

If you are curious how the Test Configuration works open **Run > Edit Configurations** from the main menu.

In configurations dialog, expand **Android Tests** group and select **Tests in 'com.mycompany.greeter'** configuration.

You will see the following settings:

* **app** module is selected.
* **All in Package** radio box is selected.
* The package name is **com.mycompany.greeter**.

It means that this configuration will run all the tests in **com.mycompany.greeter** package.


![Test configuration settings](/image/blog/2015-03-27-testing-ui-in-android-studio/0230_test_configuration_settings_in_android_studio.png)





## What's next?

Cool! We have created an app project and a test configuration. Next we will write our first test.

[Read part 2 of this tutorial](/blog/testing-activity-in-android-studio-tutorial-part-2/)





### Reference

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/), [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/) and [Part 3](/blog/testing-activity-in-android-studio-tutorial-part-3/) of this tutorial.
* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)





