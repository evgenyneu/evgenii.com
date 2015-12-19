---
layout: blog_post
comments: true
title: "How to share Keychain between iOS apps"
meta_description: "This tutorial shows how to share keychain items between different apps on iOS, OS X, tvOS and watchOS."
tags: programming
---

Keychain is a secure storage suitable for short bits of sensitive information like passwords or credit card numbers. By default the data saved in one app can not be read in other apps. In most cases this is exactly what we need because it protects our data from leaking out.

However, sometimes we need to share Keychain items between multiple apps that we trust. For instance, suppose we created two apps where users can log into the same account. It would be nice to have ability to share the login information between these app. This way the user will only need to log in once in one of the apps.

Fortunately, there is a way to share Keychain items between apps and it can be done by using *Keychain Groups*. Here is how to do it. The following steps need to be done **in all apps** where you want to share the Keychain items.

## 1) Turn on Keychain sharing in Xcode

1. Select your app target and click *Capabilities* tab.
2. Turn on the *Keychain Sharing* capability.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0020_keychain_shaing_opions.png' title='Turn on Keychain sharing in Xcode' class='isMax100PercentWide hasBorderShade90'>


## 2) Select developer team

<div class='isTextCentered'>
  <img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0030_select_developer_team.png' title='Select developer team to enable Keychain sharing' class='isMax400PxWide hasBorderShade90'>
</div>

## 3) Change Keychain access group

1. Click the *.entitlements* file that was created automatically.
1. Change the name of the Keychain access group.

<img src='/image/blog/2015-12-12-sharing-keychain-between-ios-osx-tvos-apps/0040_change_keychain_access_group.png' title='Change Keychain access group' class='isMax100PercentWide hasBorderShade90'>

By default the Keychain access group has the form of *$(AppIdentifierPrefix)your-bundle-id*. If you keep it unchanged the *$(AppIdentifierPrefix)* part will be replaced with your app identifier. This is not what we need here because we do not know the app identifier.

We will remove *$(AppIdentifierPrefix)* and use a fixed text instead. For example, **login-group.com.my-app-bundle-id**. You can use any access group you want but here are things to keep in mind.

1. It should be the same in all apps where you share the Keychain item.
1. Make it unique in order to avoid interfering with other apps. This can be achieved by appending random text or a bundle ID from one of your apps.

Remember this access group name you created, you will be using it in code.

## 4) Accessing shared Keychain items

Now you can delete, add and retrieve shared Keychain items. To work with Keychain you can use one of many Keychain libraries that support access groups ([Keychain Swift](https://github.com/marketplacer/keychain-swift) is one). But here I will show how to do it directly using the built-in Keychain API. The main rule is to pass the access group name with the `kSecAttrAccessGroup` query key into `SecItemAdd`, `SecItemDelete` and `SecItemCopyMatching` functions.

### 4.1) Delete a shared Keychain item

```Swift
let itemKey = "My key"
let itemValue = "My secretive bee 🐝"
let keychainAccessGroupName = "login-group.com.my-app-bundle-id"

let queryDelete: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey,
  kSecAttrAccessGroup as String: keychainAccessGroupName
]

let resultCodeDelete = SecItemDelete(queryDelete as CFDictionaryRef)

if resultCodeDelete != noErr {
  print("Error deleting from Keychain: \(resultCodeDelete)")
}
```

### 4.2) Add a shared Keychain item

```Swift
guard let valueData = itemValue.dataUsingEncoding(NSUTF8StringEncoding) else {
  print("Error saving text to Keychain")
  return
}

let queryAdd: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey,
  kSecValueData as String: valueData,
  kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlocked,
  kSecAttrAccessGroup as String: keychainAccessGroupName
]

let resultCode = SecItemAdd(queryAdd as CFDictionaryRef, nil)

if resultCode != noErr {
  print("Error saving to Keychain: \(resultCode)")
}
```

### 4.3) Find a shared Keychain item

```Swift
let queryLoad: [String: AnyObject] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: itemKey,
  kSecReturnData as String: kCFBooleanTrue,
  kSecMatchLimit as String: kSecMatchLimitOne,
  kSecAttrAccessGroup as String: keychainAccessGroupName
]

var result: AnyObject?

let resultCodeLoad = withUnsafeMutablePointer(&result) {
  SecItemCopyMatching(queryLoad, UnsafeMutablePointer($0))
}

if resultCodeLoad == noErr {
  if let result = result as? NSData,
    keyValue = NSString(data: result,
      encoding: NSUTF8StringEncoding) as? String {

    // Found successfully
    print(keyValue)
  }
} else {
  print("Error loading from Keychain: \(resultCodeLoad)")
}
```

## To sum up

* Turn on key Keychain sharing in all apps.
* Change Keychain access group in entitlements file. Use the same name in all apps.
* Pass the Keychain group to `kSecAttrAccessGroup` key to add, find or delete a Keychain item.
