---
layout: blog_post
comments: true
title: "Testing activity in Android Studio. Part 3."
meta_description: "In this tutorial we'll learn how to write tests for Android activity and build an app in Android Studio."
tags: programming
---

This is the third and the final part of tutorial.

* In [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) we learned how to create a new project, add a test configuration and run the tests.

* In [the second part](/blog/testing-activity-in-android-studio-tutorial-part-2/) we created our first test.

Now we will write remaining tests and build the app in the process.

### How we build the app

Before we start writing our first UI test I want to describe our development process.

1. First, we write a test for a UI or logic that does not yet exist.
1. We expect to see build errors or failed tests.
1. Then we create a UI element or write program logic.
1. Finally, we run the test and make sure it passes.

This workflow is sometimes called **test-driven development**. Which means writing tests *before* creating the actual program.

### The Greeter app

Just to remind us again, our app will have three components:

1. An **EditText** where user enters name.
1. A "Greet" **Button**.
1. And a **TextView** that will show the greeting message.

Each control on the screen will have a unique ID. Those IDs will be used in our tests to get those controls and interact with them. The IDs are: `greet_edit_text`, `greet_button` and `message_text_view`.

<img src='/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0000_greeter_app_components_with_ids.png' alt='Components of the Greeter app with IDs' class='isMax100PercentWide hasBorderShade90'>








## 1. Create new test

Let's create a new test method. First, we get the activity object. Put this method into your `MainActivityTests` file which you created in the previous part of the tutorial.

```Java
public void testGreet() {
    MainActivity activity = getActivity();
}
```

At this stage your **MainActivityTests** file is the following:

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

    public void testGreet() {
        MainActivity activity = getActivity();
    }
}
```

Run the tests and watch them pass. Excellent!






## 2. Enter name into EditText

The test will enter name into a EditText control, which does not exist yet.
Let's get an **EditText** control by its ID `greet_edit_text`.

```Java
final EditText nameEditText =
    (EditText) activity.findViewById(R.id.greet_edit_text);
```

You will need to add this import statement to the top of the **MainActivityTests** file:

```Java
import android.widget.EditText;
```

Your `testGreet` method will look like this.

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    final EditText nameEditText =
        (EditText) activity.findViewById(R.id.greet_edit_text);
}
```

### Add EditText control to activity layout

You will notice an error for the `greet_edit_text` ID. That's because the EditText does not exist yet in our app layout. Let's create it.

* Expand **app > res > layout** folder in the Project tool window and open **content_main.xml** file.
* Switch main window from from **Design** to **Text** mode. You will see the XML markup for the layout.
* Remove automatically generated **TextView** element with "Hello world!" message.

<img src='/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0200_remove_hello_world_text_view.png' alt='Remove hello world from layout' class='isMax100PercentWide hasBorderShade90'>

* Add the following **ExitText** element between `RelativeLayout` opening and closing tags:

```html
<EditText
    android:id="@+id/greet_edit_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:inputType="textCapSentences"/>
```

Your `content_main.xml` will look like this:

```html
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.mycompany.greeter.MainActivity"
    tools:showIn="@layout/activity_main">

    <EditText
        android:id="@+id/greet_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:inputType="textCapSentences"/>

</RelativeLayout>
```

### Run the test

You will notice that the error in your test file is fixed now. Run the tests and they will pass. Very good!

### Enter text into the input

Now our test will enter a name into the **EditText** input.

* Switch back to **MainActivityTests** file.
* Add the following code to the end of the `testGreet` method.

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

1. Selects the text input by calling `nameEditText.requestFocus()` in the main thread of the app.
1. Waits for application to be idle: `waitForIdleSync()`.
1. Enters text "Jake" into the input: `sendStringSync("Jake")`.

If you are wondering why we need so much code and call `runOnMainSync`, `waitForIdleSync` methods you are not alone. I don't have a slightest idea.

The full `testGreet` method will be:

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    // Type name in text input
    // ----------------------

    final EditText nameEditText =
        (EditText) activity.findViewById(R.id.greet_edit_text);

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

### Run the test.

Let's run the tests and watch in amazement how it enters the text into the text field. Everything will be green. Great!



## 3. Tap "Greet" button

It is time to implement the "Greet" button. Let's start with the test, as usual.
Add the following code to the end of `testGreet` method:

```Java
Button greetButton =
    (Button) activity.findViewById(R.id.greet_button);

TouchUtils.clickView(this, greetButton);
```

