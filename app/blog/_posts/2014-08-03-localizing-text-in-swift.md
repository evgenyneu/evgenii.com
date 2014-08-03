---
layout: blog_post
title: "Localizing text in Swift code"
meta_description: "Tutorial about localizing a text in Swift code."
tags: programming
---

In this tutorial I want to show how to translate text in Swift code file to a different language.

Suppose you have a text string in your .swift code:

```swift
label.text = "Flat White"
```

The text can be internationalized with `NSLocalizedString` function:

```swift
NSLocalizedString("Flat White", comment: "Coffee order name")
```

The `comment` will be passed along with the text to translators. It is useful for describing the meaning of the text and/or the context it is used in.

I really like that we still have our original text "Flat White" in the code file instead of using identifiers which can be less readable.

## Exporting project for translation

Let's say we want to translate the text from English to Japanese. Choose `Editor` > `Export for Localization...` menu when project is selected in Project Navigator. The text will be exported to `en.xliff` file.

## Translating `.xliff` file

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

Often we want to replace the parts of the text string with dynamic values when the app is running. We can use `String.localizedStringWithFormat` function to do that.

```swift
String.localizedStringWithFormat(
  NSLocalizedString("My name is %@. I am %d years old",
    comment: "Greeting"), name, age)

```

## Reference

* [Localizing with Xcode 6](https://developer.apple.com/videos/wwdc/2014/?id=412): WWDC 2014 session video

