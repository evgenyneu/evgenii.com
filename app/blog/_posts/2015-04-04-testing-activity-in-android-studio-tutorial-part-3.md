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

Let's create a new test method. First, we get the activity object. Put this method into your `MainActivityTests` file which you crated in the previous part of the tutorial.

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

1. Selects the text input by calling `nameEditText.requestFocus()` in the main thread of the app.
1. Waits for application to be idle: `waitForIdleSync()`.
1. Enters text "Jake" into the input: `sendStringSync("Jake")`.

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





## 3. Tap "Greet" button

It is time to implement the "Greet" button. Let's start with the test, as usual.
Add the following code to the end of `testGreet` method:

```Java
Button greetButton = (Button) activity.findViewById(R.id.greet_button);
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
    getInstrumentation().waitForIdleSync();

    // Tap "Greet" button
    // ----------------------

    Button greetButton = (Button) activity.findViewById(R.id.greet_button);
    TouchUtils.clickView(this, greetButton);
}
```

The test will have one remaining error for the missing `greet_button` ID, which is expected.

### Add Button to activity layout

Switch back to **activity_main.xml** file and add the following text **after** the **EditText** element:

```XML
<Button
    android:id="@+id/greet_button"
    android:text="@string/greet_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@+id/greet_edit_text"
    android:layout_centerHorizontal="true" />
```

The full layout code will be:

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

You will notice that `@string/greet_button` is marked red. This is the caption of the **Greet** button that is taken from the string resource and it's currently missing. Add the button caption text to the string resource file:

* Expand **app > res > values** in project window.
* Open **string.xml** file
* Add the following element after the last string element and before the closing `</resources>` tag.

```XML
<string name="greet_button">Greet</string>
```

![Add string resource](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0300_add_string_resource.png)

### Run tests

Run the tests and see them pass. Well done.






## 4. Verify the greeting message

We are almost there. When user taps the "Greet" button the app will show the greeting message: "Hello, [name]!". Where the **[name]** part is replaced with the name that the user entered into the EditText input. We will write the test first and then implement this logic in the app.

Switch to **MainActivityTests** and add this code to the end of `testGreet` method.

```Java
TextView greetMessage = (TextView) activity.findViewById(R.id.message_text_view);
String actualText = greetMessage.getText().toString();
assertEquals("Hello, Jake!", actualText);
```

This code does two things:

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
    getInstrumentation().waitForIdleSync();

    // Tap "Greet" button
    // ----------------------

    Button greetButton = (Button) activity.findViewById(R.id.greet_button);
    TouchUtils.clickView(this, greetButton);

    // Verify greet message
    // ----------------------

    TextView greetMessage = (TextView) activity.findViewById(R.id.message_text_view);
    String actualText = greetMessage.getText().toString();
    assertEquals("Hello, Jake!", actualText);
}
```

Everything should be fine with the test except the missing `message_text_view` ID.

### Add the greeting TextView

Switch to **activity_main.xml** and add the following text **after** the Button element:

```XML
<TextView
    android:id="@+id/message_text_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_below="@id/greet_button"
    android:gravity="center"
    android:textSize="30sp"/>
```

The full layout code will be:

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

Run the test and you will that `testGreet` has failed. The Run tool window where we can find the following:

1. Failure reason: `expected:<[Hello, Jake!]> but was:<[]>`
1. Failure location: `MainActivityTests.java:49`.

![Run tests and fail](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0400_run_test_failed.png)

Click on failure location link and it will bring us to this line:

```Java
assertEquals("Hello, Jake!", actualText);
```

The test failed because we have not implemented the output of the greeting message in the app yet and the message stays empty. Let's do it now.








## 5. Greeting message logic implementation

There is just one thing left to be done. Let's remind us what the app does. When the user taps the "Greet" button, the app shows a greeting message. We now need to write code that is executed when the user taps the "Greet" button.

* Open **activity_main.xml** file.
* Add `android:onClick="didTapGreetButton"` attribute to **Button** element.

The button element will look like:

```XML
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

You will see that **didTapGreetButton** is highlighted with an error message:

> Method didTapGreetButton is missing in 'MainActivity'...

### Implement didTapGreetButton method

We will implement the `didTapGreetButton` method that will show the greeting message.

* Expand **app > java > com.mycompany.greeter** module.
* Open **MainActivity** class.
* Add the following method.

```Java
public void didTapGreetButton(View view) {
  EditText greetEditText = (EditText) findViewById(R.id.greet_edit_text);
  String name = greetEditText.getText().toString();
  String greeting = String.format("Hello, %s!", name);

  TextView messageTextView = (TextView) findViewById(R.id.message_text_view);
  messageTextView.setText(greeting);
}
```

This `didTapGreetButton` method does the following:

1. First, it finds **EditText** element by ID `greet_edit_text`.
1. Gets the text from the input.
1. Next, it constructs the greeting message with the format "Hello, %s!".
1. Finds the **TextView** by its ID `message_text_view`.
1. And finally, sets the greeting message into the text view by calling `setText` method.

Add these missing imports to the top of **MainActivity** file.

```Java
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
```

### Run the tests and the app

If we run the tests they should pass. Next, try running the app and see it working. Let’s tell the boss!

![Run the app](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0500_finished_app_screen.png)







## Miracles of programming

Now isn't it amazing? I find it truly remarkable each time I run the app for the first time after doing test-driven development. The app grew naturally as if it was a by-product of our tests process. From my experience the apps tend to be very stable and robust when they are built this way.






## Reference

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/), [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/) and [Part 3](/blog/testing-activity-in-android-studio-tutorial-part-3/) of this tutorial.
* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












