---
layout: blog_post
layout_class: Content--hasImagesWithBorder
title: "Testing activity in Android Studio. Part 3."
meta_description: "In this part we'll learn how to write tests for Android activity and build an app in Android Studio."
tags: programming
---

This is the third and final part of tutorial.

* In [the first part](/blog/testing-activity-in-android-studio-tutorial-part-1/) we learned how to create a new project, add a test configuration and run the tests.

* In [the second part](/blog/testing-activity-in-android-studio-tutorial-part-2/) we created our first test.

Now we will write remaining tests and build the UI for the app.

### How we build the app

Before we start writing our first UI test I want to describe our development process.

1. First, we write a test for a UI or logic that does not exist.
1. The project has build errors or the test fails.
1. Then we create a UI element or write program logic.
1. Finally, we run the test and make sure it passes.

This workflow is called by theorists **test-driven development**. Which means writing tests *before* creating the actual program.

### The Greeter app

Just to remind you, our app will have three components:

1. An **EditText** where user enters name.
1. A "Greet" **Button**.
1. And a **TextView** that will show the greeting message.

Each control on the screen will have a unique ID. Those IDs will be used in our tests to get those controls and interact with them. The IDs are: `greet_edit_text`, `greet_button` and `message_text_view`.

![Components of the Greeter app with IDs](/image/blog/2015-04-05-testing-activity-in-android-studio-tutorial-part-3/0000_greeter_app_components_with_ids.png)


## 1. Create new test

Let's create a new test method. First thing, we get activity object.

```Java
public void testGreet() {
    MainActivity activity = getActivity();
}
```

## 2. Get EditText control by ID

Next, we'll to get an **EditText** control. We will enter user name into it later.
The ID of the text input will be `greet_edit_text`.

```Java
final EditText nameEditText = (EditText) activity.findViewById(R.id.greet_edit_text);
```

We will need to import `import android.widget.EditText;`

## Other parts

* [Part 1](/blog/testing-activity-in-android-studio-tutorial-part-1/)
* [Part 2](/blog/testing-activity-in-android-studio-tutorial-part-2/)

## Reference

* [Sample Code for the Greeter app](https://github.com/evgenyneu/greeter-android)
* [Building Your First App - Android Developers](https://developer.android.com/training/basics/firstapp/index.html)












