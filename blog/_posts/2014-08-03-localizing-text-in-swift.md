---
layout: blog_post
comments: true
title: "Localizing text in Swift code"
meta_description: "This tutorial shows how to localize text and prepare it for translation in an iOS app with Swift and Xcode."
tags: programming
---

In this tutorial I want to show how to translate a text string in Swift code file to a different language.

Suppose you have an English text string in your .swift code:

```Swift
let text = "Flat White"
```

The text can be internationalized with `NSLocalizedString` function:

```Swift
let text = NSLocalizedString("Flat White", comment: "Coffee order name")
```

The `comment` will be passed along with the text to translators. It is useful for describing the meaning of the text and/or the context it is used in.

I really like that we still have our original text "Flat White" in the code file instead of using identifiers. Thank you, Apple, I think this is more readable.

## Exporting project for translation

Now let's say we want to translate our project from English to Japanese. Choose `Editor` > `Export for Localization...` menu when project is selected in Project Navigator. The text will be exported to `en.xliff` file.

## Translating `.xliff` file

1. Copy `en.xliff` file to `jp.xliff`.
1. Open the file and add a `target-language="jp"` attribute to all the `<file>` elements.

  ```Xml
  <file
  original="project/InfoPlist.strings"
  source-language="en"
  target-language="jp"
  datatype="plaintext">
  ```

3. Add `<target>` element with translated text under the English `<source>` element:

  ```Xml
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

Often we want to replace the parts of the text string with dynamic values when the app is running. It can be done with `String.localizedStringWithFormat` function.

```Swift
String.localizedStringWithFormat(
  NSLocalizedString("My name is %@. I am %d years old.",
    comment: "Greeting"), name, age)

```


Translator can change the order in which the populated arguments are copied into the string.

`I am %$2@ years old and my name is %$1@.`

## Localizing lower and upper case text

Here is how to change the case of a string according to local rules.

```Swift
"istanbul".localizedCapitalized
// In Turkish: "İstanbul"

"İstanbul".localizedLowercase
// In Turkish: "istanbul"

"istanbul".localizedUppercase
// In Turkish: "İSTANBUL"
```



## Reference

* [Localizing with Xcode 6](https://developer.apple.com/videos/play/wwdc2014-412/): WWDC 2014 session video

* [What's New in Internationalization](https://developer.apple.com/videos/play/wwdc2015-227/): WWDC 2015 session video

* [About Internationalization and Localization](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html): iOS Developer Library.

* [Localizing numbers, date, time and names in iOS / Swift](/blog/localizing-numbers-date-time-and-names-in-ios-with-swift/)

* [Supporting right-to-left languages in iOS / Swift](/blog/supporting-right-to-left-languages-in-ios-with-swift/)



