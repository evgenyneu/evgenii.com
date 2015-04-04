---
layout: blog_post
layout_class: Content--hasImagesWithBorder
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

![Components of the Greeter app](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0000_greeter_app_components.png)






## 1. Create a test class

Let's start by adding a new class to the test package.

* In **Project** tool window expand **app > java** folder.
* Right click on **com.mycompany.greeter (androidTest)** package. Please note that you have two packages named com.mycompany.greeter. You need to click on the one that has **androidTest** text.
* Select **New > Java Class** from the context menu.

![Add new class to the test package](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0100_adding_new_class_to_test_package.png)

You will be asked to enter the name for the class. Call it **MainActivityTests**.

![Name the test file](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0110_name_the_test_class.png)

Android Studio will create a new class that will look like this:

![New class created](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0120_test_class_created.png)

The class file will have the following code

```Java
package com.mycompany.greeter;

public class MainActivityTests {

}
```





## 2. Extend class for testing Android activity

In order to test Android activity we need to extend the `MainActivityTests` class with `ActivityInstrumentationTestCase2` sub-class.

```Java
public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {

}
```

As you can see `ActivityInstrumentationTestCase2` is a generic class. We used `MainActivity` as its type parameter. You have already created `MainActivity` class in [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) of this tutorial.

### Import missing package

You may see this error message:

> Can not resolve symbol 'ActivityInstrumentationTestCase2'.

To fix this error we need to import `android.test.ActivityInstrumentationTestCase2` package by adding the following line
to the top of the test file.

```Java
import android.test.ActivityInstrumentationTestCase2;
```

I use a shortcut for importing missing packages in Android Studio.

* Put your cursor to the `ActivityInstrumentationTestCase2` text in your code.
* Press **Alt + Enter** on Windows or **Option + Enter** on Mac.
* Select **Import Class** from the context menu.

![Import missing package shortcut](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0200_import_activity_instrumentation_test_case_2.png)

Your code will look like this:

```Java
package com.mycompany.greeter;
import android.test.ActivityInstrumentationTestCase2;

public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {

}
```

### Add missing constructor

There is just one problem left to fix before we can write our test.

> There is no default constructor available in 'android.test.ActivityInstrumentationTestCase2'.

It can be fixed by adding the following constructor:

```Java
public MainActivityTests() {
    super(MainActivity.class);
}
```

Here is the full code:

```Java
package com.mycompany.greeter;
import android.test.ActivityInstrumentationTestCase2;

public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {
    public MainActivityTests() {
        super(MainActivity.class);
    }
}
```





## 3. Write the first test

At last, we are done with all the preparations and can write our first test.

```Java
public void testActivityExists() {
    MainActivity activity = getActivity();
    assertNotNull(activity);
}
```

The test does two things:

1. `MainActivity activity = getActivity();` gets a `MainActivity` object.
1. `assertNotNull(activity);` verifies existence of that object.

Here is the full test code:

```Java
package com.mycompany.greeter;
import android.test.ActivityInstrumentationTestCase2;

public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {
    public MainActivityTests() {
        super(MainActivity.class);
    }

    public void testActivityExists() {
        MainActivity activity = getActivity();
        assertNotNull(activity);
    }
}
```

### What's the purpose of this test?

The test verifies that we configured our app and test code correctly. In later tests we will be interacting with our `MainActivity` and I think it's good to have some confidence in its existence early in the game.





## 4. Run the test

Finally, let's run our first test.

* Select **Test in 'com.mycompany.greeter'** configuration from the dropdown located next to the **Run** button on the toolbar.
* Click **Run** button.

![Run our first test](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0400_run_test.png)

If you do not see the test configuration please refer to the [previous part of tutorial](/blog/testing-activity-in-android-studio-tutorial-part-1/) and create it.

## 5. Check test results

If all went well you will see green light for the **testActivityExists** test in the Run window. You can open this window from **View > Tool Windows > Run** menu or by clicking on **Run** button in the bottom left corner.

![Check results of the first test](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0500_check_test_results.png)





## What's next?

In the third part of this tutorial we will write a test that will enter a name in the text input, tap the "Greet" button and verify the greeting message.




### Reference

* [Part 1 of this tutorial](/blog/testing-activity-in-android-studio-tutorial-part-1/)
* [Sample Code for the Greet app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












