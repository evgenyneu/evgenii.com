---
layout: blog_post
comments: true
title: "How to share Keychain between iOS apps"
meta_description: "This tutorial shows how to share keychain items between different apps on iOS, OS X, tvOS and watchOS."
tags: programming
---

Keychain is a secure storage suitable for short bits of sensitive information like passwords or credit card numbers. By default the data saved in one app can not be read in other apps. In most cases this is exactly what we need.

However, sometimes we need to share Keychain items between multiple apps on the same device. For instance, suppose we created two apps where users can log into the same account. It would be nice to have ability to share the login information between these apps. This way the user will only need to log in once in one of the apps.

Fortunately, there is a way to share Keychain items between apps and it can be done by using *Keychain Groups*. Here is how to do it. The following steps need to be done **in all apps** where you want to share the Keychain items.

## 1) Turn on Keychain sharing in Xcode

1. Select your app target and click *Capabilities* tab.
2. Turn on the *Keychain Sharing* capability.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0020_keychain_shaing_opions.png' alt='Turn on Keychain sharing in Xcode' class='isMax100PercentWide hasBorderShade90'>


## 2) Select developer team

<div class='isTextCentered'>
  <img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0030_select_developer_team.png' alt='Select developer team to enable Keychain sharing' class='isMax400PxWide hasBorderShade90'>
</div>

## 3) Specify Keychain group name

Expand the *Keychain Sharing* capability settings and you will see your app's bundle ID used as the keychain group. You may want to change it to something meaningful to you, for example **myKeychainGroup1**. Remember the group you entered because you will use it in the code later.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0023_specify_keychain_access_group_name_xcode.png' alt='Specify Keychain access group name in Xcode' class='isMax100PercentWide hasBorderShade90'>


## 4) App ID Prefix and Keychain group name

Knowing the group name you entered is not enough for sharing the Keychain. You also need to know your *App ID Prefix* which is added to the beginning of the group name. In order to see how it works click on the *.entitlements* file and look at the value of the *Keychain Access Groups* array.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0033_app_id_prefix_entitlements.png' alt='App ID prefix in entitlements file' class='isMax100PercentWide hasBorderShade90'>

You will notice that the access group value has the form of `$(AppIdentifierPrefix)myKeychainGroup1`. The `$(AppIdentifierPrefix)` part will be replaced by your App ID Prefix. The problem is that at this stage we probably have no clue what it is, but we will soon find out.

## 5) What is my App ID Prefix?

The App ID Prefix (also called Team ID) is a unique text identifier associated with your Apple developer account that allows to share keychain and pasteboard items between your apps. Here is how to find what it is:

* Login to you Apple developer account (also known as *Member Center*) [developer.apple.com/account](https://developer.apple.com/account).
* Open the **Certificates, Identifiers & Profiles** page.
* Tap the **App IDs** link under **Identifiers**.
* Tap on an existing app ID or create a new one and you will find an App ID prefix there.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0050_determine_app_id_prefix_developer_account.png' alt='Determine App ID Prefix' class='isMax100PercentWide hasBorderShade90'>

Now you know your App ID prefix and the full Keychain access group name will look like this:

```
AB123CDE45.myKeychainGroup1
```


## 6) Accessing shared Keychain items

We have enabled the Keychain sharing and found out the keychain group name. Now we can delete, add and retrieve shared Keychain items. To work with Keychain you can use one of many Keychain libraries that support access groups ([Keychain Swift](https://github.com/marketplacer/keychain-swift) is one). But here I will show how to do it directly using the built-in Keychain API. The main rule is to pass the access group name with the `kSecAttrAccessGroup` query key into `SecItemAdd`, `SecItemDelete` and `SecItemCopyMatching` functions.

### Delete a shared Keychain item

```Swift
let itemKey = "My key"
let itemValue = "My secretive bee 🐝"
let keychainAccessGroupName = "AB123CDE45.myKeychainGroup1"

let queryDelete: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey as AnyObject,
  kSecAttrAccessGroup as String: keychainAccessGroupName as AnyObject
]

let resultCodeDelete = SecItemDelete(queryDelete as CFDictionary)

if resultCodeDelete != noErr {
  print("Error deleting from Keychain: \(resultCodeDelete)")
}
```

### Add a shared Keychain item

```Swift
guard let valueData = itemValue.data(using: String.Encoding.utf8) else {
  print("Error saving text to Keychain")
  return
}

let queryAdd: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey as AnyObject,
  kSecValueData as String: valueData as AnyObject,
  kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlocked,
  kSecAttrAccessGroup as String: keychainAccessGroupName as AnyObject
]

let resultCode = SecItemAdd(queryAdd as CFDictionary, nil)

if resultCode != noErr {
  print("Error saving to Keychain: \(resultCode)")
}
```

### Find a shared Keychain item

```Swift
let queryLoad: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey as AnyObject,
  kSecReturnData as String: kCFBooleanTrue,
  kSecMatchLimit as String: kSecMatchLimitOne,
  kSecAttrAccessGroup as String: keychainAccessGroupName as AnyObject
]

var result: AnyObject?

let resultCodeLoad = withUnsafeMutablePointer(to: &result) {
  SecItemCopyMatching(queryLoad as CFDictionary, UnsafeMutablePointer($0))
}

if resultCodeLoad == noErr {
  if let result = result as? Data,
    let keyValue = NSString(data: result,
                            encoding: String.Encoding.utf8.rawValue) as? String {

    // Found successfully
    print(keyValue)
  }
} else {
  print("Error loading from Keychain: \(resultCodeLoad)")
}
```

## How secure is Keychain sharing?

A couple of people asked me if it is possible for apps from other developers to access the Keychain items that we share and steal the sensitive information. To my knowledge, it is not possible. You can only share Keychain between the apps that are signed with your account certificate. This is ensured by using the App ID Prefix in the keychain access group name which uniquely identifies your Apple developer account. Other developers will have different App ID prefixes and even if they try using your prefix the Xcode will not allow it.

You can try it yourself by replacing the *$(AppIdentifierPrefix)* text in the Keychain group in the *.entitlements* file with something different and run the app on a *physical* device. Xcode will refuse to do it by showing the following error.

> The executable was signed with invalid entitlements.

> The entitlements specified in your application’s Code Signing Entitlements file do not match those specified in your provisioning profile.

## To sum up

* Turn on key Keychain sharing in all apps.
* Specify the same Keychain group in all apps.
* Find out your App ID Prefix from Apple developer account web site to construct the full Keychain group.
* Pass this group to `kSecAttrAccessGroup` key to add, find or delete a Keychain item.

## Reference

* [Sample source code](https://github.com/evgenyneu/sharing-keychain-demo)
* [Keychain Swift](https://github.com/marketplacer/keychain-swift) library
