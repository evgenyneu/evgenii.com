---
layout: blog_post
comments: true
title: "Distributing a library with Swift Package Manager"
meta_description: "This tutorial shows how to distribute a Swift library with Swift Package Manager."
tags: programming
---


[Swift Package Manager](https://swift.org/package-manager/) allows to download and use external code in a Swift program. In this tutorial I will show how create a Swift library and then use it from a Swift program with Swift Package Manager. This method was tested with Swift 3.0.

## Setting up Swift

Before we begin, let's check that Swift is installed on the system by launching the *Terminal* app and requesting the Swift version.

```
swift --version
```

The command will show the current Swift version that looks like this:

```
Apple Swift version 3.0 (swiftlang-800.0.30 clang-800.0.24)
```

If the command did not work please follow the Swift [installation instructions](https://swift.org/getting-started).

## Creating a Swift library

First, we will create and publish a simple Swift library.

#### 1) Create the library directory

Run the following commands in the *Terminal* app.

```
mkdir MyLibrary
cd MyLibrary
```



#### 2) Create the library source file


Create the **Sources** directory

```
mkdir Sources
```

and add the library source file **MyLibrary.swift**:

```
touch Sources/MyLibrary.swift
```


#### 3) Write the library code

Write your library code in the **Sources/MyLibrary.swift** file.

```Swift
public func hiThere() -> String {
  return "Hello from the library!"
}
```

Here we create a function `hiThere` that simply returns a greeting text. Notice that we marked the function as **public** in order to make it accessible to the library users.


#### 4) Create the Package.swift file for the library

Next, create an empty **Package.swift** file in the **root directory** of the library

```
touch Package.swift
```

and put the following code in it.

```Swift
import PackageDescription

let package = Package(
    name: "MyLibrary",
    exclude: ["DirectoryToExclude"]
)
```

If you have an existing library that has Swift files that you do not want to distribute to users you can exclude them in the **Package.swift** file with the **exclude** option.



#### 5) Publish the library

Now we need to publish the library so other people can download it with Swift Package Manager. This can be done by uploading the code to a Git hosting service of your choice. If you are new to this please refer to the instructions from your hosting service. Here is how to [create a repository](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) on GitHub. As a result your will have a public Git repository that looks like this:

[https://github.com/evgenyneu/LibraryWithSwiftPackageManager](https://github.com/evgenyneu/LibraryWithSwiftPackageManager)



#### 6) Release a new library version


After the code is published we create a new tag version **1.0.0**.

```
git tag 1.0.0
git push origin --tags
```

In the future you can release updates to your library by creating new version tags, for example, *1.0.1* or *1.0.2*. If the library contains breaking changes [the convention](http://semver.org/) is to increment the first *major* digit of the version, for example, *2.0.0* or *3.0.0*. This will ensure the apps of existing library users will not be broken.

Congratulations! The library is published and ready to be used with Swift Package Manager.


#### Another way of initializing a new library with Swift Package Manager

We have just created all the project files for a Swift library manually. There is a shortcut command `swift package init` that does that automatically.

```Swift
mkdir MyLibrary
cd MyLibrary
swift package init
```

## Using a Swift library with Swift Package Manager

Now we can test if the library is working by creating a simple Swift app that includes the library with Swift Package Manager.

#### 1) Create app directory

```
mkdir MyApp
cd MyApp
```

#### 2) Create an empty Package.swift file

```
touch Package.swift
```

#### 3) Add package description

Add the following text to the **Package.swift** file.


```Swift
import PackageDescription

let package = Package(
    name: "MyApp",
    targets: []
)
```

#### 4) Write Swift program code

Next we create the **Sources** directory and add the `main.swift` file that prints "Hello World" message.

```
mkdir Sources
echo 'print("Hello world!")' > Sources/main.swift
```


#### 5) Build and run

Now we build

```
swift build
```

and run the app.

```
.build/debug/MyApp
```

If everything went well you will see "Hello world!" message in the terminal.

#### 6) Include Swift library in the Package.swift file

Now it is time to use our library. Replace the content of the **Package.swift** file with following text.

```Swift
import PackageDescription

let package = Package(
    name: "MyApp",
    targets: [],
    dependencies: [
        .Package(url: "https://github.com/evgenyneu/LibraryWithSwiftPackageManager.git",
                 versions: Version(1,0,0)..<Version(2,0,0))
    ]
)
```

The code above includes a sample project that I created. Your app, of course, will point to your own repository instead.

You may want to show the contents of the Package.swift file in your library's README file as a setup instruction for the users. In this example your users will download the most recent library version that starts with 1. For example, it will use *1.3.6* or *1.0.0* version but not *2.0.1*.

#### 7) Build Swift library

Run the `swift build` command. It will download and build the library into the *Packages* directory.

```Swift
swift build
```


#### 8) Use Swift library

Finally, we can test the library by using it in the `Source/main.swift` file of the app:

```Swift
import MyLibrary
print(hiThere())
```

Build/run the app again and you will see "Hello from the library!" text.

```
swift build
.build/debug/MyApp
```

#### Alternative way of creating a new app project with Swift Package Manager

We have created the files for the Swift app manually. It can also be done automatically with the following commands:

```Swift
mkdir MyApp
cd MyApp
swift package init --type executable
```


### We are done. Now what?

Awesome! We just learned how to create a Swift library and use it in a Swift app with Swift Package Manager. It is now your turn to create great libraries that can be useful to many people. Good luck!



## Examples

* [The demo](https://github.com/evgenyneu/LibraryWithSwiftPackageManager) library used in this tutorial.

* Real libraries that support Swift Package Manager: [SigmaSwiftStatistics](https://github.com/evgenyneu/SigmaSwiftStatistics), [JsonSwiftson](https://github.com/evgenyneu/JsonSwiftson).


