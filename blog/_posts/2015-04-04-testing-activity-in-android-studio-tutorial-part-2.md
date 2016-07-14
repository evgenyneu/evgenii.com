---
layout: blog_post
comments: true
title: "Testing activity in Android Studio. Part 2."
meta_description: "This is part 2 of the tutorial that shows how to write tests for Android activity in Android Studio."
tags: programming
---

This is the second part of the three-part tutorial. In [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) we learned how to create a new project, add a test configuration and run the tests.

Now we will write our first test. We will be using test-driven development approach (called TDD). We will build the app by first writing the tests and then implementing the actual app functionality.

### The Greeter app

The app we are building will have three components:

1. An **EditText** where user enters name.
1. A "Greet" **Button**.
1. And a **TextView** that will show the greeting message.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0000_greeter_app_components.png' alt='Components of the Greeter app' class='isMax100PercentWide hasBorderShade90'>


## 1. Setting up activity testing

Let's start by adding some testing dependencies to the Gradle file. We will need to do two modifications. Firstly, add the following text to the **dependencies** section of your **module** gradle file.

```
androidTestCompile 'com.android.support:support-annotations:24.0.0'
androidTestCompile 'com.android.support.test:runner:0.5'
androidTestCompile 'com.android.support.test:rules:0.5'
androidTestCompile 'com.android.support.test.espresso:espresso-core:2.2.2'
```

And secondly, add the following text to the **defaultConfig** section of the same **module** gradle file.

```
testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
```

Android Studio will ask to sync the project. Click the "Sync Now" button.


My complete module gradle file looks like this. Your gradle will may have different library versions.

```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.0"

    defaultConfig {
        applicationId "com.mycompany.greeter"
        minSdkVersion 15
        targetSdkVersion 24
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.0.0'
    androidTestCompile 'com.android.support:support-annotations:24.0.0'
    androidTestCompile 'com.android.support.test:runner:0.5'
    androidTestCompile 'com.android.support.test:rules:0.5'
    androidTestCompile 'com.android.support.test.espresso:espresso-core:2.2.2'
}
```




## 2. Create a test class

Next, we will add a new class to the test package.

* In **Project** tool window expand **app > java** folder.
* Right click on **com.mycompany.greeter (androidTest)** package. Please note that you have three packages named com.mycompany.greeter. You need to click on the one that has **androidTest** text.
* Select **New > Java Class** from the context menu.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0100_adding_new_class_to_test_package.png' alt='Add new class to the test package' class='isMax100PercentWide hasBorderShade90'>

You will be asked to enter the name for the class. Call it **MainActivityTests**, plural.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0110_name_the_test_class.png' alt='Name the test file' class='isMax100PercentWide hasBorderShade90'>

Android Studio will create a new class that will look like this:

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0120_test_class_created.png' alt='New class created' class='isMax100PercentWide hasBorderShade90'>

The class file will have the following code

```Java
package com.mycompany.greeter;

public class MainActivityTests {

}
```



## 3. Adding annotation to the test class

Add the `@RunWith(AndroidJUnit4.class)` annotation above the `MainActivityTests` class definition.

The class file will have the following code

```Java
package com.mycompany.greeter;

@RunWith(AndroidJUnit4.class)
public class MainActivityTests {

}
```

### Import missing package

You may see these error messages:

> Cannot find symbol class RunWith.

> Cannot resolve symbol 'AndroidJUnit4'.

To fix this error we need to import `import org.junit.runner.RunWith` and `import android.support.test.runner.AndroidJUnit4` packages by adding the following code
to the top of the test file.

```Java
import android.support.test.runner.AndroidJUnit4;
import org.junit.runner.RunWith;
```

I use a shortcut for importing missing packages in Android Studio.

* Put your cursor to the `RunWith` text in your code.
* Press **Alt + Enter** on Windows or **Option + Enter** on Mac.
* Select **Import Class** from the context menu.
* Do the same for `AndroidJUnit4` text.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0200_import_activity_instrumentation_test_case_2.png' alt='Import missing package shortcut' class='isMax100PercentWide hasBorderShade90'>

Your code will look like this:

```Java
package com.mycompany.greeter;
import android.support.test.runner.AndroidJUnit4;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class MainActivityTests {

}
```


## 4. Launching activity in tests

Just a reminder, our goal here is to test our android activity. This is done by adding the following code to the `MainActivityTests` class.

```Java
@Rule
public ActivityTestRule<MainActivity> mActivityRule =
    new ActivityTestRule<>(MainActivity.class);
```

The code we just added may look like a bit of magic. It actually is almost magic as it automatically launches `MainActivity` during the test.

You will also need to add the missing imports `import org.junit.Rule;` and `import android.support.test.rule.ActivityTestRule;`.



The full code for `MainActivityTests` looks like this:


```Java
package com.mycompany.greeter;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import org.junit.Rule;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class MainActivityTests {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule
        = new ActivityTestRule<>(MainActivity.class);
}
```


## 5. Write the first test

Excellent! We are done with all the preparations and can write our first test.

```Java
@Test
public void testGreet() {

}
```

You will need to add the missing dependency to the top of the test file `import org.junit.Test;`.

The test is empty for now and we will extend it later. Here is the full test code:

```Java
package com.mycompany.greeter;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class MainActivityTests {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule
            = new ActivityTestRule<>(MainActivity.class);

    @Test
    public void testGreet() {

    }
}
```



## 4. Run the test

Finally, let's run our first test.

* Select **Test in 'com.mycompany.greeter'** configuration from the dropdown located next to the **Run** button on the toolbar. If there is no test configuration please refer to the [previous part of tutorial](/blog/testing-activity-in-android-studio-tutorial-part-1/) and create it.
* Click **Run** button.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0400_run_test.png' alt='Run our first test' class='isMax100PercentWide hasBorderShade90'>

## 5. Check test results

If all went well you will see green light for the **testActivityExists** test in the Run window.You can open this window from **View > Tool Windows > Run** menu or by clicking on **Run** button in the bottom left corner.

<img src='/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0500_check_test_results.png' alt='Check results of the first test' class='isMax100PercentWide hasBorderShade90'>





## What's next?

Very nice! We have written our first test. Next we will write a test that will enter a name in the text input, tap the "Greet" button and verify the greeting message.

[Read part 3 of this tutorial](/blog/testing-activity-in-android-studio-tutorial-part-3/)


### Reference

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/), [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/) and [Part 3](/blog/testing-activity-in-android-studio-tutorial-part-3/) of this tutorial.
* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












