---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Testing activity in Android Studio. Part 3."
meta_description: "In this part we'll learn how to write tests for Android activity and build an app in Android Studio."
tags: programming
---

This is the third and the final part of tutorial.

* In [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) we learned how to create a new project, add a test configuration and run the tests.

* In [the second part](/blog/testing-activity-in-android-studio-tutorial-part-2/) we created our first test.

Now we will write remaining tests and build the UI for the app.

### How we build the app

Before we start writing our first UI test I want to describe our development process.

1. First, we write a test for a UI or logic that does not yet exist.
1. We expect to see build errors or failed test.
1. Then we create a UI element or write program logic.
1. Finally, we run the test and make sure it passes.

This workflow is sometimes called **test-driven development**. Which means writing tests *before* creating the actual program.

### The Greeter app

Just to remind us again, our app will have three components:

1. An **EditText** where user enters name.
1. A "Greet" **Button**.
1. And a **TextView** that will show the greeting message.

Each control on the screen will have a unique ID. Those IDs will be used in our tests to get those controls and interact with them. The IDs are: `greet_edit_text`, `greet_button` and `message_text_view`.

![Components of the Greeter app with IDs](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0000_greeter_app_components_with_ids.png)


## 1. Create new test

Let's create a new test method. First, we get the activity object. Put this method into your `MainActivityTests` file which you crated in the previour part of the tutorial.

```Java
public void testGreet() {
    MainActivity activity = getActivity();
}
```

Run the test and watch it pass. Excellent.

## 2. Enter name into EditText

The test will enter name into a EditText control, which does not exist yet.
Let's get an **EditText** control by its ID `greet_edit_text`.

```Java
final EditText nameEditText = (EditText) activity.findViewById(R.id.greet_edit_text);
```

You will need add the import statement to the top of your test file: `import android.widget.EditText;` Your `testGreet` method will look like this.

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    final EditText nameEditText = (EditText) activity.findViewById(R.id.greet_edit_text);
}
```

### Add EditText control to activity layout

You will notice an error for `greet_edit_text` ID text. That's because the EditText does not exist yet. Let's create it.

* Expand **app > res > layout** folder in the Project tool window and open **activity_main.xml** file.
* Switch main window from from **Design** to **Text** mode. You will see the XML markup for the layout.
* Remove automatically generated **TextView** element with "Hello world!" message.

![Remove_hello_world_from_layout](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0200_remove_hello_world_text_view.png)

* Add the following **ExitText** element:

```XML
<EditText
    android:id="@+id/greet_edit_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:inputType="textCapSentences"/>
```

Your `activity_main.xml` will look like this:

```XML
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="16dp"
    android:paddingRight="16dp"
    android:paddingTop="16dp"
    android:paddingBottom="16dp"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/greet_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:inputType="textCapSentences"/>

</RelativeLayout>
```

### Run the test

You will notice that your test no longer has errors. Run the tests and they will pass. Very good!

### Enter text into the input

Now our test will enter a name into the **EditText** input. Switch back to **MainActivityTests** file and add the following code to the end of the `testGreet` method.

```Java
getInstrumentation().runOnMainSync(new Runnable() {
    @Override
    public void run() {
        nameEditText.requestFocus();
    }
});

getInstrumentation().waitForIdleSync();
getInstrumentation().sendStringSync("Jake");
```

This is what this code does:

1. Select the text input by calling `nameEditText.requestFocus()` in the main thread of the app.
1. Wait for application to be idle: `waitForIdleSync()`.
1. Enter text "Jake" into the input: `sendStringSync("Jake")`.

If you are wondering why we need so much code and call `runOnMainSync`, `waitForIdleSync` methods you are not alone. I don't have a slightest idea. That's the code Google suggests using for entering text into text inputs from the tests.

The full `testGreet` method will be:

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    // Type name in text input
    // ----------------------

    final EditText nameEditText = (EditText) activity.findViewById(R.id.greet_edit_text);

    // Send string input value
    getInstrumentation().runOnMainSync(new Runnable() {
        @Override
        public void run() {
            nameEditText.requestFocus();
        }
    });

    getInstrumentation().waitForIdleSync();
    getInstrumentation().sendStringSync("Jake");
}
```


## Other parts of this tutorial

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/)
* [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/)

## Reference

* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