This code does two things:

1. Gets a **Button** by its ID `greet_button`.
1. Taps the button.

Add the new imports to the top of the test file;

```Java
import android.test.TouchUtils;
import android.widget.Button;
```

This is the full code of **testGreet** method:

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    // Type name in text input
    // ----------------------

    final EditText nameEditText =
        (EditText) activity.findViewById(R.id.greet_edit_text);

    // Send string input value
    getInstrumentation().runOnMainSync(new Runnable() {
        @Override
        public void run() {
            nameEditText.requestFocus();
        }
    });

    getInstrumentation().waitForIdleSync();
    getInstrumentation().sendStringSync("Jake");
    getInstrumentation().waitForIdleSync();

    // Tap "Greet" button
    // ----------------------

    Button greetButton =
        (Button) activity.findViewById(R.id.greet_button);

    TouchUtils.clickView(this, greetButton);
}
```

The test will have one remaining error for the missing `greet_button` ID, which is expected.

### Add Button to activity layout

Switch back to **content_main.xml** file and add the following text **after** the **EditText** element:

```html
<Button
    android:id="@+id/greet_button"
    android:text="@string/greet_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@+id/greet_edit_text"
    android:layout_centerHorizontal="true" />
```

The full layout code will be:

```html
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.mycompany.greeter.MainActivity"
    tools:showIn="@layout/activity_main">

    <EditText
        android:id="@+id/greet_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:inputType="textCapSentences"/>

    <Button
        android:id="@+id/greet_button"
        android:text="@string/greet_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/greet_edit_text"
        android:layout_centerHorizontal="true" />

</RelativeLayout>
```

### Add button caption to string resources

You will notice that `@string/greet_button` attribute value looks red. This is the caption of the **Greet** button that is taken from the string resources and it is currently missing.

Add the button's caption text to the string resource file:

* Expand **app > res > values** in project window.
* Open **strings.xml** file.
* Add the following element after the last string element and before the closing `</resources>` tag.

```html
<string name="greet_button">Greet</string>
```

<img src='/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0300_add_string_resource.png' alt='Add string resource' class='isMax100PercentWide hasBorderShade90'>

The full contents of **string.xml** file will be the following:

```html
<resources>
    <string name="app_name">Greeter</string>
    <string name="action_settings">Settings</string>
    <string name="greet_button">Greet</string>
</resources>
```

### Run tests

Run the tests and see them pass. Well done!






## 4. Verify the greeting message

We are almost there. When user taps the "Greet" button the app will show the greeting message: "Hello, [name]!". The **[name]** part is replaced with the name that the user entered into the EditText input. We will write the test first and then implement this logic in the app.

Switch to **MainActivityTests** and add this code to the end of `testGreet` method.

```Java
TextView greetMessage =
    (TextView) activity.findViewById(R.id.message_text_view);

String actualText = greetMessage.getText().toString();
assertEquals("Hello, Jake!", actualText);
```

This code does the following:

1. Gets the **TextView** element by its ID `message_text_view`.
1. Obtains the text of the **TextView** element by calling `getText` method.
1. Calls `assertEquals` to compare the expected message "Hello, Jake!" with the actual message from the TextView.

You will need to add a new import to the top of the test file:

```Java
import android.widget.TextView;
```

The full `testGreet` method will be:

```Java
public void testGreet() {
    MainActivity activity = getActivity();

    // Type name in text input
    // ----------------------

    final EditText nameEditText =
        (EditText) activity.findViewById(R.id.greet_edit_text);

    // Send string input value
    getInstrumentation().runOnMainSync(new Runnable() {
        @Override
        public void run() {
            nameEditText.requestFocus();
        }
    });

    getInstrumentation().waitForIdleSync();
    getInstrumentation().sendStringSync("Jake");
    getInstrumentation().waitForIdleSync();

    // Tap "Greet" button
    // ----------------------

    Button greetButton =
        (Button) activity.findViewById(R.id.greet_button);

    TouchUtils.clickView(this, greetButton);

    // Verify greet message
    // ----------------------

    TextView greetMessage = (TextView) activity.findViewById(R.id.message_text_view);
    String actualText = greetMessage.getText().toString();
    assertEquals("Hello, Jake!", actualText);
}
```

Everything should be fine, the only problem is that `message_text_view` ID is missing.

### Add the greeting TextView

Switch to **content_main.xml** and add the following text **after** the Button element:

```html
<TextView
    android:id="@+id/message_text_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_below="@id/greet_button"
    android:gravity="center"
    android:textSize="30sp"/>
