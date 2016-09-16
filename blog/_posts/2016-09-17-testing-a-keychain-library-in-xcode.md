---
layout: blog_post
comments: true
title: "How to setup testing of a keychain library in Xcode 8 and iOS 10"
meta_description: "This articles shows how to setup Xcode 8 to allow testing a Keychain library."
tags: programming
---

The testing of Keychain code has never been harder than in Xcode 8 and iOS 10. A Keychain is a secure storage in Apple devices used for keeping small bits of information like passwords. This tutorial shows *thirteen easy steps* that I needed to go through to make the unit tests work in my [keychain library](https://github.com/marketplacer/keychain-swift).

## 1. Turn on signing in the app target


1. Open the *General* tab in your **app** target.
1. Turn on *Automatically Manage Signing* and select your team in the *Signing* section.

<img src='/image/blog/2016-09-17-testing-a-keychain-library-in-xcode/01_enable_keychain_demo_app.png' alt='Enable keychain sharing in app target in Xcode' class='isMax100PercentWide hasBorderShade90'>


## 2. Turn on the Keychain Sharing

1. Open the *Capabilities* tab in your **app** target.
1. Turn on the *Keychain Sharing*.

<img src='/image/blog/2016-09-17-testing-a-keychain-library-in-xcode/02_enable_keychain_sharing_xcode.png' alt='Turn on keychain sharing in app target in Xcode' class='isMax100PercentWide hasBorderShade90'>


## 3. Finally, configure the test target

1. Open the *General* tab in your **test** target.
1. Select your app in the *Host Application*.
1. Turn on *Automatically Manage Signing* and select your team.

<img src='/image/blog/2016-09-17-testing-a-keychain-library-in-xcode/03_running_tests_keychain_xcode_8.png' alt='Enable keychain testing in Xcode' class='isMax100PercentWide hasBorderShade90'>

