---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Testing activity in Android Studio. Part 2."
meta_description: "This is part 2 of the tutorial that shows how to write tests for Android activity in Android Studio."
tags: programming
---

This is the second part of the two-part series. In [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) we learned how to create a new project, add a test configuration and run the tests.

Now we will write some code. We will be using test-driven development approach (called TDD). We will build the app by first writing the tests and then implementing the actual app functionality.

### The Greeter app

The app we are building will have three components:

1. An **EditText** where user enters name.
1. A "Greet" **Button**.
1. And a **TextView** that will show the greeting message.

![Components of the Greeter app](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0000_greeter_app_components.png)

## 1. Create a test class

Let's start by adding a new class to the test package.

* In **Porject** tool window expand **app > java** folder
* Right click on **com.mycompany.greeter (androidTest)** package. Please note that you will have two packages named com.mycompany.greeter. You will need to click on the one that has **androidTest** text.
* Select **New > Java Class** from the context menu.

![Add new class to the test package](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0100_adding_new_class_to_test_package.png)

You will be asked to enter the name for the class. Call it **MainActivityTests**.

![Name the test file](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0110_name_the_test_class.png)

Android Studio will create a new class that will look like this:

![New class created](/image/blog/2015-04-04-testing-activity-in-android-studio-tutorial-part-2/0120_test_class_created.png)

The class will have the following code

```Java
package com.mycompany.greeter;

public class MainActivityTests {
}
```

### 2. Extend class for testing Android activity

In order to test Android activity we need to extend the `MainActivityTests` class with `ActivityInstrumentationTestCase2` sub-class.

```Java
public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {
}
```

As you can see `ActivityInstrumentationTestCase2` is a generic class. We used `MainActivity` as its type parameter. You created `MainActivity` class in [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) of this tutorial.

### Import missing package

You may see this error message: **Can not resolve symbol 'ActivityInstrumentationTestCase2'**. To fix this error we need to import `android.test.ActivityInstrumentationTestCase2` package. Add the following line
to the top of your file.

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

### Add missing constuctor

There is just one problem left to fix:

**There is no default constructor available in 'android.test.ActivityInstrumentationTestCase2'**.

It can be fixed by adding the following constructor:

```Java
public MainActivityTests() {
    super(MainActivity.class);
}
```

You code will look like this:

```Java
package com.mycompany.greeter;
import android.test.ActivityInstrumentationTestCase2;

public class MainActivityTests extends ActivityInstrumentationTestCase2<MainActivity> {
    public MainActivityTests() {
        super(MainActivity.class);
    }
}
```
