```

The full layout code will be:

```html
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.mycompany.greeter.MainActivity"
    tools:showIn="@layout/activity_main">

    <EditText
        android:id="@+id/greet_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:inputType="textCapSentences"/>

    <Button
        android:id="@+id/greet_button"
        android:text="@string/greet_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/greet_edit_text"
        android:layout_centerHorizontal="true" />

    <TextView
        android:id="@+id/message_text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/greet_button"
        android:gravity="center"
        android:textSize="30sp"/>

</RelativeLayout>
```

### Run the tests and fail

Run the test and notice how `testGreet` fails. We can find the following in the Run tool window:

1. Failure reason: `expected:<[Hello, Jake!]> but was:<[]>`
1. Failure location: `MainActivityTests.java`.

<img src='/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0400_run_test_failed.png' alt='Run tests and fail' class='isMax100PercentWide hasBorderShade90'>

Click on failure location link (MainActivityTests.java) and it will bring us to this line in the **MainActivityTests** file:

```Java
assertEquals("Hello, Jake!", actualText);
```

The test failed because we have not implemented the output of the greeting message in the app yet. That message stays empty instead of showing the greeting text. Let's fix it.








## 5. Greeting message logic implementation

There is just one thing left to be done. Let's remind us again what the app does. When the user taps the "Greet" button, the app shows a greeting message. We now need to write code that is executed when the user taps the "Greet" button.

* Open **content_main.xml** file.
* Add `android:onClick="didTapGreetButton"` attribute to the **Button** element.

The button element will look like:

```html
<Button
    android:id="@+id/greet_button"
    android:text="@string/greet_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@+id/greet_edit_text"
    android:layout_centerHorizontal="true"
    android:onClick="didTapGreetButton"/>
```

The full layout code will be the following:

```html
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.mycompany.greeter.MainActivity"
    tools:showIn="@layout/activity_main">

    <EditText
        android:id="@+id/greet_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:inputType="textCapSentences"/>

    <Button
        android:id="@+id/greet_button"
        android:text="@string/greet_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/greet_edit_text"
        android:layout_centerHorizontal="true"
        android:onClick="didTapGreetButton"/>

    <TextView
        android:id="@+id/message_text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/greet_button"
        android:gravity="center"
        android:textSize="30sp"/>

</RelativeLayout>
```

You will see that **didTapGreetButton** is highlighted and reports this error message:

> Cannot resolve symbol 'didTapGreetButton'...

### Implement didTapGreetButton method

We will now implement the last bit of code. It will be the `didTapGreetButton` method that will show the greeting message.

* Expand **app > java > com.mycompany.greeter** module. Note that this time we are editing the app's main module and not the test one.
* Open **MainActivity** class.
* Add the following method to it.

```Java
public void didTapGreetButton(View view) {
  EditText greetEditText =
      (EditText) findViewById(R.id.greet_edit_text);

  String name = greetEditText.getText().toString();
  String greeting = String.format("Hello, %s!", name);

  TextView messageTextView =
      (TextView) findViewById(R.id.message_text_view);

  messageTextView.setText(greeting);
}
```

This `didTapGreetButton` method does the following:

1. First, it finds **EditText** element by ID `greet_edit_text`.
1. Gets the text from the input.
1. Next, it constructs the greeting message with the format "Hello, %s!".
1. Finds the **TextView** by its ID `message_text_view`.
1. And finally, shows the greeting message in the text view by calling `setText` method.

Add these missing imports to the top of the **MainActivity** file.

```Java
import android.widget.EditText;
import android.widget.TextView;
```

### Run the tests and the app

If we run the tests they should all pass. Next, try running the app and see it working. Let’s tell the boss!

<img src='/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0500_finished_app_screen.png' alt='Run the app' class='isMax100PercentWide hasBorderShade90'>


If anything went wrong, please refer to the [sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android).





## Miracles of programming

Now isn't it amazing? I find it truly remarkable each time I run the app for the first time after doing test-driven development. The app grows naturally as if it's just a by-product of our tests process.






## Reference

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/), [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/) and [Part 3](/blog/testing-activity-in-android-studio-tutorial-part-3/) of this tutorial.
* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












