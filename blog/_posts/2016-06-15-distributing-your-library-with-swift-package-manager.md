---
layout: blog_post
comments: true
title: "Distributing a library with Swift Package Manager"
meta_description: "This tutorial shows how to distribute a Swift library with Swift Package Manager."
tags: programming
---


[Swift Package Manager](https://swift.org/package-manager/) allows to include external libraries into your Swift code. In this tutorial I will show to how to add support for Swift Package Manager to your library. The method was tested with Xcode 8 Beta and Swift 3.0.


## Package.swift file

If you have an existing library you can add support for Swift Package Manager by creating the **Package.swift** file in its root directory.

```Swift
import PackageDescription

let package = Package(
    name: "YOUR_PACKAGE_NAME",
    exclude: ["DirectoryToExclude"]
)
```

The *exclude* setting allows to exclude the directories that are not part of the library code, like unit tests. Those excluded directories will not be built by the users of your library.

### Release a new library version

Now we need to publish the library so other people can download it with Swift Package Manager. First, we upload the code to a Git hosting service like GitHub or Bitbucket. Then we create a new tag version *1.0.0* and push it to the hosting service:

```
git tag 1.0.0
git push origin --tags
```

As you update your library in the future you will release new versions by creating new tags, for example, *1.0.1* or *1.0.2*. If the library contains breaking changes [the convention](http://semver.org/) is to increment the first *major* digit of the version so it does not break apps of the users, for example, *2.0.0* or *3.0.0*

### Using your library with Swift Package Manager

Finally, we can test if your library is working with Swift Package Manager by creating a simple Swift code that depends on it.

#### 1) Create app directory.

```
mkdir MyApp
cd MyApp
```

#### 2) Create an empty *Package.swift* file

```
touch Package.swift
```

#### 3) Write Swift program code

Next we create the *Sources* directory and add the `main.swift` file that prints "Hello World" message.

```
mkdir Sources
echo 'print("Hello world!")' > Sources/main.swift
```


#### 4) Build and run

Now we build

```
swift build
```

and run the app.

```
.build/debug/MyApp
```

If everything went well you will see "Hello world!" message in the console.

#### 5) Include your library to the Package.swift file.

Add the following text to the **Package.swift** file and use the correct URL to your remote repository.

```Swift
import PackageDescription

let package = Package(
    name: "MyApp",
    targets: [],
    dependencies: [
        .Package(url: "https://github.com/YOUR_USER_NAME/YOUR_REPOSITORY.git",
                 versions: Version(1,0,0)..<Version(2,0,0))
    ]
)
```

Current example will include the most recent library version that starts with 1. For example, it will use *1.3.6* or *1.0.0* version but not *2.0.1*.

#### 6) Build your dependency

Run `swift build` and it will clone and build your library into the *Packages* directory.


#### 7) Use your library

Finally, you can test your library by including it in the `Source/main.swift` file:

```Swift
import YourLibraryName
// Use your library here for a test
```

Build/run the app again to check that it is working:

```
swift build
.build/debug/MyApp
```

### Example

[SigmaSwiftStatistics](https://github.com/evgenyneu/SigmaSwiftStatistics) is an example of a real library that supports Swift Package Manager.


