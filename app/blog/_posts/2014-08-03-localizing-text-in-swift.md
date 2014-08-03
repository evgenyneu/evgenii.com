---
layout: blog_post
title: "Localizing text in Swift code"
meta_description: "Tutorial about localizing a text in Swift code."
tags: programming
---

This tutorial explains how to translate text in your Swift code to a different language.

Suppose you have a text string in your .swift code:

```swift
label.text = "Flat White"
```

It is easy to internationalize it with `NSLocalizedString` function:

```swift
NSLocalizedString("Flat White", comment: "Coffee order name")
```

The `comment` will be passed along with the text to translators. It is useful for describing the meaning of the text and/or the context it is used in.

## Exporting project for translation

Choose `Editor` > `Export for Localization...` menu when project is selected in Project Navigator. The text will be exported to `en.xliff` file.

## Translating `.xliff` file

Let's say we want to add a Japanese translation.

1. Copy `en.xliff` file to `jp.xliff`.
1. Open the file and add a `target-language="jp"` attribute to all the `<file>` elements.

  ```xml
  <file
  original="project/InfoPlist.strings"
  source-language="en"
  target-language="jp"
  datatype="plaintext">
  ```

3. Add `<target>` element with translated text under the English `<source>` element:

  ```xml
  <trans-unit id="Flat White">
      <source>Flat White</source>
      <target>フラットホワイト</target>
      <note>Coffee order name</note>
  </trans-unit>
  ```

## Importing traslation back into the project

Use `Editor` > `Import Localizations...` menu and choose the `jp.xliff` file.

## Finally, test the app with a different language

1. Go to `Product` > `Scheme` > `Edit Scheme...`
1. Choose a language form `Application Language` drop down.
1. Run your app.

## Replacing parts of localized text

Use `String.localizedStringWithFormat` function to replace parts of the localized text.

```swift
String.localizedStringWithFormat(
  NSLocalizedString("My name is %@. I am %d years old",
    comment: "Greeting"), name, age)

```

## Reference

* [Localizing with Xcode 6](https://developer.apple.com/videos/wwdc/2014/?id=412): WWDC 2014 session video

